const airtable = require("./airtable");
const formattedData = require("./utils/formattedData");
exports.handler = async (event, callback) => {
  let table = airtable("reports");
  try {
    const reports = await table
      .select({
        sort: [{ field: "title" }],
      })
      .firstPage();
    const formattedBody = reports.map((i) => ({
      title: i.fields.title,
      link: i.fields.link,
      attachment: i.fields.image[0].url,
      country: i.fields.country
    }));

    return formattedData(200, formattedBody);
  } catch (e) {
    return formattedData(404, { message: "Something Went wrong" });
  }
};
