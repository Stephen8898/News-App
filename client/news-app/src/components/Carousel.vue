<template>
  <div style="margin: auto">
    <v-card max-width="fit" class="mx-auto">
      <v-carousel hide-delimiters height="350" :interval="8000" cycle>
        <v-carousel-item
          class="c-item"
          v-for="(item, i) in items"
          :key="i"
          cycle
        >
          <v-img
            class="carousel-img"
            height="100%"
            v-if="item.image"
            :aspect-ratio="16 / 9"
            :src="item.image"
          >
          </v-img>
          <v-img
            v-else
            alt="News Image"
            :aspect-ratio="16 / 9"
            height="100%"
            src="../image/gray-background.png"
          >
          </v-img>
          <v-card-text class="carousel-text">
            {{ item.title }}
            <v-btn text color="deep-purple accent-4">
              <a :href="item.siteLink" target="_blank">Read more</a>
            </v-btn>
          </v-card-text>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Carousel extends Vue {
  items: Array<any> = [];

  beforeCreate() {
    fetch(`http://localhost:3000/api/news`, { method: "GET" })
      .then(data => data.json())
      .then(body => {
        this.items = body.result;
      })
      .catch(err => {
        throw err;
      });
  }
}
</script>

<style scoped>
.carousel-img {
  background-size: auto 100%;
}

.c-item {
  position: relative;
}

.carousel-text {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  text-decoration: none;
  cursor: pointer;
}
</style>
