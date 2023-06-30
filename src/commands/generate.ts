import { Command, Flags } from '@oclif/core';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { compile, TemplateDelegate } from 'handlebars';

type IconStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands';
type IconType = 'pro' | 'free';

interface Icon {
  name: string;
  componentName: string;
  style: IconStyle;
  iconType: IconType;
}

interface Config {
  icons: Icon[];
  outputPath: string;
  storiesPath: string;
}

function loadTemplate(templateName: string): string {
  const path = join('templates', templateName);

  return readFileSync(path, { encoding: 'utf8' });
}

function buildIconPath(iconStyle: IconStyle, iconType: IconType): string {
  return `@fortawesome/${iconType}-${iconStyle}-svg-icons`;
}

function generateComponent(icon: Icon, outputPath: string, template: TemplateDelegate): void {
  const { name, componentName, style, iconType } = icon;
  const iconPath = buildIconPath(style, iconType);
  const context = { iconName: name, iconPath, componentName };

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
    export: Flags.boolean({ char: 'e', description: 'Output an index.ts file in the output directory with all generated files exported' })
    // destructive: Flags.boolean({ char: 'd', description: 'This will delete any existing directories and files in the given paths if they exist before generating the new ones.' })
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Generate);
    const configFile = flags.config;
    const exportPath = flags.export;

    if (configFile) {
      const configContent = readFileSync(configFile, { encoding: 'utf8' });
      const config: Config = JSON.parse(configContent);

      const templateString = loadTemplate('icon_template.tsx.hbs');
      const template = compile(templateString);

      for (const icon of config.icons) {
        generateStory(icon.componentName, config.storiesPath, template);
        generateComponent(icon, config.outputPath, template);
      }

      // Adds an index.tsx file in the same directory as the generated components
      // and exports all generated components.
      if (exportPath) {
        // TODO: Maybe find a better name for this template?
        const exportsTemplateString = loadTemplate('index.tsx.hbs');
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
