<template lang="html">
  <section class='element-view' v-show='currentElement'>
    <header class='element-name'>
      <h2 v-if='editName'>
        <input v-model='elementName' placeholder='Name this element'/>
      </h2>
      <h2 v-else='editName'>{{ elementName }}</h2>
      <i @click='toggleEdit' class='edit fa fa-pencil'></i>
    </header>
    <ul class='element-details'>
      <div v-if='isTable' class="stats">
        <span class="header">Statistics</span>
        <p class="stats-line">
          <span>Columns</span>
          <span>{{ columnCount }}</span>
        </p>
        <p class="stats-line">
          <span>Connections</span>
          <span>{{ connectionCount }}</span>
        </p>
        <button @click='deleteElement'>Delete Table</button>
      </div>

      <div v-if='isCol' class='col-options'>

        <button @click='deleteElement'>Delete Table</button>
      </div>
    </ul>
  </section>
</template>

<script>
export default {
  props: ['currentElement', 'graph'],
  data: () => ({
    editName: false
  }),
  computed: {
    isTable: function () {
      return this.currentElement ? this.currentElement.isTable() : false
    },
    elementName: {
      get: function () {
        if (!this.currentElement) return null
        return this.currentElement.getName()
      },
      set: function (name) {
        this.currentElement.setName(name)

        if (this.currentElement.isCol()) {
          let nameCell = this.graph.getCell(this.currentElement.embeds()[0])
          nameCell.setName(name)
          nameCell.setAttr('text', {'ref-x': 0.5, 'ref-y': 0.3})
        }
        this.graph.commit()
      }
    },
    columnCount: function () {
      if (!this.currentElement.isTable()) return 0
      return this.currentElement.columns().length
    },
    connectionCount: function () {
      if (!this.currentElement.isTable()) return 0
      let linkCount = 0
      const colIds = this.currentElement.columns()
      this.graph.getLinks()
        .forEach(link => {
          if (colIds.includes(link.attributes.source.id) ||
           colIds.includes(link.attributes.target.id)) {
            linkCount++
          }
        })
      return linkCount
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
  @import '../../assets/app.scss';

  .element-view {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;

  }

  .element-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $light-blue
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
