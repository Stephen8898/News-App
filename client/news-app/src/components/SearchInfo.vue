<template>
  <div style="margin-top: 20px">
    <v-card  color="transparent" class="mx-auto search-card" max-width="fit">
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
      <v-col v-for="(item, i) in items" :key="i" cols="12" @click="modal(item)">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title  v-text="item.title"></v-card-title>

              <!-- <v-card-text v-text="item.description"></v-card-text> -->

              <v-card-subtitle v-if="item.author">By {{item.author}}</v-card-subtitle>
              <v-card-subtitle v-else>N/A</v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img v-if="item.image" width="250px" height="auto" :src="item.image"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-card>

    <v-dialog v-model="dialog" width="500" @blur="resetDialog">
      <v-card>
        <v-card-text
          class="description"
        >Description: {{dialogItem.description}}</v-card-text>

        <v-card-actions>
          <v-btn text color="deep-purple accent-4"
            ><a :href="dialogItem.siteLink" target="_blank">
              Read more from site</a
            >
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
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
    fetch(`http://localhost:3000/api/news/search/?q=${this.value}`, {
      method: "GET"
    })
      .then(data => data.json())
      .then(body => {
        this.items = body.result;
        console.log(this.items);
      })
      .catch(err => {
        throw err;
      });

    this.value = "";
  }

  modal(item: any) {
    this.dialog = true;
    this.dialogItem = item;
  }

  resetDialog() {
    this.dialogItem = {};
  }
}
</script>

<style scoped>
.search-card {
  box-shadow: none !important;
  cursor: pointer;
}

.description {
    font-family: serif;
    font-size: 20px;
}
a{
    text-decoration: none;
}
</style>
