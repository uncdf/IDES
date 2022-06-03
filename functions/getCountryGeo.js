const { table } = require('./airtable');
const formattedData = require('./utils/formattedData')

exports.handler = async (event) =>
{
	try
	{
		const countries = await table.select({
			fields: ["Country", "CountryCode", "geo", "Flag"],
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
		return formattedData(500, {
			'message': "Something went wrong", 'error': e
		})
	}
}