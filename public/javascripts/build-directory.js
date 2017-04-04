// this function builds the output content after a user either clicks on a category (.square) or searches 
function buildDirectory(input) {

	$(".click-to-directory").hide(); // hide the .square classes 

	var allStandards = []; 

	// get the data from the directory route on the server side 
	$.getJSON("https://odstandards-directory.herokuapp.com/directory/api/all-standards", function(standards) {
		if (input == "all") { // if user selects all standards

			var link;

			// run through each standard and create a link for it and build a visualization for the standard
			$.each(standards.data, function(i){ 
				link = "https://odstandards-directory.herokuapp.com/directory/api/" + standards.data[i].id;
				allStandards.push(buildStandard(standards.data[i], link));
			});

		} else { // if user clicks on a .square or if a user searches a standard / category 
			var match = [];

			// run through all the inventory and store standards that match the client's input 
			$.each(standards.data, function(i) {
				// if the input has the same id as a standard
				if (standards.data[i].id == input){  
					match.push(standards.data[i]);
				}
				// if the input has the same category as a standard
				if (standards.data[i].category.toUpperCase() == input.toUpperCase()){
					match.push(standards.data[i]);
				}
				// if the input has the same name as a standard
				if (standards.data[i].name.toUpperCase() == input.toUpperCase()){
					match.push(standards.data[i]);
				}

				// run through each match and store it into an array
				$.each(match, function(i) {	
					var link = "https://odstandards-directory.herokuapp.com/directory/api/" + match[i].id; // create a link for the standard 
					allStandards.push(buildStandard(match[i], link));
				});
			})

			// if there there are standards that match the input
			if (allStandards.length > 0) {
				// run the sort function when a user changes the sort option value
				$("#sortby").change(function() {
					$("#standards").html("");
					$("#standards").html(sortby(allStandards));
					$(".standard-body").hide();
					clickStandard();
					clickLink(url);
				});

				$("#standards").html(allStandards); // add all the standards to the div#standards
				
				// hide / show / add text to certain classes
				$(".standard-body").hide();
				$(".directory-results").show();
				$('.no-results').hide();
				$(".directory-items").show();
				$(".search-title").html("<h2>Search results for: " + input + "</strong>");

				clickStandard(); // run this function when a user clicks the '+ Details' icon
				clickLink(link); // run this function when a user clicks the link icon 
			} else {
				$('.directory-items').hide();
				$('.no-results').show();
				$(".no-results").html("<h2>No search results for " + input + "</h2>");
				$(".standard-body").hide();
				$(".directory-results").show();	
				$(".standards-container").hide();
			}
		}
	});
}
