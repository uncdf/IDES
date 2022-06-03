
module.exports = (statusCode,data) =>
{
	return {
		statusCode,
		body: JSON.stringify(data)
	};
}