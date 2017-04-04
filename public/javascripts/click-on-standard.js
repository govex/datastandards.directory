// function when the client clicks on the '+ Details' part of the standard, more details will appear
function clickStandard (){
	$(".hide-show").on('click', function(){
		$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle') // toggle between the + and - icons
		var standard = $(this).parents('.standards'); // find the standard that the client has clicked on
		var body = $(standard).find('ul'); // find the text for the standard
		if (body[0].style.display == 'none') { // if the details are not visible
			body.show(); // show the details 
		} else {
			body.hide(); // else hide the details because they are already visible
		}
	})
}

// function when the client clicks the link on the top-right corner of the standard
function clickLink(url) {
	var link;
	// if client clicks the link icon
	$(".link").on('click', function(){
		link = $(this).siblings('div.copy-link'); // get the hidden div that has the link value stored in it
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

