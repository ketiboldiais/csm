export enum TokenType {
	OP1, // = "unary",
	OP2, // = "binary",
	OP3, // = "ternary",
	LPAREN, // "paren1",
	RPAREN, // "paren2",
	LBRACK, //= "bracket1",
	RBRACK, // = "bracket2",
	LBRACE, // = "brace1",
	RBRACE, //= "brace2",
	VAR, // = "variableName",
	SET, // = "setName",
	FUN, //= "functionCall",
	FDC, // = "functionDeclare",
	STRUCT, // = "structure",
	EOL, // = "endOfLine",
	PUN, // = "punctuation",
	COMMA, // = "comma",
	NUMBER, // = "number",
	STRING, // = "string",
}
export enum Token {
	LPAREN = "(", // = (,
	RPAREN = ")", // = ),
	LBRACE = "{", // = {
	RBRACE = "}", // = },
	LBRACK = "[", // = [,
	RBRACK = "]", // = ],
	DOT = ".", // = .
	COMMA = ",", // = ,
	BANG = "!", // = !
	SEMICOLON = ";", // = ;
	COLON = ":", // = ;
	VBAR = "|",

	EQUAL = "equal", // =
	PLUS = "add", // +
	MINUS = "sub", // -
	NEG = "neg",
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
	WHERE = "where", // &
	N = "N", // natural numbers
	Z = "Z", // integers
	R = "R", // reals

	SET = "set", // set
	ARRAY = "array", // set
	MATRIX = "matrix", // set

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
