<template>
  <div class="default-view" ref="abc">
    <div class="empty-box" :style="{ height: emptyHeight.top + 'px' }"></div>

    <div class="user-item" v-for="(user, i) in userList" :key="user.id" :class="{hide:!showList[i]}">
      <slot>
        {{ user.id }}
      </slot>
    </div>
    <div class="bot-box" :class="{hide:!showList[showList.length-1]}">
      <slot>
        <infinite-scroll :scroller="scroller" :noMore="noMore" :loading="loading" @load="loadUser"
                         @update:scrollTop="n => scrollTop = n">
          <div class="loading-text" slot="loading">我在加载中啊</div>
          <div class="loading-text" slot="noMore">没有了哦</div>
        </infinite-scroll>
      </slot>
    </div>

    <div class="empty-box" :style="{ height: emptyHeight.bottom + 'px' }"></div>
  </div>
</template>
<style lang="less" scoped>
  .hide {
    display: none;
  }

  .default-view {
    width: 200px;
    height: 400px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    .user-item {
      font-size: 14px;
      line-height: 4em;
    }
    .bot-box {
      height: 40px;
      .loading-text {
        padding: 10px;
        font-size: 14px;
        text-align: center;
        color: #666;
      }
    }
  }
</style>
<script>
  import { userList } from '../service/getData'
  import infiniteScroll from '../components/infiniteScroll'
  import throttle from 'lodash/throttle'

  export default {
    components: {
      infiniteScroll
    },
    data () {
      return {
        userList: [],
        page: 1,
        loading: false,
        noMore: false,
        scroller: null,
        scrollTop: 0,
        previewPer: 1,
        boxHeight: 400,
        showList: [true],
        emptyHeight: {top: 0, bottom: 0}
      }
    },
    created () {
    },
    mounted () {
      this.loadUser()
      this.scroller = this.$el
    },
    methods: {
      // 获取用户
      loadUser () {
        this.loading = true
        userList({errorTip: true, params: {page: this.page}}).then(res => {
          let data = res.data.data
          if (data.length) {
            this.userList = this.userList.concat(data)
            this.page++
          } else {
            this.noMore = true
          }
          this.loading = false
        })
      },
      // 计算盒子
      renderBox: throttle(
        function () {
          let {scrollTop, previewPer, boxHeight} = this
          let topLine = -previewPer * boxHeight + scrollTop // 上线
          let botLine = (1 + previewPer) * boxHeight + scrollTop // 下线
          let top = 0
          let bottom = 0
          // 显示列表
          this.contentHeight.reduce((prev, cur, i) => {
            let now = prev + cur
            if (now < topLine) {
              // 在上线
              this.showList[i] = false
              // 高度盒子
              top = top + cur
            } else if (now > botLine) {
              // 在下线
              this.showList[i] = false
              bottom = cur + bottom
            } else {
              // 中间
              this.showList[i] = true
            }
            return now
          }, 0)
          this.emptyHeight = {top, bottom}
        },
        300
      )
    },
    computed: {
      contentHeight: function () {
        return this.userList.map(() => 56).concat(40)
      }
    },
    watch: {
      scrollTop: function () {
        this.renderBox()
      },
      contentHeight: function () {
        this.renderBox()
      }
    }
  }
</script>
