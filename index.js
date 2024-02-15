import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'

export default class Chameleon {
  constructor (section, image) {
    this.image = image
    this.section = section
    this.colorThief = new ColorThief()
    this.imageColor = null

    const process = (img) => {
      this.imageColor = ((rgb, percent) => {
        let [r, g, b] = rgb;
        r = Math.min(255, r + (r * percent / 100));
        g = Math.min(255, g + (g * percent / 100));
        b = Math.min(255, b + (b * percent / 100));
        return [r, g, b];
      })(this.colorThief.getColor(img), 10);
      console.log(this.imageColor)
    };
  
    if (this.image.complete) {
      process(this.image);
    } else {
    
      this.image.onload = () => process(this.image);
      console.log(this.imageColor)
    }

  }

  addContrast = () => {

    const getClass = (rgb) => {
      const luminance = rgb.reduce((acc, val) => {
        val /= 255 // normalize RGB values to 0-1
        val = val < 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        return acc + val;
      }, 0) / 3
    
      return luminance > 0.5 ? 'light' : 'dark'
    }
    
    this.section.style.backgroundColor = `rgb(${this.imageColor.join(',')})`
    this.section.classList.add(`chameleon-${getClass(this.imageColor)}`)

  }



}