<template>
  <v-system-bar window>
    <v-menu offset-y transition="slide-y-transition">
      <v-btn flat small right slot="activator">
        <v-icon>headset</v-icon> MENU
      </v-btn>
      <v-list>
        <v-list-tile @click="dialog = true">
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile>
        <v-dialog v-model="dialog" max-width="300">
          <v-card>
            <v-card-title><h2>Vue Music Player</h2></v-card-title>
            <v-card-text>Version 1.0.0</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>
    VUE MUSIC PLAYER
    <v-spacer></v-spacer>
    <v-icon>remove</v-icon>
    <v-icon>check_box_outline_blank</v-icon>
    <v-icon>close</v-icon>
  </v-system-bar>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
  }
</script>