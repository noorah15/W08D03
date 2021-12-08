# to do task backend

## Task description:

In this task, it has been created the to-do that enables user to add, update and remove his/her tasks. In addition, it has an admin that has permissions to add, update and remove tasks from any user.

## UML

![UML_W08D03 img](https://github.com/noorah15/W08D03/blob/main/UML_W08D03.png)

## Entity Relationship Diagram:

![ERD_W08D03.drawio img](https://github.com/noorah15/W08D03/blob/main/ERD_W08D03.drawio.png)

## How did it work

In this task, it has been created backend with Express server.

In command write:

    npm init -y

It has been import these packages:
express:
The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

In command write:
npm i express

For more information visit:
https://www.npmjs.com/package/express

- dotenv:
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

  In command write:

        npm i dotenv

  For more information visit:
  https://www.npmjs.com/package/dotenv

- jsonwebtoken:

  JSON Web Tokens (JWT) are an RFC 7519 open industry standard for representing claims between two parties. For example, you can use jwt.io to decode, verify, and produce JWT.
  JWT specifies a compact and self-contained method for communicating information as a JSON object between two parties. Because it is signed, this information can be checked and trusted. JWTs can be signed using a secret (using the HMAC algorithm) or an RSA or ECDSA public/private key combination. In a moment, we’ll see some examples of how to use them.

  In command write:

        npm i jsonwebtoken

  For more information visit:
  https://www.npmjs.com/package/jsonwebtoken

- bcrypt:

  The bcrypt NPM package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string. Unlike encryption which you can decode to get back the original password, hashing is a one-way function that can’t be reversed once done.

  When the user submits a password, the password will be hashed and your JavaScript application needs to store the hash in the database. Later when the user wants to authenticate his or her account, you need to compare the password input with the hash stored in your database to see if it matches.

  In command write:

        npm i bcrypt

  For more information visit:
  https://www.npmjs.com/package/bcrypt

- mongoose:

  Mongoose is a Node.js-based Object Data Modeling (ODM) library for MongoDB. It is akin to an Object Relational Mapper (ORM) such as SQLAlchemy for traditional SQL databases. The problem that Mongoose aims to solve is allowing developers to enforce a specific schema at the application layer. In addition to enforcing a schema, Mongoose also offers a variety of hooks, model validation, and other features aimed at making it easier to work with MongoDB.

  In command write:

        npm i mongoose

  For more information visit:
  https://www.npmjs.com/package/mongoose

## models:

- user

        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        isDel: { type: Boolean, default: false },
        role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },

- role

        role: { type: String, required: true, trim: true },
        permissions: { type: Array, required: true },

- task

        name: { type: String, required: true, trim: true },
        isDel: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

## routers:

### controllers:

- user:

  register:

  Create signup function. It has been use bcrypt.hash() from bcrypt package to hashing password. The main benefit is security.

  login:

  Create signup function. It has been use bcrypt.compare() from bcrypt package to hashing password. The main benefit is convert passoword that etered to hash password to compare it with password in DB.
  The jwt.sign() method takes a payload and the secret key defined in .env as parameters.It creates a unique string of characters representing the payload. In our case, the payload is an object containing the id of the user and its role.

  getUsers:

  Create function to return all users.

  delUser:

  Create function to delete specific user. The deletion is soft delete.

- role:

  addRole:

  It is function that add role such as admin and user.

  getRoles:

  It is function that get all roles in DB.

- task:

  todos:

  It is function that get all tasks in DB.

  todo:

  It is function that get task in DB.

  todosDel:

  It is function that delete tasks in DB.

  todoUpdate:

  It is function that update task in DB.

  todoDel:

  It is function that delete task in DB.

  create:

  It is function that create tasks in DB.

## routes:

- user:

        userRouter.post("/signup", register); //localhost:4000/signup
        userRouter.post("/login", login); //localhost:4000/login

        //for admin
        userRouter.get("/users", authentication, authorization, getUsers); //localhost:4000/users
        userRouter.delete("/delUsers", authentication, authorization, delUser); //localhost:4000/delUsers

- role

        roleRouter.post("/addRole", addRole); //localhost:4000/addRole
        roleRouter.get("/getRoles", getRoles); //localhost:4000/getRoles

- task

        taskRouter.get("/todos/:id", todos); //localhost:4000/task/todos/:id
        taskRouter.get("/todo", todo); //localhost:4000/task/todo
        taskRouter.delete("/todosDel/:id", todosDel); //localhost:4000/task/todosDel/:id
        taskRouter.put("/todoUpdate", todoUpdate); //localhost:4000/task/todoUpdate
        taskRouter.delete("/todoDel", todoDel); //localhost:4000/task/todoDel
        taskRouter.post("/create", create); //localhost:4000/task/create

## middlewares:

- authentication:
  uthentication is the process of determining whether someone or something is, in fact, who or what it says it is. Authentication technology provides access control for systems by checking to see if a user's credentials match the credentials in a database of authorized users or in a data authentication server. In doing this, authentication assures secure systems, secure processes and enterprise information security.

- authorization:
  Authorization is a security mechanism to determine access levels or user/client privileges related to system resources including files, services, computer programs, data and application features. This is the process of granting or denying access to a network resource which allows the user access to various resources based on the user's identity.
  Confirm the user has access permission and its role is admin.
