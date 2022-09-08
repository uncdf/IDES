const airtable = require("./airtable");
const formattedData = require("./utils/formattedData");
exports.handler = async (event, callback) => {
  let table = airtable("years");
  try {
	const years = await table.select({
		sort:[{field: "year"}]
	}).firstPage();
	const formattedBody = years.map(i => i.fields.year);

    return formattedData(200, formattedBody);
  } catch (e) {
    return formattedData(404, { message: "Something Went wrong" });
  }
};
