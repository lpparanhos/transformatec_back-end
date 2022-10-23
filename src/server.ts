import express from "express";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from './routes'
import { sequelize } from "./database";

const app = express();

app.use(express.static('public'))

app.use(express.json())

app.use(router)

app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    sequelize.authenticate().then(() => console.log('DB connection successfully'));
    console.log(`Server started successfully at port ${PORT}`);
});