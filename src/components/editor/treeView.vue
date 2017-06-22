<template>
  <ul class='table-list'>
    <li class='table-item'
      v-for='table in tables'>
      <label
        :class='elClass(table)'
        @dblclick="toggleEdit">
        <span
          @click="sendCurrent(table.id)">
          <i class='fa fa-folder-open-o'></i>
          <input
            @blur="toggleEdit()"
            v-if='editName'
            v-model='elementName'
            placeholder='Name this table'/>
          <span v-else>{{ table.name }}</span>
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
              :class='elClass(col)'>
              <span
                @click="sendCurrent(col.id)">
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
  data: () => ({
    editName: false
  }),
  computed: {
    tables: function () {
      return this.graph.getTableTree()
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
    }
  },
  methods: {
    toggleEdit: function () {
      this.editName = !this.editName
    },
    elClass: function (element) {
      const currId = this.currentElement ? this.currentElement.getId() : null
      return element.id === currId ? 'current-element' : ''
    },
    sendCurrent: function (id) {
      this.sendElement(this.graph.getCell(id).element)
    },
    sendElement: function (element) {
      if (!this.currentElement || this.currentElement.getId() !== element.id) {
        this.$emit('send-element', element)
      }
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
  li {
    display: block;
  }

  label > span:hover, .col-btn:hover {
    cursor: pointer;
  }

  .table-list {
    padding: 20px 0;
    font-family: $heading;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .table-item {
    width: 100%;

    label > i {
      display: flex;
      align-items: center;
      color: $dark-gray;
    }
  }

  .table-list label {
    display: flex;
    padding: 3px 20px;
    justify-content: space-between;
  }

  .col-list {
    width: auto;
    margin: 5px 0;
  }

  .col-item {

    label {
      padding-left: 45px;
    }
  }

  .current-element {
    background: rgba($light-accent, 0.3);
  }
</style>
