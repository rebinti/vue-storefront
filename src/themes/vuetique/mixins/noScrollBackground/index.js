export default {
  beforeCreate () {
    // to fix background scroll issue when the modal opened
    const el = document.body;
    el.classList.add('disable-scrolling');
    document.documentElement.classList.add('disable-scrolling')
  },
  destroyed () {
    const el = document.body;
    el.classList.remove('disable-scrolling');
    document.documentElement.classList.remove('disable-scrolling')
  }
}
