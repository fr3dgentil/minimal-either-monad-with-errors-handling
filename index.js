var colors = require('colors');

class Either {
	constructor(value) {
		this._value = value;
	}
	get value() {
		return this._value;
	}
	static left(a) {
		return new Left(a);
	}
	static right(a) {
		return new Right(a);
	}
	static fromNullable(val) {
		return val ? Either.right(val) : Either.left(val);
	}
	static of (a) {
		return Either.right(a);
	}
	static lift(f) { 
		return function(v){
			try {
				return Either.right(f(v));
			}
			catch(e){
				return Either.left(e);
			}
		}
	}
}
class Left extends Either {
	map(_) {
		return this;
	}
	get value() {
		throw new TypeError("Can't extract the value of a Left.");
	}
	getOrElse(other) {
		return other;
	}
	orElse(f) {
		return f(this._value);
	}
	chain(_) {
		return this;
	}
	getOrElseThrow(a) {
		throw new Error(a);
	}
	filter(_) {
		return this;
	}
	toString() {
		return `Either.Left(${this.value})`;
	}
}
class Right extends Either {
	map(f) {
		try{
			return Either.fromNullable(f(this.value));
		}
		catch(e){
			if(e instanceof Error){
				e = e.toString();
				console.log(e.red);
			}
			return Either.left(e);	
		}
	}
	getOrElse(_) {
		return this.value;
	}
	orElse(_) {
		return this;
	}
	chain(f) {
		return f(this.value);
	}
	getOrElseThrow(_) {
		return this.value;
	}
	filter(f) {
		return f(this.value) ? Either.right(this.value) : Either.left(this.value);
	}
	toString() {
		return `Either.Right(${this.value})`;
	}
}

module.exports = Either;
