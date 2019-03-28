"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const selector = {
    scheme: 'file',
    language: 'vue-slides'
};
const separatorCompletionItem = (() => {
    const item = new vscode.CompletionItem('Insert new slide', vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString('\n<!-- slide: ${1:title} -->\n---\nlayout: ${2:default}\n---\n$0');
    return item;
})();
// your extension is activated the very first time the command is executed
function activate(context) {
    vscode.languages.registerFoldingRangeProvider(selector, slideFoldingRangeProvider);
    vscode.languages.registerCompletionItemProvider(selector, slideSeparatorProvider);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
const slideSeparatorProvider = {
    provideCompletionItems(document, position) {
        return position.character === 0 ? [separatorCompletionItem] : [];
    },
    resolveCompletionItem(item) {
        return item;
    }
};
const slideFoldingRangeProvider = {
    provideFoldingRanges(selector, context, token) {
        return findFoldingRanges(selector.getText());
    }
};
function findFoldingRanges(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const RE_SLIDE = /<!-- slide(?:(.*?))? -->/gi;
        const slides = [];
        const lines = source.split(/\r?\n/);
        let start = -1;
        lines.forEach((line, index) => {
            if (RE_SLIDE.test(line)) {
                if (start < 0) {
                    start = index;
                }
                else {
                    slides.push(new vscode.FoldingRange(start, index - 1, vscode.FoldingRangeKind.Region));
                    start = index;
                }
            }
        });
        if (start >= 0) {
            slides.push(new vscode.FoldingRange(start, lines.length - 1, vscode.FoldingRangeKind.Region));
        }
        return slides;
    });
}
//# sourceMappingURL=extension.js.map