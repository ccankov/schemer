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
At the core of Schemer is a visual editor built around the [JointJS](https://www.jointjs.com/) diagramming library.
A typical editor view consists of tables, each embedded with column information. Tables are connected to other tables via links, representing the relational structure of a SQL database. Tables are draggable, allowing you to visually setup you schema in a way that makes sense to you.

### Table and Column Creation and Editing
To the left of the main editor is a menu that displays the current structure of the database and allows for editing of different elements. The top portion of the menu is a tree view of the current schema, with a list of tables and the columns in each of those tables.

Clicking on a particular element, either in the tr in the editor highlights in the edit panel on the left side of the page. This edit panel


### Drag-and-Drop Link Creation
### SQL Generation and Exporting

## Technologies
 * [Vue.js](https://vuejs.org/)/[Vuex](https://vuex.vuejs.org/) for frontend view rendering and state management
 * [JointJS](https://www.jointjs.com/) for the interactive diagramming interface
 * [Express](https://expressjs.com)/[Node.js](https://nodejs.org) for the backend RESTful API
    * [Passport.js](https://passportjs.org) is used for secure authentication
 * [MongoDB](https://mongodb.com) for storing user, session and database information

## Design and Development
Schemer was conceived, designed, and built in a week by [Brady Kimball](https://github.com/brady-kimabll), [Chris Cankov](https://github.com/ccankov) and [Nikita Shalimov](https://github.com/ndshal). View the original [Project Proposal](docs/README.md) or contact us for more details.

## Future Directions
####  
