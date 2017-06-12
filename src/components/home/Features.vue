<template>
  <section class='features'>
    <h2> Features </h2>
    <ul class='feature-list'>
      <li>
        <i class='fa fa-check'></i>
        <div>
          <h4>Interactive Visual Editor</h4>
          <p>Drag and arrange tables to design a visual schema in a way that makes sense to you</p>
        </div>
      </li>
      <li>
        <i class='fa fa-check'></i>
        <div>
          <h4>Table and Column Creation and Editing</h4>
          <p>Dynamically edit table names, set data types and add custom constaints to your columns </p>
        </div>
      </li>
      <li>
        <i class='fa fa-check'></i>
        <div>
          <h4>Drag-and-Drop Link Creation</h4>
          <p>Interactively connect columns with Links to setup one-to-one, one-to-many, and many-to-many relationships in fast and intuive way. We even generate all the join tables for you!</p>
        </div>
      </li>
      <li>
        <i class='fa fa-check'></i>
        <div>
          <h4>SQL Generation and Exporting</h4>
          <p>We process the structure of your database and automatically generate SQL code to create it. Getting a .sql file to generate your databse is as easy as hitting the download button.</p>
          <p> At the moment, we support the following SQL implementations: PostgreSQL, Access, mySQL, SQL Server and Oracle.</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';
  .features {
    padding: 0 70px 0 40px;
    text-align: left;

    h2 {
      font-size: 26px;
      text-align: center;
    }
  }

  .feature-list {
    padding: 0;
    margin: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .feature-list li {
    padding: 0;
    margin: 0;

    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    i {
      color: $accent;
      margin-right: 30px;
      font-size: 40px;
    }

    div {
      flex-grow: 1;
      border-bottom: 1px solid $gray
    }
  }

  h2, h4 {
    font-family: $heading;
  }

  h4 {
    font-size: 20px;
  }

  p {
    font-family: $paragraph;
  }

  span {
    font-family: $code;
  }
</style>
