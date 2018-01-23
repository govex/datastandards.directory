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
	date = date.toISOString();
	recorded = date.substring(0, 10);
	document.getElementById("input33").value = recorded;

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
			var chillFeck = postAdd();
			if(chillFeck != 'error'){
				//Google form autofill
				var formURLbase = 'https://docs.google.com/forms/d/e/1FAIpQLSdT5XyCWPBsC7CSU4bs-vtKGrj_vLUi7Z2g4pnRcynAhwCUxw/formResponse';
				var nameURL = '?entry.1031090349=' + $("#input0").val();
				var emailURL = '&entry.939312954=' + $("#email").val();
				var websiteURL = '&entry.1738623814=' + $("#input8").val();
				var formURL = formURLbase + nameURL + websiteURL + emailURL + '&submit=Submit';
				console.log(formURL);
				window.open(formURL, '_blank');
			}
		}

		// if user submits the update form
		if(postType == "update"){
			var form = $(".update-standard"); // run the function that will serialize the inputs and post them to the db
			var fillCheck = postUpdate();
			if(fillCheck != 'error'){
				//Google form autofill
				var formURLbase = 'https://docs.google.com/forms/d/e/1FAIpQLScAvZj5HUFHZtcJ6SofF8CMtbVy0lkuDwYwQDNgUavDPY5Avw/formResponse';
				var nameURL = '?entry.1092914073=' + $("#input35").val();
				var emailURL = '&entry.679147926=' + $("#input36").val();
				var standardURL = '&entry.1888358654=' + $("#input37").val();
				var commentURL = '&entry.869466190=' + $("#input38").val();
				var providersURL = '&entry.1439856983=' + $("#input39").val();
				var examplesURL = '&entry.141248292=' + $("#input40").val();
				var formURL = formURLbase + nameURL + emailURL + standardURL + commentURL + providersURL + examplesURL + '&submit=Submit';
				console.log(formURL);
				window.open(formURL, '_blank');
			}
		}
	});
});
