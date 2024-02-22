# Hero Chameleon
Simple package to use the color palette from an image to apply contrast, classes and styles to content.

See examples [here](https://lintmycode.github.io/hero-chameleon/).

Github [here](https://github.com/lintmycode/hero-chameleon).

Chameleon uses [Color Thief](https://lokeshdhakar.com/projects/color-thief) to extract colors from the given image.

## Install
```
npm install hero-chameleon
```

## Usage
Import the Chameleon class.
```
import Chameleon from "./node_modules/hero-chameleon/hero-chameleon.js"
```

Create a Chameleon instance for `.hero` section.
```
// this will look for a background image on .hero
const chameleon = new Chameleon(
  document.querySelector(".hero")
)

// this will take an image parameter
const chameleon = new Chameleon(
  document.querySelector(".hero"),
  document.querySelector(".hero img"),
)
```

Apply contrast to the section; Chameleon will add a bg color inline based on the image's average color and a class (`chameleon-light` or `chameleon-dark`) depending on the bg luminance.
```
chameleon.applyContrast()
```

Apply the palette to the elements. Current elements targeted automatically are `h1`, `h2`, `h3`, `p` and `a`.
```
chameleon.applyPalette()
```

Or get the palette for other style needs.
```
chameleon.getPalette()
// returns an array with colors and contrast ratios agains bg color
// [ {rgb, ratio}, ... ]
```

## Auxiliary methods
Get color luminance:
```
chameleon.getLuminance(rgb)
```

Get contrast ratio (1-21):
```
chameleon.getContrastRatio(rgb1, rgb2)
```
Inject palette element in the section for debug/show off:

```
// directly in the current section
chameleon.injectPalette()

// or in a child
chameleon.injectPalette(".section-child")
```
