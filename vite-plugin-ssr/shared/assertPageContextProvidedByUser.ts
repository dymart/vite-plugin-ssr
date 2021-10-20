import { assert, assertUsage } from './utils'

export { assertPageContextProvidedByUser }

function assertPageContextProvidedByUser(
  pageContextProvidedByUser: Record<string, unknown>,
  hook: { hookFilePath: string; hookName: string }
) {
  const { hookName, hookFilePath } = hook
  assert(!hookName.endsWith(')'))
  assertUsage(
    !('_pageId' in pageContextProvidedByUser),
    `The \`${hookName}()\` hook exported by ${hookFilePath} seems to return the entire \`pageContext\` object which is forbidden, see https://www.vite-plugin-ssr.com/pageContext-handling#do-not-return-entire-pagecontext`
  )
}
