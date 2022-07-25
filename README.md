# Advanced Web, Java, JavaScript, Databases, and API Management Project

## Table of Contents
- Goals
- Specifications

  - Users and movies definitions
  - Movies definition and User ratings.

- Realization
  - Features
  - Implementation
  - Deliverables

# Goals
The aim of this project is to realize a real-world movie web application and setup the whole infrastructure.

This project involves 5 skills:
- Frontend development : The ability to develop a new application from scratch
- Backend development: Use Node and Java to provide REST APIs
- Database modeling and harnessing using MongoDB and PostgreSQL
- API Management System
- Application Deployment

# End to End Diagram
![image](https://user-images.githubusercontent.com/72979397/180874471-151b9583-3e1c-45e0-bf7c-d7900e9ce728.png)

# Specifications
To involve these skills, you will have to build an movie database application able to share movie titles
and their ratings by users. The application is divided in two sides, the user and movies definition on one side and the movies
ratings on the other side.

## Users and movies definitions
Users will be stored in the Relational Database. Each user has some privileges defined by a role. Movies also are defined in the database. Each movie can have an author, a
release date, a type. The information that a User has seen a movie is indicated in an association table. Each user definition has some administrative information attached,
defining a Contact. Each Contact has a billing address, a first name, last name, phone number and an email address. An address is composed of the Country, Area, City, Street
and Street number.

## Class Diagram of the entities
![image](https://user-images.githubusercontent.com/72979397/180875040-13a79565-e53a-4475-8804-62c339a80361.png)

## Movies definition and User ratings.
Associated to each movie, one can find a rating made by one user which is also containing a comment about the movie. The rating of each movie is stored within the NoSQL
database because the data can be of different form depending on the movie type. The format of the rating is also evolving a lot to take
more and different data over time. Each movie description is also in the NoSQL database.

A movie is defined by the following characteristics:

```json
{
  "title": "...",
  "releaseDate": "",
  "category": "",
  "movieDirector": ""
}
```

and the rating:

```json
{
  "rating" : "...",
  "commentTitle" : "...",
  "commentContent": "...",
  "userId": "..."
}
```

# Realization
## Features
The application should be able to implement the following scenario:
- user authentication
- welcome page with last seen films, new movies and recommendations
- play mock film
- rate film
- compute stats (10 most popular movies, 10 most viewed movies)

## Implementation
- At least 3 APIs using REST (at least one with node), that target the databases and make the
required data agregation for frontend presentation.

- At least 2 databases (relational db, and a document-based or a graph-based)
  - The relational will contain information about users and movies
  - The document-based will contain information about ratings
  - The graph-based will contain information about viewing graphs and recommandations
  - You have to use at least the relational database, and can choose between document or graph
    based database
- One React application to expose the features listed in previous section
- Bonus : setup an api gateway and authorization server

## Deliverables
- Technical documentation of the application
- Short video that shows your application running (backend and frontend)
- Your git repository for front and back ends
- Bonus: production guide (how to setup in a “real” environment)
