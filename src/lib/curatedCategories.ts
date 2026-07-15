/**
 * Curated "high-value" categories for the homepage grid. These preserve the
 * legacy symbology (one PNG each) and are intentionally decoupled from the 11
 * data categories — each links into a search of the directory. "Real-Time
 * Transit" maps to transit.png per the original.
 */
export interface CuratedCategory {
	label: string;
	image: string;
	definition: string;
	/** Search query the card deep-links to on /standards. */
	query: string;
}

export const CURATED_CATEGORIES: CuratedCategory[] = [
	{
		label: 'Annual Budget',
		image: '/images/annual_budget.png',
		definition: 'Municipal budgets that plan for expenditure',
		query: 'budget'
	},
	{
		label: 'Building Permits',
		image: '/images/building_permits.png',
		definition: 'Municipal permits for construction',
		query: 'building permits'
	},
	{
		label: 'Crime Statistics',
		image: '/images/crime_statistics.png',
		definition: 'Municipal crime data, such as police responses',
		query: 'crime'
	},
	{
		label: 'Election Results',
		image: '/images/election_results.png',
		definition: 'Municipal major election results by constituency/district',
		query: 'election'
	},
	{
		label: 'Expenditure',
		image: '/images/expenditure.png',
		definition: 'Municipal records of past spendings',
		query: 'expenditure'
	},
	{
		label: 'Public Facilities',
		image: '/images/public_facilities.png',
		definition: 'Municipal public amenities, such as schools or parks and their locations',
		query: 'public facilities'
	},
	{
		label: 'Real-Time Transit',
		image: '/images/transit.png',
		definition: "Transit services' real-time information, such as a bus's live location",
		query: 'transit'
	},
	{
		label: 'Road Construction',
		image: '/images/road_construction.png',
		definition: 'Municipal current and planned road construction',
		query: 'road'
	},
	{
		label: 'Service Requests',
		image: '/images/service_requests.png',
		definition: 'Non-emergency service requests, such as graffiti removal',
		query: 'service requests'
	},
	{
		label: 'Zoning',
		image: '/images/zoning.png',
		definition: 'Municipal specifications on what development is allowed on a parcel of land',
		query: 'zoning'
	}
];
