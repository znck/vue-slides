// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

const selector = {
  scheme: 'file',
  language: 'vue-slides'
}
const separatorCompletionItem = (() => {
  const item = new vscode.CompletionItem(
    'Insert new slide',
    vscode.CompletionItemKind.Snippet
  )
	item.insertText = new vscode.SnippetString('\n<!-- slide: ${1:title} -->\n---\nlayout: ${2:default}\n---\n$0')
  return item
})()
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerFoldingRangeProvider(
    selector,
    slideFoldingRangeProvider
  )
  vscode.languages.registerCompletionItemProvider(
    selector,
    slideSeparatorProvider
  )
}

// this method is called when your extension is deactivated
export function deactivate() {}

const slideSeparatorProvider: vscode.CompletionItemProvider = {
  provideCompletionItems(document, position) {
    return position.character === 0 ? [separatorCompletionItem] : []
  },
  resolveCompletionItem(item) {
    return item
  }
}
const slideFoldingRangeProvider: vscode.FoldingRangeProvider = {
  provideFoldingRanges(selector, context, token) {
    return findFoldingRanges(selector.getText())
  }
}

async function findFoldingRanges(source: string) {
  const RE_SLIDE = /<!-- slide(?:(.*?))? -->/gi

  const slides: vscode.FoldingRange[] = []
  const lines = source.split(/\r?\n/)

  let start = -1

  lines.forEach((line, index) => {
    if (RE_SLIDE.test(line)) {
      if (start < 0) {
        start = index
      } else {
        slides.push(
          new vscode.FoldingRange(
            start,
            index - 1,
            vscode.FoldingRangeKind.Region
          )
        )
        start = index
      }
    }
  })

  if (start >= 0) {
    slides.push(
      new vscode.FoldingRange(
        start,
        lines.length - 1,
        vscode.FoldingRangeKind.Region
      )
    )
  }

  return slides
}
