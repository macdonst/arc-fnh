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
    color-white
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
    bg-blue
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
        mr2
        text-g0
        text-h0
        text-a2
        items-center
        cursor-pointer
      ">
            🏒 Friday Night Hockey
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
      ">
            <span
              class="
         flex-lg
         flex-grow
         justify-between
        ">
              <a
                class="
flex
uppercase
items-center
font-medium
leading5
text-p8
radius-pill
text-h0
mb-2
mb-none-lg
mr-0-lg
pr1
pl0
bg-a3
no-underline
"
                alt="Games"
                href="/games">
                <div class="icon-nav mr-2 f-p26">
                  <span class="ss-icon ss-calendar"></span>
                </div>

                <span>Schedule</span>
              </a>
              <a
                class="
flex
uppercase
items-center
font-medium
leading5
text-p8
radius-pill
text-h0
mb-2
mb-none-lg
mr-0-lg
pr1
pl0
bg-a3
no-underline
"
                alt="Players"
                href="/players">
                <div class="icon-nav mr-2 f-p26">
                  <span class="ss-icon ss-user"></span>
                </div>

                <span>Players</span>
              </a>
              <a
                class="
flex
uppercase
items-center
font-medium
leading5
text-p8
radius-pill
text-h0
mb-2
mb-none-lg
mr-0-lg
pr1
pl0
bg-a3
no-underline
"
                alt="Spares"
                href="/players?type=spares">
                <div class="icon-nav mr-2 f-p26">
                  <span class="ss-icon ss-users"></span>
                </div>

                <span>Spares</span>
              </a>
            </span>
          </nav>
          <span
            class="
       flex
       justify-end
       flex-grow
       mb0
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
            Add an icon here
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
        }
        connectedCallback() {}
      }
      customElements.define('hockey-header', HockeyHeader)
    </script>
  `
}
