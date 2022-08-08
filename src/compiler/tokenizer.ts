import { Scan, SCANNER } from "./scanner";
import { Token, TokenObj, TokenType } from "./token";

export class TOKENIZER {
	scanner: SCANNER;
	leftBracketCount: number;
	rightBracketCount: number;
	scan: Scan;
	tokenList: TokenObj[];
	tokenLength: number;
	init(source: string) {
		this.scanner = new SCANNER();
		this.scan = this.scanner.scan(source);
		this.tokenList = this.scan.tokens;
		this.tokenLength = this.tokenList.length;
	}
	tokenize() {
		this.scan.containsArrays && this.tokenizeArrays();
		let cleanedTokens = [];
		let n: number;
		for (n = 0; n < this.tokenList.length; n++) {
			if (this.tokenList[n]?.token === Token.MINUS) {
				if (this.tokenList[n + 1].type === TokenType.NUMBER) {
					let val =
						(this.tokenList[n + 1].token as unknown as number) * -1;
					let t = this.makeToken(val, TokenType.NUMBER);
					cleanedTokens.push(t);
					n += 2;
				} else if (n === 0) {
					let t = this.makeToken(Token.NEG, TokenType.OP1, 15);
					cleanedTokens.push(t);
					n += 1;
				}
			}
			cleanedTokens.push(this.tokenList[n]);
		}
		this.tokenList = cleanedTokens;
		return this.tokenList;
	}
	private tokenizeArrays() {
		let index = 0;
		const buildList = (tokens: any[]) => {
			let arr = [];
			while (index < tokens.length) {
				let c = tokens[index++];
				if (c.token === Token.LBRACK) {
					arr.push(buildList(tokens));
				} else if (c.token === Token.RBRACK) {
					break;
				} else if (c.token === Token.COMMA) {
				} else if (
					c.type === TokenType.NUMBER ||
					c.type === TokenType.STRING
				) {
					arr.push(c.token);
				} else {
					arr.push(c);
				}
			}
			return arr;
		};
		let arraylist = buildList(this.tokenList);
		let newTokens = [];
		let i = 0;
		for (i = 0; i < arraylist.length; i++) {
			if (Array.isArray(arraylist[i])) {
				newTokens.push(
					this.makeToken(Token.ARRAY, TokenType.STRUCT, arraylist[i]),
				);
				continue;
			}
			newTokens.push(arraylist[i]);
		}
		this.tokenList = newTokens;
	}
	private makeToken(
		token: Token | string | number,
		type: TokenType,
		args = null,
	) {
		return args ? { token, type, args } : { token, type };
	}
}

// const tokenizer = new TOKENIZER();
// tokenizer.init(`
// 	[1,2,3] + [1,2,3]
// `);

// console.log(tokenizer.tokenize());
