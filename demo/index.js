import Chameleon from "./node_modules/hero-chameleon/index.js"

let chameleon = null

// demo 1
chameleon = new Chameleon(
  document.querySelector("#demo-1"),
  document.querySelector("#demo-1 img")
)
console.log(chameleon)

chameleon.addContrast()

// demo 2
chameleon = new Chameleon(
  document.querySelector("#demo-2"),
  document.querySelector("#demo-2 img")
)
chameleon.addContrast()

// demo 3
chameleon = new Chameleon(
  document.querySelector("#demo-3"),
  document.querySelector("#demo-3 img")
)
chameleon.addContrast()