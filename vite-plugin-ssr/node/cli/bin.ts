import { cac } from 'cac'
import { resolve } from 'path'
import { prerender } from '../prerender'
import { projectInfo } from '../../shared/utils'

const cli = cac(projectInfo.name)

cli
  .command('prerender')
  .option('--partial', 'allow only a subset of pages to be pre-rendered')
  .option(
    '--no-extra-dir',
    'Do not create a new directory for each page, e.g. generate `dist/client/about.html` instead of `dist/client/about/index.html`'
  )
  .option(
    '--root <path>',
    '[string] root directory of your project (where `vite.config.js` and `dist/` live) (default: `process.cwd()`)'
  )
  .option(
    '--outDir <path>',
    '[string] vite output directory of your project (default: `dist`)'
  )
  .option(
    '--serverDir <path>',
    '[string] the directory of vite build --ssr output (default: `dist/server`)'
  )
  .option(
    '--writeOutDir <path>',
    '[string] the directory where files will be written (default: `dist/client`)'
  )
  .option('--client-router', 'serialize `pageContext` to JSON files for Client Routing')
  .option('--base <path>', '[string] public base path (default: /)')
  .option(
    '--parallel <numberOfJobs>',
    '[number] Number of jobs running in parallel. Default: `os.cpus().length`. Set to `1` to disable concurrency.'
  )
  .action(async (options) => {
    const { partial, extraDir, clientRouter, base, parallel, outDir, serverDir, writeOutDir } = options
    const root = options.root && resolve(options.root)
    const noExtraDir = !extraDir
    await prerender({ partial, noExtraDir, clientRouter, base, root, parallel, outDir, serverDir, writeOutDir })
  })

// Listen to unknown commands
cli.on('command:*', () => {
  console.error('Invalid command: %s', cli.args.join(' '))
})

cli.help()
cli.version(projectInfo.version)

cli.parse(process.argv.length === 2 ? [...process.argv, '--help'] : process.argv)

process.on('unhandledRejection', (rejectValue) => {
  throw rejectValue
})
