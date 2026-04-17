export default async function handler(req, res) {
  const { q } = req.query;
  const response = await fetch(
    `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${q}`
  );
  const data = await response.json();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data);
}