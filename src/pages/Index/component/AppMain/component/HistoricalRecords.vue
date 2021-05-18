<template>
  <div class="my-disc dispaly-center p1">
    <ul class="dispaly-center mr-2 pr-2">
      <li class="pl-1" :class="[ historyLength <= 2 && 'c']" @click="goBack"><span class="el-icon-arrow-left" /></li>
      <li class="pl-1" @click="$router.go(1)"><span class="el-icon-arrow-right" /></li>
      <li class="pl-1" @click="refreshSelectedTag($route)"><span class="el-icon-refresh-right" /></li>
    </ul>
    <div class="dispaly-center">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        class="dispaly-center router-link"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :class="isActive(tag) ? 'active' : ''"
        tag="span"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <p>{{ tag.meta.title }}</p>
        <span class="el-icon-arrow-right pr-1" style="font-size: 14px; padding-left: 5px;" />
      </router-link>
      <ul v-show="visible" :style="{ left: left + 'px', top: top+'px' }" class="contextmenu">
        <li @click="refreshSelectedTag(selectedTag)">重新加载</li>
        <li @click="closeSelectedTag(selectedTag)">关闭</li>
        <li @click="closeOthersTags">关闭其他</li>
        <li @click="closeAllTags(selectedTag)">关闭所有</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoricalRecords',

  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {},
      historyLength: 0
    }
  },

  computed: {
    visitedViews() {
      return this.$store.getters.historyList
    }
  },

  watch: {
    $route() {
      this.historyLength = window.history.length
      this.addHistory()
    },

    visible(value) {
      value ? document.body.addEventListener('click', this.closeMenu) : document.body.removeEventListener('click', this.closeMenu)
    }
  },

  mounted() {
    this.addHistory()
  },

  methods: {
    goBack() {
      this.historyLength > 2 && this.$router.go(-1)
    },

    addHistory() {
      const { name } = this.$route
      name && this.$store.dispatch('addRouter', this.$route)
    },

    isActive(route) {
      return route.path === this.$route.path
    },

    openMenu(tag, event) {
      const menuMinWidth = 95
      const offsetLeft = this.$el.getBoundingClientRect().left
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth
      const left = event.clientX - offsetLeft + 230
      this.left = left > maxLeft ? maxLeft : left
      this.top = event.clientY
      this.visible = true
      this.selectedTag = tag
    },

    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + view.fullPath
          })
        })
      })
    },

    closeSelectedTag(view) {
      this.$store.dispatch('delRouter', view).then(({ historyList }) => {
        this.isActive(view) && this.toLastView(historyList, view)
      })
    },

    toLastView(historyList, view) {
      const latestView = historyList.slice(-1)[0]
      latestView ? this.$router.push(latestView.fullPath) : this.handleView(view)
    },

    handleView(view) {
      view.name === 'Index' ? this.$router.replace({ path: '/redirect' + view.fullPath }) : this.$router.push('/')
    },

    closeOthersTags() {
      this.$router.replace({ path: '/redirect' + this.selectedTag.fullPath })
      this.$store.dispatch('delOtherHistory', this.selectedTag)
    },

    closeAllTags(view) {
      this.$store.dispatch('delAllHistory').then(({ historyList }) => {
        this.toLastView(historyList, view)
      })
    },

    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }

  .router-link p {
    font-size: 14px;
    cursor: pointer;
  }

  .active {
    span {
      color: #00B7FF;
    }
    P {
      position: relative;
      color: #00B7FF;
      &:before {
        content: '';
        width: 100%;
        height: 3px;
        position: absolute;
        bottom: -7px;
        background: #409EFF;
      }
    }
  }

  .my-disc {
    border-bottom: 1px solid #f0f0f0;

    li {
      font-size: 14px;
      cursor: pointer;
    }

    .b {
      color: #333;
    }

    .c {
      color: #cccccc;
    }

    span {
      font-size: 16px;
    }

    ul {
      border-right: 1px solid #e4e4e4;
    }
  }
</style>
