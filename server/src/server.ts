// 코드를 작성할 로직은 대부분 src 폴더에서 작성

// 미들웨어는 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어

import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from './routes/auth';
import cors from 'cors';

const app = express();

// server port: 4000, client port: 3000 이기 때문에 다른 포트에서 요청을 보내므로 cors 에러 발생
// 같은 곳에서 같은 곳으로 요청을 보내야 에러가 발생하지 않는다.
// 이를 해결하기 위해 cors 모듈을 사용해주면 된다. (server terminal: npm install cors --save)
const origin = "http://localhost:3000";
app.use(cors({
    origin
}))
app.use(express.json());
app.use(morgan('dev'));

app.get("/", (_,res) => res.send("running"));
app.use("/api/auth", authRoutes);

let port = 4000; // 백엔드 포트번호
app.listen(port, async () => {
    console.log("server running at http://localhost:${port}");


    AppDataSource.initialize().then( () => {
        console.log("database initialized")
    }).catch(error => console.log(error))


    
})