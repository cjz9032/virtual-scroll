<template>
  <div class="mu-infinite-scroll">
    <div :class="{ hide: !loading }">
      <slot name="loading"></slot>
    </div>
    <div :class="{ hide: !noMore }">
      <slot name="noMore"></slot>
    </div>
  </div>
</template>

<script>
  import Scroll from './internal/scroll'
  export default {
    name: 'infinite-scroll',
    mixins: [Scroll],
    props: {
      beforeHeight: {
        type: Number,
        default: 10
      },
      loading: {
        type: Boolean,
        default: false
      },
      noMore: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onScroll () {
        const scroller = this.scroller
        const isWindow = scroller === window
        const scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
        const scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight
        let h = scrollHeight - scrollTop - this.beforeHeight
        let sh = isWindow ? window.innerHeight : scroller.offsetHeight
        this.$emit('update:scrollTop', scrollTop)

        if (this.loading || this.noMore) return
        if (h <= sh) {
          this.$emit('load')
        }
      }
    },
    components: {}
  }
</script>

<style lang="less">
  .hide {
    display: none;
  }

  .mu-infinite-scroll {
    display: block;
    height: 1px;
    width: 100%;
    background-color: transparent;
    .mu-infinite-scroll-text {
      padding: 10px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  }
</style>
