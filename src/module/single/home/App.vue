<template>
  <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- <Player v-show="songList.length > 0 && !showDetail"></Player> -->
  </div>
</template>
<script>
  import Vue from 'vue'
  // migration from
  import Bus from '@/src/utils/evt-bus.js'
  export default {
    data () {
      return {
      }
    },
    mounted () {
      Bus.$on('error:network', (err) => {
        Vue.nextTick(function () {
          console.log(err.message)
        }, this)
      })
    },
    components: {
    },
    computed: {
    }
  }
</script>
