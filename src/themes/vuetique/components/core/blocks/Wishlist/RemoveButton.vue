<template>
  <button class="border-0 bg-transparent textt-black text-grey hover:text-grey-dark">
    <span class="hidden">
      {{ $t('Remove') }}
    </span>
    <svg viewBox="0 0 25 25" class="vt-icon--sm"><use xlink:href="#trash" /></svg>
  </button>
</template>

<style lang="scss" scoped>
.textt-black { color:#000!important; }
@media (max-width: 576px) {
  // .button_bx_link_lrg .vt-icon--sm{
  //   width:28px;
  //   height:28px;
  //   color: #000
  // }
  
}

</style>