import * as vscode from 'vscode';
import axios from 'axios';

export class OllamaSuggestionProvider implements vscode.InlineCompletionItemProvider {
    async provideInlineCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        context: vscode.InlineCompletionContext,
        token: vscode.CancellationToken
    ): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList> {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'codellama',
                prompt: `Suggest completion for this code: ${linePrefix}`,
                stream: false
            });

            const suggestion = response.data.response;
            return [
                new vscode.InlineCompletionItem(suggestion, new vscode.Range(position, position))
            ];
        } catch (error) {
            console.error('Error calling Ollama:', error);
            return [];
        }
    }
}