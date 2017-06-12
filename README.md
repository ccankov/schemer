# Schemer
## Background

[Live Link][live-link]

Constructing a SQL database requires both an intimate knowledge of the SQL domain specific language and a pre-planned Schema.

[Schemer][live-link] is a database design tool that allows for database design and generation on the fly. The interactive visual interface lets you setup tables, column validations, and one-to-many and many-to-many relationships directly by dragging and selecting elements in the editor. Once you have designed your next
database, Schemer exports a .sql file with a script that sets up your schema.

Schemer is built with a Vue.js frontend, an Express/Node.js backend, and MongoDB

[live-link]:https://schemer.herokuapp.com

## Features

### Interactive Visual Editor
### Table and Column Creation and Editing
### Drag-and-Drop Link Creation
### SQL Generation and Exporting

## Technologies
 * [Vue.js]()/[Vuex]() for frontend view rendering and state management
 * [JointJS]() for the interactive diagramming interface
 * [Express]()/[Node.js]() for the backend RESTful API
    * [Passport.js]() is used for secure authentication
 * MongoDB for storing user, session and database information

## Design and Development
Schemer was conceived, designed, and built in a week by [Brady Kimball](https://github.com/brady-kimabll), [Chris Cankov](https://github.com/ccankov) and [Nikita Shalimov](https://github.com/ndshal). View the original [Project Proposal](docs/README.md) or contact us for more details.

## Future Directions
####  
