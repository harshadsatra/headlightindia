// Loading Page Info using JSON
var page = {"work": {"animation": "workMovin", "popup":"#work", "progress":".work_progress", "animationInner": "workMovinInner"},"career": {"animation": "careerMovin", "popup":"#careers", "progress":".career_progress", "animationInner": "careerMovinInner"}, "about":{"animation": "aboutMovin", "popup":"#about", "progress":".about_progress", "animationInner": "workMovinInner"}, "culture":{"animation": "cultureMovin", "popup":"#culture", "progress":".culture_progress", "animationInner": "cultureMovinInner"}, "service":{"animation": "serviceMovin", "popup":"#service", "progress":".service_progress", "animationInner": "serviceMovinInner"}, "social":{"animation": "socialMovin", "popup":"#social", "progress":".social_progress", "animationInner": "socialMovinInner"}}; 

// SVG Circle Animation
/*
var RADIUS = 54;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
var progressValue = '.progress__value';
function progress(value,selector) {
	progressValue = document.querySelector(selector);
	var progress = value / 100;
	var dashoffset = CIRCUMFERENCE * (1 - progress);
	progressValue.style.strokeDashoffset = dashoffset;
}
document.querySelector(progressValue).style.strokeDasharray = CIRCUMFERENCE;
progress(0,progressValue);
*/

var activeId,activePage;
var homeTimeLine = new TimelineLite();
var popupTimeClose = new TimelineLite();
var popupTimeOpen = new TimelineLite();

Pace.on("done", function(){
    homeTimeLine
		.to('.actionButtons',0.5,{autoAlpha:1, ease:Power1.easeIn})
		.from('.homeLogo',0.8,{y: 50,autoAlpha:0, ease:Power1.easeIn},1)
		.from('#mainhdr',0.8,{y: 50,autoAlpha:0, ease:Power1.easeIn})
		.from('.Footermenu',0.8,{y: 10,autoAlpha:0, ease:Power1.easeIn})
});


var MOUSE_X,MOUSE_Y,MAX_W,MAX_H,BREAKPOINT = 650;
var sound_playing = true;
var sound = document.getElementById('mainAudio');

// HOME PAGE TRIGGER ANIMATIONS
var trigger = $('.actionButtons a .trigger');
var timeout_id = 0,
    hold_time = 2000,
    triggerParent,
    section = 'workMovin';


// Moving Mouse and Container 
$(document).on("mousemove touchmove", function(e) {
	MOUSE_X = e.pageX;
	MOUSE_Y = e.pageY;

	MAX_W = $(window).width();
	MAX_H = $(window).height();

	// MOVING THE MAIN CONTAINER
	var ELEM = $('.actionButtons');
	var ELEM_W = ELEM.width();
	var ELEM_H = ELEM.height();

	var X = ((ELEM_W - MAX_W) / MAX_W) * MOUSE_X;
	var Y = ((ELEM_H - MAX_H) / MAX_H) * MOUSE_Y;

	// MOVING THE SPOTLIGHT
	var SPOT = $('#spotlight');
	var SPOT_W = SPOT.width();
	var SPOT_H = SPOT.height();

	if(MAX_W >= BREAKPOINT){
		ELEM.css({
			'left':'-'+X+'px',
			'top':'-'+Y+'px',
		});
		/*
		SPOT.css({
			"left": MOUSE_X-SPOT_W/2,
			"top": MOUSE_Y-SPOT_H/2
		});
		*/
	}
});

// Audio Play and Pause
$('#music_switch').on('click',function(){
	console.log('triggered click');
	if(!sound.paused){
		console.log('Not Paused')
		sound.pause();
		sound.currentTime = 0;
		sound_playing=false;
		$(this).removeClass('active');
	}else{
		console.log('Paused')
		sound.play();
		sound_playing=true;
		$(this).addClass('active');
	}
});

trigger.mouseenter(function(){
	triggerParent = $(this).data('btn');
	var x = $(this).width();
	var y = $(this).height();
	var box = 100;
	if(x >= y){
		box =x+20;
	}else{
		box=y+20;
	}

	/*
	if(sound_playing == true && sound.paused){
		sound.play();
	}
	*/

	section = $(triggerParent).data('type');
	$(triggerParent).addClass('hovered');

	// TweenMax.to(triggerParent+ '.backCircle',1,{scale: 1},1);

	if(page[section].animation == 'workMovin'){
		workMovin.playSegments([12,52], true); 
	}else if(page[section].animation == 'serviceMovin'){
		serviceMovin.playSegments([120,192], true); // run intro animation
	}else if(page[section].animation == 'aboutMovin'){
		aboutMovin.playSegments([150,240], true); 
	}else if(page[section].animation == 'cultureMovin'){
		cultureMovin.playSegments([24,60], true); // run intro animation
	}else if(page[section].animation == 'socialMovin'){
		socialMovin.playSegments([96,168], true); 
	}

	// progressValue = page[section].progress;
	// document.querySelector(progressValue).style.strokeDasharray = CIRCUMFERENCE;
})

trigger.mouseleave(function(){

	$(triggerParent).removeClass('hovered');
	$(triggerParent).removeClass('activatePopup');
	

	if(page[section].animation == 'workMovin'){
		workMovin.stop();
	}else if(page[section].animation == 'serviceMovin'){
		serviceMovin.stop();
	}else if(page[section].animation == 'aboutMovin'){
		aboutMovin.stop();
	}else if(page[section].animation == 'cultureMovin'){
		cultureMovin.stop();
	}else if(page[section].animation == 'socialMovin'){
		socialMovin.stop();
	}
})

trigger.mousedown(function(){
	if(sound_playing == true && sound.paused){
		sound.play();
	}
	$(triggerParent).addClass('activatePopup');
	timeout_id = setTimeout(onTouchAndHold, hold_time,this);
}).bind('mouseup mouseleave', function() {
	if(typeof timeout_id !== "undefined"){
  		$(triggerParent).removeClass('activatePopup');
	    onTouchAndHoldLeave(this);
	    clearTimeout(timeout_id);
	}
	
});


$(document).on("touchstart", ".actionButtons a .trigger", function (){
	if(MAX_W <= BREAKPOINT){
		hold_time = 1000;
		$(triggerParent).addClass("hovered activatePopup");
		document.getElementById('pressNHold').play();
		timeout_id = setTimeout(onTouchAndHold, hold_time,this);
	}
});

$(document).on("click", ".triggerLink", function (){
	var activePage = $(this).data('type');
	openPopup(page[activePage].popup);
});




function onTouchAndHoldLeave(elem){
	$('.homeContent').fadeIn();
}

function onTouchAndHold(elem){
	$(triggerParent).addClass("hovered activatePopup");
	document.getElementById('pressNHold').play();
	var type = $(elem).data('type');
	var popup = page[section].popup;
	$('.homeContent').fadeOut();
	setTimeout(openPopup, 500,popup);
	// progress(0,page[section].progress);
}

function openPopup(id){
	activeId = id;
	clearTimeout(timeout_id);
	$(id).fadeIn().addClass('active');
		
	console.log('Opening '+activeId+' popup');
	popupTimeOpen
	.set('.homePage',{autoAlpha:0})
	.set('.popup',{autoAlpha:1})
	.to(activeId,0.5,{autoAlpha:1, ease:Power0.easeIn})
	.to(activeId +' .bodymovin-div',0.5,{y:0,autoAlpha:1, ease:Power0.easeIn})
	.to(activeId +' .content-div',0.5,{y:0,autoAlpha:1, ease:Power0.easeIn})

	if(id == '#about'){
		aboutMovinInner.play();
	}else if(id =='#work'){
		workMovinInner.play();
	}else if(id =='#culture'){
		cultureMovinInner.play();
	}else if(id =='#service'){
		serviceMovinInner.play();
	}else if(id =='#social'){
		socialMovinInner.play();
	}else if(id =='#careers'){
		careerMovinInner.play();
	}
}

function popupClose(){

	$('.actionButtons a').removeClass("hovered activatePopup");

	console.log('closing '+activeId+ ' popup');
	popupTimeClose
		.set('.homePage',{autoAlpha:1})
		.to(activeId +' .bodymovin-div',0.5,{y:100,autoAlpha:0, ease:Power1.easeOut})
		.to(activeId +' .content-div',0.5,{y:100,autoAlpha:0, ease:Power1.easeOut})
		.to(activeId,0.8,{autoAlpha:0, ease:Power1.easeOut})
		.to('.popup',0.8,{autoAlpha:0, ease:Circ.easeOut})
		.add﻿(homeTimeLine);
	
	// Stop all Inner Bodymovin Anin;
	workMovinInner.stop();
	aboutMovinInner.stop();
	serviceMovinInner.stop();	
	cultureMovinInner.stop();
	socialMovinInner.stop();
}

workMovinInner.addEventListener('complete', function() {
	workMovinInner.playSegments([168,240], true);
})

aboutMovinInner.addEventListener('complete', function() {
	aboutMovinInner.playSegments([150,240], true);
})

serviceMovinInner.addEventListener('complete', function() {
	serviceMovinInner.playSegments([120,192], true);
})

cultureMovinInner.addEventListener('complete', function() {
	cultureMovinInner.playSegments([120,216], true);
})

careerMovinInner.addEventListener('complete', function() {
	careerMovinInner.playSegments([25,144], true);
})

socialMovinInner.addEventListener('complete', function() {
	$('.social-icons').addClass('animated');
  	socialMovinInner.playSegments([96,168], true);
})

$(document).on("click touchstart", ".close-popup", function (){
	popupClose();
})



/*
See https://www.greensock.com/splittext/ for details. 
This demo uses SplitText which is a membership benefit of Club GreenSock, https://www.greensock.com/club/


var tl = new TimelineLite, 
    mySplitText = new SplitText("#quote", {type:"words,chars"}), 
    chars = mySplitText.chars; //an array of all the divs that wrap each character

TweenLite.set("#quote", {perspective:400});

tl.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% 50",  ease:Back.easeOut}, 0.01, "+=0");

document.getElementById("animate").onclick = function() {
  tl.restart();
}
*/


