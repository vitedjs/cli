import path from 'node:path';
import { Command } from 'commander';
import { build, createServer, preview, type InlineConfig } from 'vite';

export interface VitedServices {
  dev(options: InlineConfig): Promise<unknown>;
  build(options: InlineConfig): Promise<unknown>;
  preview(options: InlineConfig): Promise<unknown>;
}

async function startDevServer(options: InlineConfig): Promise<unknown> {
  const server = await createServer(options);
  await server.listen();
  return server;
}

export function createProgram(
  services: VitedServices = { dev: startDevServer, build, preview },
): Command {
  const program = new Command('vited');
  program.description('Develop and build Vited documentation sites');
  program.showHelpAfterError();

  program
    .command('dev')
    .description('Start the documentation development server')
    .argument('[root]', 'Vite project root', '.')
    .option('-c, --config <file>', 'Vited config file', 'vited.config.ts')
    .option('--host <host>', 'Specify the host')
    .option('--port <port>', 'Specify the port', parsePort)
    .action(async (root: string, options: CliOptions) => {
      await services.dev({
        root: path.resolve(root),
        configFile: resolveConfig(root, options.config),
        server: { host: options.host, port: options.port },
      });
    });

  program
    .command('build')
    .description('Build the documentation site for production')
    .argument('[root]', 'Vite project root', '.')
    .option('-c, --config <file>', 'Vited config file', 'vited.config.ts')
    .action(async (root: string, options: CliOptions) => {
      await services.build({
        root: path.resolve(root),
        configFile: resolveConfig(root, options.config),
      });
    });

  program
    .command('preview')
    .description('Preview a production build')
    .argument('[root]', 'Vite project root', '.')
    .option('-c, --config <file>', 'Vited config file', 'vited.config.ts')
    .option('--host <host>', 'Specify the host')
    .option('--port <port>', 'Specify the port', parsePort)
    .action(async (root: string, options: CliOptions) => {
      await services.preview({
        root: path.resolve(root),
        configFile: resolveConfig(root, options.config),
        preview: { host: options.host, port: options.port },
      });
    });

  return program;
}

interface CliOptions {
  config: string;
  host?: string;
  port?: number;
}

function resolveConfig(root: string, configFile: string): string {
  return path.resolve(root, configFile);
}

function parsePort(value: string): number {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid port: ${value}`);
  }
  return port;
}
