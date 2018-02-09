function sortby(allStandards){
	var selection = document.getElementById('sortby').value; // get the value of the sort option

	// function that stores the enough that is necessary to effectively sort the standards
	function dateInfo(id, date){
		this.id = id;
		this.date = date;
	}
	function providersInfo(id, count){
		this.id = id;
		this.count = count;
	}
	function matchInfo(id, tagMatch){
		this.id = id;
		this.tagMatch = tagMatch;
	}

	if (selection == "consumers"){
		return sortProviders(selection, allStandards);
	}
	else if (selection == "relevance"){
		return facetedSearch(allStandards)
	}
	else {
		return sort(selection, allStandards);
	}

	function facetedSearch(allStandards){
		var parameters = $("#filter-parameters").attr('value').split(',');
		console.log(parameters);
		var id = "",
			matchArr = [],
			sortedMatches = [],
			output = [];

		for (var i in allStandards){ // run through all standards
			id = $(allStandards[i]).find('.standard').attr('value'); // store the id of each standard
			var stanTags = [];
			var tagCont = $(allStandards[i]).find('.standard-tags');
			$(tagCont).find('.tag').each(function(){
				stanTags.push($(this).attr('value').toLowerCase());
			});
			// metric name is pushed into array only if 'yes'
			// cross-referenced with paramter array for matching metric name
			var stanMetrics = [];
			var metricsCont = $(allStandards[i]).find('.metrics');
			$(metricsCont).find('a').each(function(){
				var metric = $(this).attr('id');
				var value = $(this).attr('type');
				if(typeof value === 'string'){
					value = value.toLowerCase();
				}
				if(value == 'yes'){
					stanMetrics.push(metric);
				}
			});
			console.log(stanMetrics)
			var tagMatch = 0;
			for (toMatch in parameters){
				if(stanTags.includes(parameters[toMatch])){
					tagMatch += 1;
				}
				if(stanMetrics.includes(parameters[toMatch])){
					tagMatch += 1;
				}
			}
			var matchObject = new matchInfo(id, tagMatch);
			matchArr.push(matchObject);
		}
		sortedMatches = sortByMatch(matchArr)
		console.log(sortedMatches);
		for(var i in sortedMatches){
			for(var j in allStandards){
				if ($(allStandards[j]).find('.standard').attr('value') == sortedMatches[i].id){
					output.push(allStandards[j]);
				}
			}
		}
		return output;
	}

	function sortByMatch(matchArr){
	  matchArr.sort(function(a,b){return b.tagMatch - a.tagMatch});
	  return matchArr;
	}

	function sortProviders(selection, allStandards){
		var count = 0,
			id = "",
			allCountInfo = "",
			allCounts = [],
			sortedCounts = [],
			output = [];

		for (var i in allStandards){
			count = $(allStandards[i]).find('#providers').attr('count');
			id = $(allStandards[i]).find('.standards').attr('id'); // store the id of each standard
			allCountInfo = new providersInfo(id, count); // build an object that stores the date and id for each standard
			allCounts.push(allCountInfo); // push the object into an array for now
		}
		sortedCounts = allCounts.sort(function(a,b){return b.count-a.count}); //sorts by count value

		for (i in sortedCounts){
			for (j in allStandards){
				if ($(allStandards[j]).find('#providers').attr('count') == sortedCounts[i].count && $(allStandards[j]).find('.standards').attr('id') == sortedCounts[i].id) {
					output.push(allStandards[j]);
				}
			}
		}
		return output;
	}

	// this function sorts the data according to the standards and the date sort option
	function sort(selection, allStandards){
		// set up all the variables
		var date = "",
			id = "",
			allDateInfo = "",
			allDates = [],
			sortedDates = [],
			output = [];

		for (var i in allStandards){ // run through all standards
			if (selection == "new" || selection == "old"){
				date = $(allStandards[i]).find('#updated').attr('value'); // store the updated date of each standard
			} else {
				date = $(allStandards[i]).find('#added').attr('value'); // store the added date of each standard
			}
			id = $(allStandards[i]).find('.standard').attr('id'); // store the id of each standard
			allDateInfo = new dateInfo(id, date); // build an object that stores the date and id for each standard
			allDates.push(allDateInfo); // push the object into an array for now
		}

		sortedDates = sortDates(allDates); // sort the dates

		// for each date (each standard) order the standards by matching each standard's date to the orderd sortedDates variable
		for (var i in sortedDates){
			for (var j in allStandards){
				if (selection == "new" || selection == "old"){
					if ($(allStandards[j]).find('#updated').attr('value') == sortedDates[i].date && $(allStandards[j]).find('.standards').attr('id') == sortedDates[i].id) {
						output.push(allStandards[j]);
					}
				} else {
					if ($(allStandards[j]).find('#added').attr('value') == sortedDates[i].date && $(allStandards[j]).find('.standards').attr('id') == sortedDates[i].id) {
						output.push(allStandards[j]);
					}
				}
			}
		}
		return output;
	}

	// function sorts the dates in the correct order
	function sortDates(allDates){
		if (selection == "new" || selection == "updated") {
			allDates.sort(function(a,b){return new Date(b.date) - new Date(a.date)}); // sorts the dates into ascending order
		}
		if (selection == "old") {
			allDates.sort(function(a,b){return new Date(a.date) - new Date(b.date)}); // sorts the dates into descending order
		}
		return allDates;
	}
};
