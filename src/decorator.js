
export const anouncesDecorator = (anounces) => {
  return anounces.map(anounce => {
    if (!anounce.img) {
      anounce.img = 'http://semantic-ui.com/images/wireframe/image.png'
    }
    return anounce
  })
}

