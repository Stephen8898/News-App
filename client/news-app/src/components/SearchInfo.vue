<template>
  <div style="margin-top: 20px">
    <v-card color="transparent" class="mx-auto search-card" max-width="fit">
      <v-list-item-content>
        <v-list-item-title class="headline mb-1" style="text-align: center"
          >Search for top news on any Topic</v-list-item-title
        >
      </v-list-item-content>
      <div style="margin:10px">
        <v-text-field
          v-model="value"
          v-on:keyup.13="search"
          label="Search"
        ></v-text-field>
      </div>
    </v-card>

    <v-card color="transparent" max-width="fit" class="mx-auto search-card">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        @click="
          dialog = !dialog;
          modal(item);
        "
      >
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-text="item.title"></v-card-title>

              <!-- <v-card-text v-text="item.description"></v-card-text> -->

              <v-card-subtitle v-if="item.author"
                >By {{ item.author }}</v-card-subtitle
              >
              <v-card-subtitle v-else>N/A</v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img
                v-if="item.image"
                width="250px"
                height="auto"
                :src="item.image"
              ></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card>
    <comments :dialog="dialog" :item="dialogItem" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Comments from "./Comments.vue";
@Component({
  components: {
    comments: Comments
  }
})
export default class SearchInfo extends Vue {
  items: Array<any> = [];
  value: String = "";
  dialog: Boolean = false;
  dialogItem: any = {};

  search() {
    if (!this.value) {
      this.items = [];
      return;
    }
    fetch(`http://localhost:4000/api/news/search/?q=${this.value}`, {
      method: "GET"
    })
      .then(data => data.json())
      .then(body => {
        this.items = body.result;
      })
      .catch(err => {
        throw err;
      });
  }

  modal(item: any) {
    this.dialogItem = item;
  }
}
</script>

<style scoped>
.search-card {
  box-shadow: none !important;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
