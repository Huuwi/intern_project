# INTERN_PROJECT <hr>

## 📌 Prerequirements

Before you begin, ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## 📚 Table of Contents

- [Introduction](#introduction)
- [Feature ](#feature)
- [Installation and Run](#installation-and-run)
- [How it work](#how-it-work)
- [API Overview](#api-overview)

## Introduction

This is a CMS project as part of a fullstack internship. It focuses on core fullstack skills such as API design, authentication, error handling, database interaction, and deployment via Docker.

## Feature

The objective of this project is to demonstrate backend development proficiency, including:

- Understanding of REST principles
- Role-based authentication and secure login
- Page searching , page pagition
- API design with clear structure and error handling
- Database interaction
- Containerization using Docker

## Installation and Run

You can run this project using Docker. Follow these steps:

```bash
# Clone the repository
git clone https://github.com/Huuwi/intern_project
cd intern_project

# Start the service and watch log
docker-compose up 
```
- Access: http://localhost:5173 to use this app.
- Access: http://localhost:1337/docs to view the API documentation.
## How it work
### Docker&Database Setup : 
- A **Dockerfile** is created to build the backend service.
- **docker-compose** is used to orchestrate the **MongoDB** , **backend** and **vite-react** services.
- A file named **init.js** (for creating collections and inserting sample documents) is placed in /docker-entrypoint-initdb.d/.
> This file is automatically executed the first time Docker builds the services.
>> Inserted two samples for two roles : username = password = "admin" (admin) and username = password = "user1" (user)
### Backend RESTful API : 
- Built with **Sails.js** for the backend server.
- Uses **JWT** and **cookie-parser** middleware for authentication and authorization (supports two roles: **admin** and **user**).
- Page searching , page pagition
- Data is stored in a **MongoDB** database.
- **API documentation** is provided using **swagger-ui-express** and **yamljs** with .**yaml** configuration.



## API Overview
> 📘 Visit http://localhost:1337/docs after starting the project to explore the full API documentation.
