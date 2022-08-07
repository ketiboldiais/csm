import { util } from "./util";

class node {
	val: any;
	next: any;
	constructor(val: any) {
		this.val = val;
		this.next = null;
	}
}

export class queue {
	private first: any;
	private last: any;
	private size: number;
	constructor() {
		this.first = null;
		this.last = null;
		this.size = 0;
	}
	enqueue(val: any) {
		const newNode = new node(val);
		if (!this.first) {
			this.first = this.last = newNode;
		} else {
			this.last.next = newNode;
			this.last = newNode;
		}
		this.size++;
		return this;
	}
	dequeue() {
		if (!this.first) return null;
		let temp = this.first;
		if (this.first == this.last) {
			this.last = null;
		}
		this.first = this.first.next;
		this.size--;
		return temp.val;
	}
	peek() {
		return this.first && this.first.val;
	}
	length() {
		return this.size;
	}
	strung() {
		let p = this.first;
		let _string = "[";
		const L = this.length();
		for (let i = 0; i < L; i++) {
			i !== 0 ? (_string += ",") : "";
			_string += `${p.val.token}`;
			p = p.next;
		}
		_string += `]`;
		return _string;
	}
	log() {
		const description = `
			struct: queue
			length: ${this.length()}
			methods:
				enqueue(val: any) => this
				dequeue() => this
				peek() => (next val to dequeue)
				length() => (queue's length)
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
