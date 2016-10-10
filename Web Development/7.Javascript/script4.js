var day1 = {
	llama: false,
	events: ['work', 'pizza', 'running', 'magic beans']
}
console.log(day1);
console.log(day1.llama);
console.log(day1.wolf);
day1.wolf = true;
console.log(day1);



var anObject = {left: 1, right: 2};
console.log(anObject.left);
delete anObject.left;
console.log(anObject.left);
console.log("left" in anObject);
console.log("right" in anObject);


var journal = [
	{
		events: ['work', 'pizza', 'running', 'magic beans'],
		llama: false
	},
	{
		events: ['work', 'hamburguer', 'eat grass', 'magic potatoes'],
		llama: false
	},
	{
		events: ['weekend', 'mushrooms', 'running', 'Flash'],
		llama: true
	},
];

