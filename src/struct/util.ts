function populateTemplate(
	strings: TemplateStringsArray,
	...interps: string[]
) {
	let string = "";
	for (let i = 0; i < strings.length; i++) {
		string += `${strings[i] || ""}${interps[i] || ""}`;
	}
	return string;
}

function undent(strings: TemplateStringsArray, ...interps: string[]) {
	let string = populateTemplate(strings, ...interps);
	string = string.replace(/^[\r\n]+/, "").replace(/\s+$/, "");
	const dents = string.match(/^([ \t])*/gm);
	if (!dents || dents.length == 0) {
		return string;
	}
	dents.sort((dent1, dent2) => dent1.length - dent2.length);
	const minDent = dents[0];
	if (!minDent) {
		return string;
	}
	const dedented = string.replace(new RegExp(`^${minDent}`, "gm"), "");
	return dedented;
}

function oneline(strings: TemplateStringsArray, ...interps: string[]) {
	return populateTemplate(strings, ...interps)
		.replace(/^\s+/, "")
		.replace(/\s+$/, "")
		.replace(/\s+/g, " ");
}

export const util = {
	fstring: (str: string, oneLine = false) =>
		oneLine ? oneline`${str}` : undent`${str}`,
} as const;
