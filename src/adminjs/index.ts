import AdminJs from "adminjs"
import AdminJsExpress from "@adminjs/express"
import AdminJsSequelize from "@adminjs/sequelize"
import { sequelize } from "../database"
import { adminJsResources } from "./resources"
import bcrypt from 'bcrypt'
import { locale } from './locale'
import { Category, Course, Episode, User } from '../models'

AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
    databases: [sequelize],
    resources: adminJsResources,
    rootPath: "/admin",
    dashboard: {
        component: AdminJs.bundle('./components/Dashboard'),
        handler: async (req, res, context) => {
            const courses = await Course.count()
            const episodes = await Episode.count()
            const category = await Category.count()
            const standardUsers = await User.count({ where: { role: 'user' } })

            res.json({
                'Cursos': courses,
                'Episódios': episodes,
                'Categorias': category,
                'Usuários': standardUsers
            })
        },
    },
    locale: locale,
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