<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница"
         href="#" @click.prevent="paginate(page - 1)" :class="{'pagination__link--disabled': isFirst}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" href="#"
         @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
         @click.prevent="paginate(page + 1)" :class="{'pagination__link--disabled': isLast}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>

export default {
  model: {
    prop: 'page',
    event: 'paginate'
  },
  props: ['page', 'count', 'perPage'],
  name: "BasePagination",
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    isLast() {
      return this.page === this.pages;
    },
    isFirst() {
      return this.page === 1;
    }
  },
  methods: {
    paginate(page) {
      if (1 <= page && page <= this.pages)
        this.$emit('paginate', page);
    }
  }
}
</script>