// this function runs after a client submits/posts a statement to update an existing standard. The statement is posted to the post table in the postgres database
function postUpdate(form){
	var standard = document.getElementById("input37").value; // input value of standard name in the update form on contribute.html
	var comment = document.getElementById("input38").value; // input value of comment in the update/comment form on contribute.html and contact.html
	var url = window.location.href // stores the url the client has entered

	// if either the standard, website or comment is blank run an error popup telling the client that they must enter this information
	if (standard == "" || website == "" || comment == "") {
		$(".error").show();
			if (url.indexOf("contribute")  >= 0){
				$(".error").html("Sorry, but you have not provided us with enough information. Please provide the name of the standard and what needs to be updated then submit your contribution. Thank you.");
			}
			if (url.indexOf("contact") >= 0){
				$(".error").html("Sorry, but you have not provided us with enough information. Please provide your email and your comment then submit your contribution. Thank you.");
			}
		$("#input37").parent("p").addClass("highlight");
		$("#input38").parent("p").addClass("highlight");
	} else {			
		var $inputs = form.find("client_name, email, standard, comment, timestamp"); // find all the inputs	
		var serializedData = form.serialize(); // serialize the data
		$inputs.prop("disabled", true); // disable the inputs for the duration of the Ajax request
		
		// create ajax call to post the serialized data to the route (url)
		request = $.ajax({
					type: "POST",
					url: "./contribute/api/post",
					data: serializedData,
					success: console.log("success")
				});
								
		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			$(".success").show();
		});

		// callback handler that will be called on error
		request.fail(function (jqXHR, textStatus, errorThrown){
			$(".error").show();
			$(".error").html("We apologize, our server is currently not working. Please try again.");
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});

		// callback handler that will be called regardless if the request failed or succeeded
		request.always(function () {
			$inputs.prop("disabled", false); // reenable the inputs
		});
		
		event.preventDefault();	// prevent default posting of form
	}
}
