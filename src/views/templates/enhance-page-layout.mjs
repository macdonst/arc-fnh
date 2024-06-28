export default function EnhancePageLayout({ html, state = {} }) {
  const {
    mobileBreakpoint = '26rem',
    desktopBreakpoint = '80rem',
    maxSidebarWidth = '16rem',
    minContentWidth = '16rem'
  } = state.attrs
  return html`
    <style scope="global">
      :host,
      enhance-page-layout {
        min-height: 100vh;
        display: grid;
        grid-template-areas:
          'header'
          'left-sidebar'
          'main'
          'footer';
        grid-template-rows: min-content min-content 1fr min-content;
      }
      [slot='header'] {
        grid-area: header;
      }
      [slot='left-sidebar'] {
        grid-area: left-sidebar;
      }
      [slot='main'] {
        grid-area: main;
      }
      [slot='right-sidebar'] {
        grid-area: right-sidebar;
        display: none;
      }
      [slot='footer'] {
        grid-area: footer;
      }
      @media (min-width: ${mobileBreakpoint}) {
        :host,
        enhance-page-layout {
          grid-template:
            'header             header' min-content
            'left-sidebar       main  ' 1fr
            'footer             footer' min-content
            / minmax(auto, ${maxSidebarWidth}) minmax(${minContentWidth}, 1fr);
        }
      }
      @media (min-width: ${desktopBreakpoint}) {
        :host,
        enhance-page-layout {
          grid-template:
            'header             header             header' min-content
            'left-sidebar       main               right-sidebar' 1fr
            'footer             footer             footer' min-content
            / minmax(auto, ${maxSidebarWidth}) minmax(${minContentWidth}, 1fr) minmax(auto, ${maxSidebarWidth});
        }
        [slot='right-sidebar'] {
          grid-area: right-sidebar;
          display: block;
        }
      }
    </style>

    <slot name="header"></slot>
    <slot name="left-sidebar"></slot>
    <slot name="main"></slot>
    <slot name="right-sidebar"></slot>
    <slot name="footer"></slot>
  `
}
