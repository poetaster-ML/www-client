<script>
import Base from './Base.vue';
export default {
  name: 'text-detail-view',
  extends: Base,
  methods: {
    mainDblClick () {
      this.$router.push(this.currentText.editRoute);
    }
  }
};
</script>
