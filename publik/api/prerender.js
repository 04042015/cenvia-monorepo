export default async function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";
  const fullUrl = `${req.protocol || "https"}://${req.headers.host}${req.url}`;
  const isBot = /(googlebot|bingbot|yandex|baidu|duckduckbot|slurp|facebookexternalhit|twitterbot)/i.test(userAgent);

  if (isBot) {
    const prerenderUrl = `https://service.prerender.io/${fullUrl}`;
    const response = await fetch(prerenderUrl, {
      headers: {
        "X-Prerender-Token": "1oXfJ0LpK7I2SuohmnHq"
      }
    });
    const html = await response.text();
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } else {
    res.status(200).send("OK (Non-bot visitor)");
  }
}
