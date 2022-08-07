// export enum TokenType {
// 	OP1 = "unaryOperator",
// 	OP2 = "binaryOperator",
// 	OP3 = "ternaryOperator",
// 	VAR = "variableName",
// 	FUN = "functionName",
// 	FDC = "functionDeclaration",
// 	EOL = "endOfLine",
// 	PUN = "punctuation",
// 	NUMBER = "number",
// 	STRING = "string",
// }
export enum TokenType {
	OP1,
	OP2,
	OP3,
	VAR,
	FUN,
	FDC,
	EOL,
	PUN,
	NUMBER,
	STRING,
}
export enum Token {
	LPAREN = "(", // = (,
	RPAREN = ")", // = ),
	LBRACE = "{", // = {
	RBRACE = "}", // = },
	LBRACK = "]", // = [,
	RBRACK = "[", // = ],
	DOT = ".", // = .
	COMMA = ",", // = ,
	BANG = "!", // = !
	SEMICOLON = ";", // = ;

	EQUAL = "equal", // =
	PLUS = "add", // +
	MINUS = "sub", // -
	STAR = "mul", // *
	CARET = "pow", // ^
	SLASH = "div", // /
	MOD = "mod", // %,
	GREATER = "gt", // >
	LESS = "lt", // <
	TILDE = "tilde", // ~
	AMPERSAND = "amp", // &

	DQUOTE = "dquote", // "
	DOLLAR = "dollar", // $
	AT = "at", // @
	HASH = "hash", // #

	BANG_EQUAL = "neq", // !=
	EQUAL_EQUAL = "eq", // ==
	GREATER_EQUAL = "geq", // >=
	LESS_EQUAL = "leq", // <=

	// keywords
	AND = "and", // and
	NAND = "nand", // nand
	OR = "or", // or
	NOT = "not", // not
	NOR = "nor", // nor
	XOR = "xor", // xor
	XNOR = "xnor", // xnor
	IFF = "iff", // iff
	IN = "in", // in

	EOF = "eof", // eof
	NULL = "null", // null
	TRUE = "true", // true
	FALSE = "false", // false
	ERROR = "error", // error
}

export type TokenObj = {
	token: Token | string | number;
	type?: TokenType;
	args?: any;
	body?: any;
};
// [ { token: 'f', type: 5, args: [ { token: 'x', type: 3 } ] },
//   { token: 'equal', type: 1, args: 2 },
//   { token: 'x', type: 3 },
//   { token: 'pow', type: 1, args: 13 },
//   { token: 2, type: 8 },
//   { token: ';', type: 6 } ]
