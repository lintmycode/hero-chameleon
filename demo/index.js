import Chameleon from "../hero-chameleon.js"

// hero section
const chameleon = new Chameleon(
  document.querySelector(".hero")
)
chameleon.applyContrast()
chameleon.applyPalette()

// article blocks
const demos = [
  { title: "Lorem ipsum", content: "Added contrast and palette from the image.", image: "demo1.jpg", contrast: true, palette: true },
  { title: "Esse culpa elit tempor magna", content: "Added contrast and palette from the image.", image: "demo2.jpg", contrast: true, palette: true },
  { title: "Reprehenderit fugiat labore", content: "Added contrast only.", image: "demo3.jpg", contrast: true, palette: false },
  { title: "Id nulla do velit", content: "Added contrast and palette from the image.", image: "demo4.jpg", contrast: true, palette: true },
  { title: "Do ea nisi aute si.", content: "Added contrast and palette from the image.", image: "demo5.jpg", contrast: true, palette: true },
  { title: "Irure id nostrud dolor", content: "Added contrast and palette from the image.", image: "demo6.jpg", contrast: true, palette: true },
]

demos.forEach((demo, index) => {
  const article = document.createElement("article")
  article.id = "demo-" + index,
  article.className = "text-image"
  article.innerHTML = `
    <main>
      <h2>${demo.title}</h2>
      <p>${demo.content}</p>
      <a href="#">Link</a>
    </main>
    <aside>
      <img src="img/${demo.image}">
    </aside>
  `
  document.querySelector("body").appendChild(article)

  // initialize Chameleon with the article and the image to process
  const chameleon = new Chameleon(
    article,
    article.querySelector("img")
  )

  if (demo.contrast) {
    // add the image's average color as background color 
    // and a class to the article (chameleon-dark or chameleon-white)
    chameleon.applyContrast()
  }
  
  if (demo.palette) {
    // apply palette to the header, p and a elements
    chameleon.applyPalette()
  }

  // print palette because its cool
  chameleon.injectPalette("main")
})
