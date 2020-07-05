<?php
$recipient_email    = "headlightcommunications@gmail.com"; //recepient
$from_email         = "info@headlightindia.com"; //from email using site domain.
$cc_email = 'sunny.padiyar@gmail.com';


if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
	die('Sorry Request must be Ajax POST'); //exit script
}

if($_POST){
    
    // print_r($_POST);
    $sender_name 	= filter_var($_POST["sub_fn"], FILTER_SANITIZE_STRING); //capture sender name
    $sender_email 	= filter_var($_POST["sub_email"], FILTER_SANITIZE_STRING); //capture sender email
    $phone_number   = filter_var($_POST["sub_phone"], FILTER_SANITIZE_NUMBER_INT);
    $message 		= filter_var($_POST["sub_message"], FILTER_SANITIZE_STRING); //capture message

    // $attachments = $_FILES['file_attach'];
	
    //php validation, exit outputting json string
    if(strlen($sender_name)<3){
        print json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        exit;
    }
    if(!filter_var($sender_email, FILTER_VALIDATE_EMAIL)){ //email validation
        print json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        exit;
    }
    if(!$phone_number){ //check for valid numbers in phone number field
        print json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
        exit;
    }
    if(strlen($message)<3){ //check emtpy message
        print json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        exit;
    }
    
    // $file_count = count($attachments['name']); //count total files attached
    $boundary = md5("headlightindia.com"); 
    
	//construct a message body to be sent to recipient
	$message_body =  "Message from $sender_name\n";
	$message_body .=  "------------------------------\n";
	$message_body .=  "Message : $message\n";
	$message_body .=  "------------------------------\n";
	$message_body .=  "Name : $sender_name\n";
	$message_body .=  "Email Address : $sender_email\n";
	$message_body .=  "Phone Number : $phone_number\n";
	
    $headers = "From:".$from_email."\r\n".
        "Reply-To: ".$sender_email. "\n" .
        "CC: ".$cc_email. "\n" .
        "X-Mailer: PHP/" . phpversion();
        $body = $message_body;
    
    $subject = 'Headlightindia Contact Form '. $sender_name;
    $sentMail = mail($recipient_email, $subject, $body, $headers);
    if($sentMail) //output success or failure messages
    {
        print json_encode(array('type'=>'done', 'text' => 'Thank you for your message, We will get back to you as sson as possible'));
		exit;
    }else{
        print json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your Mail configuration.'));  
		exit;
    }
}
?>