import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'

export default class Chameleon {
  /**
   * 
   * @param {HTMLElement} section 
   * @param {HTMLElement} image optional, if omitted will try to find a 
   * background-image on section
   */
  constructor (section, image = null) {

    if (image) {
      this.image = image
      this.bg = false
    } else {
      this.image = new Image()
      this.image.src = section.style.backgroundImage.slice(4, -1).replace(/["']/g, "")
      this.bg = true
    }

    this.section = section
    this.colorThief = new ColorThief()
    this.imageBgColor = null
    this.imagePalette = null
    
    this.initComplete = new Promise((resolve, reject) => {  
      const process = (img) => {
        // get image average color
        this.imageBgColor = ((rgb, percent) => {
          let [r, g, b] = rgb
          r = Math.min(255, r + (r * percent / 100))
          g = Math.min(255, g + (g * percent / 100))
          b = Math.min(255, b + (b * percent / 100))
          return [r, g, b]
        })(this.colorThief.getColor(img), 10)
        
        // get image color palette sorted by contrast ratio
        this.imagePalette = ((palette, bg) => {
          const sortColorsByContrast = (colors, bg) => 
            colors
              .map(rgb => ({rgb, ratio: this.getContrastRatio(rgb, bg).toFixed(2)}))
              .sort((a, b) => b.ratio - a.ratio)

          return sortColorsByContrast(palette, bg)
        })(this.colorThief.getPalette(img), this.imageBgColor)

        // promise resolution
        resolve()
      }
    
      if (this.image.complete) {
        process(this.image)
      } else {
        this.image.onload = () => process(this.image)
      }
    })
  }

  /**
   * @returns bg color rgb
   */
  getBgColor = () => this.initComplete.then(() => this.imageBgColor)
  
  /**
   * @returns palette [{rbg, constrast ratio}, ...]
   */
  getPalette = () => this.initComplete.then(() => this.imagePalette)

  /**
   * apply contrast to the element
   */
  applyContrast = () => {
    const getClass = (rgb) => {
      const luminance = rgb.reduce((acc, val) => {
        val /= 255 // normalize RGB values to 0-1
        val = val < 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        return acc + val;
      }, 0) / 3
    
      return luminance > 0.5 ? 'light' : 'dark'
    }

    this.initComplete.then(() => {
      if (this.bg) {
        const overlay = document.createElement("div")
        overlay.style.cssText = `position: absolute; left: 0; top: 0; right: 0; bottom: 0; 
          background-color: rgb(${this.imageBgColor.join(',')}, .6); z-index: -1;`
        overlay.className = "chameleon-overlay"
        this.section.appendChild(overlay)
        this.section.style.position = "relative"
      } else {
        this.section.style.backgroundColor = `rgb(${this.imageBgColor.join(',')})`
      }
      this.section.classList.add(`chameleon-${getClass(this.imageBgColor)}`)
    })
  }

  /**
   * apply the palette to common elements
   */
  applyPalette = () => {
    this.initComplete.then(() => {
      this.section.querySelectorAll("h1, h2, h3").forEach(header => header.style.color = `rgb(${this.imagePalette[1].rgb.join(',')})`)
      this.section.querySelectorAll("p").forEach(header => header.style.color = `rgb(${this.imagePalette[0].rgb.join(',')})`)
      this.section.querySelectorAll("a").forEach(header => header.style.color = `rgb(${this.imagePalette[2].rgb.join(',')})`)
    })
  }

  /**
   * get the color luminance
   * @param {array} rgb
   */
  getLuminance = (rgb) => {
    const a = rgb.map(v => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  /**
   * get contrast ratio
   * @param {array} rgb1
   * @param {array} rgb2
   */
  getContrastRatio = (rgb1, rgb2) => {
    const ratio = this.getLuminance(rgb1) + 0.05 / this.getLuminance(rgb2) + 0.05
    return Math.max(ratio, 1 / ratio)
  }

  /**
   * inject the palatte as colored divs into the section
   * @param {el} element to inject the palette, defaults to the section
   */
  injectPalette = (el = null) => 
    this.initComplete.then(() => {
      const palette = document.createElement('div')

      this.imagePalette.forEach(color => {
        const item = document.createElement('span')
        item.innerHTML = `rgb(${color.rgb.join(',')})<br>ratio: ${color.ratio}`
        item.style.cssText = `width: 150px; display: inline-flex;
          padding: .5rem; align-items: center;
          background-color: rgb(${color.rgb.join(',')});
          color: ${this.getLuminance(color.rgb) > 0.4 ? '#222' : '#fff'};`
        palette.appendChild(item)
      })
      
      const label = document.createElement('label')
      label.style.cssText = `color: #fff; background-color: #000; padding: .5rem; 
        display: inline-block;`
      label.innerText = "Chameleon Palette: "
      const container = document.createElement('div')
      container.className = ".chamaleon-palette"
      container.style.cssText = `margin: 1rem 0; font-size:14px; font-family: monospace;`
      container.append(label)
      container.append(palette)

      if (el) this.section.querySelector(el).appendChild(container)
      else this.section.appendChild(container)
    })
    
}
