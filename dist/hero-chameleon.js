if (!$58a1c99caf7f9d7b$var$t) var $58a1c99caf7f9d7b$var$t = {
    map: function(t, r) {
        var n = {};
        return r ? t.map(function(t, o) {
            return n.index = o, r.call(n, t);
        }) : t.slice();
    },
    naturalOrder: function(t, r) {
        return t < r ? -1 : t > r ? 1 : 0;
    },
    sum: function(t, r) {
        var n = {};
        return t.reduce(r ? function(t, o, e) {
            return n.index = e, t + r.call(n, o);
        } : function(t, r) {
            return t + r;
        }, 0);
    },
    max: function(r, n) {
        return Math.max.apply(null, n ? $58a1c99caf7f9d7b$var$t.map(r, n) : r);
    }
};
var $58a1c99caf7f9d7b$var$r = function() {
    var r = 5, n = 8 - r, o = 1e3;
    function e(t, n, o) {
        return (t << 2 * r) + (n << r) + o;
    }
    function u(t) {
        var r = [], n = !1;
        function o() {
            r.sort(t), n = !0;
        }
        return {
            push: function(t) {
                r.push(t), n = !1;
            },
            peek: function(t) {
                return n || o(), void 0 === t && (t = r.length - 1), r[t];
            },
            pop: function() {
                return n || o(), r.pop();
            },
            size: function() {
                return r.length;
            },
            map: function(t) {
                return r.map(t);
            },
            debug: function() {
                return n || o(), r;
            }
        };
    }
    function a(t, r, n, o, e, u, a) {
        var i1 = this;
        i1.r1 = t, i1.r2 = r, i1.g1 = n, i1.g2 = o, i1.b1 = e, i1.b2 = u, i1.histo = a;
    }
    function i1() {
        this.vboxes = new u(function(r, n) {
            return $58a1c99caf7f9d7b$var$t.naturalOrder(r.vbox.count() * r.vbox.volume(), n.vbox.count() * n.vbox.volume());
        });
    }
    function c(r, n) {
        if (n.count()) {
            var o = n.r2 - n.r1 + 1, u = n.g2 - n.g1 + 1, a = $58a1c99caf7f9d7b$var$t.max([
                o,
                u,
                n.b2 - n.b1 + 1
            ]);
            if (1 == n.count()) return [
                n.copy()
            ];
            var i1, c, f, s, h = 0, v = [], l = [];
            if (a == o) for(i1 = n.r1; i1 <= n.r2; i1++){
                for(s = 0, c = n.g1; c <= n.g2; c++)for(f = n.b1; f <= n.b2; f++)s += r[e(i1, c, f)] || 0;
                v[i1] = h += s;
            }
            else if (a == u) for(i1 = n.g1; i1 <= n.g2; i1++){
                for(s = 0, c = n.r1; c <= n.r2; c++)for(f = n.b1; f <= n.b2; f++)s += r[e(c, i1, f)] || 0;
                v[i1] = h += s;
            }
            else for(i1 = n.b1; i1 <= n.b2; i1++){
                for(s = 0, c = n.r1; c <= n.r2; c++)for(f = n.g1; f <= n.g2; f++)s += r[e(c, f, i1)] || 0;
                v[i1] = h += s;
            }
            return v.forEach(function(t, r) {
                l[r] = h - t;
            }), function(t) {
                var r, o, e, u, a, c = t + "1", f = t + "2", s = 0;
                for(i1 = n[c]; i1 <= n[f]; i1++)if (v[i1] > h / 2) {
                    for(e = n.copy(), u = n.copy(), a = (r = i1 - n[c]) <= (o = n[f] - i1) ? Math.min(n[f] - 1, ~~(i1 + o / 2)) : Math.max(n[c], ~~(i1 - 1 - r / 2)); !v[a];)a++;
                    for(s = l[a]; !s && v[a - 1];)s = l[--a];
                    return e[f] = a, u[c] = e[f] + 1, [
                        e,
                        u
                    ];
                }
            }(a == o ? "r" : a == u ? "g" : "b");
        }
    }
    return a.prototype = {
        volume: function(t) {
            var r = this;
            return r._volume && !t || (r._volume = (r.r2 - r.r1 + 1) * (r.g2 - r.g1 + 1) * (r.b2 - r.b1 + 1)), r._volume;
        },
        count: function(t) {
            var r = this, n = r.histo;
            if (!r._count_set || t) {
                var o, u, a, i1 = 0;
                for(o = r.r1; o <= r.r2; o++)for(u = r.g1; u <= r.g2; u++)for(a = r.b1; a <= r.b2; a++)i1 += n[e(o, u, a)] || 0;
                r._count = i1, r._count_set = !0;
            }
            return r._count;
        },
        copy: function() {
            var t = this;
            return new a(t.r1, t.r2, t.g1, t.g2, t.b1, t.b2, t.histo);
        },
        avg: function(t) {
            var n = this, o = n.histo;
            if (!n._avg || t) {
                var u, a, i1, c, f = 0, s = 1 << 8 - r, h = 0, v = 0, l = 0;
                for(a = n.r1; a <= n.r2; a++)for(i1 = n.g1; i1 <= n.g2; i1++)for(c = n.b1; c <= n.b2; c++)f += u = o[e(a, i1, c)] || 0, h += u * (a + .5) * s, v += u * (i1 + .5) * s, l += u * (c + .5) * s;
                n._avg = f ? [
                    ~~(h / f),
                    ~~(v / f),
                    ~~(l / f)
                ] : [
                    ~~(s * (n.r1 + n.r2 + 1) / 2),
                    ~~(s * (n.g1 + n.g2 + 1) / 2),
                    ~~(s * (n.b1 + n.b2 + 1) / 2)
                ];
            }
            return n._avg;
        },
        contains: function(t) {
            var r = this, o = t[0] >> n;
            return gval = t[1] >> n, bval = t[2] >> n, o >= r.r1 && o <= r.r2 && gval >= r.g1 && gval <= r.g2 && bval >= r.b1 && bval <= r.b2;
        }
    }, i1.prototype = {
        push: function(t) {
            this.vboxes.push({
                vbox: t,
                color: t.avg()
            });
        },
        palette: function() {
            return this.vboxes.map(function(t) {
                return t.color;
            });
        },
        size: function() {
            return this.vboxes.size();
        },
        map: function(t) {
            for(var r = this.vboxes, n = 0; n < r.size(); n++)if (r.peek(n).vbox.contains(t)) return r.peek(n).color;
            return this.nearest(t);
        },
        nearest: function(t) {
            for(var r, n, o, e = this.vboxes, u = 0; u < e.size(); u++)((n = Math.sqrt(Math.pow(t[0] - e.peek(u).color[0], 2) + Math.pow(t[1] - e.peek(u).color[1], 2) + Math.pow(t[2] - e.peek(u).color[2], 2))) < r || void 0 === r) && (r = n, o = e.peek(u).color);
            return o;
        },
        forcebw: function() {
            var r = this.vboxes;
            r.sort(function(r, n) {
                return $58a1c99caf7f9d7b$var$t.naturalOrder($58a1c99caf7f9d7b$var$t.sum(r.color), $58a1c99caf7f9d7b$var$t.sum(n.color));
            });
            var n = r[0].color;
            n[0] < 5 && n[1] < 5 && n[2] < 5 && (r[0].color = [
                0,
                0,
                0
            ]);
            var o = r.length - 1, e = r[o].color;
            e[0] > 251 && e[1] > 251 && e[2] > 251 && (r[o].color = [
                255,
                255,
                255
            ]);
        }
    }, {
        quantize: function(f, s) {
            if (!f.length || s < 2 || s > 256) return !1;
            var h = function(t) {
                var o, u = new Array(1 << 3 * r);
                return t.forEach(function(t) {
                    o = e(t[0] >> n, t[1] >> n, t[2] >> n), u[o] = (u[o] || 0) + 1;
                }), u;
            }(f);
            h.forEach(function() {});
            var v = function(t, r) {
                var o, e, u, i1 = 1e6, c = 0, f = 1e6, s = 0, h = 1e6, v = 0;
                return t.forEach(function(t) {
                    (o = t[0] >> n) < i1 ? i1 = o : o > c && (c = o), (e = t[1] >> n) < f ? f = e : e > s && (s = e), (u = t[2] >> n) < h ? h = u : u > v && (v = u);
                }), new a(i1, c, f, s, h, v, r);
            }(f, h), l = new u(function(r, n) {
                return $58a1c99caf7f9d7b$var$t.naturalOrder(r.count(), n.count());
            });
            function g(t, r) {
                for(var n, e = t.size(), u = 0; u < o;){
                    if (e >= r) return;
                    if (u++ > o) return;
                    if ((n = t.pop()).count()) {
                        var a = c(h, n), i1 = a[0], f = a[1];
                        if (!i1) return;
                        t.push(i1), f && (t.push(f), e++);
                    } else t.push(n), u++;
                }
            }
            l.push(v), g(l, .75 * s);
            for(var p = new u(function(r, n) {
                return $58a1c99caf7f9d7b$var$t.naturalOrder(r.count() * r.volume(), n.count() * n.volume());
            }); l.size();)p.push(l.pop());
            g(p, s);
            for(var b = new i1; p.size();)b.push(p.pop());
            return b;
        }
    };
}().quantize, $58a1c99caf7f9d7b$var$n = function(t) {
    this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = t.naturalWidth, this.height = this.canvas.height = t.naturalHeight, this.context.drawImage(t, 0, 0, this.width, this.height);
};
$58a1c99caf7f9d7b$var$n.prototype.getImageData = function() {
    return this.context.getImageData(0, 0, this.width, this.height);
};
var $58a1c99caf7f9d7b$export$2e2bcd8739ae039 = function() {};
$58a1c99caf7f9d7b$export$2e2bcd8739ae039.prototype.getColor = function(t, r) {
    return void 0 === r && (r = 10), this.getPalette(t, 5, r)[0];
}, $58a1c99caf7f9d7b$export$2e2bcd8739ae039.prototype.getPalette = function(t, o, e) {
    var u = function(t) {
        var r = t.colorCount, n = t.quality;
        if (void 0 !== r && Number.isInteger(r)) {
            if (1 === r) throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
            r = Math.max(r, 2), r = Math.min(r, 20);
        } else r = 10;
        return (void 0 === n || !Number.isInteger(n) || n < 1) && (n = 10), {
            colorCount: r,
            quality: n
        };
    }({
        colorCount: o,
        quality: e
    }), a = new $58a1c99caf7f9d7b$var$n(t), i1 = function(t, r, n) {
        for(var o, e, u, a, i1, c = t, f = [], s = 0; s < r; s += n)e = c[0 + (o = 4 * s)], u = c[o + 1], a = c[o + 2], (void 0 === (i1 = c[o + 3]) || i1 >= 125) && (e > 250 && u > 250 && a > 250 || f.push([
            e,
            u,
            a
        ]));
        return f;
    }(a.getImageData().data, a.width * a.height, u.quality), c = $58a1c99caf7f9d7b$var$r(i1, u.colorCount);
    return c ? c.palette() : null;
}, $58a1c99caf7f9d7b$export$2e2bcd8739ae039.prototype.getColorFromUrl = function(t, r, n) {
    var o = this, e = document.createElement("img");
    e.addEventListener("load", function() {
        var u = o.getPalette(e, 5, n);
        r(u[0], t);
    }), e.src = t;
}, $58a1c99caf7f9d7b$export$2e2bcd8739ae039.prototype.getImageData = function(t, r) {
    var n = new XMLHttpRequest;
    n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function() {
        if (200 == this.status) {
            var t = new Uint8Array(this.response);
            i = t.length;
            for(var n = new Array(i), o = 0; o < t.length; o++)n[o] = String.fromCharCode(t[o]);
            var e = n.join(""), u = window.btoa(e);
            r("data:image/png;base64," + u);
        }
    }, n.send();
}, $58a1c99caf7f9d7b$export$2e2bcd8739ae039.prototype.getColorAsync = function(t, r, n) {
    var o = this;
    this.getImageData(t, function(t) {
        var e = document.createElement("img");
        e.addEventListener("load", function() {
            var t = o.getPalette(e, 5, n);
            r(t[0], this);
        }), e.src = t;
    });
};


class $6811858da700822f$export$2e2bcd8739ae039 {
    /**
   * 
   * @param {HTMLElement} section 
   * @param {HTMLElement} image optional, if omitted will try to find a 
   * background-image on section
   */ constructor(section, image = null){
        if (image) {
            this.image = image;
            this.bg = false;
        } else {
            this.image = new Image();
            this.image.src = section.style.backgroundImage.slice(4, -1).replace(/["']/g, "");
            this.bg = true;
        }
        this.section = section;
        this.colorThief = new (0, $58a1c99caf7f9d7b$export$2e2bcd8739ae039)();
        this.imageBgColor = null;
        this.imagePalette = null;
        this.initComplete = new Promise((resolve, reject)=>{
            const process = (img)=>{
                // get image average color
                this.imageBgColor = ((rgb, percent)=>{
                    let [r, g, b] = rgb;
                    r = Math.min(255, r + r * percent / 100);
                    g = Math.min(255, g + g * percent / 100);
                    b = Math.min(255, b + b * percent / 100);
                    return [
                        r,
                        g,
                        b
                    ];
                })(this.colorThief.getColor(img), 10);
                // get image color palette sorted by contrast ratio
                this.imagePalette = ((palette, bg)=>{
                    const sortColorsByContrast = (colors, bg)=>colors.map((rgb)=>({
                                rgb: rgb,
                                ratio: this.getContrastRatio(rgb, bg).toFixed(2)
                            })).sort((a, b)=>b.ratio - a.ratio);
                    return sortColorsByContrast(palette, bg);
                })(this.colorThief.getPalette(img), this.imageBgColor);
                // promise resolution
                resolve();
            };
            if (this.image.complete) process(this.image);
            else this.image.onload = ()=>process(this.image);
        });
    }
    /**
   * @returns bg color rgb
   */ getBgColor = ()=>this.initComplete.then(()=>this.imageBgColor);
    /**
   * @returns palette [{rbg, constrast ratio}, ...]
   */ getPalette = ()=>this.initComplete.then(()=>this.imagePalette);
    /**
   * apply contrast to the element
   */ applyContrast = ()=>{
        const getClass = (rgb)=>{
            const luminance = rgb.reduce((acc, val)=>{
                val /= 255 // normalize RGB values to 0-1
                ;
                val = val < 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
                return acc + val;
            }, 0) / 3;
            return luminance > 0.5 ? "light" : "dark";
        };
        this.initComplete.then(()=>{
            if (this.bg) {
                const overlay = document.createElement("div");
                overlay.style.cssText = `position: absolute; left: 0; top: 0; right: 0; bottom: 0; 
          background-color: rgb(${this.imageBgColor.join(",")}, .7); z-index: -1; backdrop-filter: blur(3px);`;
                overlay.className = "chameleon-overlay";
                this.section.appendChild(overlay);
                this.section.style.position = "relative";
            } else this.section.style.backgroundColor = `rgb(${this.imageBgColor.join(",")})`;
            this.section.classList.add(`chameleon-${getClass(this.imageBgColor)}`);
        });
    };
    /**
   * apply the palette to common elements
   */ applyPalette = ()=>{
        this.initComplete.then(()=>{
            this.section.querySelectorAll("h1, h2, h3").forEach((header)=>header.style.color = `rgb(${this.imagePalette[1].rgb.join(",")})`);
            this.section.querySelectorAll("p").forEach((header)=>header.style.color = `rgb(${this.imagePalette[0].rgb.join(",")})`);
            this.section.querySelectorAll("a").forEach((header)=>header.style.color = `rgb(${this.imagePalette[2].rgb.join(",")})`);
        });
    };
    /**
   * get the color luminance
   * @param {array} rgb
   */ getLuminance = (rgb)=>{
        const a = rgb.map((v)=>{
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    /**
   * get contrast ratio
   * @param {array} rgb1
   * @param {array} rgb2
   */ getContrastRatio = (rgb1, rgb2)=>{
        const ratio = this.getLuminance(rgb1) + 0.05 / this.getLuminance(rgb2) + 0.05;
        return Math.max(ratio, 1 / ratio);
    };
    /**
   * inject the palatte as colored divs into the section
   * @param {el} element to inject the palette, defaults to the section
   */ injectPalette = (el = null)=>this.initComplete.then(()=>{
            const palette = document.createElement("div");
            this.imagePalette.forEach((color)=>{
                const item = document.createElement("span");
                item.innerHTML = `rgb(${color.rgb.join(",")})<br>ratio: ${color.ratio}`;
                item.style.cssText = `width: 150px; display: inline-flex;
          padding: .5rem; align-items: center;
          background-color: rgb(${color.rgb.join(",")});
          color: ${this.getLuminance(color.rgb) > 0.4 ? "#222" : "#fff"};`;
                palette.appendChild(item);
            });
            const label = document.createElement("label");
            label.style.cssText = `color: #fff; background-color: #000; padding: .5rem; 
        display: inline-block;`;
            label.innerText = "Chameleon Palette: ";
            const container = document.createElement("div");
            container.className = ".chamaleon-palette";
            container.style.cssText = `margin: 1rem 0; font-size:14px; font-family: monospace;`;
            container.append(label);
            container.append(palette);
            if (el) this.section.querySelector(el).appendChild(container);
            else this.section.appendChild(container);
        });
}


export {$6811858da700822f$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=hero-chameleon.js.map
