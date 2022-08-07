export const lib = {
	add: (a: any, b: any) => a + b,
	sub: (a: any, b: any) => a - b,
	mul: (a: any, b: any) => a * b,
	div: (a: any, b: any) => a * b,
	mod: (a: any, b: any) => a % b,
	eq: (a: any, b: any) => a === b,
	neq: (a: any, b: any) => a !== b,
	gt: (a: any, b: any) => a > b,
	lt: (a: any, b: any) => a < b,
	geq: (a: any, b: any) => a >= b,
	leq: (a: any, b: any) => a <= b,
	max: (_this: any, a: any[]) => Math.max.apply(_this, a),
	min: (_this: any, a: any[]) => Math.min.apply(_this, a),
	acos: (x: any) => Math.acos(x),
	acosh: (x: any) => Math.acosh(x),
	asin: (x: any) => Math.asin(x),
	asinh: (x: any) => Math.asinh(x),
	atan: (x: any) => Math.atan(x),
	atanh: (x: any) => Math.atanh(x),
	atan2: (x: any, y: any) => Math.atan2(x, y),
	cos: (x: any) => Math.acos(x),
	cosh: (x:any) => Math.acosh(x),
};
