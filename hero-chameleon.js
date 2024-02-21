import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'

export default class Chameleon {
  /**
   * 
   * @param {HTMLElement} section 
   * @param {HTMLElement} image 
   */
  constructor (section, image) {
    this.image = image
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
      this.section.style.backgroundColor = `rgb(${this.imageBgColor.join(',')})`
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
}
