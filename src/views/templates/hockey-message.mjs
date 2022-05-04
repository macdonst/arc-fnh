export default function HockeyMessage({ html }) {
  return html`
    <div class="pt2 pb2 pr0 pl0 flex flex-col gap-2 max-width0 m-auto">
      <div
        class="flex flex-row p2 radius3 bg-lighter shadow-1 max-width-2 m-auto">
        <slot name="message"></slot>
      </div>
    </div>
  `
}
