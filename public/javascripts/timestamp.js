function timestamp() {
	var recorded = document.getElementById("timestamp").value // create variable to store the date
	var date = new Date(); // get the current date
	date = date.toISOString();
	recorded = date.substring(0, 10);
	document.getElementById("timestamp").value = recorded; // update the timestamp to this reformatted date
}
