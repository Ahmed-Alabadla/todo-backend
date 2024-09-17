<a href="https://github.com/Ahmed-Alabadla/todo-backend"> <h1 align="center">TODO</h1></a>

## About

TODO project.

## Tech Stack

    Frontend:
        React.js
        Tailwind CSS
        Ant Design

    Backend:
        Node.js
        Express.js
        MongoDB

    Authentication:
        JWT (JSON Web Token)
        


## Prerequisites

Before cloning and running this React project, make sure you have the following prerequisites installed on your system:

- Node.js: Make sure you have Node.js installed. You can download it from the [official Node.js website](https://nodejs.org).


## Installation

> **Warning**
> Make sure to follow the requirements first.

Here is how you can run the project locally:
1. Clone this repo
    ```sh
    git clone https://github.com/Ahmed-Alabadla/todo-backend
    ```

1. Go into the project root directory
    ```sh
    cd todo-backend
    ```
    
1. Create `.env` file 
    ```sh
    JWT_SECRET=""
    ATLAS_URI=""
    PORT="8000"
    ``` 

1. Install the project dependencies, run the following command:
    ```sh
    npm install
    ```
1. Start the development server, use the following command:

    ```sh
    npx nodemon index.js
    ```
    or 

    ```bash
    node index.js
    ```


### Usage
You can access the following endpoints on http://localhost:8000/api

- - -

#### Authentication

- - -

| Method      | Path |   
| ---        |    ----   |  
| post   | /register       | 
| post   | /login       | 
| get   | /logout        |
| put   | /change-password        |
| put   | /change-name        |

- - -

#### User

- - -

| Method      | Path |    
| ---        |    ----   | 
| get      | /users     |
| delete   | /user       | 

- - -

#### Tasks

- - -

| Method      | Path |    
| ---        |    ----   | 
| post      | /tasks   |
| get   | /tasks      | 
|put  | /tasks/:taskId |   
|delete  | /tasks/:taskId |   
 
 - - -


This will start the development server on `http://localhost:8000/`. This should reload automatically when you make changes to the code, but no code is perfect, so sometimes you may need to restart it. :)

