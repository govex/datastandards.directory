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
});
