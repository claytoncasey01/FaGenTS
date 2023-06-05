oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fa-gen
$ fa-gen COMMAND
running command...
$ fa-gen (--version)
fa-gen/0.0.0 darwin-arm64 node-v16.15.1
$ fa-gen --help [COMMAND]
USAGE
  $ fa-gen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fa-gen hello PERSON`](#fa-gen-hello-person)
* [`fa-gen hello world`](#fa-gen-hello-world)
* [`fa-gen help [COMMANDS]`](#fa-gen-help-commands)
* [`fa-gen plugins`](#fa-gen-plugins)
* [`fa-gen plugins:install PLUGIN...`](#fa-gen-pluginsinstall-plugin)
* [`fa-gen plugins:inspect PLUGIN...`](#fa-gen-pluginsinspect-plugin)
* [`fa-gen plugins:install PLUGIN...`](#fa-gen-pluginsinstall-plugin-1)
* [`fa-gen plugins:link PLUGIN`](#fa-gen-pluginslink-plugin)
* [`fa-gen plugins:uninstall PLUGIN...`](#fa-gen-pluginsuninstall-plugin)
* [`fa-gen plugins:uninstall PLUGIN...`](#fa-gen-pluginsuninstall-plugin-1)
* [`fa-gen plugins:uninstall PLUGIN...`](#fa-gen-pluginsuninstall-plugin-2)
* [`fa-gen plugins update`](#fa-gen-plugins-update)

## `fa-gen hello PERSON`

Say hello

```
USAGE
  $ fa-gen hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/claytoncasey01/fa-gen/blob/v0.0.0/dist/commands/hello/index.ts)_

## `fa-gen hello world`

Say hello world

```
USAGE
  $ fa-gen hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ fa-gen hello world
  hello world! (./src/commands/hello/world.ts)
```

## `fa-gen help [COMMANDS]`

Display help for fa-gen.

```
USAGE
  $ fa-gen help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for fa-gen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.8/src/commands/help.ts)_

## `fa-gen plugins`

List installed plugins.

```
USAGE
  $ fa-gen plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ fa-gen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.3/src/commands/plugins/index.ts)_

## `fa-gen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fa-gen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fa-gen plugins add

EXAMPLES
  $ fa-gen plugins:install myplugin 

  $ fa-gen plugins:install https://github.com/someuser/someplugin

  $ fa-gen plugins:install someuser/someplugin
```

## `fa-gen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ fa-gen plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ fa-gen plugins:inspect myplugin
```

## `fa-gen plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fa-gen plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ fa-gen plugins add

EXAMPLES
  $ fa-gen plugins:install myplugin 

  $ fa-gen plugins:install https://github.com/someuser/someplugin

  $ fa-gen plugins:install someuser/someplugin
```

## `fa-gen plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ fa-gen plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ fa-gen plugins:link myplugin
```

## `fa-gen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fa-gen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fa-gen plugins unlink
  $ fa-gen plugins remove
```

## `fa-gen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fa-gen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fa-gen plugins unlink
  $ fa-gen plugins remove
```

## `fa-gen plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fa-gen plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fa-gen plugins unlink
  $ fa-gen plugins remove
```

## `fa-gen plugins update`

Update installed plugins.

```
USAGE
  $ fa-gen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->