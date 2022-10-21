import AdminJs from "adminjs"
import AdminJsExpress from "@adminjs/express"
import AdminJsSequelize from "@adminjs/sequelize"
import { database } from "../database"
import { adminJsResources } from "./resources"

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
    databases: [database],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: {
        companyName: 'TransformaTec',
        logo: '/logo-transforma-tec.svg',
        theme: {
            colors: {
                primary100: '#f06c28',
                primary80: '#f08c28',
                primary60: '#f05c28',
                primary40: '#f04c28',
                primary20: '#f07c28',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }

    }
})

export const adminJsRouter = AdminJsExpress.buildRouter(adminJs)