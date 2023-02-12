export interface CodeBlockProperties {
	properties: {
		url?: URL;
		timestamp?: string;
		id?: Number;
	};
	legacyMode: boolean;
}

export function parseTimestamp(source: string) {
	const properties = getCodeBlockProperties(source);
	return properties;
}
