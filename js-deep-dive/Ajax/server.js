import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import { createProxyMiddleware } from "http-proxy-middleware";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 5001;
const jsonServerUrl = "http://localhost:5000";

// 현재 파일의 디렉토리 경로를 계산
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// 프록시 설정
app.use(
  "/proxy",
  createProxyMiddleware({
    target: "https://i.namu.wiki",
    changeOrigin: true,
    pathRewrite: {
      "^/proxy": "",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("Origin", "https://i.namu.wiki");
    },
  })
);

// 새로운 todo 추가
app.post("/todos", async (req, res) => {
  const newTodo = req.body;

  try {
    // json-server에서 기존 todos 가져오기
    const response = await fetch(`${jsonServerUrl}/todos`);
    const todos = await response.json();

    // 중복 확인
    const exists = todos.some((todo) => todo.content === newTodo.content);

    if (exists) {
      return res.status(409).json({ error: "Todo already exists" });
    }

    // 중복이 아니면 json-server에 새로운 todo 추가
    const addResponse = await fetch(`${jsonServerUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const addedTodo = await addResponse.json();
    res.status(201).json(addedTodo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// todo 목록 조회
app.get("/todos", async (req, res) => {
  try {
    // 쿼리스트링 파라미터를 추출하여 사용
    const response = await fetch(
      `${jsonServerUrl}/todos?${new URLSearchParams(req.query)}`
    );
    const todos = await response.json();
    res.json(todos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// todo 목록 수정 (PATCH)
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const fixTodo = req.body;

  try {
    // 쿼티스트링 파라미터를 추출하여 사용
    const response = await fetch(`${jsonServerUrl}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fixTodo),
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const updatedTodo = await response.json();
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// todo 목록 삭제 (DELETE)
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`${jsonServerUrl}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.statusText} - ${errorMessage}`);
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
