// this function runs when a client clicks on the .square class (in other words, the categories on index.html or directory.html)
$(function(){
	
	var category = "", // store category variable
		selectedStandard = []; // array for selected standards

	// if the client clicks on the "View All Standards" button, output all the standards into the directory 
	$(".all-standards").on('click', function(){
		buildDirectory("all");
	});

	// if the client clicks on a .square or hovers on a .square the following events will occur
	$(".square").on('click mouseover', function(event){
		category = $(this).html(); // store the category name
		selectedCategory = $(this).attr('value'); // store the value of the category button (i.e., the category name)
		if(event.type == "mouseover"){ // if the user hover overs the category button show the definitions
			var categoryIcon = $(this).find(".category-icon"); // get the category's icon
			var definition = $(this).find(".definition"); // get the category's definition
			$(this).hover(function () {categoryIcon.hide(); definition.show();}, function () {categoryIcon.show(); definition.hide();}); // toggle between showing the icon and the category  
	    } else if(event.type == "click"){ // else if the user clicks on the category button
			buildDirectory(selectedCategory); // function that will output all the standards associated with the selected category into the directory 
	    }
	});

	// this function runs to see if there is a global variable stored in the browser from the index.html (if a user clicks the .square class or searches from index.html)
	(function (global) {
		var selectedCategory = global.localStorage.getItem("search-category"); // this locally stores the value of the category selected if the user clicks the category from index.html
		var searchResults = global.localStorage.getItem("search-result"); // this locally stores in the value of the search result if the user searches an item from index.html

		if (global.localStorage.getItem("search-category") !== null) { // if the selected category does not equal null
			$(".click-to-directory").hide(); // hide the click-to-directory
			$(".directory-results").show(); // show the standards that are associated with the category selected 
			localStorage.clear(); // clear local storage
			buildDirectory(selectedCategory); // function that will get the categories based off user-selection
			$(".standard-body").hide(); //hide the standard body full-text, just show the title of each standard and associated description
		} 

		if (global.localStorage.getItem("search-result") !== null){
			$(".click-to-directory").hide(); // hide the click-to-directory
			$(".directory-results").show(); // show the standards that are associated with the category selected 
			localStorage.clear(); // clear local storage
			buildDirectory(searchResults); // function that will get the categories based off user-selection
			$(".standard-body").hide(); //hide the standard body full-text, just show the title of each standard and associated description
		}
	}(window));
});
