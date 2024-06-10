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
  console.log(req);
  // 클라이언트가 요청한 데이터를 JSON 형식으로 응답
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
