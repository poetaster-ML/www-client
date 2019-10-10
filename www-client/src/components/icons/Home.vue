<template>
  <v-img position="center center" class="icon-home">
     <v-row
        class="fill-height mb-5"
        align="center"
        justify="center"
      >
      <Logo
        :height="x"
        :width="y"
      />
    </v-row>
  </v-img>
</template>
<script>
import Logo from '@assets/logo-spare.svg';

export default {
  name: 'icon-home',
  data: () => ({
    x: 150,
    y: 150
  }),
  components: {
    Logo
  }
};
</script>
