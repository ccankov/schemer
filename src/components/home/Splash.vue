<template>
  <section class='splash'>
    <article class="row">
      <div class="column">
        <h1>Design Your Database Online</h1>
        <p>Rapid prototyping of SQL database models using a visual model designer</p>
        <button @click="$router.push('/editor')" class="button">Start</button>
      </div>
      <figure @click="$router.push('/editor')"></figure>
    </article>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import '../../assets/app.scss';

  .splash {
    width: 100%;
    background:
      radial-gradient(
        rgba(0, 0, 0, 0.2) 40%,
        rgba(0, 0, 0, 0.8)
      ),
      url('../../assets/disk.jpg');

    .row {
      display: flex;
      padding: 40px;
      height: 75%;
    }

    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 18vw;

      p {
        color: $white;
        font-family: $paragraph;
        font-size: 3vh;
      }

      button {
        display: block;
        border-radius: 5px;
        padding: 5px 20px;
        margin: 0 20px;
        margin-left: 60px;
        font-family: $heading;
        font-size: 1.8em;
        font-weight: bold;
        background-color: $light-accent;
        color: $white;
        border: 0;
      }

      button:hover {
        cursor: pointer;
        color: $white;
        background-color: $accent;
      }
    }

    h1 {
      text-align: left;
      margin: 0;
      font-family: $heading;
      color: $white;
      font-weight: bolder;
      font-size: 5vh;
    }

    figure {
      flex: 1.5;
      border: 2px solid $light-gray;
      background: url('../../assets/editor.png');
      background-size: cover;
      box-shadow: 0 0 4px rgba(0,0,0,.28), 0 6px 12px rgba(0,0,0,.56);
      transition: 0.3s;
      margin: 0;
      margin-left: 40px;
    }

    figure:hover {
      cursor: pointer;
      box-shadow: 0px -1px 8px 7px rgba($light-accent, 0.28), 3px 4px 6px 0px rgba($light-accent, 0.56);
      transition: 0.3s;
    }
  }

</style>
