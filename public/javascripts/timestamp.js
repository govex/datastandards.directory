function timestamp() {
	var recorded = document.getElementById("timestamp").value // create variable to store the date
	var date = new Date(); // get the current date
	var month = date.getMonth() + 1; // get the current month
	var year = date.getFullYear(); // get the current full year
	var day = date.getDate(); // get the day
	// Creates current date in the same format as the rest of the dates in the database
	if (String(day).length < 2){
		recorded = month + "/" + day + "/" + year;
	} else if (String(month).length < 2) {
		recorded = month + "/" + day + "/" + year;
	} else {
		recorded = month + "/" + day + "/" + year;
	}
	document.getElementById("timestamp").value = recorded; // update the timestamp to this reformatted date
}
