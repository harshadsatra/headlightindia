// Loading Page Info using JSON
var page = {"work": {"animation": "workMovin", "popup":"#work", "progress":".work_progress", "animationInner": "workMovinInner"},"career": {"animation": "careerMovin", "popup":"#careers", "progress":".career_progress", "animationInner": "careerMovinInner"}, "about":{"animation": "aboutMovin", "popup":"#about", "progress":".about_progress", "animationInner": "workMovinInner"}, "culture":{"animation": "cultureMovin", "popup":"#culture", "progress":".culture_progress", "animationInner": "cultureMovinInner"}, "service":{"animation": "serviceMovin", "popup":"#service", "progress":".service_progress", "animationInner": "serviceMovinInner"}, "social":{"animation": "socialMovin", "popup":"#social", "progress":".social_progress", "animationInner": "socialMovinInner"}}; 

Pace.on("done", function(){
	$('.actionButtons').css('opacity','1');
});

var activeId,activePage;



var MOUSE_X,MOUSE_Y,MAX_W,MAX_H,BREAKPOINT = 650;
var sound_playing = true;
var sound = document.getElementById('mainAudio');

// HOME PAGE TRIGGER ANIMATIONS
var trigger = $('.actionButtons a .trigger');
var timeout_id = 0,
    hold_time = 2000,
    section,
    triggerParent,
    section = 'workMovin';


var vid = document.getElementById("mainAudio");
vid.muted = true;
var vid = document.getElementById("pressNHold");
vid.muted = true;


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

$(".trigger").click(function(){
	triggerParent = $(this).data('btn');
	section = $(triggerParent).data('type');
	console.log(section,triggerParent);

	$(triggerParent).addClass('hovered');


	if(section == 'work'){
		workMovin.playSegments([12,52], true); 
	}else if(section == 'service'){
		serviceMovin.playSegments([120,192], true); // run intro animation
	}else if(section == 'about'){
		aboutMovin.playSegments([150,240], true); 
	}else if(section == 'culture'){
		cultureMovin.playSegments([24,60], true); // run intro animation
	}else if(section == 'social'){
		socialMovin.playSegments([96,168], true); 
	}

	// setTimeout(openPopup,2000,section);
	document.getElementById('pressNHold').play();

	// $('.homeContent').fadeOut();
	setTimeout(openPopup, 500);

});

$('.close-popup').click(function(){
	popupClose();
})

$('.howToInfo').click(function(){
	$(this).fadeOut();
})



function openPopup(){
	$(triggerParent).addClass("activatePopup");
	console.log(section);
	setTimeout(
		function(){
			$('.popup').css({'opacity':'1','visibility':'visible'})
		}	
	, 500);
	$('#'+section).fadeIn();

	if(section == 'about'){
		aboutMovinInner.playSegments([0,239], true);
	}else if(section =='work'){
		workMovinInner.playSegments([0,239], true);
	}else if(section =='culture'){
		cultureMovinInner.playSegments([0,215], true);
	}else if(section =='service'){
		serviceMovinInner.playSegments([0,191], true);
	}else if(section =='social'){
		socialMovinInner.playSegments([0,167], true);
	}else if(section =='careers'){
		careerMovinInner.playSegments([0,145], true);
	}
}

$(document).on("click", ".triggerLink", function (){
	section = $(this).data('type');
	openPopup();
});

function popupClose(){
	console.log('closing popup');
	$('.actionButtons a').removeClass("hovered activatePopup");
	$('.popup-content').fadeOut();
	$('.popup').css({'opacity':'0','visibility':'hidden'})
	
	// Stop all Inner Bodymovin Anin;
	workMovinInner.goToAndStop(0,true);
	aboutMovinInner.goToAndStop(0,true);
	serviceMovinInner.goToAndStop(0,true);	
	cultureMovinInner.goToAndStop(0,true);
	socialMovinInner.goToAndStop(0,true);
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

