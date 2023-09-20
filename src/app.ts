import Fastify from "fastify";
import crypto from "crypto"
import { User, UserService } from "./modules/user/user.service";
import { AppError } from "./error/app.error";



const app = Fastify();
const userService = new UserService();


app.get("/users", (request, reply) => {
    try {
        const users = userService.findAll();
        return users;

    } catch (err) {
        reply.code(400).send({ error: err })
    }
})

app.post('/users', (request, reply) => {
    const authorizarion = request.headers[
        'authorization'
    ]

    if (!authorizarion) {
        reply.code(401).send()
    }

    try {
        const users = userService.create(request.body as User);
        return users;

    } catch (err) {
        console.log("Erro")
        reply.code(400).send()
    }
})


app.setErrorHandler((err, request, reply) => {
    if (err instanceof AppError) {
        reply.code((err.statusCode)).send(err.message)
    }
    reply.code(500).send()
})

export { app }