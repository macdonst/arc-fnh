export default function HockeyHeaderTemplate({ html, state = {} }) {
  const { account } = state.store
  const btn = account
    ? '<hockey-logout-button></hockey-logout-button>'
    : '<hockey-login-button></hockey-login-button>'

  return html`
    <div
      class="
    sticky
    top0
    z1
    color-dark
    color-hover-darkest
  ">
      <header
        class="
    right0
    left0
    flex
    items-center
    justify-between
    top0
    pt0
    pb0
    bg-p5
    text-g0
    overflow-hidden
    bg-light
  ">
        <div
          class="
     flex
     items-center
     justify-between
     w-full
     pr1
     pl1
     bg-p5
   ">
          <a
            aria-label="Friday Night Hockey"
            href="/"
            class="
        flex
        mr2
        text-g0
        text-h0
        text-a2
        items-center
        cursor-pointer
      ">
      <hockey-icon style="width: 1.5rem; height: 1.5rem;"
      class="mr-2 color-fill-dark" icon="hockey"></hockey-icon>
            Friday Night Hockey
          </a>
          <nav
            class="
        js-nav
        header-nav
        absolute
        static-lg
        top0-lg
        right0
        left0
        flex-grow
        flex-lg
        flex-col
        flex-row-lg
        justify-between
        max-width-post-layout
        w-full
        pt-none-lg
        pb-none-lg
        pl-none-lg
        pr-none-lg
        pt0
        pb2
        pr-3
        pl-3
        bg-p5
        radius1
        radius-tr-none
        radous-br-none
        overflow-hidden
        overflow-visible-lg
        menu-transition
        menu-closed
        z-1
        z0-lg
        bg-light
      ">
            <span
              class="
         flex-lg
         flex-grow
         justify-center
        ">
        <hockey-header-tab
          label="Schedule"
          href="/seasons"
          icon="calendar">
        </hockey-header-tab>
        <hockey-header-tab
          label="Players"
          href="/players"
          icon="user">
        </hockey-header-tab>
        <hockey-header-tab
          label="Spares"
          href="/players?type=spares"
          icon="users">
        </hockey-header-tab>
          </nav>
          <span
            class="
       flex
       justify-end
       flex-grow
       mb-none-lg
     ">
            ${btn}
          </span>
        </div>
        <div
          class="
      flex
      items-center
      justify-between
      hidden-lg
    ">
          <button
            aria-label="Menu"
            class="
        js-menu
        pr1
        bg-unset
        text-g0
        text-h0
        text-a2
        cursor-pointer
        bg-p0
      ">
            <hockey-icon style="width: 1rem; height: 1rem;" class="mr-2 color-fill-dark" icon="hamburger"></hockey-icon>
          </button>
        </div>
        <div
          class="
      indicator
      bg-image0
      absolute
      right0
      bottom0
      left0
    "></div>
      </header>
    </div>

    <script type="module">
      class HockeyHeader extends HTMLElement {
        constructor() {
          super()
          this.menu = this.querySelector('.js-menu')
          this.navUL = this.querySelector('.js-nav')
          this.toggleMenu = this.toggleMenu.bind(this)
          this.handleClickOutsideMenu = this.handleClickOutsideMenu.bind(this)
          this.menu.addEventListener('click', this.toggleMenu)
          document.addEventListener('click', this.handleClickOutsideMenu)
        }
        disconnectedCallback() {
          document.removeEventListener(this.handleClickOutsideMenu)
        }
        toggleMenu(e) {
          this.navUL.classList.toggle('menu-open')
          this.navUL.classList.toggle('menu-closed')
        }
        handleClickOutsideMenu(e) {
          if (
            this.navUL.classList.contains('menu-open') &&
            !this.menu.contains(e.target)
          ) {
            this.navUL.classList.remove('menu-open')
            this.navUL.classList.add('menu-closed')
          }
        }
      }
      customElements.define('hockey-header', HockeyHeader)
    </script>
  `
}
