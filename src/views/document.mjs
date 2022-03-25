export default function Document(body = '') {
  return /* html */ `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/components/css/styles.css"/>
      <style>
      .bg-gradient {
        background-image: var(--bg-gradient)
      }
      .heading-size {
        font-size: clamp(2.5rem, 15vw, 8rem);
      }
      .sparkle-size {
        font-size: clamp(0rem, 10vw, 4rem);
      }
      .bg-hover-dark-blue:hover {
        background-color: var(--dark-blue);
      }
      .bg-blue,
      .bg-blue:active {
        background-color: var(--blue);
      }
      .color-hover-white:hover {
        color: var(--white);
      }
      .color-light {
        color: var(--light);
      }
      .border-gradient {
        border-color: var(--blue);
      }
      .max-w-form {
        max-width: 21.78rem;
      }
    </style>
    </head>
    <body class="font-sans">
    ${body}
    </body>
  </html>
    `
}
