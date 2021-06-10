<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="{ disabled: !pages.has_pre }" class="page-item">
        <a
          @click.prevent="updatePage(pages.current_page - 1)"
          class="page-link"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
        class="page-item"
      >
        <a @click.prevent="updatePage(page)" class="page-link" href="#">{{
          page
        }}</a>
      </li>
      <li :class="{ disabled: !pages.has_next }" class="page-item">
        <a
          @click.prevent="updatePage(pages.current_page + 1)"
          class="page-link"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    updatePage(page) {
      this.$emit('emit-pages', page);
    },
  },
};
</script>
