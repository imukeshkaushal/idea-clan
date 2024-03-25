# Idea Clan Book Management

## Overview
This is a Node.js application with a GraphQL API integrated with MongoDB. It manages "Books" and "Users" entities and includes authentication features, allowing users to register, login, and logout securely. Additionally, it implements a new feature for book management, allowing users to browse, search, borrow, buy, and request books.


## Books Management System
- CRUD operations for books (Create, Read, Update, Delete) by roles.
- Browsing and searching available books for users. Borrowing or buying books for users.
- User-to-user book borrowing requests (optional).


### Deployment Link
https://idea-clan-ez9v.onrender.com/graphql


## Installation
-  Clone this repository to your local machine:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   npm install
   npm start
## User Management
- User registration, login with JWT authentication.
- Role-based access control (admin and regular user).

## Technology Used
  - Node.js
  - Express
  - GraphQL
  - MongoDb
  - Mongoose
  - JWT (Authentication)

## Users Functionallity

### Register a User
User can Create a Account and Regiser Successfully by using this query. Please see below screenshot
```
mutation RegisterUser{
  register(username:"Ravi",email:"rohit@gmail.com",password:"12345"){
    user{
      username
      email
    }
    token
  }  
}

```

![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/f9cd6a02-2130-4114-b1e8-49970da04933)


### All Register User
If you want to check all the users then follow this command
```
query{
  users{
    _id
    username
    email
    password
    booksOwned {
      title
      author
      owner
    }
  }
}
```

![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/99d58f54-7a30-49ce-b1fb-fd9ed5c8b14b)


### Login User 
User can easily Login by this mutation
```
mutation{
  login(email : "ravi@gmail.com", password : "12345"){
    token
    __typename
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/3c528107-3b60-4c1c-9921-c75d464897ba)


### Updating & deleting a User
You can easily Update and Delte the User
```
mutation{
  updateUser(id:"65fff6317c9409ab46125673", username : "Kamlesh", email : "mohan@gmail.com"){
    _id
    username
    email
    password
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/331f2f5d-0f64-4817-8ba9-8e56d4df4a6f)



## Books Management System

### Adding a Book
User can add the book
```
mutation {
  addBook(title: "Jeevan Ek Khoj", author: "Trilok Chand Chabra") {
    _id
    title
    author
		owner
    available
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/d478a574-c94c-41df-a574-e715a9deaa73)


### Getting All the Books
You can find out all the books that should be added by the user
```
query{
  books{
    _id
    title
    author
    owner
    available
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/f7051c71-9763-4f06-b67f-2f97fb7b9b91)

### Getting the Single Book By Their Id
You can get the single books by using their ID
```
query{
  book(id:"66015f08f6d0fd15bafb0b09"){
    _id
    title
   author
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/657f03b8-db3d-4250-adc1-8d5e4b98ceee)

### Updating the Book
You can easily Update the Book Easily
```
mutation{
  updateBook(id: "66015f08f6d0fd15bafb0b09", title: "The Real Story", author: "Mukesh Kaushal") {
    _id
    title
    author
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/b89987ec-961f-447a-9e89-2ccfa87d541f)

### Deleting the Book
User Can easily delete the book using their respective id
```
 mutation {
  deleteBook(id: "66015f08f6d0fd15bafb0b09") {
    _id
    title
    author
  }
}
```
![image](https://github.com/imukeshkaushal/idea-clan/assets/97522154/9e6e74fb-893e-4098-bbf4-b6bf63918d11)



