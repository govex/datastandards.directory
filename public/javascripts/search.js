// This function is run when a user enters their search
$(function(){
	$('#search').on('keyup', function(e){
		if(e.keyCode === 13) {
			var parameters = $('#search').val(); // stores the search result
			buildDirectory(parameters)
		}
	});

	$('.search-button').on('click', function(e){
		var parameters = $('#search').val(); // stores the search result
		buildDirectory(parameters)
	});
});
