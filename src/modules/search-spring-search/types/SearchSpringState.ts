export interface SearchSpringState {
    currentPage: number,
    squery: string,
    searchRes: any,
    serachedProd: any[],
    filterData: any[],
    categoryHierarchy: any[],
    priceSliderData?: object,
    priceSliderActiveRange: any[],
    sortingFilterSelcted: string,
    sortingFilterOptions: any[],
    paginationLoader: boolean,
    mobileFilters: boolean
}
  