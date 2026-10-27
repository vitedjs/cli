import { describe, expect, it, vi } from 'vitest';
import { createProgram } from '.';

describe('createProgram()', () => {
  it('uses the Vited config for build commands', async () => {
    const build = vi.fn().mockResolvedValue(undefined);
    const program = createProgram({
      dev: vi.fn(),
      build,
      preview: vi.fn(),
    });

    await program.parseAsync(['node', 'vited', 'build', './site', '--config', 'docs.config.ts']);

    expect(build).toHaveBeenCalledWith({
      root: expect.stringMatching(/\/site$/),
      configFile: expect.stringMatching(/\/site\/docs\.config\.ts$/),
    });
  });

  it('passes validated server options to dev', async () => {
    const dev = vi.fn().mockResolvedValue(undefined);
    const program = createProgram({
      dev,
      build: vi.fn(),
      preview: vi.fn(),
    });

    await program.parseAsync(['node', 'vited', 'dev', '.', '--host', '127.0.0.1', '--port', '5174']);

    expect(dev).toHaveBeenCalledWith(expect.objectContaining({
      server: { host: '127.0.0.1', port: 5174 },
    }));
  });
});
