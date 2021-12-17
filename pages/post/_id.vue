<template>
  <article v-if="hasPost" :class="$style.article">
    <div
      v-if="hasMultipleImage"
      ref="container"
      :class="$style.multiImage"
      class="swiper-container"
    >
      <ul class="swiper-wrapper" @click="backByClick">
        <li
          v-for="(image, index) in post.acf.images"
          :key="index"
          :class="$style.image"
          class="swiper-slide"
          :style="{ backgroundImage: 'url(' + image.image.url + ')' }"
        />
      </ul>

      <div
        ref="pagination"
        :class="$style.pagination"
        class="swiper-pagination"
      />
    </div>

    <div
      v-else
      :class="[$style.singleImage, $style.image]"
      :style="{ backgroundImage: 'url(' + post.acf.images[0].image.url + ')' }"
      @click="backByClick"
    />

    <div :class="$style.text">
      <h1 :class="$style.title" v-html="post.title.rendered" />
      <div
        v-if="hasContent"
        :class="$style.content"
        v-html="post.content.rendered"
      />
      <div :class="$style.info">
        <div :class="$style.date">{{ post.date | date }}</div>
        <ul v-if="hasTags" ref="tags" :class="$style.tags">
          <li v-for="tag in tags" :key="tag.id" :class="$style.tag">
            {{ tag.name }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
import dayjs from 'dayjs'
import Swiper from 'swiper'

export default {
  name: 'PostPage',
  filters: {
    date(date) {
      return dayjs(date).format('YYYY')
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromPath = from.path
      vm.$store.dispatch('backByEsc', from)
    })
  },

  async asyncData({ store, route, $config, payload }) {
    let post
    if (payload) {
      post = payload
    } else {
      post = await store.dispatch('getPost', {
        wpSiteUrl: $config.wpSiteUrl,
        id: route.params.id
      })
    }
    store.dispatch('setCurrentPost', post)

    const tags = []
    for (const [index, tagId] of post.tags.entries()) {
      const tagName = await store.dispatch('getTagName', {
        wpSiteUrl: $config.wpSiteUrl,
        id: tagId
      })
      tags.splice(index, 0, tagName)
    }

    return { post, tags }
  },

  data() {
    return {
      swiper: null,
      swiperOptions: {
        direction: 'vertical',
        speed: 0,
        spaceBetween: 40,
        simulateTouch: false,
        mousewheelControl: true,
        touchRatio: 1,
        threshold: 1,
        longSwipesMs: 600,
        followFinger: false,
        pagination: this.$refs.pagination,
        paginationType: 'fraction'
      },
      fromPath: ''
    }
  },
  head() {
    return {
      title: this.post.title.rendered,
      htmlAttrs: {
        class: 'is-work'
      },
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.post.title.rendered
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  },

  computed: {
    hasPost() {
      return Object.keys(this.post).length > 0
    },

    hasMultipleImage() {
      return this.post.acf.images.length >= 2
    },

    hasContent() {
      return this.post.content.rendered !== ''
    },

    hasTags() {
      return this.tags.length >= 1
    }
  },

  mounted() {
    // 画像が複数枚ある時はSwiperを初期化する
    if (this.hasMultipleImage) {
      this.initSwiper()
    }
  },

  methods: {
    initSwiper() {
      console.log('swiper initialized')
      this.swiper = new Swiper(this.$refs.container, {
        direction: 'vertical',
        speed: 0,
        spaceBetween: 40,
        simulateTouch: false,
        mousewheel: true,
        touchRatio: 1,
        threshold: 1,
        longSwipesMs: 600,
        followFinger: false,
        pagination: {
          el: this.$refs.pagination,
          type: 'fraction'
        }
      })
    },

    backByClick() {
      let toPath

      if (this.fromPath !== '') {
        toPath = this.fromPath
      } else {
        toPath = '/'
      }

      this.$router.push(toPath)
    }
  }
}
</script>

<style lang="scss" module>
@import 'bourbon';
@import 'swiper/css/swiper.css';
@import '~/assets/styles/config';
@import '~/assets/styles/mixin';
@import '~/assets/styles/extend';

%fixedImage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

%containBg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
}

.article {
  position: relative;
  z-index: 2;
  cursor: url('~/assets/images/cursor_close.png') 9 9, auto;
  cursor: -webkit-image-set(
        url('~/assets/images/cursor_close.png') 1x,
        url('~/assets/images/cursor_close-2x.png') 2x
      )
      9 9,
    auto;
}

.multiImage {
  @extend %fixedImage;

  .image {
    @extend %containBg;
  }

  .pagination {
    position: fixed;
    bottom: $margin_page;
    right: $margin_page;
    z-index: 2;
    font-size: $fontSize_small;
    mix-blend-mode: exclusion;
    pointer-events: none;

    @include mq($mq_spLarge) {
      bottom: $margin_page_sp;
      right: $margin_page_sp;
    }
  }
}

.singleImage {
  @extend %fixedImage;
  @extend %containBg;
}

.text {
  position: fixed;
  bottom: $margin_page;
  left: $margin_page;
  z-index: 2;
  width: 50%;
  mix-blend-mode: exclusion;
  pointer-events: none;

  @include mq($mq_spLarge) {
    width: 100%;
    bottom: $margin_page_sp;
    left: 0;
    padding-left: $margin_page_sp;
    padding-right: $margin_page_sp;
  }
}

.title {
  @extend %title;
}

.content {
  @extend %content;

  margin-top: 1.3em;
}

.info {
  margin-top: 2em;
  font-size: $fontSize_small;
  line-height: $lineHeight_title;

  @include mq($mq_spLarge) {
    width: 90%;
  }
}

.date {
  display: inline;
}

.tags {
  display: inline;
  margin-left: 8px;

  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
}

.tag {
  display: inline;

  &::before {
    content: ', ';
  }

  &:first-child::before {
    content: '';
  }
}
</style>
