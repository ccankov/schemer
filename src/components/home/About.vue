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
              Nikita is a full-stack developer, experienced in React, Redux, Vue.js, Ruby on Rails, Express and plain-ol-JavaScript. Coming from research and academia, what drew Nikita to being a software engineer was the algorithms and problem solving. However, these days, he gets just as excited about building something that is interactive, easy to use, and can really be leveraged in a meaningful way.
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
              Brady got his BS in mechanical engineering from UC Berkeley and worked for two years as an aerospace engineer before starting his career as a software engineer. Since then, his primary focus has been new technologies, with a strong background in Rails, React and Redux and recent experience with VueJS.
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
              Chris is an analytical problem-solver with years of technical debugging experience in the software industry. What makes him passionate about software engineering is that it enables the design and implementation of rich user experiences that can enhance people's lives. His ideal workplace involves working with a passionate team of engineers who share a common vision to design a superior software product.
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
    background:
      radial-gradient(
        rgba(0, 0, 0, 0.2) 40%,
        rgba(0, 0, 0, 0.8)
      ),
      url('../../assets/sanfrancisco.jpg');
    background-size: cover;
    overflow: scroll;

    h1 {
      padding-left: 100px;
      text-align: left;
      font-family: $heading;
      max-width: 1000px;
      margin: 15px auto;
      margin-top: 35px;
      color: $white;
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
      max-width: 1000px;
      background-color: $white;
    }

    .row {
      display: flex;
      align-items: stretch;

      figure {
        display: flex;
        align-items: center;
      }
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
