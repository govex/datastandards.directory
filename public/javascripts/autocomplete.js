function autocomplete() {
	var inventory = [], // inventory of items for autocomplete, currently: name and category... ADD TAGS
		url = location.origin;

	// get json all data in postgres using the inventory-search route
	$.getJSON(url + "/keywords", function(standards) {
		// for each piece of retreived data
		$.each(standards.keywords, function(i) {
			inventory.push(standards.keywords[i]); // add the name of the standard
		});

		var keys = [];

		// remove any duplicates (for all the categories collected in the above function)
		$.each(inventory, function(i, el){
			if($.inArray(el, keys) === -1) keys.push(el);
		});

		console.log(keys)

		// initate ajax autocomplete with the 
		$('.search-input').autocomplete({
			source: keys,
			autoFill: true,
			select: function (event, ui){
				var input = ui.item.label;
				window.location.href = './' + input;
			}
		});
	})
}	
