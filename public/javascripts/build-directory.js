// this function builds the output content after a user either clicks on a category (.square) or searches 
function buildDirectory(input) {
	// input will get results if it is a category or standard name
	$(".click-to-directory").hide();
	var allStandards = [];

	// get the data from the getAllStandards query on the server side 
	$.getJSON("https://odstandards-directory.herokuapp.com/directory/api/all-standards", function(standards) {
		if (input == "all") { // if user selects all standards

			var link;

			$.each(standards.data, function(i){
				allStandards.push(buildStandard(standards.data[i]));
				link = "https://odstandards-directory.herokuapp.com/directory/api/" + standards.data[i].id;
				clickLink(link)
			});

			$("#standards").html(allStandards);
			$("#sortby").change(function() {
				$("#standards").html("");
				$("#standards").html(sortby(allStandards));
				$(".standard-body").hide();
				clickStandard()
			});
			
			$(".standard-body").hide();
			$(".directory-results").show();
			$('.no-results').hide();
			$(".directory-items").show();
			clickStandard()
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
					console.log("There was a match with your input")
					console.log(match[i].id)
					if (match[i].id == input || match[i].name == input) {
						var url = "https://odstandards-directory.herokuapp.com/directory/api/" + match[i].id
					}
					if (match[i].category.toUpperCase() == input.toUpperCase()){
						var url = "https://odstandards-directory.herokuapp.com/directory/api/" + match[i].category
					}
					$.getJSON("https://odstandards-directory.herokuapp.com/directory/api/get/" + match[i].id, function(standards) {
						allStandards.push(buildStandard(match[i]));
						$("#standards").html(allStandards);
						$(".search-title").html("<h2>Search results for: " + input + "</strong>") 
						$(".standard-body").hide();
						$(".directory-results").show();
						$('.no-results').hide();
						$(".directory-items").show();
						clickStandard()
						clickLink(url)
					});
				});
			} else {
				console.log("NO")
				$('.directory-items').hide();
				$('.no-results').show();
				$(".no-results").html("<h2>No search results for " + input + "</h2>");
				$(".standard-body").hide();
				$(".directory-results").show();	
				$(".standards-container").hide();
			}

			$("#sortby").change(function() {
				$("#standards").html("");
				console.log(sortby(allStandards));
				$("#standards").html(sortby(allStandards));
				$(".standard-body").hide();
				clickStandard()
				clickLink(url)
			});
		}
	});
}
