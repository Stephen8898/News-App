<template>
  <div>
    <v-dialog v-model="syncedDialog" width="500" @blur="resetDialog()">
      <v-card>
        <v-card-text class="description">
          Description: {{ syncedItem.description }}
        </v-card-text>

        <v-card-actions>
          <v-btn text color="deep-purple accent-4"
            ><a :href="syncedItem.siteLink" target="_blank">
              Read more from site</a
            >
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="comment-btn"
            @click="
              dialog2 = !dialog2;
              getComments();
            "
          >
            comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-container>
        <v-dialog v-model="dialog2" max-width="600px">
          <v-card>
            <v-card-title>Share your thoughts</v-card-title>
            <div class="post-info">
              <v-text-field v-model="name" :counter="10" label="Name">
              </v-text-field>
              <v-textarea
                name="input-7-1"
                v-model="body"
                label="Post"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                hint="body"
                required
              >
              </v-textarea>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="transparent" @click="createComment"
                  >Post comment</v-btn
                >
              </v-card-actions>
              <v-card-title>Comments</v-card-title>
              <v-card class="comments" v-if="!comments.length" outlined>
                <v-card-text>No comments</v-card-text>
              </v-card>
              <v-card
                v-else
                v-for="(comment, i) in comments"
                :key="i"
                class="comments"
                outlined
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <hr />
                    <div class="comment-txt">
                      <v-list-item-title
                        >name: {{ comment.name }}</v-list-item-title
                      >
                      <v-card-text>{{ comment.body }}</v-card-text>
                      <v-list-item-subtitle>{{
                        new Date(comment.date).toLocaleString()
                      }}</v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                  <v-btn dark icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-list-item>
              </v-card>
            </div>
          </v-card>
        </v-dialog>
      </v-container>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, PropSync } from "vue-property-decorator";
@Component
export default class comments extends Vue {
  name: string = "";
  body: string = "";
  comments: Array<any> = [];
  @PropSync("dialog", { type: Boolean }) syncedDialog!: Boolean;
  @PropSync("item", { type: Object }) syncedItem!: any;
  dialog2: Boolean = false;

  createComment() {
    const data = {
      article: this.syncedItem.title,
      name: this.name,
      body: this.body
    };

    fetch("http://localhost:3000/api/comment/post_comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log(err);
      });
  }

  getComments() {
    fetch(
      `http://localhost:3000/api/comment/get_comments/${this.syncedItem.title}`,
      {
        method: "GET"
      }
    )
      .then(data => data.json())
      .then(comment => {
        this.comments = comment.comments;

        console.log(comment);
      })
      .catch(err => {
        throw err;
      });
  }

  resetDialog() {
    this.syncedItem = {};
  }
}
</script>

<style scoped>
.description {
  padding-top: 10px !important;
  font-family: serif;
  font-size: 20px;
}

.comment-btn {
  color: #0277bd;
}

.post-info {
  padding: 10px;
}

a {
  text-decoration: none;
}

hr {
  background-color: #eeeeee;
}
.comments {
  border: 0 !important;
}

.comment-txt {
  padding: 5px;
}
</style>
