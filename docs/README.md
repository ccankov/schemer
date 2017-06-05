# Schemer Dev Readme / Project Proposal
## Background and Overview
Constructing a SQL database requires both an intimate knowledge of the SQL domain specific language and a pre-planned Schema.

Schemer is a database design tool that allows for database design and generation on the fly. The visual interface is interactive, and lets you setup tables, one-to-many and many-to-many relationships by simply dragging and dropping within the Schemer editor.

Schemer is built with a Vue frontend, an Node/Express backend, and MongoDB. (Dubbed by us as the **VENM** stack)

## Functionality and MVP
Schemer will, at minimum, be able to:
- [ ] Interactively create and edit tables in database
- [ ] Interactively create columns inside tables, be able to set data type and not NULL / unique / indexed attributes
- [ ] Setup one-to-many and many-to-many relationships between tables
- [ ] Dynamically parse graphical schema and generate SQL code.
- [ ] Autosave schema, render a 'user' page with a list of databases

In addition, Schemer will include
- [ ] A production README
- [ ] Secure Authentication (likely as an external package)

**Bonus Features**
- [ ] Generate SQL for editing a database, e.g. inserting / removing columns in the same interactive way
- [ ] Have an option to generate and ActiveRecord migration instead of raw SQL

## Technologies and Technical Challenges
**Backend: Node.js/Express [very tentative]**

**Frontend: Vue**

#### [Wireframes and Single Page App structure go here]

#### Frontend integration
On the frontend, Vue is integrated with JointJS, an open-source diagramming library developed by [Client.io](ttps://www.jointjs.com/opensource). We use the JointJS equivalent of canvas as its own component, and Vue for all other views. Using the JointJS API, we
export the schema state as JSON to be processed on the backend

#### Parsing JSON schema into SQL
???

## Accomplished over the Weekend
* Worked through several Vue tutorials
* Read through JointJS documentation, generated some simple diagrams
* Generated a 'proof of concept' [demo](https://schemer.herokuapp.com/#/home), which demonstates
  * Successful integration of Vue and JointJS
  * Successful conversion of graphical schema into JSON
* Hosted the frontend structure (Vue + Webpack) on Heroku: [Live Link](https://schemer.herokuapp.com)


## Group Members & Work Breakdown
**Nikita Shalimov, Brady Kimball, Chris Cankov**

#### Day 1
#### Day 2
#### Day 3
#### Day 4
#### Day 5
#### Day 6
