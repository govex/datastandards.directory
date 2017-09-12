// this function runs after a client submits/posts an unverified new standard to the standards table in the postgres database
function postAdd() {
	var standard = document.getElementById("input0").value; // get the standard's name
	var website = document.getElementById("input8").value; // get the standard's website

	if (standard == "" || website == "") { // if either of these are empty
		$(".error").show(); // show the error popup
		$(".error").html("Sorry, but you have not provided us with enough information. Please provide the name and website of the standard and then submit your contribution. Thank you.");
		$("form").children('p').not('.shortform').not(this).not('.metadata').hide();
		$("#input0").parent("p").addClass("highlight"); // highlight the input that should be entered
		$("#input8").parent("p").addClass("highlight"); // highlight the input that should be entered
	} else {
		var $form = $(".add-standard"); // create variable for the add form
		// find all the inputs
		var $inputs = $form.find("id, name, email, category, subcategory, description, license, updated, version, stage_in_development, documentation, website, contact, example, publisher, publisher_reputation, consumers, apps, open, transferability, transferability_rationale, stakeholder_participation, stakeholder_participation_rationale, consensus_government, consensus_government_rationale, extensions, extensions_indicators, machine_readable, machine_readable_rationale, human_readable, human_readable_rationale, requires_realtime, requires_realtime_rationale, metadata, metadata_rationale, recorded, verified");
		var serializedData = $form.serialize(); // serialize the data in the form
		console.log(serializedData);
		$inputs.prop("disabled", true); // disable the inputs for the duration of the Ajax request

		// create ajax call to post the serialized data to the route (url)
		request = $.ajax({
					type: "POST",
					url: location.origin + "/api/add",
					data: serializedData,
					complete: function(text){console.log(text.responseText)}
				});
		console.log(request);

		// callback handler that will be called on success
		request.done(function (response, textStatus, jqXHR){
			$(".success").show();
			$(".success").html("Thank you for your contribution. We will validate and release your contribution within 7 days.");
			console.log(jqXHR);
		});

		// callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			$(".error").show();
			$(".error").html("We apologize, our server is currently not working. Please try again.");
			// log the error to the console
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
