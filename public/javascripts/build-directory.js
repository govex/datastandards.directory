function buildDirectory(input) {
	// input will get results if it is a category or standard name
	$(".click-to-directory").hide();
	var allStandards = [];

	$.getJSON("./inventory/api/all-standards", function(standards) {
		$.each(standards.data, function(i) {
			if (standards.data[i].id == input || standards.data[i].category.toUpperCase() == input.toUpperCase() || standards.data[i].name.toUpperCase() == input.toUpperCase()) {
				if (standards.data[i].id == input) {
					var url = "https://odstandards-directory.herokuapp.com/directory/api/" + standards.data[i].id
				}
				if (standards.data[i].category.toUpperCase() == input.toUpperCase()){
					var url = "https://odstandards-directory.herokuapp.com/directory/api/" + standards.data[i].category
				}
				$.getJSON("./directory/api/get-request/" + standards.data[i].id, function(standards) {
					
					$.each(standards.data, function(i){
						allStandards.push(buildStandard(standards.data[i]));
					});

					if(allStandards[0].length > 0){
						$("#standards").html(allStandards);
						$("#sortby").change(function() {
							$("#standards").html("");
							$("#standards").html(sortby(allStandards));
							$(".standard-body").hide();
							clickStandard()
						});
					} 
					
					$(".search-title").html("<h2>Search results for: " + input + "</h2><strong>Shareable link: <a>" + url + "</a></strong>") 
					$('#legend-metrics').html(buildMetricsLegend());
					$(".standard-body").hide();
					$(".directory-results").show();
					$('.no-results').hide();
					$(".filters").show();
					clickStandard()
				})
			} else {
				$('.filters').hide();
				$('.no-results').show();
				$(".no-results").html("<h2>No search results for " + input + "</h2>");
				$('#legend-metrics').html(buildMetricsLegend());
				$(".standard-body").hide();
				$(".directory-results").show();	
				$(".standards-container").hide();
			}
		});
	})
}
