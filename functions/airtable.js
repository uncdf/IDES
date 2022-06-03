require('dotenv').config();

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_SECRET }).base(process.env.AIRTABLE_BASE);


module.exports = (year) =>{
	return base(year);
}