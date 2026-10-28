#!/usr/bin/env node

import { createProgram } from '..';
import packageJson from '../../package.json' with { type: 'json' };

const program = createProgram();
program.version(packageJson.version, '-v, --version', 'Show version number');
await program.parseAsync();
