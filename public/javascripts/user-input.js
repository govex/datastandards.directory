// this function runs when a user either searches the inventory or clicks on a high-value category
$(function(){

	var category = "", // store category variable
		selectedStandard = []; // array for selected standards

	// if the client clicks on the "View All Standards" button, output all the standards into the directory
	$(".all-standards").on('click', function(){
		window.location.href = './all';
	});

	$(".all-categories").on('click', function(){
		window.location.href = './categories';
	});

	// if the client clicks on a .categories or hovers on a .square the following events will occur
	$(".categories").on('click mouseover', function(event){
		category = $(this).html(); // store the category name
		selectedCategory = $(this).attr('value'); // store the value of the category button (i.e., the category name)
		if(event.type == "mouseover"){ // if the user hover overs the category button show the definitions
			var categoryIcon = $(this).find(".category-icon"); // get the category's icon
			var definition = $(this).find(".definition"); // get the category's definition
			$(this).hover(function () {categoryIcon.hide(); definition.show();}, function () {categoryIcon.show(); definition.hide();}); // toggle between showing the icon and the category
	    } else if(event.type == "click"){ // else if the user clicks on the category button
			window.location.href = './' + selectedCategory.toLowerCase().split(' ').join('_');
	    }
	});

	$('.search-input').on('keyup', function(e){
		if(e.keyCode === 13) {
			var parameters = $(this).val(); // stores the search result
			window.location.href = './' + parameters.toLowerCase().split(' ').join('_');
		}
	});

	$('#search-button').on('click', function(e){
		var parameters = $('#search-header').val(); // stores the search result
		window.location.href = './' + parameters.toLowerCase().split(' ').join('_');
	});
});
