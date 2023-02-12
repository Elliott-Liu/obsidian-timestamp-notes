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

// Parse through each code block source, and return an array of objects with the properties as key:value pairs
function getCodeBlockProperties(source: string) {
	const properties: CodeBlockProperties = {
		properties: {},
		legacyMode: false,
	};

	const codeBlockLinesArray = source.split("\n");
	const propertiesArray: Array<Object> = [];

	codeBlockLinesArray.forEach((line) => {
		const itemArray = line.split(" ");

		let key: string = "";
		let value: string = "";

		itemArray.forEach((item, index) => {
			item.trim();

			switch (index) {
				case 0:
					key = item;
					break;

				case 1:
					value = item;

				default:
					break;
			}
		});
		const property: Record<string, string> = {
			[key]: value,
		};
		propertiesArray.push(property);
	});

	properties.properties = propertiesArray.reduce((previous, current) => {
		let isValidProperty: boolean = false;

		Object.entries(previous).forEach((key, value) => {
			const isInvalidKey: boolean = key.contains("");

			if (isInvalidKey === false) {
				isValidProperty = true;
			}
		});

		if (isValidProperty !== false) {
			return { ...previous, ...current };
		}
		return { ...current };
	});

	return properties;
}
