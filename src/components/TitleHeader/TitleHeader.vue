<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    :title="title"
    :breadcrumb="{ props: { routes } }"
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ""
    },
    subTitle: {
      type: String,
      required: false,
      default: ""
    },
    routes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
