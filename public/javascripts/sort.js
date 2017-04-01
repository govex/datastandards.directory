function sortby(allStandards){
	var selection;
	selection = document.getElementById('sortby').value;

	function dateInfo(id, date){
		this.id = id;
		this.date = date;
	}

	return sort(selection, allStandards);

	function sort(selection, allStandards){
		var date = "",
			id = "",
			allDateInfo = "",
			allDates = [],
			sortedDates = [],
			output = [];

		if (selection == "new" || selection == "old") {
			for (var i in allStandards){
				date = $(allStandards[i]).find('#updated').attr('value');
				id = $(allStandards[i]).find('.standards').attr('id');
				allDateInfo = new dateInfo(id, date);
				allDates.push(allDateInfo);
			}
			sortedDates = sortDates(allDates);
			for (var i in sortedDates){
				for (var j in allStandards){
					if ($(allStandards[j]).find('#updated').attr('value') == sortedDates[i].date && $(allStandards[j]).find('.standards').attr('id') == sortedDates[i].id) {
						output.push(allStandards[j]);
					}
				}
			}
		}

		if (selection == "updated") {
			for (var i in allStandards){
				date = $(allStandards[i]).find('#added').attr('value');
				id = $(allStandards[i]).find('.standards').attr('id');
				allDateInfo = new dateInfo(id, date);
				allDates.push(allDateInfo);
			}
			sortedDates = sortDates(allDates);
			for (var i in sortedDates){
				for (var j in allStandards){
					if ($(allStandards[j]).find('#added').attr('value') == sortedDates[i].date && $(allStandards[j]).find('.standards').attr('id') == sortedDates[i].id) {
						output.push(allStandards[j]);
					}
				}
			}
		}
		console.log(output)
		return output;
	}

	function sortDates(allDates){
		if (selection == "new" || selection == "updated") {
			allDates.sort(function(a,b){return new Date(b.date) - new Date(a.date)}); // sorts the dates into ascending order
		}

		if (selection == "old") {
			allDates.sort(function(a,b){return new Date(a.date) - new Date(b.date)});
		} 

		return allDates;
	}
};