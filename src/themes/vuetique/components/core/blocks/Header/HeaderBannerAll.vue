<template>
  <div class="headerbannerall" v-if="this.$route.query.tag!=''">
    <div class="menu-under-banner" data-wps-ad="wps_sgdyyKV-nP.1-0" style="background-image: none;">
        <div data-wps-guard="true" style="position: relative;">
            <div>        
                <router-link
                class="block no-underline product-link"
                :to="'/search?q=&amp;tag=test'"
                data-testid="search"
                @click.native="headbannerclick"
                >
                    <div style=" background:#000;text-align: center;padding-top:15px;padding-bottom:10px;font-weight: bold;color: white;font-size:15pt;">

                    <img style=" display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 50%;" src="https://cdn.iclothing.com/media/wysiwyg/2020/black-friday/bf-deals.gif">
            
                    </div>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      headbannersearch: [],
    }
  },
  methods: {
    headbannerclick () {
      if(this.$route.query.tag){
        let tagsearchdata = [{tagquery: 'tag',tagquerydata: this.$route.query.tag,}];
        Vue.prototype.$bus.$emit('search-in-search-spring', tagsearchdata );
      } 
    }
  },  
}
</script>

<style lang="scss" scoped>
</style>
