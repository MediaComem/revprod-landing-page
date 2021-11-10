#!/usr/bin/env node
import chalk from 'chalk';

import start from './app/start.js';

Promise.resolve()
  .then(start)
  .catch(err => {
    console.error(chalk.red(err.stack));
    process.exit(1);
  });
