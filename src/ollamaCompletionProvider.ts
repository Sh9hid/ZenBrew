import * as vscode from 'vscode';
import axios from 'axios';

export class OllamaCompletionProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[] | vscode.CompletionList> {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: 'codellama',
                prompt: `Complete this code: ${linePrefix}`,
                stream: false
            });

            const completion = response.data.response;
            return [
                new vscode.CompletionItem(completion, vscode.CompletionItemKind.Text)
            ];
        } catch (error) {
            console.error('Error calling Ollama:', error);
            return [];
        }
    }
}