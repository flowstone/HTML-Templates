$(document).ready(function(){
	
	// The published URL of your Google Docs spreadsheet as CSV:
	var csvURL = 'https://spreadsheets.google.com/pub?key='+
				'0Ahe1-YRnPKQ_dEI0STVPX05NVTJuNENhVlhKZklNUlE&hl=en&output=csv';
	
	// The YQL address:
	var yqlURL =	"http://query.yahooapis.com/v1/public/yql?q="+
					"select%20*%20from%20csv%20where%20url%3D'"+encodeURIComponent(csvURL)+
					"'%20and%20columns%3D'question%2Canswer'&format=json&callback=?";
	
	$.getJSON(yqlURL,function(msg){
		
		var dl = $('<dl>');
		
		// Looping through all the entries in the CSV file:
		$.each(msg.query.results.row,function(){
			
			// Sometimes the entries are surrounded by double quotes. This is why 
			// we strip them first with the replace method:
			
			var answer = this.answer.replace(/""/g,'"').replace(/^"|"$/g,'');
			var question = this.question.replace(/""/g,'"').replace(/^"|"$/g,'');
			
			// Formatting the FAQ as a definition list: dt for the question
			// and a dd for the answer.
			
			dl.append('<dt><span class="icon"></span>'+question+'</dt><dd>'+answer+'</dd>');
		});


		// Appending the definition list:
		$('#faqSection').append(dl);
		
		$('dt').live('click',function(){
			var dd = $(this).next();
			
			// If the title is clicked and the dd is not currently animated,
			// start an animation with the slideToggle() method.
			
			if(!dd.is(':animated')){
				dd.slideToggle();
				$(this).toggleClass('opened');
			}
			
		});
		
		$('a.button').click(function(){
			
			// To expand/collapse all of the FAQs simultaneously,
			// just trigger the click event on the DTs
			
			if($(this).hasClass('collapse')){
				$('dt.opened').click();
			}
			else $('dt:not(.opened)').click();
			
			$(this).toggleClass('expand collapse');
			
			return false;
		});
		
	});
});