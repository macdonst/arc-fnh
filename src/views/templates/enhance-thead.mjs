export default function EnhanceTHead({ html }) {
  return html`
    <style>
      :host,
      enhance-thead {
        display: contents;
      }
    </style>
    <div class="display-thead">
      <slot></slot>
    </div>
  `
}
