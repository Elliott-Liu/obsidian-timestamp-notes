import { CodeBlockProperties } from "./parseTimestamp";

export function parseLegacyTimestamp(source: string) {
	const properties: CodeBlockProperties = {
		properties: {},
		legacyMode: true,
	};

	// Match mm:ss or hh:mm:ss timestamp format
	const regExp = /\d+:\d+:\d+|\d+:\d+/g;
	const rows = source.split("\n").filter((row) => row.length > 0);
	let firstMatchValue: string = "";
	let alreadyMatched: boolean = false;

	rows.forEach((row) => {
		const match = row.match(regExp);

		if (match && alreadyMatched === false) {
			firstMatchValue = String(match[0]);
			alreadyMatched = true;
		}
	});

	properties.properties = { timestamp: firstMatchValue };
	return properties;
}

export function parseLegacyTimestampUrl(source: string) {
	const properties: CodeBlockProperties = {
		properties: {},
		legacyMode: true,
	};

	const url: URL = new URL(source.trim());

	properties.properties = { url: url };
	return properties;
}
