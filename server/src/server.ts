// 코드를 작성할 로직은 대부분 src 폴더에서 작성

// 미들웨어는 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어

import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get("/", (_,res) => res.send("running"));

let port = 4000; // 백엔드 포트번호
app.listen(port, async () => {
    console.log("server running at http://localhost:${port}");


    AppDataSource.initialize().then( () => {
        console.log("database initialized")
    }).catch(error => console.log(error))


    
})