const airtable = require('./airtable');
const formattedData = require('./utils/formattedData')
const getQuery = require('./utils/getQuery')
exports.handler = async (event, callback) =>
{
	let query = getQuery(event.rawQuery);
	let table = airtable(query)
	console.log(query)
	try
	{
		const countries = await table.select({
			sort: [{ field: "Country", direction: "asc" }]
		}).firstPage();
		const formattedBody = countries.map((country) =>
		({
			id: country.id,
			fields: country.fields
		}))

		return formattedData(200, formattedBody);

	} catch (e)
	{
		return formattedData(404, { message: "Something Went wrong" });
	}
}