#!/usr/bin/env node

import packageJson from '../../package.json' with { type: 'json' };
import { createProgram } from '..';

const program = createProgram();
program.version(packageJson.version, '-v, --version', 'Show version number');
await program.parseAsync();
