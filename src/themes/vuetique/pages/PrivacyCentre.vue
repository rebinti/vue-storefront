<template>
  <div id="privacy_center" class="privacy_center">    
	<iframe data-cookieconsent="ignore" style="position:fixed;border:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" src="https://app.dataships.io/privacycenter/f4nIJ0NEbIKN4Qs2jVsAnouSqJkWjaah"></iframe>           
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'PrivacyCentre',  
  mounted() {
  let datashipscript = document.write("<script id='pc' type='text/javascript' src='https://api.dataships.io/js/pc.js?apikey=f4nIJ0NEbIKN4Qs2jVsAnouSqJkWjaah&v="+Date.now()+"' async defer></scr"+"ipt>")  
  document.body.appendChild(datashipscript)   

  let script = document.createElement("script");
  script.onload = function () { namespaced.func.init(); };    
  script.src = "https://api.dataships.io/js/pc.js?apikey=f4nIJ0NEbIKN4Qs2jVsAnouSqJkWjaah&v="+Date.now()+"";
  document.body.appendChild(script);

  let newscript = document.createElement("script")
  newscript.setAttribute('src', "https://api.dataships.io/js/pc.js?apikey=f4nIJ0NEbIKN4Qs2jVsAnouSqJkWjaah&v="+Date.now())
  newscript.setAttribute('id', 'pc')
  document.head.appendChild(newscript)
  },
  beforeMount () { 
  let datashipscript = document.write("<script id='pc' type='text/javascript' src='https://api.dataships.io/js/pc.js?apikey=f4nIJ0NEbIKN4Qs2jVsAnouSqJkWjaah&v="+Date.now()+"' async defer></scr"+"ipt>")  
  document.body.appendChild(datashipscript)    
  },    
}
</script>
<style scoped lang="scss">  
</style>
