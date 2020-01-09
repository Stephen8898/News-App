<template>
  <v-app>
    <v-app-bar app color="transparent" hide-on-scroll class="header-bar" dark>
      <v-toolbar-title style="margin: auto">
        <h1>Top News Today</h1></v-toolbar-title
      >
    </v-app-bar>
    <v-content style="background-color:#EEEEEE" scrollable>
      <v-container>
        <div style="margin: 5%; margin-top: 1%; margin-bottom: 1%">
          <section class="info">
            <p class="info-text">
              This is a simple news application that I built using the NewsAPI.
              You can view the top trending news on the carousel, or you can use
              the search bar to get access to all top trending news globally on
              any topic you type. There you can add a little comment on the
              article sharing your thoughts and opinions.
            </p>
          </section>
        </div>
        <carousel />
        <search-info />
      </v-container>
    </v-content>
    <v-footer color="#424242 " padless>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center white--text" cols="12">
          <small
            >Built using:
            <a href="https://newsapi.org/" target="_blank">NewsAPI</a></small
          >
          - {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "./components/Carousel.vue";
import SearchInfo from "./components/SearchInfo.vue";
import About from "./views/About.vue";

export default Vue.extend({
  name: "App",

  components: {
    carousel: Carousel,
    "search-info": SearchInfo
    // about: About
  },

  data: () => ({
    //
  })
});
</script>

<style scoped>
.header-bar {
  box-shadow: none !important;
}
.v-application {
  font-family: serif;
  line-height: 1.5;
}
.v-application .info {
  background-color: transparent !important;
  border-color: none !important;
}
.info {
  max-width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
}
.info--text {
  font-size: 14px;
  line-height: 1.35rem;
}
a {
  text-decoration: none;
  color: white !important;
}
a:hover {
  cursor: pointer;
}

h1,
p {
  font-family: "Raleway", sans-serif;
  color: #424242;
}
</style>
