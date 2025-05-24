# Plataforma de Eventos

A **Plataforma de Eventos** é uma aplicação web desenvolvida com **Node.js** no backend e **Angular** no frontend, projetada para facilitar a criação, gerenciamento e participação em eventos. A aplicação oferece uma interface intuitiva para os usuários e uma API robusta para atender às necessidades do sistema.

> **Aviso**: Este projeto está sendo desenvolvido com fins educacionais e ainda está em fase de desenvolvimento. Algumas funcionalidades podem estar incompletas ou sujeitas a alterações.

## Funcionalidades

### Backend
- **Autenticação e Autorização**:
  - Registro de usuários com validação de e-mail.
  - Login com geração de tokens JWT.
  - Middleware para proteger rotas sensíveis.
- **Gerenciamento de Eventos**:
  - Criação, edição e exclusão de eventos.
  - Inscrição em eventos com limite de participantes.
- **Validação de Dados**:
  - Uso de `Joi` para validação de entradas.
- **Documentação da API**:
  - Documentação gerada automaticamente com Swagger.

### Frontend
- **Interface Responsiva**:
  - Design moderno e responsivo para diferentes dispositivos.
- **Autenticação**:
  - Login e registro de usuários com validação de formulários.
- **Gerenciamento de Eventos**:
  - Visualização de eventos disponíveis.
  - Inscrição em eventos diretamente pela interface.
- **Componentização**:
  - Uso de componentes reutilizáveis para maior modularidade.

## Tecnologias Utilizadas

### Backend
- **Node.js** e **Express**: Para criação da API.
- **Sequelize**: ORM para interação com o banco de dados.
- **MySQL**: Banco de dados relacional.
- **JWT**: Para autenticação segura.
- **Node-Cache**: Para cache de dados temporários.
- **Nodemailer**: Para envio de e-mails de validação.

### Frontend
- **Angular**: Framework para construção da interface do usuário.
- **SCSS**: Para estilização avançada.
- **RxJS**: Para manipulação de streams de dados.
- **Angular Router**: Para navegação entre páginas.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou relatar problemas.