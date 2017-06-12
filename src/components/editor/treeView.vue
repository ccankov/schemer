<template>
  <ul class='table-list'>
    <li class='table-item'
      v-for='table in tables'>
      <label
        :class='elClass(table)'
        @click="sendCurrent(table.id)">
        <span>
          <i class='fa fa-folder-open-o'></i>
          <span>{{ table.name }}</span>
        </span>
        <i class='col-btn fa fa-plus'
          @click="$emit('add-column', table.id)"></i>
      </label>
      <ul class='col-list'
        v-show='currentTableId === table.id'>
        <li
          class='col-item'
          v-for='col in table.cols'>
            <label
              :class='elClass(col)'
              @click="sendCurrent(col.id)">
              <span>
                <i class='fa fa-file-text-o'></i>
                <span>{{ col.name }}</span>
              </span>
            </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['graph', 'currentElement', 'currentTableId'],
  computed: {
    tables: function () {
      return this.graph.getTableTree()
    }
  },
  methods: {
    elClass: function (element) {
      const currId = this.currentElement ? this.currentElement.getId() : null
      return element.id === currId ? 'current-element' : ''
    },
    sendCurrent: function (id) {
      this.sendElement(this.graph.getCell(id).element)
    },
    sendElement: function (element) {
      this.$emit('send-element', element)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '../../assets/app.scss';

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  // make this flex
  li {
    display: block;
  }

  label > span:hover, .col-btn:hover {
    cursor: pointer;
  }

  .table-list {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .table-item {
    width: 100%;
  }

  .table-list label {
    display: flex;
    justify-content: space-between;
  }

  .col-list {
    margin-left: 30px;
  }

  .col-item {
    padding: 2px 5px;
  }

  .current-element {
    background: rgba($light-accent, 0.3);
  }

</style>
