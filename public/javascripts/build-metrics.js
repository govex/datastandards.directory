function buildMetrics (metric) { 
	var metrics = []; // This empty array will store all the metric icons
	if (metric.open == "Yes") { // Generally-speaking: if metric === Yes, then output this icon, else if metric === No, then output this other icon, etc... 
		var open = '<a data-toggle="tooltip" title="Open License" style="color: white"><button type="button" id="metric" style="color:white; background-color: #909294;"><i id="metricIcon" class="fa fa-unlock" aria-hidden="true"></i></button></a>';
		metrics.push(open); // This pushes/stores this metric icon into the metrics array
	} else if (metric.open == "No"){
		var open = '<a data-toggle="tooltip" title="Open License" style="color: white"><button type="button" id="metric" style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-unlock" aria-hidden="true"></i></button></a>';
		metrics.push(open); 
	} else {
		var open = '<a data-toggle="tooltip" title="Open License" style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-unlock" aria-hidden="true"></i></button></a>';
		metrics.push(open)
	}
	if (metric.transferability == "Yes"){
		var trans = '<a data-toggle="tooltip" title="Transferable to Other Jurisdictions: ' + metric.transferability_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-exchange" aria-hidden="true"></i></button></a>';
		metrics.push(trans);
	} else if (metric.transferability == "No"){
		var trans = '<a data-toggle="tooltip" title="Transferable to Other Jurisdictions: ' + metric.transferability_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-exchange" aria-hidden="true"></i></button></a>';
		metrics.push(trans);
	} else {
		var trans = '<a data-toggle="tooltip" title="Transferable to Other Jurisdictions: ' + metric.transferability_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-exchange" aria-hidden="true"></i></button></a>';
		metrics.push(trans);
	}
	if (metric.human_readable == "Yes"){
		var human = '<a data-toggle="tooltip" title="Human Readable: ' + metric.human_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-eye" aria-hidden="true"></i></button></a>';
		metrics.push(human);
	} else if (metric.human_readable == "No"){
		var human = '<a data-toggle="tooltip" title="Human Readable: ' + metric.human_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-eye" aria-hidden="true"></i></button></a>';
		metrics.push(human);
	} else {
		var human = '<a data-toggle="tooltip" title="Human Readable: ' + metric.human_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-eye" aria-hidden="true"></i></button></a>';
		metrics.push(human);
	}
	if (metric.machine_readable == "Yes"){
		var machine = '<a data-toggle="tooltip" title="Machine Readable: ' + metric.machine_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-desktop" aria-hidden="true"></i></button></a>';
		metrics.push(machine);
	} else if (metric.machine_readable == "No"){
		var machine = '<a data-toggle="tooltip" title="Machine Readable: ' + metric.machine_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-desktop" aria-hidden="true"></i></button></a>';
		metrics.push(machine);
	} else {
		var machine = '<a data-toggle="tooltip" title="Machine Readable: ' + metric.machine_readable_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-desktop" aria-hidden="true"></i></button></a>';
		metrics.push(machine);
	}
	if (metric.requires_realtime == "Yes"){
		var time = '<a data-toggle="tooltip" title="Requires Up-To-Date Data: ' + metric.requires_realtime_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-clock-o" aria-hidden="true"></i></button></a>';
		metrics.push(time);
	} else if (metric.requires_realtime == "No"){
		var time = '<a data-toggle="tooltip" title="Requires Up-To-Date Data: ' + metric.requires_realtime_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-clock-o" aria-hidden="true"></i></button></a>';
		metrics.push(time);
	} else {
		var time = '<a data-toggle="tooltip" title="Requires Up-To-Date Data: ' + metric.requires_realtime_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-clock-o" aria-hidden="true"></i></button></a>';
		metrics.push(time);
	}
	if (metric.stakePart == "Yes"){
		var stakePart = '<a data-toggle="tooltip" title="Stakeholder Participation: ' + metric.stakeholder_participation_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-group" aria-hidden="true"></i></button></a>';
		metrics.push(stakePart);
	} else if (metric.stakePart == "No"){
		var stakePart = '<a data-toggle="tooltip" title="Stakeholder Participation: ' + metric.stakeholder_participation_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-group" aria-hidden="true"></i></button></a>';
		metrics.push(stakePart);
	} else {
		var stakePart = '<a data-toggle="tooltip" title="Stakeholder Participation: ' + metric.stakeholder_participation_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-group" aria-hidden="true"></i></button></a>';
		metrics.push(stakePart);
	}
	if (metric.consensus_government == "Yes"){
		var conGov = '<a data-toggle="tooltip" title="Consensus-Based Governance: ' + metric.consensus_government_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-thumbs-up" aria-hidden="true"></i></button></a>';
		metrics.push(conGov);
	} else if (metric.consensus_government == "No"){
		var conGov = '<a data-toggle="tooltip" title="Consensus-Based Governance: ' + metric.consensus_government_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-thumbs-up" aria-hidden="true"></i></button></a>';
		metrics.push(conGov);
	} else {
		var conGov = '<a data-toggle="tooltip" title="Consensus-Based Governance: ' + metric.consensus_government_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-thumbs-up" aria-hidden="true"></i></button></a>';
		metrics.push(conGov);
	}
	if (metric.extensions == "Yes"){
		var ext = '<a data-toggle="tooltip" title="Extensions: ' + metric.extensions_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-external-link" aria-hidden="true"></i></button></a>';
		metrics.push(ext);
	} else if (metric.extensions == "No"){
		var ext = '<a data-toggle="tooltip" title="Extensions: ' + metric.extensions_rationale + '" style="color: white"><button type="button" id="metric" style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-external-link" aria-hidden="true"></i></button></a>';
		metrics.push(ext);
	} else {
		var ext = '<a data-toggle="tooltip" title="Extensions: ' + metric.extensions_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-external-link" aria-hidden="true"></i></button></a>';
		metrics.push(ext);
	}
	if (metric.metadata == "Yes"){
		var meta = '<a data-toggle="tooltip" title="Takes into Account Associated Metadata for the Dataset: ' + metric.metadata_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #909294"><i id="metricIcon" class="fa fa-file" aria-hidden="true"></i></button></a>';
		metrics.push(meta);
	} else if (metric.metadata == "No"){
		var meta = '<a data-toggle="tooltip" title="Takes into Account Associated Metadata for the Dataset: ' + metric.metadata_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #707274"><i id="metricIcon" class="fa fa-file" aria-hidden="true"></i></button></a>';
		metrics.push(meta);
	} else {
		var meta = '<a data-toggle="tooltip" title="Takes into Account Associated Metadata for the Dataset: ' + metric.metadata_rationale + '" style="color: white"><button type="button" id="metric"  style="color:white; background-color: #37393B"><i id="metricIcon" class="fa fa-file" aria-hidden="true"></i></button></a>';
		metrics.push(meta);
	}
	// IF ADDED NEW METRIC: add a new if/else if/else statement. Follow the same structure, but make sure to change the title, the metric icon, and the metric's rationale 
	var metricsJoined = metrics.join("  "); // Combines the metrics together by removing the commas from the array the icons are stored in
	return metricsJoined; // What will be returned when the function is called
};

function buildMetricsLegend () {
	var legendMetrics = [
		'<a class="tooltipStyle" data-toggle="tooltip" title="Open License: What qualifies a standard as being “open” is debated. However, openness may be inferred when the standard is published under an open license. Open licenses iterate that anyone has the right to repurpose and share the material without restriction. Examples of open licenses include public domain licenses, the UK Open Government License v3, creative commons licenses, and open data common licenses (World Bank, Open Data Essentials)." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-unlock" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Transferable to Other Jurisdictions: There is a hierarchy regarding the ease of implementation for a standard. For example, CSV format of a standard requires a minimal degree of resources and technical knowledge. On the other hand, more complex and sophisticated ways of formatting standards, such as RDF and SOAP, are not as easy for municipal bodies to implement. More often than not, sophisticated formats tend not to be manageable for municipal actors that lack resources and technical background. Standards that handle dynamic data and cURL APIs exemplify more complex ways of publishing city datasets." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-exchange" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Human Readable: Human readable requires a medium of data or information that can easily be understood by people. Therefore, the standard should encode the data by using easily identifiable text. Of course, there are semantic consideration for human readable standards. For example, there could be a variety of interpretive meanings associated with encoding the data through text." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-eye" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Machine Readable: Acceptable machine readable structures include XML, RSS feed, CSV, RDF, JSON, TXT, XLS(X), and KML formats. Formats that are not machine readable include PDF, HTML, DOC(X), anything scanned, anything faxed, and anything typed in an email (Suszan, 2014). Standard’s ought to compliment techniques to provide human and machine readable structures for the data. Publishing data as machine readable includes (1) established standard vocabularies, (2) enriching the HTML resources with metadata, semantics, and identifiers, (3) and implementing simple, manageable, and stable URIs (Bennett and Harvey, 2009). Data tables, according to the standard’s specification, should be normalized so to be incorporated into a relational database." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-desktop" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Requires Up-To-Date Data: This metric varies depending on the domain of the data. Some domains require formats that handle data in real time. However, other domains may require that the standard specify that data be updated quarterly or annually. For example, standards that handle transit and road construction data would require a web feed format to deliver updates about developments as they occur. However, budget datasets only requires a quarterly or yearly update. In practice, many municipal publishers still publish data in static files."><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-clock-o" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Stakeholder Participation: Stakeholders for a standard include civil society, government, and the private sector. An open standard should aim to include all types of stakeholders in its conception and maintenance. Types of stakeholder participation can be inferred based on the types of publisher reputations." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-group" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Consensus-Based Governance: Standardization implies an ongoing dialogue between producers and consumers of data. It is important to note that consensus-based governance does not mean that all inputs are accepted if the majority agrees. Instead, consensus-based indicates a process willing to address any request pertaining to the standard’s statement of purpose.  A charter providing transparency of decisions about the standard’s evolution support a consensus-based approach. Consensus-based governance can be inferred by the presence of a mailing list or active working group for the standard." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Extensions: This indicates the flexibility of a standard’s implementation. Extensibility of a standard provides insight into how a standard is being implemented and enhanced for specific purposes." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-external-link" aria-hidden="true"></i></button></a>',
		'<a class="tooltipStyle" data-toggle="tooltip" title="Takes into Account Associated Metadata for the Dataset: This metric checks whether the standard schema requires metadata. A “yes” for this metric indicates a presence of both descriptive and structural metadata for the primary data. Each standard should readily make available the time and date of the data’s creation, the author, location of the data on the computer networks, and information about any standard applied to the raw data. Metadata should have embedded permanent and/or discoverable URIs and should utilize electronic citations of the data in the form of hyperlinks (Bennett and Harvey, 2009)." style="color: white"><button type="button" id="metric" style="color:white; background-color: #37393B"><i class="fa fa-file" aria-hidden="true"></i></button></a>'
	];
	return legendMetrics;
}