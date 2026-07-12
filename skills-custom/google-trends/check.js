const googleTrends = require("/mise/installs/node/22.23.1/lib/node_modules/google-trends-api");
const [,, keyword, geo] = process.argv;
googleTrends.interestOverTime({ keyword: keyword, geo: geo || "US" })
  .then(r => {
    const data = JSON.parse(r);
    const recent = data.default.timelineData.slice(-8);
    console.log(JSON.stringify(recent.map(d => ({ date: d.formattedAxisTime, value: d.value[0] }))));
  })
  .catch(e => console.error("Error:", e.message));
