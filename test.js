var Either = require('./index.js');

var a = x => ++x;

var b = x => {
	throw 'Error in b';
};

console.log(
	Either.right(1)
	.map(a)
	.map(b)
	.map(a)
);
