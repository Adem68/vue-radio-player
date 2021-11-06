<template>
  <v-app id="inspire">
    <v-main class="dark lighten-3">
      <v-container class="mt-10">
        <v-row>
          <v-col cols="12" xs="12" md="2">
            <v-sheet rounded="lg">
              <v-list-item-group color="">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click="play(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-container v-if="selectedRadio" fill-height>
                <v-col align="center">
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="10"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-img
                    height="250"
                    contain
                    :src="this.selectedRadio.img"
                  ></v-img>
                  <br />
                  <v-container
                    v-if="
                      this.selectedRadio.artistTitle != null &&
                        this.selectedRadio.songTitle != null
                    "
                  >
                    <h2>NOW PLAYING</h2>
                    <br />
                    <h1>
                      {{
                        this.selectedRadio.artistTitle +
                          " - " +
                          this.selectedRadio.songTitle
                      }}
                    </h1>
                    <br />
                  </v-container>
                  <h2>
                    {{ "Station: " + this.selectedRadio.title }}
                  </h2>

                  <br />
                  <audio id="audio-player" controls>
                    <source :src="this.selectedRadio.url" />
                    Your browser does not support the audio tag.
                  </audio>
                </v-col>
              </v-container>
              <v-container v-if="!selectedRadio" fill-height>
                <v-col align="center">
                  <h1>Select station from the menu</h1>
                </v-col>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  created() {
    setInterval(() => this.updateUI(), 1000);
  },
  data: () => ({
    selectedRadio: null,
    btnTitle: "Play",
    radioVolume: 50,
    items: [
      {
        title: "Virgin Radio",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/VIRGIN_RADIO_SC?/;stream.mp3",
        img:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/VirginRadio.png",
        smallImg:
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/VirginRadio.png",
        artistTitle: null,
        songTitle: null,
        api: null,
      },
      {
        title: "Radyo Fenomen",
        url: "https://listen.radyofenomen.com/fenomen/128/icecast.audio",
        img: "https://cdn.radyofenomen.com/artwork/logo20.png",
        smallImg: null,
        api:
          "https://api.radyofenomen.com/Channels/radyofenomen/?appRef=FenomenWeb&v=1",
        artistTitle: null,
        songTitle: null,
      },
      {
        title: "Metro FM",
        url: "https://playerservices.streamtheworld.com/api/livestream-redirect/METRO_FM_SC?/;stream.mp3",
        img:
          "https://mediacdns.karnaval.com/media/station_media/2/logos/meta_image.png",
        smallImg:
          "https://mediacdns.karnaval.com/media/station_media/2/logos/meta_image.png",
        artistTitle: null,
        songTitle: null,
        api: null,
      },
      {
        title: "Pal Station",
        url: "https://moondigitaledge.radyotvonline.net/palstation/playlist.m3u8",
        img:
          "https://upload.wikimedia.org/wikipedia/tr/thumb/5/51/Pal_Station_logo.png/532px-Pal_Station_logo.png",
        smallImg:
          "https://upload.wikimedia.org/wikipedia/tr/thumb/5/51/Pal_Station_logo.png/532px-Pal_Station_logo.png",
        artistTitle: null,
        songTitle: null,
        api: null,
      },
      {
        title: "Fenomen Türk",
        url: "https://listen.radyofenomen.com/fenomenturk/128/icecast.audio",
        img: "https://cdn.radyofenomen.com/artwork/logo40.png",
        smallImg: null,
        api:
          "https://api.radyofenomen.com/Channels/fenomenturk/?appRef=FenomenWeb&v=1",
        artistTitle: null,
        songTitle: null,
      },
      {
        title: "Fenomen Türkçe Rap",
        url: "https://listen.radyofenomen.com/fenomenturkrap/96/icecast.audio",
        img: "https://cdn.radyofenomen.com/artwork/logo58.png",
        smallImg: null,
        api:
          "https://api.radyofenomen.com/Channels/fenomenturkcerap/?appRef=FenomenWeb&v=1",
        artistTitle: null,
        songTitle: null,
      },
      {
        title: "Fenomen 2010",
        url: "https://listen.radyofenomen.com/fenomen2010/128/icecast.audio",
        img: "https://cdn.radyofenomen.com/artwork/logo67.png",
        smallImg: null,
        api:
          "http://api.radyofenomen.com/Channels/fenomen2010/?appRef=FenomenWeb&v=1",
        artistTitle: null,
        songTitle: null,
      }
    ],
  }),
  methods: {
    play(index) {
      var selectedItem = this.items[index];

      if (this.selectedRadio != null) {
        var audio = document.getElementById("audio-player");

        audio.src = selectedItem.url;
      }

      if (selectedItem.api) {
        axios.get(selectedItem.api).then((response) => {
          var item = response.data.response.timeline[0];
          selectedItem.img = item.albumCoverIMG;
          selectedItem.smallImg = item.albumCoverIMGSmall;
          selectedItem.artistTitle =
            item.artistTitle + " " + item.artistVisibleExtra;
          selectedItem.songTitle = item.songTitle;
        });
      } else {
        this.$mediaSession.metadata = new window.MediaMetadata({
          title: selectedItem.title,
          artist: "Radio Player",
          artwork: [
            {
              src: selectedItem.smallImg,
              sizes: "96x96",
              type: "image/png",
            },

            {
              src: selectedItem.img,
              sizes: "300x300",
              type: "image/png",
            },
          ],
        });
      }
      this.selectedRadio = selectedItem;
      setTimeout(function() {
        var audio = document.getElementById("audio-player");
        audio.volume = 0.1;
        audio.play();
      }, 0);
    },
    updateUI() {
      if (this.selectedRadio && this.selectedRadio.api) {
        axios.get(this.selectedRadio.api).then((response) => {
          var item = response.data.response.timeline[0];
          this.selectedRadio.img = item.albumCoverIMG;
          this.selectedRadio.smallImg = item.albumCoverIMGSmall;
          this.selectedRadio.artistTitle =
            item.artistTitle + " " + item.artistVisibleExtra;
          this.selectedRadio.songTitle = item.songTitle;

          this.$mediaSession.metadata = new window.MediaMetadata({
            title: this.selectedRadio.songTitle,
            album: this.selectedRadio.artistTitle,
            artwork: [
              {
                src: this.selectedRadio.smallImg,
                sizes: "96x96",
                type: "image/png",
              },

              {
                src: this.selectedRadio.img,
                sizes: "300x300",
                type: "image/png",
              },
            ],
          });
        });
      }
    },
  },
};
</script>
