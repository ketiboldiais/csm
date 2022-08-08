import { lib } from "../functions";
import { queue } from "../struct";
import { TokenType } from "./token";
import { TokenObj } from "./token";
import { TOKENIZER } from "./tokenizer";

class PARSER {
	private queue: queue;
	private stack: TokenObj[];
	private tokens: TokenObj[];
	private parenStack: TokenObj[];
	private bracketStack: TokenObj[];
	private braceStack: TokenObj[];
	private lib: any;
	tokenizer: TOKENIZER;
	constructor() {
		this.queue = new queue();
		this.stack;
		this.bracketStack;
		this.braceStack;
		this.parenStack;
		this.tokenizer = new TOKENIZER();
		this.tokens;
		this.lib = lib;
	}
	registerFunc(n: string) {
		if (this.lib.hasOwnProperty(n)) {
			throw new Error(
				`${n} is a reserved identifier. Please use another.`,
			);
		}
		this.lib[n] = {};
	}
	parse(source: string) {
		this.tokenizer.init(source);
		const tokens = this.tokenizer.tokenize();
		this.stack = [];
		this.parenStack = [];
		this.bracketStack = [];
		this.braceStack = [];

		this.tokens = tokens;
		const tokenCount = tokens.length;
		let i = 0;
		for (i = 0; i < tokenCount; i++) {
			let token = tokens[i];
			switch (token.type) {
				case TokenType.STRUCT:
					this.queue.enqueue(token.args);
					break;
				case TokenType.NUMBER:
				case TokenType.STRING:
				case TokenType.STRUCT:
					this.queue.enqueue(token);
					break;
				case TokenType.OP1:
				case TokenType.OP2:
				case TokenType.OP3: {
					const L = this.stack.length - 1;
					while ((this.stack[L] && this.stack[L].args) >= token.type) {
						this.queue.enqueue(this.stack.pop());
					}
					this.stack.push(token);
					break;
				}
				case TokenType.FDC: {
					let func = token.token; // n
					this.registerFunc(`${func}`);
					let args = token.args;
					let argCount = token.args.length;
					this.lib[func]["params"] = {};
					for (let j = 0; j < argCount; j++) {
						let param = args[j].token;
						this.lib[func]["params"][param] = 0;
					}
					break;
				}
				case TokenType.FUN: {
					let args = [];
					for (let i = 0; i < token.args.length; i++) {
						args.push(token.args[i].token);
					}
					let result = this.lib[token.token](args);
					this.queue.enqueue(result);
					break;
				}
				case TokenType.LPAREN: {
					this.parenStack.push(token);
					break;
				}
				case TokenType.RPAREN: {
					const L = this.parenStack.length - 1;
					while (this.parenStack[L].type !== TokenType.LPAREN) {
						this.queue.enqueue(this.stack.pop());
					}
					this.parenStack.pop();
				}
				case TokenType.LBRACK: {
					this.bracketStack.push(token);
					break;
				}
				case TokenType.RBRACK: {
					const L = this.bracketStack.length - 1;
					while (this.bracketStack[L].type !== TokenType.LBRACK) {
						this.queue.enqueue(this.stack.pop());
					}
					this.bracketStack.pop();
				}
				case TokenType.LBRACE: {
					this.braceStack.push(token);
					break;
				}
				case TokenType.RBRACE: {
					const L = this.braceStack.length - 1;
					while (this.braceStack[L].type !== TokenType.LBRACE) {
						this.queue.enqueue(this.stack.pop());
					}
					this.braceStack.pop();
				}
				case TokenType.EOL: {
					continue;
				}
			}
		}
		while (this.stack.length > 0) {
			let operator = this.stack.pop();
			this.queue.enqueue(operator);
		}
		return this;
	}
	eval() {
		let result: any[] = [];
		while (this.queue.length() !== 0) {
			let element = this.queue.dequeue();
			if (element.type === TokenType.OP2) {
				let a = result.pop();
				let b = result.pop();
				let c: any;
				if (Array.isArray(a) && Array.isArray(b)) {
					c = this.lib.matrixOperations[element.token](a, b);
				} else if (typeof a === "number" && typeof b === "number") {
					c = this.lib[element.token](b, a);
				} else if (typeof a === "string" && typeof b === "string") {
					c = this.lib[element.token](b, a);
				} else {
					throw new Error("Invalid operands");
				}
				result.push(c);
			} else if (element.token) {
				result.push(element.token);
			} else {
				result.push(element);
			}
		}
		return result[0];
	}
	printStack() {
		console.log(this.stack);
	}
	printTokens() {
		console.log(this.tokens);
	}
	printOutputQueue() {
		this.queue.print();
	}
}

export const Parser = new PARSER();

const parsedExpression = Parser.parse(`
	[1,2,3] + [1,2,3]
`);

// parsedExpression.printTokens();
// parsedExpression.printStack();
// parsedExpression.printOutputQueue();
const result = parsedExpression.eval();

console.log(result);
