import { searchModule } from './store/search'
import { categoryModule } from './store/category'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'search-spring'
export const SearchSpring = createModule({
  key: KEY,
  store: { modules: [
    { key: 'searchSpringSearch', module: searchModule },
    { key: 'searchSpringCategory', module: categoryModule },
  ] },
})
