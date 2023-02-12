import { Notice } from "obsidian";

export function logError(context: string, error: Error) {
	console.error(context, error);
}

export function notifyError(context: string, error?: Error) {
	new Notice(`Streaming Error\n${context}`);
}
