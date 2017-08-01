// function when the client clicks on the '+ Details' part of the standard, more details will appear
function clickStandard (){
	$('.standard-body').hide();
	$(".hide-show").on('click', function(){
		$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle') // toggle between the + and - icons
		var standard = $(this).parents('.standard'); // find the standard that the client has clicked on
		console.log(standard)
		var body = $(standard).find('.standard-body'); // find the text for the standard
		body.toggle('hide show')
	})
}

// function when the client clicks the link on the top-right corner of the standard
function clickLink(url) {
	var link;
	// if client clicks the link icon
	$("#copy-link").on('click', function(){
		link = $(this).siblings('div.copy-link'); // get the hidden div that has the link value stored in it
		console.log(link)
		$(link).tooltip(); // initialize a tooltip for the link
		$(link).tooltip({ // change the position of the tooltip
  			position: {my: "left center", at: "right center", of: this}
		})
		$(link).tooltip("open"); // open the tooltip
	});
	// to close the tooltip, the client must scroll anywhere on the page
	$(window).scroll(function() {
	    if ($(this).scrollTop()>0){
	    	$(link).tooltip(); // reinitialize the tooltip
	    	$(link).tooltip("close"); // close the tooltip
	    }
	});
}
