import { lib } from "./functions";
import { stack } from "./struct";
import { queue } from "./struct";
import { Scanner } from "./struct/scanner";
import { TokenType } from "./struct/token";
import { TokenObj } from "./struct/token";

class Parser {
	private queue: queue;
	private stack: stack;
	private scanner: Scanner;
	private tokens: TokenObj[];
	private variables: object;
	constructor() {
		this.queue = new queue();
		this.stack = new stack();
		this.scanner = new Scanner();
		this.tokens;
		this.variables = {};
	}
	parse(source: string) {
		this.tokens = this.scanner.scan(source);
		const tokenCount = this.tokens.length;
		for (let i = 0; i < tokenCount; i++) {
			let token = this.tokens[i];
			if (
				token.type === TokenType.NUMBER ||
				token.type === TokenType.STRING
			) {
				this.queue.enqueue(token);
			} else if (
				token.type === TokenType.OP1 ||
				token.type === TokenType.OP2 ||
				token.type === TokenType.OP3
			) {
				while (
					((this.stack.top as unknown as TokenObj).args as number) >=
					token.type
				) {
					this.queue.enqueue(this.stack.pop());
				}
				this.stack.push(token);
			} else if (token.type === TokenType.FUN) {
				let args = [];
				for (let i = 0; i < token.args.length; i++) {
					args.push(token.args[i].token);
				}
				let result = lib[token.token](this.variables, args);
				this.queue.enqueue(result);
			}
		}
		while (!this.stack.isEmpty()) {
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
				let c = lib[element.token](b, a);
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
		this.stack.print();
	}
	printTokens() {
		console.log(this.tokens);
	}
	printOutputQueue() {
		this.queue.print();
	}
}

const expression = `max(1,2,3)`;
const parser = new Parser();
const parsing = parser.parse(expression);
// const tokens = parser.printTokens();
const result = parsing.eval();
console.log(result);
