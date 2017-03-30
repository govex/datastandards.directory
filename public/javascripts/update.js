function postUpdate(form){
	var standard = document.getElementById("input37").value; // input value of standard name in the update form on contribute.html
	var comment = document.getElementById("input38").value; // input value of comment in the update/comment form on contribute.html and contact.html
	var url = window.location.href // stores the url the client has entered
	console.log(url)
	if (url.indexOf("contribute") >= 0 && comment == ""){
		var website = document.getElementById("input8").value;
	}
	console.log(standard)
	console.log(comment)
	console.log(website)
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
		// Let's select and cache all the fields
		var $inputs = form.find("client_name, email, standard, comment, timestamp");
		console.log($inputs)
		// Serialize the data in the form
		var serializedData = form.serialize();
				
		// Let's disable the inputs for the duration of the Ajax request.
		// Note: we disable elements AFTER the form data has been serialized.
		// Disabled form elements will not be serialized.
		$inputs.prop("disabled", true);

		console.log(serializedData)
		
		request = $.ajax({
					type: "POST",
					url: "./contribute/api/post",
					data: serializedData,
					success: console.log("success")
				});
								
		// Callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			// Log a message to the console
			console.log("Hooray, it worked!");
			$(".success").show();
		});

		// Callback handler that will be called on error
		request.fail(function (jqXHR, textStatus, errorThrown){
			$(".error").show();
			$(".error").html("We apologize, our server is currently not working. Please try again.");
			// Log the error to the console
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});

		// Callback handler that will be called regardless if the request failed or succeeded
		request.always(function () {
			// Reenable the inputs
			$inputs.prop("disabled", false);
		});
		
		// Prevent default posting of form
		event.preventDefault();	
	}
}
