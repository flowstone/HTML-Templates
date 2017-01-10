$(document).ready(function() {

	$('#contactForm form').on('submit', function(e) {

		$.post('php_functions/functions.php', $(this).serialize(), function(feedback) {

			$('#contactForm form div p').remove();
			$('#contactForm form div').append(feedback);

		});

		e.preventDefault();

	});
	
});