<template>
  <section class='about'>
    <h1>About Us</h1>
    <section class='article-container'>
      <article class="card">
        <div class="row">
          <figcaption class="bio">
            <header class="bio-header">
              <h3>Nikita Shalimov</h3>
            </header>
            <section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </section>
            <footer>
              <a href="https://github.com/ndshal" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              |
              <a href="https://www.linkedin.com/in/nikita-shalimov-145b2213b/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </footer>
          </figcaption>
          <figure class="photo">
            <img src="../../assets/nikita.jpg" alt="Nikita Shalimov">
          </figure>
        </div>
      </article>
      <article class="card">
        <div class="row reverse">
          <figcaption class="bio">
            <header class="bio-header">
              <h3>Brady Kimball</h3>
            </header>
            <section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </section>
            <footer>
              <a href="https://github.com/brady-kimball" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              |
              <a href="https://www.linkedin.com/in/brady-kimball/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </footer>
          </figcaption>
          <figure class="photo">
            <img src="../../assets/brady.jpg" alt="Brady Kimball">
          </figure>
        </div>
      </article>
      <article class="card">
        <div class="row">
          <figcaption class="bio">
            <header class="bio-header">
              <h3>Chris Cankov</h3>
            </header>
            <section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </section>
            <footer>
              <a href="https://github.com/ccankov" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              |
              <a href="https://www.linkedin.com/in/cvetomir-chris-cankov/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </footer>
          </figcaption>
          <figure class="photo">
            <img src="../../assets/chris.jpg" alt="Chris Cankov">
          </figure>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import '../../assets/app.scss';

  .about {
    width: 100%;

    h1 {
      padding-left: 100px;
      text-align: left;
      font-family: $heading;
    }

    h3 {
      font-family: $heading;
      text-align: left;
      margin: 5px 0;
    }

    .card {
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
      margin: 20px;
      border-radius: 10px;
    }

    .row {
      display: flex;
      align-items: stretch;
    }

    .reverse {
      flex-direction: row-reverse;
    }

    img {
      height: 150px;
      border-radius: 5px;
    }

    .photo {
      flex: 1;
    }

    .bio {
      padding: 20px 40px;
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bio-header {
        background-color: $white;
      }

      section {
        font-family: $paragraph;
        font-size: 16px;
        text-align: left;
        margin: 10px 0;
      }

      footer {
        display: flex;

        i {
          padding: 0 20px;
          font-size: 28px;
          color: $dark-gray;
        }

        i:hover {
          color: $accent;
        }
      }
    }
  }

  .article-container {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
</style>
