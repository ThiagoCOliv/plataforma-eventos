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
            userCreationResponse: {
                message: "User created successfully",
                token: "jwt_token"
            },
            userLogin: {
                email: "jhondoe@gmail.com",
                password: "password123",
            },
            userLoginResponse: {
                message: "Login successful",
                token: "jwt_token",
                user: {
                    name: "Jhon Doe"
                }
            },
            event:{
                title: "Show de talentos",
                description: "Um evento para mostrar os talentos da galera",
                date: "2025-10-01",
                time: "18:00",
                location: "São Paulo-SP",
                tag: "educacional",
                subscriptionsLimit: 500,
                image: "https://example.com/image.jpg",
            },
            eventCreationResponse:{
                message: "Event created successfully"
            },
            eventSubscription:{
                eventId: "uuid",
                companionsNumber: 3,
                name: "Jhon Doe",
                email: "jhondoe@gmail.com"
            },
            eventSubscriptionResponse:{
                message: "Subscribed to event successfully"
            },
            userValidation:{
                validationNumber: 12345678
            },
            userValidationResponse:{
                message: "Account validated successfully"
            },
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