function postUpdate(form){
				
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
				url: "http://localhost:3000/contribute/api/post",
				data: serializedData,
				success: console.log("success")
			});
							
	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		// Log a message to the console
		console.log("Hooray, it worked!");
		$(".success").show();
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		$(".failure").show();
		$(".failure").html("We apologize, our server is currently not working. Please try again.");
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