import { SearchSpringState } from '../types/SearchSpringState'

export const state: SearchSpringState = {
  currentPage: 1,
  squery: '',
  searchRes: null,
  serachedProd: [],
  filterData: [],
  categoryHierarchy: [],
  priceSliderData: {},
  priceSliderActiveRange: [],
  sortingFilterSelcted: '',
  sortingFilterOptions: [],
  paginationLoader: false,
  mobileFilters: false
}

