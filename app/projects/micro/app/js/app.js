$(document).ready(function(){

// Disable empty links
$('[href="#"]').click(function(ev){
	ev.preventDefault();
});

$('#menu li').click(function(){
	$('#menu li').removeClass('active');
	$(this).addClass('active');
});

$('#talk-to-us').click(function(){
	var ok = confirm('Are you sure you want to talk to us?');

	if (ok == true) {
		location.href = 'https://microventures.com';
	}
});


});