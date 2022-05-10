export default function EnhanceTBody({ html }) {
  return html`
    <style>
      :host,
      enhance-tbody {
        display: contents;
      }
    </style>
    <div class="display-tbody">
      <slot></slot>
    </div>
  `
}
