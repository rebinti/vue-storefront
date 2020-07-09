<template>
  <div class="bg-grey-lightest">
    <div class="container text-xs text-grey leading-normal truncate py-4 breadcrumbs">
      <span v-for="link in routes" :key="link.route_link">
        <router-link :to="localizedRoute('/')" v-if='(link.name =="Default Category")' class="text-grey">
         Home
        </router-link> 
         <router-link :to="localizedRoute(link.route_link)" v-else class="text-grey">
          {{ link.name | htmlDecode }}
        </router-link> 
        <span class="px-2">&rsaquo;</span>
      </span>
      <span class="text-grey-dark">
        {{ activeRoute | htmlDecode }}
      </span>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>
