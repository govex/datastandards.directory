// this function builds the content that appears in each .standards-container in directory.html
function buildStandard(selectedStandard, link){
	var metric = buildMetrics(selectedStandard); // create the metrics for the standard 
	standard = "";
	standard += "<div class='standards-container'><div id='" + selectedStandard.id + "' class='standards'>";
	standard += "<div class='standard-header'>";
	standard += "<div class='standard-name'><strong>" + selectedStandard.name + "</strong><i id='copy-link' class='fa fa-link link' aria-hidden='true' title='Copy link to share'></i><div class='copy-link' title='" + link + "'></div></div>";
	standard += "<div class='standard-info'>";
	standard += "<div class='metrics'>" + metric[1] + "  <a href='/about#legend-metrics' target='_blank' data-toggle='tooltip' title='Click to our methodology'><i class='fa fa-question-circle' aria-hidden='true'></i></a></div>"; // add metrics
	standard += "<div class='standard-items'>Updated: <div id='updated' value='" + createDates(selectedStandard.updated) + "'>" + selectedStandard.updated + "</div> | Added: <div id='added' value='" + createDates(selectedStandard.recorded) + "'>" + selectedStandard.recorded + "</div> | Version: <div id='version'>" + selectedStandard.version + "</div></div>";
	standard += "</div>";
	standard += "<p class='standard-description'>" + selectedStandard.description + "</p>";
	standard += "<a class='hide-show'><i class='fa fa-minus-circle'></i> Details</a></div>";
	standard += "<ul class ='standard-body'>";
	standard += "<li><strong>License: </strong>" + selectedStandard.license + "</li>";
	standard += "<li><strong>Publisher: </strong>" + selectedStandard.publisher + "</li>";
	standard += "<li><strong>Consumers: </strong>" + selectedStandard.consumers + "</li>";
	standard += "<li>" + metric[0][1] + " " + "<strong>Transferability to Other Stakeholders: </strong>" + selectedStandard.transferability_rationale + "</li>";
	standard += "<li>" + metric[0][2] + " " + "<strong>Stakeholder Participation: </strong>" + selectedStandard.stakeholder_participation_rationale + "</li>";
	standard += "<li>" + metric[0][3] + " " + "<strong>Consensus-based Governance: </strong>" + selectedStandard.consensus_government_rationale + "</li>";
	standard += "<li>" + metric[0][4] + " " + "<strong>Extensions: </strong>" + selectedStandard.extensions_indicators + "</li>";
	standard += "<li>" + metric[0][5] + " " + "<strong>Machine Readable: </strong>" + selectedStandard.machine_readable_rationale + "</li>";
	standard += "<li>" + metric[0][6] + " " + "<strong>Human Readable: </strong>" + selectedStandard.human_readable_rationale + "</li>";
	standard += "<li>" + metric[0][7] + " " + "<strong>Requires up-to-date Data: </strong>" + selectedStandard.requires_realtime_rationale + "</li>";
	standard += "<li>" + metric[0][8] + " " + "<strong>Metadata: </strong>" + selectedStandard.metadata_rationale + "</li>";					
	standard += "</ul></div>";
	standard += "<div class='standard-links'>";
	standard += "<a href='" + selectedStandard.website + "' target='_blank'><button>Web Site</button></a>";
	standard += "<a href='" + selectedStandard.contact + "' target='_blank'><button>Contact</button></a>";
	standard += "<a href='" + selectedStandard.example + "' target='_blank'><button>Example</button></a>";
	standard += "<a href='/contribute' target='_blank'><button>Update Standard</button></a></div></div>";
	return standard;
}

// this function reorders the date into the correct format for the sortby() function
function createDates(date){
	var parts = [];
	parts = date.split("-");
	var dt = new Date(parseInt(parts[2], 10),
	                  parseInt(parts[0], 10) - 1,
	                  parseInt(parts[1], 10));
	return dt
}
