<template>
  <header :class="$style.header">
    <router-link :to="'/'" tag="h1" :class="$style.title">
      <div :class="[$style.logo, $style.hidden]" ref="logo">
        <img :class="[$style.default, $style.hidden]" src="~images/logo.png" :alt="siteTitle" ref="default">
        <img :class="$style.glitch" src="~images/logo_glitch.gif" ref="glitch">
      </div>
    </router-link>

    <ul :class="$style.navi">
      <router-link :to="'/about'" tag="li" :class="$style.naviItem">About</router-link>
    </ul>
  </header>
</template>

<script>
import {util} from '../app'

export default {
  data () {
    return {
      $logo: null,
      $default: null,
      $glitch: null
    }
  },

  computed: {
    siteTitle () {
      return this.$store.state.siteTitle
    }
  },

  methods: {
    init () {
      if (!util) return

      // タッチデバイスでmouseenterイベントにバインドしてると、ダブルタップしないとリンク押せない
      // pcのときだけmouseenter/mouseleaveイベントにバインド
      // タッチデバイスはtouchstart/touchend
      if (util.getDevice() === 'pc') {
        this.$logo.on('click', this.onEnter.bind(this))
        this.$logo.on('mouseenter', this.onEnter.bind(this))
        this.$logo.on('mouseleave', this.onLeave.bind(this))
      } else {
        this.$logo.on('touchstart', this.onEnter.bind(this))
        this.$logo.on('touchend', this.onLeave.bind(this))
      }
    },

    onEnter () {
      this.$default.addClass(this.$style.hidden)
      this.$glitch.removeClass(this.$style.hidden)

      setTimeout(this.onLeave.bind(this), 300)
    },

    onLeave () {
      this.$default.removeClass(this.$style.hidden)
      this.$glitch.addClass(this.$style.hidden)
    }
  },

  mounted () {
    this.$logo = $(this.$refs.logo)
    this.$default = $(this.$refs.default)
    this.$glitch = $(this.$refs.glitch)

    this.$logo.imagesLoaded(() => {
      this.$logo.removeClass(this.$style.hidden)
      this.onEnter()
    })

    this.init()
  }
}
</script>

<style lang='scss' module>
@import "~bourbon";
@import "~styles/config";
@import "~styles/mixin";

.header {
  @include clearfix;

  position: fixed;
  z-index: 3;
  top: $margin_page;
  left: 0;
  width: 100%;
  padding-left: $margin_page;
  padding-right: $margin_page;
  mix-blend-mode: exclusion;
  pointer-events: none;

  @include mq($mq_spLarge) {
    top: $margin_page_sp;
    padding-left: $margin_page_sp;
    padding-right: $margin_page_sp;
  }
}

.hidden {
  opacity: 0;
  visibility: hidden;
}

.title {
  display: block;
  float: left;
  pointer-events: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  cursor: pointer;
}

.logo {
  position: relative;
  width: 34px;
  height: 44px;

  .default {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 44px;
  }

  .glitch {
    pointer-events: none;
    position: absolute;
    top: -2px;
    left: -20px;
    width: 74px;
    height: 48px;
  }
}

.navi {
  float: right;
  margin-top: 11px;
}

.naviItem {
  pointer-events: auto;
  display: inline;
  margin-left: 30px;
  text-transform: uppercase;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  :global(body.is-pc) &:hover {
    text-decoration: underline;
  }
}
</style>
