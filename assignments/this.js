/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Window Binding occurs when you use the this keyword in the global scope. "this" binds to the window/console object and you can call its associated methods. 
* 2. With Implicit binding, the this keyword refers to the object that the this keyword is located in.
* 3. The new binding is pretty much the same as implicit binding, except the object is created using the 'new' keyword and a constructor that holds the 'this' keyword.
* 4. Explicit Binding is invoked by using call() or apply(). If you have an object a and an object b, and you want to use object a's methods(which may use the this keyword) with object b properties, you can use a.function.call(b) to do that, and this will now refer to object b even though you are called an object a method.
*
* write out a code example of each explanation above
*/

// Principle 1
function showProcessID() {
	//console.log(this);
	console.log(this.process.pid);//.process.env.pid);
}
showProcessID();

let test = () => console.log(this);
test.call(this);
// Principle 2

const A = {
	one: 1,
	two: 2,
	three: 3,
	numbers: function() {
		console.log(this.one + " " + this.two + " " + this.three);
	}
}

A.numbers();

// Principle 3

const Building = function(name) {
	this.building_name = name;

	this.getName = function() {
		console.log(this.building_name);
	}
}

skyScraper = new Building("SkyScraper");
skyScraper.getName();

// Principle 4


const spider = {
	legs: 8,
	eyes: 8,
	poisonous: "no",

	getStats: function() {
		let message = "I have " + this.legs + " and " + this.eyes + " eyes and I am ";

		if(this.poisonous === "no")
			message += "not ";

		message += "poisonous.";

		console.log(message);
	}
}

spider.getStats();

const veteranSpider = {
	legs: 7,
	eyes: 6,
	poisonous: "yes"
}

spider.getStats.call(veteranSpider);
