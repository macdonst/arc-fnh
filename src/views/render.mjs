import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'

export default function render(str = '', initialState = {}) {
  const html = enhance({ elements, initialState })
  return Document(html`${str}`)
}
