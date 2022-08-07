import { TokenType } from "./token";
import { Token } from "./token";
import { TokenObj } from "./token";
import { encode } from "./encode";

export class Scanner {
	private current_lexeme: string;
	private cursor: number;
	private tokens: TokenObj[];
	private length: number;
	constructor() {
		this.current_lexeme;
		this.cursor = 0;
		this.length;
		this.tokens = [];
	}
	scan(source: string) {
		this.current_lexeme = source;
		this.length = source.length;
		let token: TokenObj;
		while (this.cursor < this.length) {
			this.skipwhitespace();
			let char = this.advance();
			if (this.isDigit(char)) {
				token = this.number();
			} else if (this.isAlpha(char)) {
				token = this.name();
			} else {
				switch (char) {
					case '"':
						token = this.string();
						break;
					case "(":
						token = this.makeToken(Token.LPAREN, TokenType.PUN);
						break;
					case ")":
						token = this.makeToken(Token.RPAREN, TokenType.PUN);
						break;
					case "{":
						token = this.makeToken(Token.LBRACE, TokenType.PUN);
						break;
					case "}":
						token = this.makeToken(Token.RBRACE, TokenType.PUN);
						break;
					case "[":
						token = this.makeToken(Token.LBRACK, TokenType.PUN);
						break;
					case "]":
						token = this.makeToken(Token.RBRACK, TokenType.PUN);
						break;
					case ".":
						token = this.makeToken(Token.DOT, TokenType.PUN);
						break;
					case ",":
						token = this.makeToken(Token.COMMA, TokenType.PUN);
						break;
					case "!":
						token = this.match("=")
							? this.makeToken(Token.BANG_EQUAL, TokenType.OP2, 8)
							: this.makeToken(Token.BANG, TokenType.OP1, 13);
						break;
					case "=":
						token = this.match("=")
							? this.makeToken(Token.EQUAL_EQUAL, TokenType.OP2, 8)
							: this.makeToken(Token.EQUAL, TokenType.OP2, 2);
						break;
					case "<":
						token = this.match("=")
							? this.makeToken(Token.LESS_EQUAL, TokenType.OP2, 9)
							: this.makeToken(Token.LESS, TokenType.OP2, 9);
						break;
					case ">":
						token = this.match("=")
							? this.makeToken(Token.GREATER_EQUAL, TokenType.OP2, 9)
							: this.makeToken(Token.GREATER, TokenType.OP2, 9);
						break;
					case ";":
						token = this.makeToken(Token.SEMICOLON, TokenType.EOL);
						break;
					case "+":
						token = this.makeToken(Token.PLUS, TokenType.OP2, 11);
						break;
					case "%":
						token = this.makeToken(Token.MOD, TokenType.OP2, 12);
						break;
					case "-":
						token = this.makeToken(Token.MINUS, TokenType.OP2, 11);
						break;
					case "*":
						token = this.makeToken(Token.STAR, TokenType.OP2, 12);
						break;
					case "^":
						token = this.makeToken(Token.CARET, TokenType.OP2, 13);
						break;
					case "/":
						token = this.makeToken(Token.SLASH, TokenType.OP2, 12);
						break;
					case "~":
						token = this.makeToken(Token.TILDE, TokenType.OP2, 12);
						break;
					case "&":
						token = this.makeToken(Token.AMPERSAND, TokenType.OP2, 12);
						break;
					case "$":
						token = this.makeToken(Token.DOLLAR, TokenType.OP2, 12);
						break;
					case "@":
						token = this.makeToken(Token.AT, TokenType.OP2, 12);
						break;
					case "#":
						token = this.makeToken(Token.HASH, TokenType.OP2, 12);
						break;
					default:
						throw new Error(
							`Unrecognized character ${this.current_lexeme}`,
						);
				}
			}
			this.tokens.push(token);
		}
		return this.tokens;
	}
	private string() {
		let value = "";
		while (this.peek() !== '"' && !this.EOF()) {
			value += this.advance();
		}
		if (this.EOF()) {
			throw new Error("Unterminated string.");
		}
		this.advance();
		return this.makeToken(value, TokenType.STRING);
	}
	private number() {
		let value = this.peekBack();
		while (this.peek() && this.isDigit(this.peek())) {
			value += this.advance();
			if (this.peek() == "." && this.isDigit(this.peekNext())) {
				value += this.advance();
				while (this.peek() && this.isDigit(this.peekNext())) {
					value += this.advance();
				}
			}
		}
		return this.makeToken(Number(value), TokenType.NUMBER);
	}
	private match(expectedChar: string) {
		if (this.EOF()) return false;
		if (this.peek() !== expectedChar) return false;
		this.cursor++;
		return true;
	}
	private advance() {
		this.cursor++;
		return this.current_lexeme[this.cursor - 1];
	}
	private isDigit(char: string) {
		return encode(char) >= encode("0") && encode(char) <= encode("9");
	}
	private func(name: string) {
		this.advance();
		let parameters = [];
		let type = TokenType.FUN;
		while (this.peek() && this.peek() !== ")") {
			if (this.isAlpha(this.peek())) {
				this.advance();
				parameters.push(this.name());
			} else if (this.isDigit(this.peek())) {
				this.advance();
				parameters.push(this.number());
			} else {
				this.advance();
			}
		}
		this.advance();
		return this.makeToken(name, type, parameters);
	}
	private name() {
		let value = this.peekBack();
		while (this.peek() && this.isAlpha(this.peek())) {
			value += this.advance();
		}
		if (this.peek() === "(") {
			return this.func(value);
		}
		switch (value) {
			case "and":
				return this.makeToken(Token.AND, TokenType.OP2, 4);
			case "nand":
				return this.makeToken(Token.NAND, TokenType.OP2, 4);
			case "or":
				return this.makeToken(Token.OR, TokenType.OP2, 3);
			case "not":
				return this.makeToken(Token.NOT, TokenType.OP1, 14);
			case "nor":
				return this.makeToken(Token.NOR, TokenType.OP2, 4);
			case "xor":
				return this.makeToken(Token.XOR, TokenType.OP2, 4);
			case "xnor":
				return this.makeToken(Token.XNOR, TokenType.OP2, 4);
			case "iff":
				return this.makeToken(Token.IFF, TokenType.OP2, 4);
			case "in":
				return this.makeToken(Token.IN, TokenType.OP2, 4);
			default:
				return this.makeToken(value, TokenType.VAR);
		}
	}
	private isAlpha(char: string) {
		const c = encode(char);
		return (
			(encode("a") <= c && c <= encode("z")) ||
			(encode("A") <= c && c <= encode("Z"))
		);
	}
	private skipwhitespace() {
		if (encode(this.peek()) === -1) this.advance();
	}
	private peek() {
		return this.current_lexeme[this.cursor];
	}
	private peekBack() {
		return this.current_lexeme[this.cursor - 1];
	}
	private peekNext() {
		return this.current_lexeme[this.cursor + 1];
	}
	private makeToken(
		token: Token | string | number,
		type: TokenType,
		args = null,
	) {
		return args ? { token, type, args } : { token, type };
	}
	private EOF() {
		return !(this.cursor < this.length);
	}
}

// const scanner = new Scanner().scan(`f(x) = x^2`);
// console.log(scanner);
