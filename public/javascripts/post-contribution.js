// this function runs for any form submission
$(function(){

	// code that prevents a client from selecting more than one checkbox on a submission form
	$("input:checkbox").on('click', function() {
	  var $box = $(this);
	  if ($box.is(":checked")) {
	    var group = "input:checkbox[name='" + $box.attr("name") + "']";
	    $(group).prop("checked", false);
	    $box.prop("checked", true);
	  } else {
	    $box.prop("checked", false);
	  }
	});

	var request;
	var recorded = document.getElementById("input33").value;
	var date = new Date();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDate();

	// creates current date in the correct format
	if (String(day).length < 2){
		recorded = month + "/" + day + "/" + year;
	} else if (String(month).length < 2) {
		recorded = month + "/" + day + "/" + year;
	} else {
		recorded = month + "/" + day + "/" + year;
	}

	document.getElementById("input33").value = recorded;
	document.getElementById("timestamp").value = recorded;

	// when the user clicks the submit button, the following will occur
	$("button.submit").click(function(event){
		$(".success").hide();
		$(".error").hide();

		var postType = $(".submit").val();

		if (request) {
			request.abort();
		}

		// if user submits the add form
		if(postType == "add"){
			postAdd(); // run the function that will serialize the inputs and post them to the db
		}

		// if user submits the update form
		if(postType == "update"){
			var form = $(".update-standard"); // run the function that will serialize the inputs and post them to the db
			postUpdate(form);
		}
	});
});
