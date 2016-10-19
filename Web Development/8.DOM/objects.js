var bio = {
	name: 'Omar',
	lastName : 'Sans',
	age: 19,
	profession: 'Software Crafter',
	size: {
		top: 90,
		middle: 60
	},

	printFullName: function() {
		console.log(this.name + " " + this.lastName);
	},

	printSize: function() {
		document.write('Top: ' + this.size.top);
		document.write(' Middle: ' + this.size.middle);
	}
};

bio.printFullName();
bio.name = 'Juan';
bio.printFullName();
bio.printSize();
console.log("name" in bio);


function Animal(name) {
	this.name = name;
	this.sound = "arg";
	this.picture = "pathtoimage.jpg";
	this.makeSound = function() {
		console.log(this.sound);
	};
};

var fox = new Animal('fox');
fox.sound = "ding ding ding";
fox.makeSound();
















