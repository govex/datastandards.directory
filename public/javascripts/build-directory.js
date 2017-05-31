// this function builds the output content after a user either clicks on a category (.square) or searches 
function buildDirectory(input) {
	$(".click-to-directory").hide(); // input will get results if it is a category or standard name
	var allStandards = [];
	// get the data from the getAllStandards query on the server side 
	$.getJSON("https://datastandards-directory.herokuapp.com/api/all-standards", function(standards) {
		if (input == "all") { // if user selects all standards
			var link;
			$.each(standards.data, function(i){
				link = "https://datastandards-directory.herokuapp.com/" + standards.data[i].id;
				allStandards.push(buildStandard(standards.data[i], link));
			});

		} else {
			var match = [];
			$.each(standards.data, function(i) {
				if (standards.data[i].id == input){
					match.push(standards.data[i]);
				}
				if (standards.data[i].category.toUpperCase() == input.toUpperCase()){
					match.push(standards.data[i]);
				}
				if (standards.data[i].name.toUpperCase() == input.toUpperCase()){
					match.push(standards.data[i]);
				}
			})
			if (match.length > 0) {
				$.each(match, function(i) {	
					var link = "https://datastandards-directory.herokuapp.com/" + match[i].id
					allStandards.push(buildStandard(match[i], link));
				});
			}
		}
		// if the client's search/selection matches standards
		if (allStandards.length > 0) {

			$("#standards").html(allStandards); // add the matched standards to the directory
			$(".search-title").html("<h2>Search results for: " + input + "</strong>") 
			$(".directory-results").show();
			$('.no-results').hide();
			$('.text-container').hide();
			$(".directory-items").show();
			$(".filters").hide();
			clickStandard() // allows the client to click the "+ Details" for more information
			clickLink(link) // allows the client to select a standard's link to share

			// if there is more than one standard for the search
			if (allStandards.length > 1) {
				$(".standard-body").hide();
				$(".filters").show();
				$(".hide-show").html("<i class='fa fa-plus-circle'></i> Details");
				// create the sorting functionality
				$("#sortby").change(function() {
					$("#standards").html("");
					$("#standards").html(sortby(allStandards));
					$(".standard-body").hide();
					clickStandard();
					clickLink(link);
				});
			}
		} else { // else if there is no match 
			$('.directory-items').hide();
			$('.no-results').show();
			$(".no-results").html("<h2>No search results for: " + input + "</h2>");
			$(".standard-body").hide();
			$(".directory-results").show();	
			$(".standards-container").hide();
		}
	});
}
