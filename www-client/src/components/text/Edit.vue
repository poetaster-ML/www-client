<template>
  <div class="text-edit" @dblclick.native="mainDblClick">
    <TextTitleRead :title="text.title"/>
    <v-textarea :value="text.raw" autoGrow fullWidth noResize/>
  </div>
</template>
<script>
import Base from './Base';
import { TextTitleRead } from './partials';
export default {
  name: 'text-edit',
  extends: Base,
  components: {
    TextTitleRead
  }
};
</script>
