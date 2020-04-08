<template>
  <TextList
    v-if="texts"
    :items="texts"
  />
  <div v-else class="text-center mt-50">
    <v-progress-circular
      :value="20"
      indeterminate/>
  </div>
</template>

<script>
import { Text } from '@models';
import { TextList } from '@components/text';
export default {
  props: {
    texts: {
      type: Array[Text]
    }
  },
  components: {
    TextList
  }
};
</script>
