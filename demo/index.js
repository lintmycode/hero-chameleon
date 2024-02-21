import Chameleon from "./node_modules/hero-chameleon/hero-chameleon.js"

const demos = [
  { title: "Lorem ipsum", content: "Added contrast and palette from the image.", image: "demo1.jpg", contrast: true, palette: true },
  { title: "Esse culpa elit tempor magna", content: "Added contrast and palette from the image.", image: "demo2.jpg", contrast: true, palette: true },
  { title: "Reprehenderit fugiat labore", content: "Added contrast only.", image: "demo3.jpg", contrast: true, palette: false },
  { title: "Id nulla do velit", content: "Added contrast and palette from the image.", image: "demo4.jpg", contrast: true, palette: true },
  { title: "Do ea nisi aute si.", content: "Added contrast and palette from the image.", image: "demo5.jpg", contrast: true, palette: true },
  { title: "Irure id nostrud dolor", content: "Added contrast and palette from the image.", image: "demo6.jpg", contrast: true, palette: true },
]

demos.forEach((demo, index) => {
  const section = document.createElement('section')
  section.id = "demo-" + index,
  section.innerHTML = `
    <article>
      <h2>${demo.title}</h2>
      <p>${demo.content}</p>
      <a href="#">Read more</a>
      <div class="palette"></div>
    </article>
    <aside>
      <img src="img/${demo.image}">
    </aside>
  `
  document.querySelector("body").appendChild(section)

  // initialize Chameleon with the section and the image to process
  const chameleon = new Chameleon(
    section,
    section.querySelector("img")
  )

  if (demo.contrast) {
    // add the image's average color as background color 
    // and a class to the section (chameleon-dark or chameleon-white)
    chameleon.applyContrast()
  }
  
  if (demo.palette) {
    // apply palette to the header, p and a elements
    chameleon.applyPalette()
  
    // print color palette from the image
    // sorted by contrast ratio against bg color
    chameleon.getPalette()
      .then(palette => {
        palette.forEach(color => {
          const span = document.createElement('span')
          span.className = 'color-box'
          span.style.backgroundColor = `rgb(${color.rgb.join(',')})`
          span.style.color = chameleon.getLuminance(color.rgb) > 0.4 ? '#222' : '#fff'
          span.innerHTML = `rgb(${color.rgb.join(',')})<br>ratio: ${color.ratio}`
          section.querySelector(".palette").appendChild(span)
        })
      })  
  }
})
