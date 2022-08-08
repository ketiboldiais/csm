function vectorAdd(a: number[], b: number[]) {
	const aLength = a.length;
	const bLength = b.length;
	let out = a;
	if (aLength !== bLength) {
		throw new RangeError(
			"One vector operand is longer than the other. Vector addition is only defined on vectors of the same length.",
		);
	}
	for (let i = 0; i < aLength; i++) {
		out[i] += b[i];
	}
	return out;
}

function matrixAdd(a: number[][], b: number[][]) {
	const aRowCount = a.length;
	const bRowCount = b.length;
	let out = [];
	for (let i = 0; i < aRowCount; i++) {
		let row = [];
		for (let j = 0; j < bRowCount; j++) {
			let x = a[i][j];
			let y = b[i][j];
			if (x && y) {
				let sum = x + y;
				row.push(sum);
			} else {
				throw new Error("Invalid matrix operands.");
			}
		}
		out.push(row);
	}
	return out;
}

export const lib = {
	add: (a: any, b: any) => a + b,
	sub: (a: any, b: any) => a - b,
	mul: (a: any, b: any) => a * b,
	div: (a: any, b: any) => a * b,
	pow: (a: any, b: any) => a ** b,
	mod: (a: any, b: any) => a % b,
	eq: (a: any, b: any) => a === b,
	neq: (a: any, b: any) => a !== b,
	gt: (a: any, b: any) => a > b,
	lt: (a: any, b: any) => a < b,
	geq: (a: any, b: any) => a >= b,
	leq: (a: any, b: any) => a <= b,
	max: (a: any[]) => Math.max.apply(null, a),
	min: (a: any[]) => Math.min.apply(null, a),
	acos: (x: any) => Math.acos(x),
	acosh: (x: any) => Math.acosh(x),
	asin: (x: any) => Math.asin(x),
	asinh: (x: any) => Math.asinh(x),
	atan: (x: any) => Math.atan(x),
	atanh: (x: any) => Math.atanh(x),
	atan2: (x: any, y: any) => Math.atan2(x, y),
	cos: (x: any) => Math.cos(x),
	cosh: (x: any) => Math.cosh(x),
	abs: (x: any) => Math.abs(x),
	e: Math.E,
	ln2: Math.LN2,
	ln10: Math.LN10,
	log2e: Math.LOG2E,
	pi: Math.PI,
	sqrt1_2: Math.SQRT1_2,
	sqrt2: Math.SQRT2,
	matrixOperations: {
		add: (a: any, b: any) => {
			return a[0].constructor === Array && b[0].constructor === Array
				? matrixAdd(a, b)
				: vectorAdd(a, b);
		},
	},
};
