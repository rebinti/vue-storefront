import { router } from '@vue-storefront/core/app'
import config from 'config'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { localizedDispatcherRoute, localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { RouteConfig } from 'vue-router/types/router';
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

export function parametrizeRouteData (routeData: LocalizedRoute, query: { [id: string]: any } | string, storeCodeInPath: string): LocalizedRoute {
  const parametrizedRoute = Object.assign({}, routeData)
  parametrizedRoute.params = Object.assign({}, parametrizedRoute.params || {}, query)
  if (storeCodeInPath && !parametrizedRoute.name.startsWith(storeCodeInPath + '-')) {
    parametrizedRoute.name = storeCodeInPath + '-' + parametrizedRoute.name
  }
  return parametrizedRoute
}

function prepareDynamicRoutes (routeData: LocalizedRoute, path: string): RouteConfig[] {
  const userRoute = RouterManager.findByName(routeData.name)
  if (userRoute) {
    const currentStoreCode = currentStoreView().storeCode
    const dynamicRouteName = (config.defaultStoreCode !== currentStoreCode) ? `urldispatcher-${path}-${currentStoreCode}` : `urldispatcher-${path}`
    const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + path, name: dynamicRouteName })
    return [dynamicRoute]
  } else {
    return []
  }
}

export function processDynamicRoute (routeData: LocalizedRoute, path: string, addToRoutes: boolean = true): LocalizedRoute[] {
  const preparedRoutes = prepareDynamicRoutes(routeData, path)
  if (addToRoutes && preparedRoutes) {
    RouterManager.addRoutes(preparedRoutes, router)
  }
  return preparedRoutes
}

export function processMultipleDynamicRoutes (dispatcherMap: {}, addToRoutes: boolean = true): LocalizedRoute[] {
  const preparedRoutes = []
  for (const [url, routeData] of Object.entries(dispatcherMap)) {
    preparedRoutes.push(...prepareDynamicRoutes(routeData, url))
  }
  if (addToRoutes) {
    RouterManager.addRoutes(preparedRoutes, router)
  }
  return preparedRoutes
}

export function findRouteByPath (path: string): RouteConfig {
  return RouterManager.findByPath(path)
}

export function normalizeUrlPath (url: string): string {
  if (url && url.length > 0) {
    if (url[0] === '/') url = url.slice(1)
    if (url.endsWith('/')) url = url.slice(0, -1)
    const queryPos = url.indexOf('?')
    if (queryPos > 0) url = url.slice(0, queryPos)
  }
  return url
}

export function formatCategoryLink (category: { url_path: string, slug: string }): string {
  return config.seo.useUrlDispatcher ? ('/' + category.url_path).replace('.html' , '') : ('/c/' + category.slug)
}


/*
    For Working the routing from a href tag link
    from the CMS block
    @params refrence of the v-html element
*/
export function vHtmlRouter (refs) {
  let links = refs.querySelectorAll('a')
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (event) => {
      event.preventDefault()
      let target = event.target
      while (target) {
        if (target instanceof HTMLAnchorElement) {
          let link = target.getAttribute('href')
          if (link.substr(0, 4) === 'http') {
            window.location.href = link
          } else {
            router.push(localizedRoute(target.getAttribute('href'), currentStoreView().storeCode))
          }
          break
        }
        target = target.parentNode
      }
      event.preventDefault()
    })
  }
}

export function formatProductLink (
  product: {
    parentSku?: string,
    sku: string,
    url_path?: string,
    type_id: string,
    slug: string,
    configurable_children: []
  },
  storeCode
): string | LocalizedRoute {
  if (config.seo.useUrlDispatcher && product.url_path) {
    let routeData: LocalizedRoute;
    product.url_path =  product.url_path.replace('.html' , '');
    if (product.configurable_children && product.configurable_children.length > 0) {
      routeData = {
        path: product.url_path,
        // params: { childSku: product.sku }
      }
    } else {
      routeData = { path: product.url_path }
    }
    return localizedDispatcherRoute(routeData, storeCode)
  } else {
    const routeData: LocalizedRoute = {
      name: product.type_id + '-product',
      params: {
        parentSku: product.parentSku ? product.parentSku : product.sku,
        slug: product.slug,
        childSku: product.sku
      }
    }
    return localizedRoute(routeData, storeCode)
  }
}
