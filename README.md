# Schemer
## Background

[Live Link][live-link]

Constructing a SQL database requires both an intimate knowledge of the SQL domain specific language and a pre-planned Schema.

[Schemer][live-link] is a database design tool that allows for database design and generation on the fly. The interactive visual interface lets you setup tables, column validations, and one-to-many and many-to-many relationships directly by dragging and selecting elements in the editor. Once you have designed your next
database, Schemer exports a .sql file with a script that sets up your schema.

Schemer is built with a Vue.js frontend, an Express/Node.js backend, and MongoDB

[live-link]:http://schemer.me

## Features

### Interactive Visual Editor
At the core of Schemer is a visual editor built around the [JointJS](https://www.jointjs.com/) diagramming library.
A typical editor view consists of tables, each embedded with column information. Tables are connected to other tables via links, representing the relational structure of a SQL database. Tables are draggable, allowing you to visually setup you schema in a way that makes sense to you.

### Table and Column Creation and Editing
To the left of the main editor is a menu that displays the current structure of the database and allows for editing of different elements. The top portion of the menu is a tree view of the current schema, with a list of tables and the columns in each of those tables.

Clicking on a particular element, either in the editor or in the tree view brings up an edit panel at the bottom of the menu. For tables, this panel allows you to rename the table, and displays general information about the name - the number of columns, and the total number of relations (links). For columns, this panel allows you to edit the name and data type, as well as setup up basic validations (e.g. the entries in the column are required to be unique.)

Combining the editor with the menu gives a dynamic edit experience, while not cluttering the visual schema with
hover menus or other effects.

![Table and Column Editing in Schemer](docs/demos/schemer_edit_demo.gif)

### Drag-and-Drop Link Creation
When designing the schema for a SQL database by hand, relationships between tables are defined with foreign key columns, which hold references to other tables. In the case of one-to-many relationships, labeling a column as a foreign key is enough. However, in the case of many-to-many relationships, a join table must be constructed.

In Schemer, we abstract this away with the concept of Links. Every column has ports, which can be clicked to create a two-sided arrow. Then, simply connect this arrow to another column, and a relationship between the two columns is automatically setup.

As an example, consider connecting a `user_id` column in a `posts` table to the `id` column of a `users` table. Because the `id` column is a primary key, it is necessarily unique, and this is a one-to-many relationship: 'a user has many posts'. The created Link will display this - the `users` end will be labeled with a '1' and the `posts` end with a '\*'.

The Link structure also supports self-joins - given only a `users` table, creating a Link between the `id` column and itself will create a self-join table and a many-to-many relationship. The Link is labeled with two '\*'s, and, in the SQL code, we create a join table with `user_id1` and `user_id2`, modeling, for example, a 'friends' relationship.

![Dynamic Link Creation in Schemer](docs/demos/schemer_link_demo.gif)

### SQL Generation and Exporting
As you add tables, columns and links to your visual schema, the corresponding SQL code is updated live. A 'SQL Preview' panel is available at the bottom of the editor, and can be pinned to the page. Schemer processes the content of the editor and generates a SQL script that will create the database. Since syntax varies slightly between SQL implementations, a dropdown menu on the SQL Preview panel allows you to choose the particular language that the code is generated in. At the moment, we support PostgreSQL, Access, mySQL, SQL Server and Oracle.

Once you are done designing your visual schema, hit the download button and you will be prompted to download a .sql file with your database code.

![SQL Generation and Exporting](docs/demos/schemer_sql_demo.gif)

## Technologies
 * [Vue.js](https://vuejs.org/)/[Vuex](https://vuex.vuejs.org/) for frontend view rendering and state management
 * [JointJS](https://www.jointjs.com/) for the interactive diagramming interface
 * [Express](https://expressjs.com)/[Node.js](https://nodejs.org) for the backend RESTful API
    * [Passport.js](https://passportjs.org) is used for secure authentication
 * [MongoDB](https://mongodb.com) for storing user, session and database information

## Design and Development
Schemer was conceived, designed, and built in a week by [Brady Kimball](https://github.com/brady-kimabll), [Chris Cankov](https://github.com/ccankov) and [Nikita Shalimov](https://github.com/ndshal). View the original [Project Proposal](docs/README.md) or contact us for more details.

## Future Directions
Some future ideas for Schemer include:
  * An instruction panel, with more info on one-to-many and many-to-many relationships when creating links
  * Instead of raw SQL, generate an ActiveRecord migration to create a database in Rails
  * Generate SQL queries that edit a database, (e.g. drop tables, insert columns), not just create one
  * Use the same visual UI to generate queries on an existing database
