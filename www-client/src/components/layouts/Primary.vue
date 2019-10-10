<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <slot name='nav-text-tools'></slot>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      flat
      class="nav-global"
    >
      <slot name="nav-global"></slot>
      <div class="nav-global__border"></div>
    </v-app-bar>

    <v-navigation-drawer
      width="200"
      class="nav-index"
      app
    >
      <template #prepend>
        <router-link :to="{ name: 'home' }">
          <icon-home/>
        </router-link>
      </template>
      <slot name='nav-index'></slot>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <slot name="main"></slot>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import IconHome from '@icons/Home.vue';

export default {
  name: 'layout-primary',
  components: {
    IconHome
  },
  data: () => ({
    drawerRight: null
  })
};
</script>
