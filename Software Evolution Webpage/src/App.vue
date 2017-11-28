<template>
  <v-app class='grey lighten-1'>
    <v-toolbar fixed flat app :clipped-left="clipped" class="blue lighten-1 white--text">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

      <v-content>
        <v-container fluid >
          <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
              <router-view></router-view>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>

    <v-footer :fixed="fixed" app class="blue lighten-1 white--text">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => {
      return {
        clipped: false,
        drawer: true,
        fixed: true,
        items: [
            {
                icon: 'account_circle',
                title: 'Upload',
                href: '/#/start',
                router: true
            },
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'XML Parser'
      }
    }
  }
</script>
