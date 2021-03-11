

 export function handleScroll (headerClass, footerClass) {
    const viewFooterReachedflag = checkElemetReachedInViewPort(footerClass)
    const isHeaderCategoryShow = checkElemetReachedInViewPort(headerClass)
    let filterdiv = document.querySelector('.filterdiv') 

    let parent = document.getElementById('parent-block');
    let child = document.getElementById('child-block');
    if(child){
      child.style.paddingRight = child.offsetWidth - child.clientWidth + "px";
    }    
    if (isHeaderCategoryShow && viewFooterReachedflag ) {
      if(filterdiv) {
          filterdiv.classList.remove("fixed");
          filterdiv.classList.remove("footerreached");
      } 
      return
    }
    if (!isHeaderCategoryShow) {
      if(!viewFooterReachedflag) {
        const scrollTop = window.scrollY || window.pageYOffset        
        const filterdivheight = document.getElementById('expand-filterdiv').offsetHeight        
        if(scrollTop>=filterdivheight){
          if(filterdiv) filterdiv.classList.add("fixed");
        }        
      }
    } else {
       if(filterdiv) filterdiv.classList.remove("fixed");
    }
    if (viewFooterReachedflag) {
      // filterdiv = document.querySelector( '.filterdiv' ) // .classList.add("footerreached");
      if (filterdiv) {
        filterdiv.classList.add("footerreached");
        filterdiv.classList.remove("fixed");
      }
    } else {
      filterdiv = document.querySelector( '.filterdiv' ) // .classList.remove("footerreached");
       if (filterdiv) {
        filterdiv.classList.remove("footerreached");
      }
    }
}

export function  checkElemetReachedInViewPort (className) {
    const el = document.querySelector(className) // '.news-letter'
    if (!el) return false
    const scroll = window.scrollY || window.pageYOffset
    const boundsTop = el.getBoundingClientRect().top + scroll
    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
      }
    const bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight,
      }
    return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom )
      || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
}

export function  getdivheight(divclass) {
    const el = document.querySelector(divclass).getBoundingClientRect().height
    return el;
}
