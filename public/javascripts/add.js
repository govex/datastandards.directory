function postAdd() {
	console.log("This did not work")
	// setup some local variables
	var $form = $(".add-standard");
				
	// Let's select and cache all the fields
	var $inputs = $form.find("name, category, description, license, updated, version, stage_in_development, documentation, website, contact, example, publisher, publisher_reputation, number_of_consumers, consumers, number_of_apps, apps, open, transferability, transferability_rationale, stakeholder_participation, stakeholder_participation_rationale, consensus_government, consensus_government_rationale, extensions, extensions_indicators, machine_readable, machine_readable_rationale, human_readable, human_readable_rationale, requires_realtime, requires_realtime_rationale, metadata, metadata_rationale, recorded, verified");

	// Serialize the data in the form
	var serializedData = $form.serialize();
			
	// Let's disable the inputs for the duration of the Ajax request.
	// Note: we disable elements AFTER the form data has been serialized.
	// Disabled form elements will not be serialized.
	$inputs.prop("disabled", true);

	console.log(serializedData)
	
	request = $.ajax({
				type: "POST",
				url: "./contribute/api/create-standard",
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
