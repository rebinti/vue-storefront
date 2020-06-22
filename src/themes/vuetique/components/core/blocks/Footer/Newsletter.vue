<template>
  <div class="row newsletter">
    <div class="col-12" >


      <div class="container">

        <div class="bx-form_out_main">

          <div class="bx-form_out">

            <h3 class="text-center lg:text-left">
              {{ $t('SIGN UP AND GET 10% OFF YOUR FIRST ORDER!') }}
            </h3>

            <button-full
              class="btn-primary newsletter-btn w-full"
              @click.native="$bus.$emit('modal-show', 'modal-newsletter')"
              data-testid="openNewsletterButton">
              {{ $t('Subscribe') }}
            </button-full>

          </div>

          </div>

      </div>


    </div>
  </div>
        
    
</template>

<script>
import ButtonFull from 'theme/components/theme/ButtonFull'
import { mapState } from 'vuex'

export default {
  name: 'Newsletter',
  computed: {
    ...mapState({
      isOpen: state => state.ui.newsletterPopup,
      isSubscribed: state => state.mailchimp.isSubscribed
    })
  },
  methods: {
    newsletterClick () {
      this.$store.commit('ui/setNewsletterPopup', !this.isOpen)
    }
  },
  components: {
    ButtonFull
  }
}
</script>

<style scoped>

  .newsletter-btn {
    padding-left: 52px;
    padding-right: 52px;
  }

  .bx-form_out{
    max-width: 1000px;
    margin:0 auto;
  }

  .bx-form_out h3{
    float: left;
  }
  .bx-form_out .newsletter-btn{
    float: left;
    margin-left: 50px;
    width:auto;
  }

  .bx-form_out_main{
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width:100%;
  }

  .newsletter{
    position: relative;
    height: 100%;
  }
  @media (min-width: 1024px) {
    .newsletter-btn{
      border: 1px solid #FFFFFF;
    }
  }
  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;      
    }
  }
  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>
