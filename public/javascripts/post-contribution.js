$(function(){

	// the selector will match all input controls of type :checkbox
	// and attach a click event handler 
	$("input:checkbox").on('click', function() {
	  // in the handler, 'this' refers to the box clicked on
	  var $box = $(this);
	  if ($box.is(":checked")) {
	    // the name of the box is retrieved using the .attr() method
	    // as it is assumed and expected to be immutable
	    var group = "input:checkbox[name='" + $box.attr("name") + "']";
	    // the checked state of the group/box on the other hand will change
	    // and the current value is retrieved using .prop() method
	    $(group).prop("checked", false);
	    $box.prop("checked", true);
	  } else {
	    $box.prop("checked", false);
	  }
	});

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
		$(".success").hide();
		$(".error").hide();

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