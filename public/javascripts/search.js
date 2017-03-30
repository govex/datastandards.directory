// This function is run when a user enters their search
$(function(){
	$('#search').on('keyup', function(e){
		if(e.keyCode === 13) {
			var parameters = $('#search').val(); // stores the search result
			search(parameters);
		}
	});

	$('.search-button').on('click', function(e){
		var parameters = $('#search').val(); // stores the search result
		search(parameters);
	});

	function search(parameters){
		var selectedStandard = []; // array to store all the standards associated with the search result
		//document.getElementById("sortby").value = "";

		if (window.location.href.indexOf('/index') >= 0){ // if the page is on index.html
			(function (global) {
				global.localStorage.setItem("search-result", parameters); // store locally the search result
				redirect();
			}(window));
		}

		function redirect(){ // redirect user to the directory page
			window.location = "/directory";
		}

		if (window.location.href.indexOf('/directory') >= 0){ // if the page is now on the directory page
			(function (global) {
				console.log(global.localStorage.getItem("search-result")) 
				var selectedCategory = global.localStorage.getItem("search-result"); /// this locally stores the value of the category selected if the user clicks the category from index.html
				if (global.localStorage.getItem("search-result") !== null) { // if the selected category does not equal null
					$(".click-to-directory").hide(); // hide the click-to-directory
					$(".directory-results").show(); // show the standards that are associated with the category selected 
					localStorage.clear(); // clear local storage
					$(".standard-body").hide(); //hide the standard body full-text, just show the title of each standard and associated description
				}
			}(window));
     		
			buildDirectory(parameters)
		}
	}

});
