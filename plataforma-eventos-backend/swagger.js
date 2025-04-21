const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "Plataforma-eventos",
        description: "API para a plataforma de eventos Synera"
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        schemas: {
            user: {
                name: "Jhon Doe",
                email: "jhondoe@gmail.com",
                password: "password123",
                confirmPassword: "password123"
            },
            UserCreationResponse: {
                message: "User created successfully",
                status: 201,
                userCreated: {
                    id: 1,
                    name: "Jhon Doe",
                    email: "jhondoe@gmail.com",
                    password: "password123",
                    status: "pending",
                    createdAt: "2023-10-01T00:00:00.000Z",
                    updatedAt: "2023-10-01T00:00:00.000Z"
                }
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index');
});