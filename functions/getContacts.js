const airtable = require("./airtable");
const formattedData = require("./utils/formattedData");
exports.handler = async (event, callback) => {
  let table = airtable("contacts");
  try {
    const contacts = await table
      .select({
        sort: [{ field: "name" }],
      })
      .firstPage();
    const formattedBody = contacts.map((i) => ({
      name:i.fields.name,
      contactPerson:i.fields.contact_person,
      email:i.fields.email,
      type:i.fields.type
    }));

    return formattedData(200, formattedBody);
  } catch (e) {
    return formattedData(404, { message: "Something Went wrong" });
  }
};
