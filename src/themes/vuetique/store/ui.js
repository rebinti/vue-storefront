const actions = {
  closeWishlist ({ commit, state }) {
    commit('setWishlist', false)
  },
  closeReviewPanel ({ commit, state }) {
    commit('setReviewPanel', false)
  }
}

export default {
  actions
}
