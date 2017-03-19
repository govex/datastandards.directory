$(function(){

	var request;

	var recorded = document.getElementById("input33").value
	var date = new Date();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDate();

	// Creates current date in the correct format 
	if (String(day).length < 2){
		recorded = month + "-0" + day + "-" + year;
	} else if (String(month).length < 2) {
		recorded = "0" + month + "-" + day + "-" + year;
	} else {
		recorded = month + "-" + day + "-" + year;
	}
	
	document.getElementById("input33").value = recorded;
	document.getElementById("timestamp").value = recorded;

	$("button.submit").click(function(event){
		
		var postType = $(".submit").val();
		console.log(postType)

		if (request) {
			request.abort();
		}

		if(postType == "add"){
			postAdd();
		}

		if(postType == "update"){
			var form = $(".update-standard");
			postUpdate(form);
		}			
	});
});