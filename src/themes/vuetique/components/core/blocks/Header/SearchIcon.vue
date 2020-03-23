<template>
 <router-link
      class="block no-underline product-link"
      :to="'/search-spring'"
      data-testid="productLink"
    >
  <button
    type="button"
    :aria-label="$t('Open search panel')"
    class="bg-transparent border-0"
    data-testid="openSearchPanel"
  >
      <!-- @click="toggleSearchpanel" -->
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#search" />
    </svg>
  </button>
 </router-link>
</template>

<script>
import SearchIcon from '@vue-storefront/core/compatibility/components/blocks/Header/SearchIcon'

export default {
  mixins: [SearchIcon]
}
</script>
