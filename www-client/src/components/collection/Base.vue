<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-col class="">
        {{ author.name }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Collection } from '@models';

export default {
  name: 'collection-base',
  data () {
    return {
      className: ''
    };
  },
  props: {
    collection: Collection
  }
};
</script>
