// function when the user clicks on the standard, more details will appear
function clickStandard (){
	$(".standards").on('click', function(){
		var selected = $(this).find('ul') //find the ul tag that contains the additional information
		console.log(selected)
		if (selected[0].style.display == 'none') {
			selected.show();
		} else {
			$(this).find('ul').hide();
		}
		$(this).find('i').toggleClass('fa-plus-circle fa-minus-circle')
	})
}

