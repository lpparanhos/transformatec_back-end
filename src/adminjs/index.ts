import AdminJs from "adminjs"
import AdminJsExpress from "@adminjs/express"
import AdminJsSequelize from "@adminjs/sequelize"
import { sequelize } from "../database"
import { adminJsResources } from "./resources"
import { User } from '../models'
import bcrypt from 'bcrypt'

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
    databases: [sequelize],
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

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } })

        if (user && user.role === 'admin') {
            const matched = await bcrypt.compare(password, user.password)

            if (matched) {
                return user
            }
        }

        return false
    },
    cookiePassword: 'senha-do-cookie'
}, null, {
    resave: false,
    saveUninitialized: false
})