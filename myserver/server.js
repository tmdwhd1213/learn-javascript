const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// CORS 미들웨어 추가
app.use(cors());
// JSON 파싱을 위한 미들웨어 추가
app.use(express.json());

app.get("/users", (req, res) => {
  // 클라이언트에서 받은 데이터 (문자열)
  console.log(req.query);
  // 클라이언트가 요청한 데이터를 JSON 형식으로 응답
  res.json({
    tours: [
      {
        region: "usa",
        location: "New York, USA",
        details: "$1,899 for 7 nights",
      },
      {
        region: "europe",
        location: "Paris, France",
        details: "$2,299 for 7 nights",
      },
      {
        region: "asia",
        location: "Tokyo, Japan",
        details: "$3,799 for 7 nights",
      },
    ],
  });
});

app.post("/users", (req, res) => {
  console.log(req.query);
  console.log("hi");
  res.json([{ asd: "asd" }]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
