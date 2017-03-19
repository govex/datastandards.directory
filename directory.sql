DROP DATABASE IF EXISTS inventory;
CREATE DATABASE inventory;

\c inventory;
 
SET client_encoding = 'UTF8';

CREATE TABLE standards (
	id TEXT,
	name TEXT,
	category TEXT,
	description TEXT,
	license TEXT,
	updated TEXT,
	version TEXT,
	stage_in_development TEXT,
	documentation TEXT,
	websie TEXT,
	contact TEXT,
	example TEXT, 
	publisher TEXT,
	publisher_reputation TEXT,
	number_of_consumers TEXT,
	consumers TEXT,
	number_of_apps TEXT,
	apps TEXT,
	open TEXT,
	transferability TEXT,
	transferability_rationale TEXT,
	stakeholder_participation TEXT,
	stakeholder_participation_rationale TEXT,
	consensus_government TEXT,
	consensus_government_rationale TEXT,
	extensions TEXT,
	extensions_indicators TEXT,
	machine_readable TEXT,
	machine_readable_rationale TEXT,
	human_readable TEXT,
	human_readable_rationale TEXT,
	requires_realtime TEXT,
	requires_realtime_rationale TEXT,
	metadata TEXT,
	metadata_rationale TEXT,
	recorded TEXT,
	verified TEXT
);

COPY standards FROM 'C:/Users/Julia/Desktop/odstandards_mvpsite/odstandards_inventory.csv' DELIMITER ',' CSV HEADER;