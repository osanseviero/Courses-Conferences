/*var div = document.createElement('div');
div.innerHTML = "Hello World";
var parent = document.getElementById("parent");
parent.appendChild(div);

$('#parent').append("<div>Hello World</div>");
*/

// Write this in console
// $("div");
// $("#parent");
// $("#parent");

// After new html
var listElements = $('li');

var articleItems = $(".article-item");

var nav = $("#nav");

// Simple DOM traversal
var articleList = $('.article-list');
var h1 = articleList.prev();
var kids = articleList.children();
var parents = articleList.parents('div');

// Challenges
var article2 = $('.featured');
var article3 = article2.next();
article2.toggleClass('featured');
article3.toggleClass('featured');

var firstElem = $('.nav-item').first();
var link = firstElem.find('a');
link.attr('href', '#1');

var articleItems = $('.article-item');
articleItems.css('font-size', '20px');

// Events
$('#input').on('change', function() {
    var val = $('#input').val();
    $('.articles').children('h1').text(val);
});

$('.bold').parent().remove();

$('p').each(function(index) {
	var text = $(this).text();
	$(this).append(text.length);
});

$('#input').on('keypress', function() {
	console.log("Key was pressed");
});

$('.featured').on('click', function(){ 
   $('body').toggleClass('success');
   $(this).remove();
});

$(document).on('click', function(e) {
	console.log(e.pageX, e.pageY);
	console.log(e.target.nodeName);
});

$('#input').keypress(function() {
	console.log("Key was pressed: v2");
});




