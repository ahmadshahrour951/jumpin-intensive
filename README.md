# Jumpin - Intensive Spring 2021

The problem we face when we want to play sport games is...well...who do I play with?! In addition, when one wants to manage a game, i.e. confirm players, book a venue, etc. the process is bewildering. So we said why not create a platform that helps players find games around them AND simplifies the process of managing one.

The objective of this intensive project is to bring the idea to life by building an MVP. Something our early adopters (i.e. my friends lol) can taste and critique.

Enough chitchat, lets get to the code.

## The Tech Stack
- Backend Environment: **NodeJS v10.24.0**
- Relational Database: **PostgreSQL v13.2**
- ORM: **Sequelize v6.5.1**
- Template Engine: **HandlebarsJS v4.7.7**
- CSS Framework: **Bootstrap v5.0.0**

## The Architecture
The project will use the **server-side render** technique to develop as many features as possible from the available scope within the time limits. An **MVC architecture** is used to seperate concerns of logic, storage, and ui.
### Directory Structure
The project has the following directory structure:
```
      ├── bootstrap                       # Manually customize Bootstrap via style.scss
      ├── controllers                     # Route logic is handled
      ├── middlewares                     # Runs before controllers if used
      ├── models                          # The schema and Sequelize setup for db connection
      ├── routes                          # Registration of routes
      └── views                           # The actual HTML the user sees, with Handlebars logic
```

Controllers, middlewares, and routes could have been jubbled up together, but who would want spaghetti code right?
Middlewares are meant to protect and sanitize the requests coming through to the Controllers. The routes on the otherhand are meant to orchastrate middlewares and controllers... its where they get registered.

Within each of the main directories, you'll files named after three topics: Games, Users, and Auth like this:

```
      ├── controllers                     
                    └── auth.controller.js
                    └── game.controller.js
                    └── user.controller.js
      ├── middlewares                  
                    └── authentication.middleware.js                       # Are you allowed to access resources
                    └── authorization.middleware.js                       # Are you allowed to edit resources
      ├── models                          
                    └── game.model.js
                    └── user.model.js
                    └── index.js                       # Sequelize configuration to manage models and relations
      ├── routes                            
                    └── auth.route.js
                    └── game.route.js
                    └── user.route.js                     
                    └── index.js                       # Register all routes with different prefixes
      └── views                            
                    └── signup.hbs                       # Signup form page
                    └── login.hbs                       # Login form page
                    └── user-edit.hbs                       # Profile Page
                    └── games-index.hbs                       # Home Page (which displays the games)
                    └── game-create.hbs                       # Create game Page (After you press the + button from Home Page)
                    └── game-detail.hbs                       # Detail Page for a game after card click from Home Page)
                    └── game-edit.hbs                       # Update the game, only by the creator
                    └── error-404.hbs                       # When the user entered an invalid route
                    └── error.hbs                       # Handles any other errors in the code
``` 

The directories are divided by User, Game, and Auth is because each resource requires different level of santization and logic. For example, when authenticating a user, it has nothing to do with game logic (creation, etc.) EXCEPT for the token provided. The token is the only valuable thing to extract from authentication, this is so we can know WHO is entering our website. Let's discuss the models we created and their relationships

### Database Models
There are currently two models: **User** and **Game**

- **The User model** requires three ways of identification, either via `id`, `email`, or `username`. The `email` allows the platform to communicate with the user and verify if indeed the user is "real" and not a bot. The `username` allows other users to easily identify each other without expressing the email portion which can be sensitive, which induces a platform community.

- **The Game model** requires a `title`, `startsAt` and `endsAt` time. The `title` and `description `fields are used as a temporary data structures in order to learn how to display games to the user (it's more of a playground really). Start and end times are mandatory for **WHEN**, in addition, in the future, there will be a mandatory field for **WHERE** which would be the venues.

These two models are related in the following ways:
- A `User` can create itself via signup. The table in the database is called `users`
- A `Game` is created by a `User`. This is a **One-to-Many** relationship, because a game can only be created by one user, but one user can create many games. Therefore you'll find a foreign key in the `games` table in the database.
- A Game can have many participants (Users), and one User can participate in many games. This is a **Many-to-Many** relationship, therefore a mid table must be created which I called `user_games`, it only represents participation.

To generalize, there are three tables:
- `users`
- `games`
- `user_games`

And there have two relationships:
- One-to-Many: Game and User creator
- Many-to-Many: Game and User participant

## Roadmap
- **Error Handling** - Enhance sanitization, user side errors, server side errors and unforseen errors. These are crutial to get right to improve user experience. 
- **Session Authentication** - JWT is a great and easy way to manage authentication, however, no matter how hard you try, all authentication eventually is stateful. The reason being is that when you provide a token that has an expiry time, it is impossible to invalidate it if it were to be misused by a threat without the developer manually changing server secrets. This is not scalable or ideal. Therefore, it is required to "refresh" those tokens and save a list of rejected tokens in the database. Then comes the question if JWT is even worth using anymore as opposed to regular cookie sessions... let's see!
- **Passport Signup** - This is just so that there is less friction for signup and that platforms with social stands can help the user easily share games and signup via those platforms. 
- **Landing page** - This is to introduce the app to new comers and provide a professional experience.
- **Documentation** - for both internal and external is important. Internal is so that when we start onboarding or explaining the app, it becomes simple and exhaustive amounts of info. The app will follow the BDD dev cycle. Document, test, then code! The external part is to instigate procedures for 3rd party access, which can be users or in the far future for 3rd party revenue avenues.
- **Tests** - including unit, integration, and end-to-end tests. This includes and not limited to every part of the MVC architecture, from A - Z...
- **Admin portal** - to manage games and users if there are unforseen complications via the user's side. This portal also provide a safe zone for employees to extract/input data to improve the business side of the app.
- **Vendor portal** - to enable vendors to manage and provide available slots for games. This will create more structure and it will provide a direct relationship with the platform. 
- **RESTful & SPA Architecture** - to seperate even futher concerns of frontend and backend logic, and enhances the user experience by provided an app like feel in the website.
- **Mobile Application** - Via native language or by using a SPA sibling like React Native which compiles non native to native.
and so on...

## Contact
If you like the idea or just want to have chat, private message me on github or open a discussion on this repo!
