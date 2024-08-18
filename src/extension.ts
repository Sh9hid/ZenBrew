import * as vscode from 'vscode';
import { OllamaCompletionProvider } from './ollamaCompletionProvider';
import { OllamaSuggestionProvider } from './ollamaSuggestionProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Ollama-powered Copilot-like extension is now active');

    const completionProvider = new OllamaCompletionProvider();
    const suggestionProvider = new OllamaSuggestionProvider();

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            { scheme: 'file', language: '*' },
            completionProvider,
            '.' // Trigger completion on dot
        )
    );

    context.subscriptions.push(
        vscode.languages.registerInlineCompletionItemProvider(
            { scheme: 'file', language: '*' },
            suggestionProvider
        )
    );
}

export function deactivate() {}