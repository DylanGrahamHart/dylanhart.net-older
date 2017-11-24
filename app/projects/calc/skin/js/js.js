$(document).ready(function(){

// Normal button tap
$('.normal').on('tap', function(){
	$('#main-input').append($(this).html());
});

// Equals button tap
$('#equals').on('tap', function(){
	try {
		var input = $('#main-input').html();
		var result = math.eval(input);
		
		if (isNaN(result)) {
			$('#main-input').html('Derp');

		} else {
			result = result.toFixed(9); // Precision of 9
			result = parseFloat(result); // Removes trailing zeros

			$('#main-input').html(result);
		}
	}
	catch (error) {
		$('#main-input').html('Derp');
		console.log(error.message);
	}		
});

// Clear button tap
$('#clear').on('tap', function(){
	$('#main-input').html('');
});

// Clear button tap
$('#delete').on('tap', function(){
	var mainInput = $('#main-input');
	var oldHtml = mainInput.html();
	
	mainInput.html(oldHtml.substr(0, oldHtml.length - 1));
});

});