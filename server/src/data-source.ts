import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true, // 테이블 구조 및 컬럼 추가 같은 변경사항이 생길 때 싱크를 맞춰주는 부분 >> 개발 환경에서만 true 설정, 실제 환경에서는 false 설정 (위험 우려가 있음)
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: [],
    subscribers: [],
})