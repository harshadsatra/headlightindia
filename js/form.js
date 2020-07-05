var timeOutId = 0;
$("#careerForm").validate({
    debug: true,
    ignore: ".ignore",
    rules: {
        car_fn: {
            required: true,
            minlength: 2,
            maxlength: 25,
        },
        car_phone: {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10,
        },
        car_email: {
            required: true,
            email: true,
        },
        car_message: {
            required: true,
        },
    },
    messages: {
        car_fn: {
            required: "Please Enter your name",
            maxlength: "Please enter only 25 Characters.",
        },
        car_phone: {
            required: "Please Enter Mobile No. ",
            number: "Please Enter Valid Mobile No. ",
            maxlength: "Please enter only 10 Digits.",
        },
        car_email: {
            required: "Please Enter Your Email Address",
            email: "Please Enter Your Valid Email Address",
        },
        car_message: {
            required: "Please Enter Your Message",
        },
    },
    submitHandler: function(form) {
    	var career = $('#careerForm');
        var post_url = $(career).attr("action"); //get form action url
		var request_method = $(career).attr("method"); //get form GET/POST method

		var form = document.getElementById('careerForm'); //id of form
		var form_data = new FormData(form); //Creates new FormData object
		console.log('proceed',career,post_url,request_method,form_data);
		$.ajax({ //ajax form submit
			url : post_url,
			type: request_method,
			data : form_data,
			dataType : "json",
			contentType: false,
			cache: false,
			processData:false
		}).done(function(res){ //fetch server "json" messages when done
            $('.form-control').val('');
            $("#notification").html('');
            if(res.type == "error"){
                $("#notification").html('<div class="error">'+ res.text +'</div>');
            }
            if(res.type == "done"){
                $("#notification").html('<div class="success">'+ res.text +'</div>');
            }
            $("#notification").addClass('active');
            setTimeout(function () {
                $('#notification').removeClass('active');
            },2000);
        });
		return false;
    }
});

$("#contactForm").validate({
    debug: true,
    ignore: ".ignore",
    rules: {
        sub_fn: {
            required: true,
            minlength: 2,
            maxlength: 25,
        },
        sub_phone: {
            required: true,
            number: true,
            minlength: 10,
            maxlength: 10,
        },
        sub_email: {
            required: true,
            email: true,
        },
        sub_message: {
            required: true,
        },
    },
    messages: {
        sub_fn: {
            required: "Please Enter your name",
            maxlength: "Please enter only 25 Characters.",
        },
        sub_phone: {
            required: "Please Enter Mobile No. ",
            number: "Please Enter Valid Mobile No. ",
            maxlength: "Please enter only 10 Digits.",
        },
        sub_email: {
            required: "Please Enter Your Email Address",
            email: "Please Enter Your Valid Email Address",
        },
        sub_message: {
            required: "Please Enter Your Message",
        },
    },
    submitHandler: function(form) {
        var career = $('#contactForm');
        var post_url = $(career).attr("action"); //get form action url
        var request_method = $(career).attr("method"); //get form GET/POST method

        var form = document.getElementById('contactForm'); //id of form
        var form_data = new FormData(form); //Creates new FormData object
        // console.log('proceed',career,post_url,request_method,form_data);
        $.ajax({ //ajax form submit
            url : post_url,
            type: request_method,
            data : form_data,
            dataType : "json",
            contentType: false,
            cache: false,
            processData:false
        }).done(function(res){ //fetch server "json" messages when done
            $('.form-control').val('');
            $("#notification").html('');
            if(res.type == "error"){
                $("#notification").html('<div class="error">'+ res.text +'</div>');
            }
            if(res.type == "done"){
                $("#notification").html('<div class="success">'+ res.text +'</div>');
            }
            $("#notification").addClass('active');
            setTimeout(function () {
                $('#notification').removeClass('active');
            },2000);
        });
        return false;
    }
});

$('#notification').on('click',function(){
    $(this).html('');
    $(this).removeClass('active');

})