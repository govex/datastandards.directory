var inventory = []; // inventory of items for autocomplete, currently: name and category... ADD TAGS

$.getJSON( "http://localhost:3000/inventory-search/api/inventory-search", function(standards) {
	$.each(standards.data, function(i) {
		inventory.push(standards.data[i].name);
		inventory.push(standards.data[i].category);
	});
	var standard = [];
	$.each(inventory, function(i, el){ // Removes any duplicates
		if($.inArray(el, standard) === -1) standard.push(el);
	});
	// initates ajax autocomplete
	$('#search').autocomplete({
		source: standard
	});
})	