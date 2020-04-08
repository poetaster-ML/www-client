<template>
  <v-row class='text-tool' no-gutters>
    <v-col>
      <v-switch
        v-model='selected'
        @change='onChange'
      >
        <template #label>
          {{ display }}
        </template>
      </v-switch>
    </v-col>
  </v-row>
</template>
<script>
import { capitalize } from '@/utils/string';

export default {
  data: () => ({
    selected: false
  }),
  props: {
    textRoute: Function,
    type: String
  },
  methods: {
    onChange () {
      if (this.selected) {
        const { query } = this;
        const route = this.textRoute({ query });
        this.$router.push(route, { appendQuery: true });
      } else {
        this.$router.removeQuery(this.query);
      }
    }
  },
  computed: {
    display () {
      return capitalize(this.type);
    },
    query () {
      return { annotation: this.type };
    }
  },
  created () {
    this.selected = !!this.annotations[this.type];
  }
};
</script>
