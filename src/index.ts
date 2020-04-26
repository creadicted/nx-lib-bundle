#!/usr/bin/env node

import * as yargs from 'yargs';
import { Nx } from './nx';

yargs
    .scriptName('nx-lib-bundle')
    .options({
        output: {
            demandOption: false,
            describe: 'Target directory of the bundle',
            type: 'string',
            alias: 'o',
            default: 'dist'
        }
    })
    .command('all', 'build all nx workspace libraries', (yargs) => { }, (argv) => {
        new Nx(argv.output).bundleAll();
    })
    .command('bundle <projects...>', 'Bundle multiple nx workspace libraries', (yargs) => {
        yargs.positional('projects', {
            describe: 'name of the project',
        });
    }, (argv) => {
        let workspace = new Nx(argv.output);

        for (const project of argv.projects as string[]) {
            workspace.bundle(project);
        }
    })
    .usage('$0 <cmd> [args]')
    .version('1.0.0')
    .help()
    .demandCommand()
    .strict()
    .argv;
