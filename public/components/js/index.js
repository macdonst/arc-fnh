/* global document */
const menu = document.querySelector('.js-menu')
const navUL = document.querySelector('.js-nav')

menu.addEventListener('click', () => {
  navUL.classList.toggle('menu-open')
  navUL.classList.toggle('menu-closed')
})

document.addEventListener('click', (e) => {
  if (navUL.classList.contains('menu-open') && !menu.contains(e.target)) {
    navUL.classList.remove('menu-open')
    navUL.classList.add('menu-closed')
  }
})
