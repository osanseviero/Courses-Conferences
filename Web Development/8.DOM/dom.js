//document.body.style.color = 'red'

var cage = document.getElementById('cage');
cage.src = "http://placecage.com/100/100"

var animalList = document.getElementById('beastList');
console.log(animalList.children[1].innerHTML);
animalList.children[1].innerHTML = "cyclops";

var add = function() {
	document.write(3+5);
}

console.log(document.getElementById("lastBeast").previousSibling);
console.log(document.getElementById("lastBeast").previousSibling.previousSibling);
console.log(animalList.firstChild.nextSibling);
console.log(document.getElementById("lastBeast").parentNode)