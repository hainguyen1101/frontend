<template>
  <div id="app">
    <router-view />
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  import axios from "axios";
  import IndexRouter from './router/index';
  import auth from './app/auth';
  import { mapState } from 'vuex';

  export default {
    name: 'app',
    // computed: {
    //   ...mapState(['showOverlay'])
    // },

    data() {
      return {
        overlay:false
      }
    }, mounted() {

    },
    created: function () {
      axios.interceptors.request.use(config => {
        this.overlay = true;
        let token = auth.auth.getSignInUserSession().getAccessToken().jwtToken;
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
        return config
      }, error => Promise.reject(error)
      )
      axios.interceptors.response.use(response => {
        this.overlay = false;
        return response
      }, error => {
        this.overlay = false;
        return Promise.reject(error)
      })
    },
    methods: {
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>