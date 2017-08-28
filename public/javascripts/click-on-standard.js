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
function clickLink(url, standard_link) {
	var link;
	// if client hovers over link icon
	$(standard_link).mouseover(function(){
		link = $(this).siblings('div.copy-link'); // get the hidden div that has the link value stored in it
		$(link).tooltip(); // initialize a tooltip for the link
		$(link).tooltip({ // change the position of the tooltip
				position: {my: "left center", at: "right center", of: this}
		});
		$(link).tooltip("open");
		$(standard_link).mouseout(function(){
			$(link).tooltip("close");
		});
	});
	// if client clicks the link icon
	$(standard_link).on('click', function(){
		link = $(this).siblings('div.copy-link'); // get the hidden div that has the link value stored in it
		$(link).tooltip(); // initialize a tooltip for the link
		$(link).tooltip({ // change the position of the tooltip
  			position: {my: "left center", at: "right center", of: this}
		});
		$(link).tooltip("open"); // open the tooltip
		$('.ui-tooltip-content').attr('id', 'tooltip-to-select');
		SelectText('tooltip-to-select');
		$(standard_link).mouseout(function(){
			$(link).tooltip("close");
		})
	});
}
// https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
