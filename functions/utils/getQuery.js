module.exports = (rawQuery) =>
{
	let q = rawQuery.split("=")
	return q[1];
}