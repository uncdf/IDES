const airtable = require('./airtable');
const formattedData = require('./utils/formattedData')
const getQuery = require('./utils/getQuery');
const getYear = require('./utils/getYear')

exports.handler = async (event) =>
{
	const id = getQuery(event.rawQuery).split("&");
	const year = getYear(event.rawQuery)
	const table = airtable(year)
	try
	{
		const countries = await table.find(id[0]);
		return formattedData(200, countries);
	} catch (e)
	{
		return formattedData(500, {
			'message': "Something went wrong 🤦", year
		})
	}
}