$(function(){
	var category = "", // store category variable
		selectedStandard = []; // array for selected standards

	$(".all-standards").on('click', function(){
		buildDirectory("all");
	});

	$(".square").on('click mouseover', function(event){ // when user clicks or hovers over a category button
		category = $(this).html(); // store the category name
		selectedCategory = $(this).attr('value'); // store the value of the category button (i.e., the category name)
		if(event.type == "mouseover"){ // if the user hover overs the category button
			if (selectedCategory == "Annual Budget"){
				$(this).hover(function () {$(this).html("Municipal budgets that plan for expenditure");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Building Permits") {
				$(this).hover(function () {$(this).html("Municial permits for construction");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Crime Statistics") {
				$(this).hover(function () {$(this).html("Municipal crime data");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Election Results") {
				$(this).hover(function () {$(this).html("Municipal major election results by consitutency/district");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Expenditure") {
				$(this).hover(function () {$(this).html("Municipal records of past spending");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Public Facilities") {
				$(this).hover(function () {$(this).html("Municipal public facilities, such as schools, parks, and daycare, and their location information");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Real-Time Transit") {
				$(this).hover(function () {$(this).html("Municipal or commissioned transit services' (e.g., buses, subway) real-time information, such as the location of a bus in real-time");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Road Construction") {
				$(this).hover(function () {$(this).html("Municipal current and planned road construction");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Service Requests") {
				$(this).hover(function () {$(this).html("Non-emergency service requests to a municipality, such as a request for graffiti removal");}, function () {$(this).html(category);}); // provide a description of the category 
			} else if (selectedCategory == "Zoning") {
				$(this).hover(function () {$(this).html("Municipal specifications on what development is allowed in a given piece of land");}, function () {$(this).html(category);}); // provide a description of the category 
			} 
	    } else if(event.type == "click"){ // else if the user clicks on the category button
			buildDirectory(selectedCategory); // function that will get the categories based off user-selection
	    }
	});

	(function (global) {
		var selectedCategory = global.localStorage.getItem("search-category"); /// this locally stores the value of the category selected if the user clicks the category from index.html
		var searchResults = global.localStorage.getItem("search-result");

		console.log(search)
		console.log(selectedCategory)

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
