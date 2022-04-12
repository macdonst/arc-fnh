export default function HockeyIcon({ html, state = {} }) {
  const { icon = 'hockey', style, classNames } = state.attrs
  return html`
    <svg
      ${style ? `style="${style}"` : ''}
      ${classNames ? `class="${classNames}"` : ''}>
      <use xlink:href="#${icon}"></use>
    </svg>
  `
}
