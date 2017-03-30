// function when the user clicks on the 'Details' part of the standard, more details will appear
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

// function when the user clicks the link on the top-right corner of the standard
function clickLink(url) {
	$("#copy-link").on('click', function(){ // when the user clicks the link
		var link = $(this).siblings('div.copy-link');
		$(link).html(url);
		copyToClipboard(url)
	});
	new Clipboard('#copy-link');
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
