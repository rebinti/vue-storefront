<template>
  <button class="border-0 bg-transparent text-grey hover:text-grey-dark">
    <span class="hidden">
      {{ $t('Remove') }}
    </span>
    <svg viewBox="0 0 25 25" class="vt-icon--sm"><use xlink:href="#trash" /></svg>
  </button>
</template>

<style lang="scss" scoped>

.button_bx_link_lrg .vt-icon--sm{
  width:28px;
  height:28px;
}

</style>