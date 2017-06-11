<template lang="html">
  <section class='element-view'>
    <header class='element-name'>
      <h2 v-if='editName'>
        <input v-model='elementName' placeholder='Name this element'/>
      </h2>
      <h2 v-else='editName'>{{ elementName }}</h2>
      <i @click='toggleEdit' class='edit fa fa-pencil'></i>
    </header>

  </section>
</template>

<script>
export default {
  props: ['currentElement', 'graph'],
  data: () => ({
    editName: false
  }),
  computed: {
    elementName: {
      get: function () {
        return this.currentElement.getName()
      },
      set: function (name) {
        this.currentElement.setName(name)

        if (this.currentElement.isColumn()) {
          let nameCell = this.graph.getCell(this.currentElement.embeds()[0])
          nameCell.setName(name)
          nameCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
        }
        this.graph.commit()
      }
    }
  },
  methods: {
    toggleEdit: function () {
      this.editName = !this.editName
    }
  }
}
</script>

<style lang="scss" scoped>
  .element-view {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  .element-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: lightblue
  }

  .element-name h2 {
    padding: 5px 0;
    margin: 0;
    font-size: 20px;
  }


  .edit:hover {
    cursor: pointer;
  }
</style>
