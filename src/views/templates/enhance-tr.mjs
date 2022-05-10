export default function EnhanceTR({ html }) {
  return html`
    <style>
      enhance-tr {
        display: contents;
      }
    </style>
    <div class="display-tr">
      <slot></slot>
    </div>
  `
}
