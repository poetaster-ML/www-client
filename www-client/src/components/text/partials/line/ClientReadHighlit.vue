<template>
  <div class='line'>
    <template v-for='(token, idx) in line.tokens'>
      <component
        :is='getTokenComponent(token)'
        :token='token'
        :key='idx'
      >
        <template v-if='idx !== line.tokens.length - 1' #post>&nbsp;</template>
      </component>
    </template>
  </div>
</template>

<script>
import Base from './Base.vue';
import { TextTokenRead, TextTokenReadHighlit } from '@components/text/partials';

export default {
  extends: Base,
  methods: {
    getTokenComponent (token) {
      return token.isHighlit
        ? TextTokenReadHighlit
        : TextTokenRead;
    }
  }
};
</script>
