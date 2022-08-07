import { util } from "./util";

export class stack {
	private array: any[];
	constructor() {
		this.array = [];
	}
	push(d: any) {
		this.array.push(d);
		return this;
	}
	pop() {
		if (this.array.length === 0) {
			return null;
		}
		return this.array.pop();
	}
	top() {
		return this.array[this.array.length];
	}
	isEmpty() {
		return this.height() === 0; 
	}
	height() {
		return this.array.length;
	}
	strung() {
		const L = this.array.length;
		let str = "";
		for (let i = L - 1; i >= 0; i--) {
			if (i === L - 1) {
				str += `[${this.array[i].token}]<-top
				`;
			} else {
				str += `[${this.array[i].token}]
				`;
			}
		}
		return str;
	}
	log() {
		const description = `
			struct: stack
			height: ${this.array.length}
			methods:
				push(val: any) => this
				pop() => this
				top() => (top of stack)
				height() => (stack's height)
			current:
				${this.strung()}
		`;
		console.log(util.fstring(description));
		return this;
	}
	print() {
		console.log(this.strung());
		return this;
	}
}
