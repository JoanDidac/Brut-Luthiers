
const n_iter = [...Array(5).keys()];

let current = -1;
let elements = [];
let distance = -1;
let clicked = false;

$(document).ready(function(){
	setElements();
	distance = $(".nav-item").eq(1).offset().top - $(".nav-item").eq(0).offset().top
	$(".nav-item").eq(0).children().addClass("selected");
	current = 0;
	//navOnSlide();
})

function setElements(){
	$('.nav-item').each(function(){
		elements.push(getIndex($(this).index()));
	});
}

function resetSelection(i){
	$(".nav-item").eq(current).children().removeClass("selected");
	current = i;
}


$( ".nav-item" ).click(function() {
	clicked = true;
	$(this).children().addClass("selected");
	clicked_index = getIndex($(this).index());
	if(clicked_index != current){
		resetSelection(clicked_index);
	}
});

$(".nav-item").hover(function(){
	$(this).children().addClass("hovered");
	mouseOn(getIndex($(this).index()));
}, function(){
	$(this).children().removeClass("hovered");
	let i = getIndex($(this).index())
	mouseLeave(i);
});

$(".nav-bar").hover(function(){
	navOn();
}, function(){
	navOff();
});

function navOn(){
	let el = elements.filter(a => a != current);
	el.map(function(e){
		$(".nav-item").eq(e).children().addClass("menu-hovered");
	});
	navSlide(true);
}

function navOff(){
	let el = elements.filter(a => a != current);

	el.map(function(e){
		$(".nav-item").eq(e).children().removeClass("menu-hovered");
	});
	navSlide(false);
}

function mouseOn(i){
	clicked = false;
	let top = calcTop(i);
	moveIndicator(top);
}

function mouseLeave(i){
	if(!clicked){
		let top = calcTop(current);
		moveIndicator(top);
	}
}

function calcTop(i){
	if(i==0){
		return 33;
	}
	else{
		return (distance*i)+33;
	}
}

function navSlide(on){
	let s = document.querySelectorAll('.nav-item:nth-child(' + (current+1)*2 + ')');

	let el = elements.filter(a => a != current);
	let t = [];
	el.map(function(e){
		e+=1;
		let u = document.querySelectorAll('.nav-item:nth-child(' + e*2 + ')');
		t.push(u);
	});

	let y = (on ? 10 : 0);
	anime({
		targets: s,
		left: y,
		duration: 600,
		delay: 40,
		easing: 'easeInOutQuad',
	});
	let x = (on ? 20 : 0);
	anime({
		targets: t,
		left: x,
		duration: 600,
		delay: anime.stagger(80),
		easing: 'easeInOutQuad',
	});
	let z = (on ? 10 : 0);
	anime({
		targets: '#indicator',
		left: z,
		duration: 600,
		delay: 200,
		easing: 'easeInOutCubic',
	});
}

function navSlideSelected(){
	anime({
		targets: '.menu-hovered',
		left: -10,
		duration: 800,
		delay: anime.stagger(80),
		easing: 'easeInOutQuad',
	});
}

function moveIndicator(t, d = 500){
	anime({
		targets: '#indicator',
		top: t,
		duration: d,
		delay: 200,
		easing: 'easeInOutSine',
	})
}

function getIndex(i){
	return i = ((i+1)/2)-1;
}