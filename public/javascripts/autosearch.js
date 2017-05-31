var inventory = []; // inventory of items for autocomplete, currently: name and category... ADD TAGS

// get json all data in postgres using the inventory-search route
$.getJSON("https://datastandards-directory.herokuapp.com/inventory-search/api/inventory-search", function(standards) {
	// for each piece of retreived data
	$.each(standards.data, function(i) {
		inventory.push(standards.data[i].name); // add the name of the standard
		inventory.push(standards.data[i].category); // add the category of the standard 
	});

	var keys = [];

	// remove any duplicates (for all the categories collected in the above function)
	$.each(inventory, function(i, el){
		if($.inArray(el, keys) === -1) keys.push(el);
	});

	// initate ajax autocomplete with the 
	$('#search').autocomplete({
		source: keys
	});
})	
