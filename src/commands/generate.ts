import { Command, Flags } from '@oclif/core';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { compile, TemplateDelegate } from 'handlebars';

type IconStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
type IconType = 'pro' | 'free' | 'custom';

interface Icon {
  name: string;
  componentName: string;
  style: IconStyle;
  iconType: IconType;
  svgPathData?: string;
}

interface Config {
  icons: Icon[];
  outputPath: string;
  storiesPath: string;
}

function loadTemplate(templateName: string, templatesPath?: string): string {
  const path = join(templatesPath ?? 'templates', templateName);

  return readFileSync(path, { encoding: 'utf8' });
}

function buildIconPath(iconStyle: IconStyle, iconType: IconType): string {
  return `@fortawesome/${iconType}-${iconStyle}-svg-icons`;
}

function generateComponent(icon: Icon, outputPath: string, template: TemplateDelegate, custom: boolean = false): void {
  const { name, componentName, style, iconType, svgPathData } = icon;
  const context = custom ? { iconName: name, componentName, svgPathData, custom } : { iconName: name, iconPath: buildIconPath(style, iconType), componentName };

  const rendered = template(context);


  if (!existsSync(outputPath)) {
    mkdirSync(outputPath, { recursive: true });
  }

  const fileName = `${componentName}.tsx`;
  const filePath = join(outputPath, fileName);
  writeFileSync(filePath, rendered, { flag: 'w' });
}

function generateStory(componentName: string, storiesPath: string, template: TemplateDelegate): void {
  const rendered = template({ componentName });

  if (!existsSync(storiesPath)) {
    mkdirSync(storiesPath, { recursive: true });
  }

  const fileName = `${componentName}.stories.tsx`;
  const filePath = join(storiesPath, fileName);
  writeFileSync(filePath, rendered, { flag: 'w' });
}

export default class Generate extends Command {
  static description = 'Generates an icon wrapper component for FontAwesome Icons';

  static flags = {
    config: Flags.string({ char: 'c', description: 'Path to the config file' }),
    export: Flags.boolean({ char: 'e', description: 'Output an index.ts file in the output directory with all generated files exported' }),
    template: Flags.string({ char: 't', description: "Path to the templates that are used when creating the icon components" })
    // destructive: Flags.boolean({ char: 'd', description: 'This will delete any existing directories and files in the given paths if they exist before generating the new ones.' })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Generate);
    const configFile = flags.config;
    const exportPath = flags.export;
    const templatePath = flags.template;

    if (configFile) {
      const configContent = readFileSync(configFile, { encoding: 'utf8' });
      const config: Config = JSON.parse(configContent);

      const iconTemplateString = loadTemplate('icon_template.tsx.hbs', templatePath);
      const iconTemplate = compile(iconTemplateString);

      const storyTemplate = compile(loadTemplate('story_template.hbs', templatePath));

      for (const icon of config.icons) {
        generateStory(icon.componentName, config.storiesPath, storyTemplate);
        generateComponent(icon, config.outputPath, iconTemplate, icon.iconType === 'custom');
      }

      // Adds an index.tsx file in the same directory as the generated components
      // and exports all generated components.
      if (exportPath) {
        // TODO: Maybe find a better name for this template?
        const exportsTemplateString = loadTemplate('index.tsx.hbs', templatePath);
        const exportsTemplate = compile(exportsTemplateString);
        const exportsContext = { iconComponents: config.icons.map(icon => icon.componentName) };
        const rendered = exportsTemplate(exportsContext);

        const filePath = join(config.outputPath, 'index.tsx');
        writeFileSync(filePath, rendered);

      }

    } else {
      this.error('Error: No config file specified, please provide one with the --config flag');
    }
  }
}
