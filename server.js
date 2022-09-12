const express = require("express");
const path = require("path");

const app = express();

// use middleware to serve the static directory
// whenever the path has forward '/static'(/static/js/index.js)
// we're going to serve static directory as per usual
// 요청 URL: http://localhost:5500/static/js/index.js
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// any routes, any path at all we;re goingto go back to the root
// it means no matter what path i send to the web server if we go to path or setting or whatever, they're all going to go back this index.html
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"))
})
// http:localhost:5500/... : 어떤 url로 가도 it takes me back to the same index.html => SPA 구현에 중요


app.listen(process.env.PORT || 5500, () => console.log('서버 연결'))