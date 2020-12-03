import { searchModule } from './store/search'
import { legacysearchModule } from './store/legacysearch'
import { categoryModule } from './store/category'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'search-spring'
export const SearchSpring = createModule({
  key: KEY,
  store: { modules: [
    { key: 'searchSpringSearch', module: searchModule },
    { key: 'searchSpringCategory', module: categoryModule },
    { key: 'searchSpringLegacy', module: legacysearchModule },
  ] },
})
