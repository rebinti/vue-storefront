<template>
  <div class="mb-8">
    <!-- My newsletter header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('My newsletter') }}
        </h2>
      </div>
      <!-- <div class="col-12 sm:col-6">
        <div class="leading-loose flex md:justify-end" v-if="!isEdited">
          <a href="#" class="text-grey flex" @click.prevent="edit">
            <span class="pr-1">
              {{ $t('Edit newsletter preferences') }}
            </span>
            <i class="material-icons">edit</i>
          </a>
        </div>
      </div> -->
    </div>

    <!-- My newsletter body (both modes) -->
    <div class="row">
      <div class="col-12">
        <h4>
          {{ $t('General agreement') }}
        </h4>
      </div>

      <base-checkbox
        class="col-12 mb-6 testttt"        
        v-bind:class="{ 'activechecked': true }"
        id="generalAgreement"
        v-model="user.isSubscribed"
        :value="true"
        @click="isEdited ? user.isSubscribed = !user.isSubscribed : null"
        @click.native="updateNewsletter"        
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-12" v-if="isEdited">
        <hr class="border-t mt-4 mb-10">
      </div>

      <!-- <div class="col-12" v-if="isEdited">
        <div class="inline-block mr-5">
          <button-full @click.native="updateNewsletter">
            {{ $t('Update my preferences') }}
          </button-full>
        </div>

        <a href="#" @click="exitSection" class="inline-block text-grey-dark bg-grey-lighter py-2 px-3">
          {{ $t('Cancel') }}
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Newsletter } from '@vue-storefront/core/modules/newsletter/components/Newsletter'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import i18n from '@vue-storefront/i18n'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  data () {
    return {
      isEdited: true
    }
  },
  methods: {
    exitSection () {
      this.isEdited = false
    },
    edit () {
      this.isEdited = true
    },
    updateNewsletter () {
      this.user.isSubscribed = this.isSubscribed
      if(!this.user.isSubscribed && !this.isSubscribed) {
        console.log("test newsletter data AAAAAAAAAAAAAAAAAAAAa NEWWW",'SUBSCRIBED')
        this.subscribefromacccount()
        this.user.isSubscribed = true
      }else{
        console.log("test newsletter data AAAAAAAAAAAAAAAAAAAAa NEWWW",'UN-SUBSCRIBED')
        this.unsubscribe()
        this.user.isSubscribed = false    
      }
    }
  },
  mounted() {
    
    console.log("test newsletter data AAAAAAAAAAAAAAAAAAAAa on componet  NEW load!!!! - ",this.isSubscribed)
    this.user.isSubscribed = this.isSubscribed
    console.log("test newsletter data AAAAAAAAAAAAAAAAAAAAa on componet load!!!! - ",this.user.isSubscribed)
  },
  mixins: [Newsletter]
}
</script>
<style>
.activechecked .checkbox-wrap label::before {
    border-color: #4fce76;
    background-color: #4fce76;
    background-image: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-miterlimit%3D%2210%22%20points%3D%225%2C8%207%2C10%2011%2C6%20%22%2F%3E%0D%0A%3C%2Fsvg%3E");
    background-size: 12px;
}
</style>