var a, b;
"undefined" != typeof navigator &&
  ((a = window || {}),
  (b = function (window) {
    "use strict";
    var svgNS = "http://www.w3.org/2000/svg",
      locationHref = "",
      initialDefaultFrame = -999999,
      subframeEnabled = !0,
      expressionsPlugin,
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      cachedColors = {},
      bm_rounder = Math.round,
      bm_rnd,
      bm_pow = Math.pow,
      bm_sqrt = Math.sqrt,
      bm_abs = Math.abs,
      bm_floor = Math.floor,
      bm_max = Math.max,
      bm_min = Math.min,
      blitter = 10,
      BMMath = {};
    function ProjectInterface() {
      return {};
    }
    !(function () {
      var t,
        e = [
          "abs",
          "acos",
          "acosh",
          "asin",
          "asinh",
          "atan",
          "atanh",
          "atan2",
          "ceil",
          "cbrt",
          "expm1",
          "clz32",
          "cos",
          "cosh",
          "exp",
          "floor",
          "fround",
          "hypot",
          "imul",
          "log",
          "log1p",
          "log2",
          "log10",
          "max",
          "min",
          "pow",
          "random",
          "round",
          "sign",
          "sin",
          "sinh",
          "sqrt",
          "tan",
          "tanh",
          "trunc",
          "E",
          "LN10",
          "LN2",
          "LOG10E",
          "LOG2E",
          "PI",
          "SQRT1_2",
          "SQRT2",
        ],
        r = e.length;
      for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]];
    })(),
      (BMMath.random = Math.random),
      (BMMath.abs = function (t) {
        if ("object" === typeof t && t.length) {
          var e,
            r = createSizedArray(t.length),
            i = t.length;
          for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
          return r;
        }
        return Math.abs(t);
      });
    var defaultCurveSegments = 150,
      degToRads = Math.PI / 180,
      roundCorner = 0.5519;
    function roundValues(t) {
      bm_rnd = t
        ? Math.round
        : function (t) {
            return t;
          };
    }
    function styleDiv(t) {
      (t.style.position = "absolute"),
        (t.style.top = 0),
        (t.style.left = 0),
        (t.style.display = "block"),
        (t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0"),
        (t.style.backfaceVisibility = t.style.webkitBackfaceVisibility =
          "visible"),
        (t.style.transformStyle =
          t.style.webkitTransformStyle =
          t.style.mozTransformStyle =
            "preserve-3d");
    }
    function BMEnterFrameEvent(t, e, r, i) {
      (this.type = t),
        (this.currentTime = e),
        (this.totalTime = r),
        (this.direction = i < 0 ? -1 : 1);
    }
    function BMCompleteEvent(t, e) {
      (this.type = t), (this.direction = e < 0 ? -1 : 1);
    }
    function BMCompleteLoopEvent(t, e, r, i) {
      (this.type = t),
        (this.currentLoop = r),
        (this.totalLoops = e),
        (this.direction = i < 0 ? -1 : 1);
    }
    function BMSegmentStartEvent(t, e, r) {
      (this.type = t), (this.firstFrame = e), (this.totalFrames = r);
    }
    function BMDestroyEvent(t, e) {
      (this.type = t), (this.target = e);
    }
    roundValues(!1);
    var createElementID =
        ((D = 0),
        function () {
          return "__lottie_element_" + ++D;
        }),
      D;
    function HSVtoRGB(t, e, r) {
      var i, s, a, n, o, h, p, l;
      switch (
        ((h = r * (1 - e)),
        (p = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e)),
        (l = r * (1 - (1 - o) * e)),
        n % 6)
      ) {
        case 0:
          (i = r), (s = l), (a = h);
          break;
        case 1:
          (i = p), (s = r), (a = h);
          break;
        case 2:
          (i = h), (s = r), (a = l);
          break;
        case 3:
          (i = h), (s = p), (a = r);
          break;
        case 4:
          (i = l), (s = h), (a = r);
          break;
        case 5:
          (i = r), (s = h), (a = p);
      }
      return [i, s, a];
    }
    function RGBtoHSV(t, e, r) {
      var i,
        s = Math.max(t, e, r),
        a = Math.min(t, e, r),
        n = s - a,
        o = 0 === s ? 0 : n / s,
        h = s / 255;
      switch (s) {
        case a:
          i = 0;
          break;
        case t:
          (i = e - r + n * (e < r ? 6 : 0)), (i /= 6 * n);
          break;
        case e:
          (i = r - t + 2 * n), (i /= 6 * n);
          break;
        case r:
          (i = t - e + 4 * n), (i /= 6 * n);
      }
      return [i, o, h];
    }
    function addSaturationToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (r[1] += e),
        1 < r[1] ? (r[1] = 1) : r[1] <= 0 && (r[1] = 0),
        HSVtoRGB(r[0], r[1], r[2])
      );
    }
    function addBrightnessToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (r[2] += e),
        1 < r[2] ? (r[2] = 1) : r[2] < 0 && (r[2] = 0),
        HSVtoRGB(r[0], r[1], r[2])
      );
    }
    function addHueToRGB(t, e) {
      var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
      return (
        (r[0] += e / 360),
        1 < r[0] ? (r[0] -= 1) : r[0] < 0 && (r[0] += 1),
        HSVtoRGB(r[0], r[1], r[2])
      );
    }
    var rgbToHex = (function () {
      var t,
        e,
        i = [];
      for (t = 0; t < 256; t += 1)
        (e = t.toString(16)), (i[t] = 1 == e.length ? "0" + e : e);
      return function (t, e, r) {
        return (
          t < 0 && (t = 0),
          e < 0 && (e = 0),
          r < 0 && (r = 0),
          "#" + i[t] + i[e] + i[r]
        );
      };
    })();
    function BaseEvent() {}
    BaseEvent.prototype = {
      triggerEvent: function (t, e) {
        if (this._cbs[t])
          for (var r = this._cbs[t].length, i = 0; i < r; i++)
            this._cbs[t][i](e);
      },
      addEventListener: function (t, e) {
        return (
          this._cbs[t] || (this._cbs[t] = []),
          this._cbs[t].push(e),
          function () {
            this.removeEventListener(t, e);
          }.bind(this)
        );
      },
      removeEventListener: function (t, e) {
        if (e) {
          if (this._cbs[t]) {
            for (var r = 0, i = this._cbs[t].length; r < i; )
              this._cbs[t][r] === e &&
                (this._cbs[t].splice(r, 1), (r -= 1), (i -= 1)),
                (r += 1);
            this._cbs[t].length || (this._cbs[t] = null);
          }
        } else this._cbs[t] = null;
      },
    };
    var createTypedArray =
      "function" == typeof Uint8ClampedArray &&
      "function" == typeof Float32Array
        ? function (t, e) {
            return "float32" === t
              ? new Float32Array(e)
              : "int16" === t
              ? new Int16Array(e)
              : "uint8c" === t
              ? new Uint8ClampedArray(e)
              : void 0;
          }
        : function (t, e) {
            var r,
              i = 0,
              s = [];
            switch (t) {
              case "int16":
              case "uint8c":
                r = 1;
                break;
              default:
                r = 1.1;
            }
            for (i = 0; i < e; i += 1) s.push(r);
            return s;
          };
    function createSizedArray(t) {
      return Array.apply(null, { length: t });
    }
    function createNS(t) {
      return document.createElementNS(svgNS, t);
    }
    function createTag(t) {
      return document.createElement(t);
    }
    function DynamicPropertyContainer() {}
    DynamicPropertyContainer.prototype = {
      addDynamicProperty: function (t) {
        -1 === this.dynamicProperties.indexOf(t) &&
          (this.dynamicProperties.push(t),
          this.container.addDynamicProperty(this),
          (this._isAnimated = !0));
      },
      iterateDynamicProperties: function () {
        this._mdf = !1;
        var t,
          e = this.dynamicProperties.length;
        for (t = 0; t < e; t += 1)
          this.dynamicProperties[t].getValue(),
            this.dynamicProperties[t]._mdf && (this._mdf = !0);
      },
      initDynamicPropertyContainer: function (t) {
        (this.container = t),
          (this.dynamicProperties = []),
          (this._mdf = !1),
          (this._isAnimated = !1);
      },
    };
    var getBlendMode =
        ((Ma = {
          0: "source-over",
          1: "multiply",
          2: "screen",
          3: "overlay",
          4: "darken",
          5: "lighten",
          6: "color-dodge",
          7: "color-burn",
          8: "hard-light",
          9: "soft-light",
          10: "difference",
          11: "exclusion",
          12: "hue",
          13: "saturation",
          14: "color",
          15: "luminosity",
        }),
        function (t) {
          return Ma[t] || "";
        }),
      Ma,
      Matrix = (function () {
        var s = Math.cos,
          a = Math.sin,
          n = Math.tan,
          i = Math.round;
        function t() {
          return (
            (this.props[0] = 1),
            (this.props[1] = 0),
            (this.props[2] = 0),
            (this.props[3] = 0),
            (this.props[4] = 0),
            (this.props[5] = 1),
            (this.props[6] = 0),
            (this.props[7] = 0),
            (this.props[8] = 0),
            (this.props[9] = 0),
            (this.props[10] = 1),
            (this.props[11] = 0),
            (this.props[12] = 0),
            (this.props[13] = 0),
            (this.props[14] = 0),
            (this.props[15] = 1),
            this
          );
        }
        function e(t) {
          if (0 === t) return this;
          var e = s(t),
            r = a(t);
          return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function r(t) {
          if (0 === t) return this;
          var e = s(t),
            r = a(t);
          return this._t(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1);
        }
        function o(t) {
          if (0 === t) return this;
          var e = s(t),
            r = a(t);
          return this._t(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1);
        }
        function h(t) {
          if (0 === t) return this;
          var e = s(t),
            r = a(t);
          return this._t(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function p(t, e) {
          return this._t(1, e, t, 1, 0, 0);
        }
        function l(t, e) {
          return this.shear(n(t), n(e));
        }
        function f(t, e) {
          var r = s(e),
            i = a(e);
          return this._t(r, i, 0, 0, -i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            ._t(1, 0, 0, 0, n(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            ._t(r, -i, 0, 0, i, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function m(t, e, r) {
          return (
            r || 0 === r || (r = 1),
            1 === t && 1 === e && 1 === r
              ? this
              : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
          );
        }
        function c(t, e, r, i, s, a, n, o, h, p, l, f, m, c, d, u) {
          return (
            (this.props[0] = t),
            (this.props[1] = e),
            (this.props[2] = r),
            (this.props[3] = i),
            (this.props[4] = s),
            (this.props[5] = a),
            (this.props[6] = n),
            (this.props[7] = o),
            (this.props[8] = h),
            (this.props[9] = p),
            (this.props[10] = l),
            (this.props[11] = f),
            (this.props[12] = m),
            (this.props[13] = c),
            (this.props[14] = d),
            (this.props[15] = u),
            this
          );
        }
        function d(t, e, r) {
          return (
            (r = r || 0),
            0 !== t || 0 !== e || 0 !== r
              ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1)
              : this
          );
        }
        function u(t, e, r, i, s, a, n, o, h, p, l, f, m, c, d, u) {
          var y = this.props;
          if (
            1 === t &&
            0 === e &&
            0 === r &&
            0 === i &&
            0 === s &&
            1 === a &&
            0 === n &&
            0 === o &&
            0 === h &&
            0 === p &&
            1 === l &&
            0 === f
          )
            return (
              (y[12] = y[12] * t + y[15] * m),
              (y[13] = y[13] * a + y[15] * c),
              (y[14] = y[14] * l + y[15] * d),
              (y[15] = y[15] * u),
              (this._identityCalculated = !1),
              this
            );
          var g = y[0],
            v = y[1],
            b = y[2],
            P = y[3],
            _ = y[4],
            A = y[5],
            S = y[6],
            x = y[7],
            E = y[8],
            k = y[9],
            T = y[10],
            M = y[11],
            D = y[12],
            F = y[13],
            I = y[14],
            C = y[15];
          return (
            (y[0] = g * t + v * s + b * h + P * m),
            (y[1] = g * e + v * a + b * p + P * c),
            (y[2] = g * r + v * n + b * l + P * d),
            (y[3] = g * i + v * o + b * f + P * u),
            (y[4] = _ * t + A * s + S * h + x * m),
            (y[5] = _ * e + A * a + S * p + x * c),
            (y[6] = _ * r + A * n + S * l + x * d),
            (y[7] = _ * i + A * o + S * f + x * u),
            (y[8] = E * t + k * s + T * h + M * m),
            (y[9] = E * e + k * a + T * p + M * c),
            (y[10] = E * r + k * n + T * l + M * d),
            (y[11] = E * i + k * o + T * f + M * u),
            (y[12] = D * t + F * s + I * h + C * m),
            (y[13] = D * e + F * a + I * p + C * c),
            (y[14] = D * r + F * n + I * l + C * d),
            (y[15] = D * i + F * o + I * f + C * u),
            (this._identityCalculated = !1),
            this
          );
        }
        function y() {
          return (
            this._identityCalculated ||
              ((this._identity = !(
                1 !== this.props[0] ||
                0 !== this.props[1] ||
                0 !== this.props[2] ||
                0 !== this.props[3] ||
                0 !== this.props[4] ||
                1 !== this.props[5] ||
                0 !== this.props[6] ||
                0 !== this.props[7] ||
                0 !== this.props[8] ||
                0 !== this.props[9] ||
                1 !== this.props[10] ||
                0 !== this.props[11] ||
                0 !== this.props[12] ||
                0 !== this.props[13] ||
                0 !== this.props[14] ||
                1 !== this.props[15]
              )),
              (this._identityCalculated = !0)),
            this._identity
          );
        }
        function g(t) {
          for (var e = 0; e < 16; ) {
            if (t.props[e] !== this.props[e]) return !1;
            e += 1;
          }
          return !0;
        }
        function v(t) {
          var e;
          for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
        }
        function b(t) {
          var e;
          for (e = 0; e < 16; e += 1) this.props[e] = t[e];
        }
        function P(t, e, r) {
          return {
            x:
              t * this.props[0] +
              e * this.props[4] +
              r * this.props[8] +
              this.props[12],
            y:
              t * this.props[1] +
              e * this.props[5] +
              r * this.props[9] +
              this.props[13],
            z:
              t * this.props[2] +
              e * this.props[6] +
              r * this.props[10] +
              this.props[14],
          };
        }
        function _(t, e, r) {
          return (
            t * this.props[0] +
            e * this.props[4] +
            r * this.props[8] +
            this.props[12]
          );
        }
        function A(t, e, r) {
          return (
            t * this.props[1] +
            e * this.props[5] +
            r * this.props[9] +
            this.props[13]
          );
        }
        function S(t, e, r) {
          return (
            t * this.props[2] +
            e * this.props[6] +
            r * this.props[10] +
            this.props[14]
          );
        }
        function x(t) {
          var e = this.props[0] * this.props[5] - this.props[1] * this.props[4],
            r = this.props[5] / e,
            i = -this.props[1] / e,
            s = -this.props[4] / e,
            a = this.props[0] / e,
            n =
              (this.props[4] * this.props[13] -
                this.props[5] * this.props[12]) /
              e,
            o =
              -(
                this.props[0] * this.props[13] -
                this.props[1] * this.props[12]
              ) / e;
          return [t[0] * r + t[1] * s + n, t[0] * i + t[1] * a + o, 0];
        }
        function E(t) {
          var e,
            r = t.length,
            i = [];
          for (e = 0; e < r; e += 1) i[e] = x(t[e]);
          return i;
        }
        function k(t, e, r) {
          var i = createTypedArray("float32", 6);
          if (this.isIdentity())
            (i[0] = t[0]),
              (i[1] = t[1]),
              (i[2] = e[0]),
              (i[3] = e[1]),
              (i[4] = r[0]),
              (i[5] = r[1]);
          else {
            var s = this.props[0],
              a = this.props[1],
              n = this.props[4],
              o = this.props[5],
              h = this.props[12],
              p = this.props[13];
            (i[0] = t[0] * s + t[1] * n + h),
              (i[1] = t[0] * a + t[1] * o + p),
              (i[2] = e[0] * s + e[1] * n + h),
              (i[3] = e[0] * a + e[1] * o + p),
              (i[4] = r[0] * s + r[1] * n + h),
              (i[5] = r[0] * a + r[1] * o + p);
          }
          return i;
        }
        function T(t, e, r) {
          return this.isIdentity()
            ? [t, e, r]
            : [
                t * this.props[0] +
                  e * this.props[4] +
                  r * this.props[8] +
                  this.props[12],
                t * this.props[1] +
                  e * this.props[5] +
                  r * this.props[9] +
                  this.props[13],
                t * this.props[2] +
                  e * this.props[6] +
                  r * this.props[10] +
                  this.props[14],
              ];
        }
        function M(t, e) {
          if (this.isIdentity()) return t + "," + e;
          var r = this.props;
          return (
            Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 +
            "," +
            Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
          );
        }
        function D() {
          for (var t = 0, e = this.props, r = "matrix3d("; t < 16; )
            (r += i(1e4 * e[t]) / 1e4), (r += 15 === t ? ")" : ","), (t += 1);
          return r;
        }
        function F(t) {
          return (t < 1e-6 && 0 < t) || (-1e-6 < t && t < 0)
            ? i(1e4 * t) / 1e4
            : t;
        }
        function I() {
          var t = this.props;
          return (
            "matrix(" +
            F(t[0]) +
            "," +
            F(t[1]) +
            "," +
            F(t[4]) +
            "," +
            F(t[5]) +
            "," +
            F(t[12]) +
            "," +
            F(t[13]) +
            ")"
          );
        }
        return function () {
          (this.reset = t),
            (this.rotate = e),
            (this.rotateX = r),
            (this.rotateY = o),
            (this.rotateZ = h),
            (this.skew = l),
            (this.skewFromAxis = f),
            (this.shear = p),
            (this.scale = m),
            (this.setTransform = c),
            (this.translate = d),
            (this.transform = u),
            (this.applyToPoint = P),
            (this.applyToX = _),
            (this.applyToY = A),
            (this.applyToZ = S),
            (this.applyToPointArray = T),
            (this.applyToTriplePoints = k),
            (this.applyToPointStringified = M),
            (this.toCSS = D),
            (this.to2dCSS = I),
            (this.clone = v),
            (this.cloneFromProps = b),
            (this.equals = g),
            (this.inversePoints = E),
            (this.inversePoint = x),
            (this._t = this.transform),
            (this.isIdentity = y),
            (this._identity = !0),
            (this._identityCalculated = !1),
            (this.props = createTypedArray("float32", 16)),
            this.reset();
        };
      })();
    !(function (o, h) {
      var p,
        l = this,
        f = 256,
        m = 6,
        c = "random",
        d = h.pow(f, m),
        u = h.pow(2, 52),
        y = 2 * u,
        g = f - 1;
      function v(t) {
        var e,
          r = t.length,
          n = this,
          i = 0,
          s = (n.i = n.j = 0),
          a = (n.S = []);
        for (r || (t = [r++]); i < f; ) a[i] = i++;
        for (i = 0; i < f; i++)
          (a[i] = a[(s = g & (s + t[i % r] + (e = a[i])))]), (a[s] = e);
        n.g = function (t) {
          for (var e, r = 0, i = n.i, s = n.j, a = n.S; t--; )
            (e = a[(i = g & (i + 1))]),
              (r = r * f + a[g & ((a[i] = a[(s = g & (s + e))]) + (a[s] = e))]);
          return (n.i = i), (n.j = s), r;
        };
      }
      function b(t, e) {
        return (e.i = t.i), (e.j = t.j), (e.S = t.S.slice()), e;
      }
      function P(t, e) {
        for (var r, i = t + "", s = 0; s < i.length; )
          e[g & s] = g & ((r ^= 19 * e[g & s]) + i.charCodeAt(s++));
        return _(e);
      }
      function _(t) {
        return String.fromCharCode.apply(0, t);
      }
      (h["seed" + c] = function (t, e, r) {
        var i = [],
          s = P(
            (function t(e, r) {
              var i,
                s = [],
                a = typeof e;
              if (r && "object" == a)
                for (i in e)
                  try {
                    s.push(t(e[i], r - 1));
                  } catch (t) {}
              return s.length ? s : "string" == a ? e : e + "\0";
            })(
              (e = !0 === e ? { entropy: !0 } : e || {}).entropy
                ? [t, _(o)]
                : null === t
                ? (function () {
                    try {
                      if (p) return _(p.randomBytes(f));
                      var t = new Uint8Array(f);
                      return (l.crypto || l.msCrypto).getRandomValues(t), _(t);
                    } catch (t) {
                      var e = l.navigator,
                        r = e && e.plugins;
                      return [+new Date(), l, r, l.screen, _(o)];
                    }
                  })()
                : t,
              3
            ),
            i
          ),
          a = new v(i),
          n = function () {
            for (var t = a.g(m), e = d, r = 0; t < u; )
              (t = (t + r) * f), (e *= f), (r = a.g(1));
            for (; y <= t; ) (t /= 2), (e /= 2), (r >>>= 1);
            return (t + r) / e;
          };
        return (
          (n.int32 = function () {
            return 0 | a.g(4);
          }),
          (n.quick = function () {
            return a.g(4) / 4294967296;
          }),
          (n.double = n),
          P(_(a.S), o),
          (
            e.pass ||
            r ||
            function (t, e, r, i) {
              return (
                i &&
                  (i.S && b(i, a),
                  (t.state = function () {
                    return b(a, {});
                  })),
                r ? ((h[c] = t), e) : t
              );
            }
          )(n, s, "global" in e ? e.global : this == h, e.state)
        );
      }),
        P(h.random(), o);
    })([], BMMath);
    var BezierFactory = (function () {
      var t = {
          getBezierEasing: function (t, e, r, i, s) {
            var a =
              s ||
              ("bez_" + t + "_" + e + "_" + r + "_" + i).replace(/\./g, "p");
            if (o[a]) return o[a];
            var n = new h([t, e, r, i]);
            return (o[a] = n);
          },
        },
        o = {};
      var p = 11,
        l = 1 / (p - 1),
        e = "function" == typeof Float32Array;
      function i(t, e) {
        return 1 - 3 * e + 3 * t;
      }
      function s(t, e) {
        return 3 * e - 6 * t;
      }
      function a(t) {
        return 3 * t;
      }
      function f(t, e, r) {
        return ((i(e, r) * t + s(e, r)) * t + a(e)) * t;
      }
      function m(t, e, r) {
        return 3 * i(e, r) * t * t + 2 * s(e, r) * t + a(e);
      }
      function h(t) {
        (this._p = t),
          (this._mSampleValues = e ? new Float32Array(p) : new Array(p)),
          (this._precomputed = !1),
          (this.get = this.get.bind(this));
      }
      return (
        (h.prototype = {
          get: function (t) {
            var e = this._p[0],
              r = this._p[1],
              i = this._p[2],
              s = this._p[3];
            return (
              this._precomputed || this._precompute(),
              e === r && i === s
                ? t
                : 0 === t
                ? 0
                : 1 === t
                ? 1
                : f(this._getTForX(t), r, s)
            );
          },
          _precompute: function () {
            var t = this._p[0],
              e = this._p[1],
              r = this._p[2],
              i = this._p[3];
            (this._precomputed = !0),
              (t === e && r === i) || this._calcSampleValues();
          },
          _calcSampleValues: function () {
            for (var t = this._p[0], e = this._p[2], r = 0; r < p; ++r)
              this._mSampleValues[r] = f(r * l, t, e);
          },
          _getTForX: function (t) {
            for (
              var e = this._p[0],
                r = this._p[2],
                i = this._mSampleValues,
                s = 0,
                a = 1,
                n = p - 1;
              a !== n && i[a] <= t;
              ++a
            )
              s += l;
            var o = s + ((t - i[--a]) / (i[a + 1] - i[a])) * l,
              h = m(o, e, r);
            return 0.001 <= h
              ? (function (t, e, r, i) {
                  for (var s = 0; s < 4; ++s) {
                    var a = m(e, r, i);
                    if (0 === a) return e;
                    e -= (f(e, r, i) - t) / a;
                  }
                  return e;
                })(t, o, e, r)
              : 0 === h
              ? o
              : (function (t, e, r, i, s) {
                  for (
                    var a, n, o = 0;
                    0 < (a = f((n = e + (r - e) / 2), i, s) - t)
                      ? (r = n)
                      : (e = n),
                      1e-7 < Math.abs(a) && ++o < 10;

                  );
                  return n;
                })(t, s, s + l, e, r);
          },
        }),
        t
      );
    })();
    function extendPrototype(t, e) {
      var r,
        i,
        s = t.length;
      for (r = 0; r < s; r += 1)
        for (var a in (i = t[r].prototype))
          i.hasOwnProperty(a) && (e.prototype[a] = i[a]);
    }
    function getDescriptor(t, e) {
      return Object.getOwnPropertyDescriptor(t, e);
    }
    function createProxyFunction(t) {
      function e() {}
      return (e.prototype = t), e;
    }
    function bezFunction() {
      Math;
      function y(t, e, r, i, s, a) {
        var n = t * i + e * s + r * a - s * i - a * t - r * e;
        return -0.001 < n && n < 0.001;
      }
      var l = function (t, e, r, i) {
        var s,
          a,
          n,
          o,
          h,
          p,
          l = defaultCurveSegments,
          f = 0,
          m = [],
          c = [],
          d = bezier_length_pool.newElement();
        for (n = r.length, s = 0; s < l; s += 1) {
          for (h = s / (l - 1), a = p = 0; a < n; a += 1)
            (o =
              bm_pow(1 - h, 3) * t[a] +
              3 * bm_pow(1 - h, 2) * h * r[a] +
              3 * (1 - h) * bm_pow(h, 2) * i[a] +
              bm_pow(h, 3) * e[a]),
              (m[a] = o),
              null !== c[a] && (p += bm_pow(m[a] - c[a], 2)),
              (c[a] = m[a]);
          p && (f += p = bm_sqrt(p)), (d.percents[s] = h), (d.lengths[s] = f);
        }
        return (d.addedLength = f), d;
      };
      function g(t) {
        (this.segmentLength = 0), (this.points = new Array(t));
      }
      function v(t, e) {
        (this.partialLength = t), (this.point = e);
      }
      var b,
        t =
          ((b = {}),
          function (t, e, r, i) {
            var s = (
              t[0] +
              "_" +
              t[1] +
              "_" +
              e[0] +
              "_" +
              e[1] +
              "_" +
              r[0] +
              "_" +
              r[1] +
              "_" +
              i[0] +
              "_" +
              i[1]
            ).replace(/\./g, "p");
            if (!b[s]) {
              var a,
                n,
                o,
                h,
                p,
                l,
                f,
                m = defaultCurveSegments,
                c = 0,
                d = null;
              2 === t.length &&
                (t[0] != e[0] || t[1] != e[1]) &&
                y(t[0], t[1], e[0], e[1], t[0] + r[0], t[1] + r[1]) &&
                y(t[0], t[1], e[0], e[1], e[0] + i[0], e[1] + i[1]) &&
                (m = 2);
              var u = new g(m);
              for (o = r.length, a = 0; a < m; a += 1) {
                for (
                  f = createSizedArray(o), p = a / (m - 1), n = l = 0;
                  n < o;
                  n += 1
                )
                  (h =
                    bm_pow(1 - p, 3) * t[n] +
                    3 * bm_pow(1 - p, 2) * p * (t[n] + r[n]) +
                    3 * (1 - p) * bm_pow(p, 2) * (e[n] + i[n]) +
                    bm_pow(p, 3) * e[n]),
                    (f[n] = h),
                    null !== d && (l += bm_pow(f[n] - d[n], 2));
                (c += l = bm_sqrt(l)), (u.points[a] = new v(l, f)), (d = f);
              }
              (u.segmentLength = c), (b[s] = u);
            }
            return b[s];
          });
      function D(t, e) {
        var r = e.percents,
          i = e.lengths,
          s = r.length,
          a = bm_floor((s - 1) * t),
          n = t * e.addedLength,
          o = 0;
        if (a === s - 1 || 0 === a || n === i[a]) return r[a];
        for (var h = i[a] > n ? -1 : 1, p = !0; p; )
          if (
            (i[a] <= n && i[a + 1] > n
              ? ((o = (n - i[a]) / (i[a + 1] - i[a])), (p = !1))
              : (a += h),
            a < 0 || s - 1 <= a)
          ) {
            if (a === s - 1) return r[a];
            p = !1;
          }
        return r[a] + (r[a + 1] - r[a]) * o;
      }
      var F = createTypedArray("float32", 8);
      return {
        getSegmentsLength: function (t) {
          var e,
            r = segments_length_pool.newElement(),
            i = t.c,
            s = t.v,
            a = t.o,
            n = t.i,
            o = t._length,
            h = r.lengths,
            p = 0;
          for (e = 0; e < o - 1; e += 1)
            (h[e] = l(s[e], s[e + 1], a[e], n[e + 1])), (p += h[e].addedLength);
          return (
            i &&
              o &&
              ((h[e] = l(s[e], s[0], a[e], n[0])), (p += h[e].addedLength)),
            (r.totalLength = p),
            r
          );
        },
        getNewSegment: function (t, e, r, i, s, a, n) {
          var o,
            h = D((s = s < 0 ? 0 : 1 < s ? 1 : s), n),
            p = D((a = 1 < a ? 1 : a), n),
            l = t.length,
            f = 1 - h,
            m = 1 - p,
            c = f * f * f,
            d = h * f * f * 3,
            u = h * h * f * 3,
            y = h * h * h,
            g = f * f * m,
            v = h * f * m + f * h * m + f * f * p,
            b = h * h * m + f * h * p + h * f * p,
            P = h * h * p,
            _ = f * m * m,
            A = h * m * m + f * p * m + f * m * p,
            S = h * p * m + f * p * p + h * m * p,
            x = h * p * p,
            E = m * m * m,
            k = p * m * m + m * p * m + m * m * p,
            T = p * p * m + m * p * p + p * m * p,
            M = p * p * p;
          for (o = 0; o < l; o += 1)
            (F[4 * o] =
              Math.round(1e3 * (c * t[o] + d * r[o] + u * i[o] + y * e[o])) /
              1e3),
              (F[4 * o + 1] =
                Math.round(1e3 * (g * t[o] + v * r[o] + b * i[o] + P * e[o])) /
                1e3),
              (F[4 * o + 2] =
                Math.round(1e3 * (_ * t[o] + A * r[o] + S * i[o] + x * e[o])) /
                1e3),
              (F[4 * o + 3] =
                Math.round(1e3 * (E * t[o] + k * r[o] + T * i[o] + M * e[o])) /
                1e3);
          return F;
        },
        getPointInSegment: function (t, e, r, i, s, a) {
          var n = D(s, a),
            o = 1 - n;
          return [
            Math.round(
              1e3 *
                (o * o * o * t[0] +
                  (n * o * o + o * n * o + o * o * n) * r[0] +
                  (n * n * o + o * n * n + n * o * n) * i[0] +
                  n * n * n * e[0])
            ) / 1e3,
            Math.round(
              1e3 *
                (o * o * o * t[1] +
                  (n * o * o + o * n * o + o * o * n) * r[1] +
                  (n * n * o + o * n * n + n * o * n) * i[1] +
                  n * n * n * e[1])
            ) / 1e3,
          ];
        },
        buildBezierData: t,
        pointOnLine2D: y,
        pointOnLine3D: function (t, e, r, i, s, a, n, o, h) {
          if (0 === r && 0 === a && 0 === h) return y(t, e, i, s, n, o);
          var p,
            l = Math.sqrt(
              Math.pow(i - t, 2) + Math.pow(s - e, 2) + Math.pow(a - r, 2)
            ),
            f = Math.sqrt(
              Math.pow(n - t, 2) + Math.pow(o - e, 2) + Math.pow(h - r, 2)
            ),
            m = Math.sqrt(
              Math.pow(n - i, 2) + Math.pow(o - s, 2) + Math.pow(h - a, 2)
            );
          return (
            -1e-4 <
              (p =
                f < l
                  ? m < l
                    ? l - f - m
                    : m - f - l
                  : f < m
                  ? m - f - l
                  : f - l - m) && p < 1e-4
          );
        },
      };
    }
    !(function () {
      for (
        var a = 0, t = ["ms", "moz", "webkit", "o"], e = 0;
        e < t.length && !window.requestAnimationFrame;
        ++e
      )
        (window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"]),
          (window.cancelAnimationFrame =
            window[t[e] + "CancelAnimationFrame"] ||
            window[t[e] + "CancelRequestAnimationFrame"]);
      window.requestAnimationFrame ||
        (window.requestAnimationFrame = function (t, e) {
          var r = new Date().getTime(),
            i = Math.max(0, 16 - (r - a)),
            s = setTimeout(function () {
              t(r + i);
            }, i);
          return (a = r + i), s;
        }),
        window.cancelAnimationFrame ||
          (window.cancelAnimationFrame = function (t) {
            clearTimeout(t);
          });
    })();
    var bez = bezFunction();
    function dataFunctionManager() {
      function c(t, e) {
        for (var r = 0, i = e.length; r < i; ) {
          if (e[r].id === t)
            return e[r].layers.__used
              ? JSON.parse(JSON.stringify(e[r].layers))
              : ((e[r].layers.__used = !0), e[r].layers);
          r += 1;
        }
      }
      function d(t) {
        var e, r, i;
        for (e = t.length - 1; 0 <= e; e -= 1)
          if ("sh" == t[e].ty) {
            if (t[e].ks.k.i) u(t[e].ks.k);
            else
              for (i = t[e].ks.k.length, r = 0; r < i; r += 1)
                t[e].ks.k[r].s && u(t[e].ks.k[r].s[0]),
                  t[e].ks.k[r].e && u(t[e].ks.k[r].e[0]);
            !0;
          } else "gr" == t[e].ty && d(t[e].it);
      }
      function u(t) {
        var e,
          r = t.i.length;
        for (e = 0; e < r; e += 1)
          (t.i[e][0] += t.v[e][0]),
            (t.i[e][1] += t.v[e][1]),
            (t.o[e][0] += t.v[e][0]),
            (t.o[e][1] += t.v[e][1]);
      }
      function o(t, e) {
        var r = e ? e.split(".") : [100, 100, 100];
        return (
          t[0] > r[0] ||
          (!(r[0] > t[0]) &&
            (t[1] > r[1] ||
              (!(r[1] > t[1]) && (t[2] > r[2] || (!(r[2] > t[2]) && void 0)))))
        );
      }
      var h,
        r = (function () {
          var i = [4, 4, 14];
          function s(t) {
            var e,
              r,
              i,
              s = t.length;
            for (e = 0; e < s; e += 1)
              5 === t[e].ty &&
                ((r = t[e]),
                void 0,
                (i = r.t.d),
                (r.t.d = { k: [{ s: i, t: 0 }] }));
          }
          return function (t) {
            if (o(i, t.v) && (s(t.layers), t.assets)) {
              var e,
                r = t.assets.length;
              for (e = 0; e < r; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })(),
        i =
          ((h = [4, 7, 99]),
          function (t) {
            if (t.chars && !o(h, t.v)) {
              var e,
                r,
                i,
                s,
                a,
                n = t.chars.length;
              for (e = 0; e < n; e += 1)
                if (t.chars[e].data && t.chars[e].data.shapes)
                  for (
                    i = (a = t.chars[e].data.shapes[0].it).length, r = 0;
                    r < i;
                    r += 1
                  )
                    (s = a[r].ks.k).__converted ||
                      (u(a[r].ks.k), (s.__converted = !0));
            }
          }),
        s = (function () {
          var i = [4, 1, 9];
          function a(t) {
            var e,
              r,
              i,
              s = t.length;
            for (e = 0; e < s; e += 1)
              if ("gr" === t[e].ty) a(t[e].it);
              else if ("fl" === t[e].ty || "st" === t[e].ty)
                if (t[e].c.k && t[e].c.k[0].i)
                  for (i = t[e].c.k.length, r = 0; r < i; r += 1)
                    t[e].c.k[r].s &&
                      ((t[e].c.k[r].s[0] /= 255),
                      (t[e].c.k[r].s[1] /= 255),
                      (t[e].c.k[r].s[2] /= 255),
                      (t[e].c.k[r].s[3] /= 255)),
                      t[e].c.k[r].e &&
                        ((t[e].c.k[r].e[0] /= 255),
                        (t[e].c.k[r].e[1] /= 255),
                        (t[e].c.k[r].e[2] /= 255),
                        (t[e].c.k[r].e[3] /= 255));
                else
                  (t[e].c.k[0] /= 255),
                    (t[e].c.k[1] /= 255),
                    (t[e].c.k[2] /= 255),
                    (t[e].c.k[3] /= 255);
          }
          function s(t) {
            var e,
              r = t.length;
            for (e = 0; e < r; e += 1) 4 === t[e].ty && a(t[e].shapes);
          }
          return function (t) {
            if (o(i, t.v) && (s(t.layers), t.assets)) {
              var e,
                r = t.assets.length;
              for (e = 0; e < r; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })(),
        a = (function () {
          var i = [4, 4, 18];
          function p(t) {
            var e, r, i;
            for (e = t.length - 1; 0 <= e; e -= 1)
              if ("sh" == t[e].ty) {
                if (t[e].ks.k.i) t[e].ks.k.c = t[e].closed;
                else
                  for (i = t[e].ks.k.length, r = 0; r < i; r += 1)
                    t[e].ks.k[r].s && (t[e].ks.k[r].s[0].c = t[e].closed),
                      t[e].ks.k[r].e && (t[e].ks.k[r].e[0].c = t[e].closed);
                !0;
              } else "gr" == t[e].ty && p(t[e].it);
          }
          function s(t) {
            var e,
              r,
              i,
              s,
              a,
              n,
              o = t.length;
            for (r = 0; r < o; r += 1) {
              if ((e = t[r]).hasMask) {
                var h = e.masksProperties;
                for (s = h.length, i = 0; i < s; i += 1)
                  if (h[i].pt.k.i) h[i].pt.k.c = h[i].cl;
                  else
                    for (n = h[i].pt.k.length, a = 0; a < n; a += 1)
                      h[i].pt.k[a].s && (h[i].pt.k[a].s[0].c = h[i].cl),
                        h[i].pt.k[a].e && (h[i].pt.k[a].e[0].c = h[i].cl);
              }
              4 === e.ty && p(e.shapes);
            }
          }
          return function (t) {
            if (o(i, t.v) && (s(t.layers), t.assets)) {
              var e,
                r = t.assets.length;
              for (e = 0; e < r; e += 1)
                t.assets[e].layers && s(t.assets[e].layers);
            }
          };
        })();
      var t = {};
      return (
        (t.completeData = function (t, e) {
          t.__complete ||
            (s(t),
            r(t),
            i(t),
            a(t),
            (function t(e, r, i) {
              var s,
                a,
                n,
                o,
                h,
                p,
                l,
                f = e.length;
              for (a = 0; a < f; a += 1)
                if ("ks" in (s = e[a]) && !s.completed) {
                  if (
                    ((s.completed = !0),
                    s.tt && (e[a - 1].td = s.tt),
                    s.hasMask)
                  ) {
                    var m = s.masksProperties;
                    for (o = m.length, n = 0; n < o; n += 1)
                      if (m[n].pt.k.i) u(m[n].pt.k);
                      else
                        for (p = m[n].pt.k.length, h = 0; h < p; h += 1)
                          m[n].pt.k[h].s && u(m[n].pt.k[h].s[0]),
                            m[n].pt.k[h].e && u(m[n].pt.k[h].e[0]);
                  }
                  0 === s.ty
                    ? ((s.layers = c(s.refId, r)), t(s.layers, r, i))
                    : 4 === s.ty
                    ? d(s.shapes)
                    : 5 == s.ty &&
                      (0 !== (l = s).t.a.length ||
                        "m" in l.t.p ||
                        (l.singleShape = !0));
                }
            })(t.layers, t.assets, e),
            (t.__complete = !0));
        }),
        t
      );
    }
    var dataManager = dataFunctionManager(),
      FontManager = (function () {
        var a = { w: 0, size: 0, shapes: [] },
          t = [];
        function u(t, e) {
          var r = createTag("span");
          r.style.fontFamily = e;
          var i = createTag("span");
          (i.innerHTML = "giItT1WQy@!-/#"),
            (r.style.position = "absolute"),
            (r.style.left = "-10000px"),
            (r.style.top = "-10000px"),
            (r.style.fontSize = "300px"),
            (r.style.fontVariant = "normal"),
            (r.style.fontStyle = "normal"),
            (r.style.fontWeight = "normal"),
            (r.style.letterSpacing = "0"),
            r.appendChild(i),
            document.body.appendChild(r);
          var s = i.offsetWidth;
          return (
            (i.style.fontFamily = t + ", " + e), { node: i, w: s, parent: r }
          );
        }
        t = t.concat([
          2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368,
          2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379,
          2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403,
        ]);
        var e = function () {
          (this.fonts = []),
            (this.chars = null),
            (this.typekitLoaded = 0),
            (this.isLoaded = !1),
            (this.initTime = Date.now());
        };
        return (
          (e.getCombinedCharacterCodes = function () {
            return t;
          }),
          (e.prototype.addChars = function (t) {
            if (t) {
              this.chars || (this.chars = []);
              var e,
                r,
                i,
                s = t.length,
                a = this.chars.length;
              for (e = 0; e < s; e += 1) {
                for (r = 0, i = !1; r < a; )
                  this.chars[r].style === t[e].style &&
                    this.chars[r].fFamily === t[e].fFamily &&
                    this.chars[r].ch === t[e].ch &&
                    (i = !0),
                    (r += 1);
                i || (this.chars.push(t[e]), (a += 1));
              }
            }
          }),
          (e.prototype.addFonts = function (t, e) {
            if (t) {
              if (this.chars)
                return (this.isLoaded = !0), void (this.fonts = t.list);
              var r,
                i,
                s,
                a,
                n = t.list,
                o = n.length,
                h = o;
              for (r = 0; r < o; r += 1) {
                var p,
                  l,
                  f = !0;
                if (
                  ((n[r].loaded = !1),
                  (n[r].monoCase = u(n[r].fFamily, "monospace")),
                  (n[r].sansCase = u(n[r].fFamily, "sans-serif")),
                  n[r].fPath)
                ) {
                  if ("p" === n[r].fOrigin || 3 === n[r].origin) {
                    if (
                      (0 <
                        (p = document.querySelectorAll(
                          'style[f-forigin="p"][f-family="' +
                            n[r].fFamily +
                            '"], style[f-origin="3"][f-family="' +
                            n[r].fFamily +
                            '"]'
                        )).length && (f = !1),
                      f)
                    ) {
                      var m = createTag("style");
                      m.setAttribute("f-forigin", n[r].fOrigin),
                        m.setAttribute("f-origin", n[r].origin),
                        m.setAttribute("f-family", n[r].fFamily),
                        (m.type = "text/css"),
                        (m.innerHTML =
                          "@font-face {font-family: " +
                          n[r].fFamily +
                          "; font-style: normal; src: url('" +
                          n[r].fPath +
                          "');}"),
                        e.appendChild(m);
                    }
                  } else if ("g" === n[r].fOrigin || 1 === n[r].origin) {
                    for (
                      p = document.querySelectorAll(
                        'link[f-forigin="g"], link[f-origin="1"]'
                      ),
                        l = 0;
                      l < p.length;
                      l++
                    )
                      -1 !== p[l].href.indexOf(n[r].fPath) && (f = !1);
                    if (f) {
                      var c = createTag("link");
                      c.setAttribute("f-forigin", n[r].fOrigin),
                        c.setAttribute("f-origin", n[r].origin),
                        (c.type = "text/css"),
                        (c.rel = "stylesheet"),
                        (c.href = n[r].fPath),
                        document.body.appendChild(c);
                    }
                  } else if ("t" === n[r].fOrigin || 2 === n[r].origin) {
                    for (
                      p = document.querySelectorAll(
                        'script[f-forigin="t"], script[f-origin="2"]'
                      ),
                        l = 0;
                      l < p.length;
                      l++
                    )
                      n[r].fPath === p[l].src && (f = !1);
                    if (f) {
                      var d = createTag("link");
                      d.setAttribute("f-forigin", n[r].fOrigin),
                        d.setAttribute("f-origin", n[r].origin),
                        d.setAttribute("rel", "stylesheet"),
                        d.setAttribute("href", n[r].fPath),
                        e.appendChild(d);
                    }
                  }
                } else (n[r].loaded = !0), (h -= 1);
                (n[r].helper =
                  ((i = e),
                  (s = n[r]),
                  (a = void 0),
                  ((a = createNS("text")).style.fontSize = "100px"),
                  a.setAttribute("font-family", s.fFamily),
                  a.setAttribute("font-style", s.fStyle),
                  a.setAttribute("font-weight", s.fWeight),
                  (a.textContent = "1"),
                  s.fClass
                    ? ((a.style.fontFamily = "inherit"),
                      a.setAttribute("class", s.fClass))
                    : (a.style.fontFamily = s.fFamily),
                  i.appendChild(a),
                  (createTag("canvas").getContext("2d").font =
                    s.fWeight + " " + s.fStyle + " 100px " + s.fFamily),
                  a)),
                  (n[r].cache = {}),
                  this.fonts.push(n[r]);
              }
              0 === h
                ? (this.isLoaded = !0)
                : setTimeout(this.checkLoadedFonts.bind(this), 100);
            } else this.isLoaded = !0;
          }),
          (e.prototype.getCharData = function (t, e, r) {
            for (var i = 0, s = this.chars.length; i < s; ) {
              if (
                this.chars[i].ch === t &&
                this.chars[i].style === e &&
                this.chars[i].fFamily === r
              )
                return this.chars[i];
              i += 1;
            }
            return (
              (("string" == typeof t && 13 !== t.charCodeAt(0)) || !t) &&
                console &&
                console.warn &&
                console.warn(
                  "Missing character from exported characters list: ",
                  t,
                  e,
                  r
                ),
              a
            );
          }),
          (e.prototype.getFontByName = function (t) {
            for (var e = 0, r = this.fonts.length; e < r; ) {
              if (this.fonts[e].fName === t) return this.fonts[e];
              e += 1;
            }
            return this.fonts[0];
          }),
          (e.prototype.measureText = function (t, e, r) {
            var i = this.getFontByName(e),
              s = t.charCodeAt(0);
            if (!i.cache[s + 1]) {
              var a = i.helper;
              if (" " === t) {
                a.textContent = "|" + t + "|";
                var n = a.getComputedTextLength();
                a.textContent = "||";
                var o = a.getComputedTextLength();
                i.cache[s + 1] = (n - o) / 100;
              } else
                (a.textContent = t),
                  (i.cache[s + 1] = a.getComputedTextLength() / 100);
            }
            return i.cache[s + 1] * r;
          }),
          (e.prototype.checkLoadedFonts = function () {
            var t,
              e,
              r,
              i = this.fonts.length,
              s = i;
            for (t = 0; t < i; t += 1)
              this.fonts[t].loaded
                ? (s -= 1)
                : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin
                ? (this.fonts[t].loaded = !0)
                : ((e = this.fonts[t].monoCase.node),
                  (r = this.fonts[t].monoCase.w),
                  e.offsetWidth !== r
                    ? ((s -= 1), (this.fonts[t].loaded = !0))
                    : ((e = this.fonts[t].sansCase.node),
                      (r = this.fonts[t].sansCase.w),
                      e.offsetWidth !== r &&
                        ((s -= 1), (this.fonts[t].loaded = !0))),
                  this.fonts[t].loaded &&
                    (this.fonts[t].sansCase.parent.parentNode.removeChild(
                      this.fonts[t].sansCase.parent
                    ),
                    this.fonts[t].monoCase.parent.parentNode.removeChild(
                      this.fonts[t].monoCase.parent
                    )));
            0 !== s && Date.now() - this.initTime < 5e3
              ? setTimeout(this.checkLoadedFonts.bind(this), 20)
              : setTimeout(
                  function () {
                    this.isLoaded = !0;
                  }.bind(this),
                  0
                );
          }),
          (e.prototype.loaded = function () {
            return this.isLoaded;
          }),
          e
        );
      })(),
      PropertyFactory = (function () {
        var f = initialDefaultFrame,
          s = Math.abs;
        function m(t, e) {
          var r,
            i = this.offsetTime;
          "multidimensional" === this.propType &&
            (r = createTypedArray("float32", this.pv.length));
          for (
            var s,
              a,
              n,
              o,
              h,
              p,
              l,
              f,
              m = e.lastIndex,
              c = m,
              d = this.keyframes.length - 1,
              u = !0;
            u;

          ) {
            if (
              ((s = this.keyframes[c]),
              (a = this.keyframes[c + 1]),
              c === d - 1 && t >= a.t - i)
            ) {
              s.h && (s = a), (m = 0);
              break;
            }
            if (a.t - i > t) {
              m = c;
              break;
            }
            c < d - 1 ? (c += 1) : ((m = 0), (u = !1));
          }
          var y,
            g,
            v,
            b,
            P,
            _,
            A,
            S,
            x,
            E,
            k = a.t - i,
            T = s.t - i;
          if (s.to) {
            s.bezierData ||
              (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
            var M = s.bezierData;
            if (k <= t || t < T) {
              var D = k <= t ? M.points.length - 1 : 0;
              for (o = M.points[D].point.length, n = 0; n < o; n += 1)
                r[n] = M.points[D].point[n];
            } else {
              s.__fnct
                ? (f = s.__fnct)
                : ((f = BezierFactory.getBezierEasing(
                    s.o.x,
                    s.o.y,
                    s.i.x,
                    s.i.y,
                    s.n
                  ).get),
                  (s.__fnct = f)),
                (h = f((t - T) / (k - T)));
              var F,
                I = M.segmentLength * h,
                C =
                  e.lastFrame < t && e._lastKeyframeIndex === c
                    ? e._lastAddedLength
                    : 0;
              for (
                l =
                  e.lastFrame < t && e._lastKeyframeIndex === c
                    ? e._lastPoint
                    : 0,
                  u = !0,
                  p = M.points.length;
                u;

              ) {
                if (
                  ((C += M.points[l].partialLength),
                  0 === I || 0 === h || l === M.points.length - 1)
                ) {
                  for (o = M.points[l].point.length, n = 0; n < o; n += 1)
                    r[n] = M.points[l].point[n];
                  break;
                }
                if (C <= I && I < C + M.points[l + 1].partialLength) {
                  for (
                    F = (I - C) / M.points[l + 1].partialLength,
                      o = M.points[l].point.length,
                      n = 0;
                    n < o;
                    n += 1
                  )
                    r[n] =
                      M.points[l].point[n] +
                      (M.points[l + 1].point[n] - M.points[l].point[n]) * F;
                  break;
                }
                l < p - 1 ? (l += 1) : (u = !1);
              }
              (e._lastPoint = l),
                (e._lastAddedLength = C - M.points[l].partialLength),
                (e._lastKeyframeIndex = c);
            }
          } else {
            var w, V, R, L, G;
            if (((d = s.s.length), (y = a.s || s.e), this.sh && 1 !== s.h))
              if (k <= t) (r[0] = y[0]), (r[1] = y[1]), (r[2] = y[2]);
              else if (t <= T)
                (r[0] = s.s[0]), (r[1] = s.s[1]), (r[2] = s.s[2]);
              else {
                var N = z(s.s),
                  B = z(y);
                (g = r),
                  (v = (function (t, e, r) {
                    var i,
                      s,
                      a,
                      n,
                      o,
                      h = [],
                      p = t[0],
                      l = t[1],
                      f = t[2],
                      m = t[3],
                      c = e[0],
                      d = e[1],
                      u = e[2],
                      y = e[3];
                    (s = p * c + l * d + f * u + m * y) < 0 &&
                      ((s = -s), (c = -c), (d = -d), (u = -u), (y = -y));
                    o =
                      1e-6 < 1 - s
                        ? ((i = Math.acos(s)),
                          (a = Math.sin(i)),
                          (n = Math.sin((1 - r) * i) / a),
                          Math.sin(r * i) / a)
                        : ((n = 1 - r), r);
                    return (
                      (h[0] = n * p + o * c),
                      (h[1] = n * l + o * d),
                      (h[2] = n * f + o * u),
                      (h[3] = n * m + o * y),
                      h
                    );
                  })(N, B, (t - T) / (k - T))),
                  (b = v[0]),
                  (P = v[1]),
                  (_ = v[2]),
                  (A = v[3]),
                  (S = Math.atan2(
                    2 * P * A - 2 * b * _,
                    1 - 2 * P * P - 2 * _ * _
                  )),
                  (x = Math.asin(2 * b * P + 2 * _ * A)),
                  (E = Math.atan2(
                    2 * b * A - 2 * P * _,
                    1 - 2 * b * b - 2 * _ * _
                  )),
                  (g[0] = S / degToRads),
                  (g[1] = x / degToRads),
                  (g[2] = E / degToRads);
              }
            else
              for (c = 0; c < d; c += 1)
                1 !== s.h &&
                  (h =
                    k <= t
                      ? 1
                      : t < T
                      ? 0
                      : (s.o.x.constructor === Array
                          ? (s.__fnct || (s.__fnct = []),
                            s.__fnct[c]
                              ? (f = s.__fnct[c])
                              : ((w =
                                  void 0 === s.o.x[c] ? s.o.x[0] : s.o.x[c]),
                                (V = void 0 === s.o.y[c] ? s.o.y[0] : s.o.y[c]),
                                (R = void 0 === s.i.x[c] ? s.i.x[0] : s.i.x[c]),
                                (L = void 0 === s.i.y[c] ? s.i.y[0] : s.i.y[c]),
                                (f = BezierFactory.getBezierEasing(
                                  w,
                                  V,
                                  R,
                                  L
                                ).get),
                                (s.__fnct[c] = f)))
                          : s.__fnct
                          ? (f = s.__fnct)
                          : ((w = s.o.x),
                            (V = s.o.y),
                            (R = s.i.x),
                            (L = s.i.y),
                            (f = BezierFactory.getBezierEasing(w, V, R, L).get),
                            (s.__fnct = f)),
                        f((t - T) / (k - T)))),
                  (y = a.s || s.e),
                  (G = 1 === s.h ? s.s[c] : s.s[c] + (y[c] - s.s[c]) * h),
                  1 === d ? (r = G) : (r[c] = G);
          }
          return (e.lastIndex = m), r;
        }
        function z(t) {
          var e = t[0] * degToRads,
            r = t[1] * degToRads,
            i = t[2] * degToRads,
            s = Math.cos(e / 2),
            a = Math.cos(r / 2),
            n = Math.cos(i / 2),
            o = Math.sin(e / 2),
            h = Math.sin(r / 2),
            p = Math.sin(i / 2);
          return [
            o * h * n + s * a * p,
            o * a * n + s * h * p,
            s * h * n - o * a * p,
            s * a * n - o * h * p,
          ];
        }
        function c() {
          var t = this.comp.renderedFrame - this.offsetTime,
            e = this.keyframes[0].t - this.offsetTime,
            r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
          if (
            !(
              t === this._caching.lastFrame ||
              (this._caching.lastFrame !== f &&
                ((this._caching.lastFrame >= r && r <= t) ||
                  (this._caching.lastFrame < e && t < e)))
            )
          ) {
            this._caching.lastFrame >= t &&
              ((this._caching._lastKeyframeIndex = -1),
              (this._caching.lastIndex = 0));
            var i = this.interpolateValue(t, this._caching);
            this.pv = i;
          }
          return (this._caching.lastFrame = t), this.pv;
        }
        function d(t) {
          var e;
          if ("unidimensional" === this.propType)
            (e = t * this.mult),
              1e-5 < s(this.v - e) && ((this.v = e), (this._mdf = !0));
          else
            for (var r = 0, i = this.v.length; r < i; )
              (e = t[r] * this.mult),
                1e-5 < s(this.v[r] - e) && ((this.v[r] = e), (this._mdf = !0)),
                (r += 1);
        }
        function u() {
          if (
            this.elem.globalData.frameId !== this.frameId &&
            this.effectsSequence.length
          )
            if (this.lock) this.setVValue(this.pv);
            else {
              (this.lock = !0), (this._mdf = this._isFirstFrame);
              var t,
                e = this.effectsSequence.length,
                r = this.kf ? this.pv : this.data.k;
              for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
              this.setVValue(r),
                (this._isFirstFrame = !1),
                (this.lock = !1),
                (this.frameId = this.elem.globalData.frameId);
            }
        }
        function y(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function n(t, e, r, i) {
          (this.propType = "unidimensional"),
            (this.mult = r || 1),
            (this.data = e),
            (this.v = r ? e.k * r : e.k),
            (this.pv = e.k),
            (this._mdf = !1),
            (this.elem = t),
            (this.container = i),
            (this.comp = t.comp),
            (this.k = !1),
            (this.kf = !1),
            (this.vel = 0),
            (this.effectsSequence = []),
            (this._isFirstFrame = !0),
            (this.getValue = u),
            (this.setVValue = d),
            (this.addEffect = y);
        }
        function o(t, e, r, i) {
          (this.propType = "multidimensional"),
            (this.mult = r || 1),
            (this.data = e),
            (this._mdf = !1),
            (this.elem = t),
            (this.container = i),
            (this.comp = t.comp),
            (this.k = !1),
            (this.kf = !1),
            (this.frameId = -1);
          var s,
            a = e.k.length;
          (this.v = createTypedArray("float32", a)),
            (this.pv = createTypedArray("float32", a));
          createTypedArray("float32", a);
          for (this.vel = createTypedArray("float32", a), s = 0; s < a; s += 1)
            (this.v[s] = e.k[s] * this.mult), (this.pv[s] = e.k[s]);
          (this._isFirstFrame = !0),
            (this.effectsSequence = []),
            (this.getValue = u),
            (this.setVValue = d),
            (this.addEffect = y);
        }
        function h(t, e, r, i) {
          (this.propType = "unidimensional"),
            (this.keyframes = e.k),
            (this.offsetTime = t.data.st),
            (this.frameId = -1),
            (this._caching = {
              lastFrame: f,
              lastIndex: 0,
              value: 0,
              _lastKeyframeIndex: -1,
            }),
            (this.k = !0),
            (this.kf = !0),
            (this.data = e),
            (this.mult = r || 1),
            (this.elem = t),
            (this.container = i),
            (this.comp = t.comp),
            (this.v = f),
            (this.pv = f),
            (this._isFirstFrame = !0),
            (this.getValue = u),
            (this.setVValue = d),
            (this.interpolateValue = m),
            (this.effectsSequence = [c.bind(this)]),
            (this.addEffect = y);
        }
        function p(t, e, r, i) {
          this.propType = "multidimensional";
          var s,
            a,
            n,
            o,
            h,
            p = e.k.length;
          for (s = 0; s < p - 1; s += 1)
            e.k[s].to &&
              e.k[s].s &&
              e.k[s].e &&
              ((a = e.k[s].s),
              (n = e.k[s].e),
              (o = e.k[s].to),
              (h = e.k[s].ti),
              ((2 === a.length &&
                (a[0] !== n[0] || a[1] !== n[1]) &&
                bez.pointOnLine2D(
                  a[0],
                  a[1],
                  n[0],
                  n[1],
                  a[0] + o[0],
                  a[1] + o[1]
                ) &&
                bez.pointOnLine2D(
                  a[0],
                  a[1],
                  n[0],
                  n[1],
                  n[0] + h[0],
                  n[1] + h[1]
                )) ||
                (3 === a.length &&
                  (a[0] !== n[0] || a[1] !== n[1] || a[2] !== n[2]) &&
                  bez.pointOnLine3D(
                    a[0],
                    a[1],
                    a[2],
                    n[0],
                    n[1],
                    n[2],
                    a[0] + o[0],
                    a[1] + o[1],
                    a[2] + o[2]
                  ) &&
                  bez.pointOnLine3D(
                    a[0],
                    a[1],
                    a[2],
                    n[0],
                    n[1],
                    n[2],
                    n[0] + h[0],
                    n[1] + h[1],
                    n[2] + h[2]
                  ))) &&
                ((e.k[s].to = null), (e.k[s].ti = null)),
              a[0] === n[0] &&
                a[1] === n[1] &&
                0 === o[0] &&
                0 === o[1] &&
                0 === h[0] &&
                0 === h[1] &&
                (2 === a.length ||
                  (a[2] === n[2] && 0 === o[2] && 0 === h[2])) &&
                ((e.k[s].to = null), (e.k[s].ti = null)));
          (this.effectsSequence = [c.bind(this)]),
            (this.keyframes = e.k),
            (this.offsetTime = t.data.st),
            (this.k = !0),
            (this.kf = !0),
            (this._isFirstFrame = !0),
            (this.mult = r || 1),
            (this.elem = t),
            (this.container = i),
            (this.comp = t.comp),
            (this.getValue = u),
            (this.setVValue = d),
            (this.interpolateValue = m),
            (this.frameId = -1);
          var l = e.k[0].s.length;
          for (
            this.v = createTypedArray("float32", l),
              this.pv = createTypedArray("float32", l),
              s = 0;
            s < l;
            s += 1
          )
            (this.v[s] = f), (this.pv[s] = f);
          (this._caching = {
            lastFrame: f,
            lastIndex: 0,
            value: createTypedArray("float32", l),
          }),
            (this.addEffect = y);
        }
        return {
          getProp: function (t, e, r, i, s) {
            var a;
            if (e.k.length)
              if ("number" == typeof e.k[0]) a = new o(t, e, i, s);
              else
                switch (r) {
                  case 0:
                    a = new h(t, e, i, s);
                    break;
                  case 1:
                    a = new p(t, e, i, s);
                }
            else a = new n(t, e, i, s);
            return a.effectsSequence.length && s.addDynamicProperty(a), a;
          },
        };
      })(),
      TransformPropertyFactory = (function () {
        function i(t, e, r) {
          if (
            ((this.elem = t),
            (this.frameId = -1),
            (this.propType = "transform"),
            (this.data = e),
            (this.v = new Matrix()),
            (this.pre = new Matrix()),
            (this.appliedTransformations = 0),
            this.initDynamicPropertyContainer(r || t),
            e.p && e.p.s
              ? ((this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this)),
                (this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this)),
                e.p.z &&
                  (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this)))
              : (this.p = PropertyFactory.getProp(
                  t,
                  e.p || { k: [0, 0, 0] },
                  1,
                  0,
                  this
                )),
            e.rx)
          ) {
            if (
              ((this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this)),
              (this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this)),
              (this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this)),
              e.or.k[0].ti)
            ) {
              var i,
                s = e.or.k.length;
              for (i = 0; i < s; i += 1) e.or.k[i].to = e.or.k[i].ti = null;
            }
            (this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this)),
              (this.or.sh = !0);
          } else
            this.r = PropertyFactory.getProp(
              t,
              e.r || { k: 0 },
              0,
              degToRads,
              this
            );
          e.sk &&
            ((this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this)),
            (this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this))),
            (this.a = PropertyFactory.getProp(
              t,
              e.a || { k: [0, 0, 0] },
              1,
              0,
              this
            )),
            (this.s = PropertyFactory.getProp(
              t,
              e.s || { k: [100, 100, 100] },
              1,
              0.01,
              this
            )),
            e.o
              ? (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, t))
              : (this.o = { _mdf: !1, v: 1 }),
            (this._isDirty = !0),
            this.dynamicProperties.length || this.getValue(!0);
        }
        return (
          (i.prototype = {
            applyToMatrix: function (t) {
              var e = this._mdf;
              this.iterateDynamicProperties(),
                (this._mdf = this._mdf || e),
                this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                this.r
                  ? t.rotate(-this.r.v)
                  : t
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                this.data.p.s
                  ? this.data.p.z
                    ? t.translate(this.px.v, this.py.v, -this.pz.v)
                    : t.translate(this.px.v, this.py.v, 0)
                  : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            },
            getValue: function (t) {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (
                  (this._isDirty &&
                    (this.precalculateMatrix(), (this._isDirty = !1)),
                  this.iterateDynamicProperties(),
                  this._mdf || t)
                ) {
                  if (
                    (this.v.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1 &&
                      this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.appliedTransformations < 2 &&
                      this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk &&
                      this.appliedTransformations < 3 &&
                      this.v.skewFromAxis(-this.sk.v, this.sa.v),
                    this.r && this.appliedTransformations < 4
                      ? this.v.rotate(-this.r.v)
                      : !this.r &&
                        this.appliedTransformations < 4 &&
                        this.v
                          .rotateZ(-this.rz.v)
                          .rotateY(this.ry.v)
                          .rotateX(this.rx.v)
                          .rotateZ(-this.or.v[2])
                          .rotateY(this.or.v[1])
                          .rotateX(this.or.v[0]),
                    this.autoOriented)
                  ) {
                    var e,
                      r,
                      i = this.elem.globalData.frameRate;
                    if (this.p && this.p.keyframes && this.p.getValueAtTime)
                      r =
                        this.p._caching.lastFrame + this.p.offsetTime <=
                        this.p.keyframes[0].t
                          ? ((e = this.p.getValueAtTime(
                              (this.p.keyframes[0].t + 0.01) / i,
                              0
                            )),
                            this.p.getValueAtTime(this.p.keyframes[0].t / i, 0))
                          : this.p._caching.lastFrame + this.p.offsetTime >=
                            this.p.keyframes[this.p.keyframes.length - 1].t
                          ? ((e = this.p.getValueAtTime(
                              this.p.keyframes[this.p.keyframes.length - 1].t /
                                i,
                              0
                            )),
                            this.p.getValueAtTime(
                              (this.p.keyframes[this.p.keyframes.length - 1].t -
                                0.01) /
                                i,
                              0
                            ))
                          : ((e = this.p.pv),
                            this.p.getValueAtTime(
                              (this.p._caching.lastFrame +
                                this.p.offsetTime -
                                0.01) /
                                i,
                              this.p.offsetTime
                            ));
                    else if (
                      this.px &&
                      this.px.keyframes &&
                      this.py.keyframes &&
                      this.px.getValueAtTime &&
                      this.py.getValueAtTime
                    ) {
                      (e = []), (r = []);
                      var s = this.px,
                        a = this.py;
                      s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t
                        ? ((e[0] = s.getValueAtTime(
                            (s.keyframes[0].t + 0.01) / i,
                            0
                          )),
                          (e[1] = a.getValueAtTime(
                            (a.keyframes[0].t + 0.01) / i,
                            0
                          )),
                          (r[0] = s.getValueAtTime(s.keyframes[0].t / i, 0)),
                          (r[1] = a.getValueAtTime(a.keyframes[0].t / i, 0)))
                        : s._caching.lastFrame + s.offsetTime >=
                          s.keyframes[s.keyframes.length - 1].t
                        ? ((e[0] = s.getValueAtTime(
                            s.keyframes[s.keyframes.length - 1].t / i,
                            0
                          )),
                          (e[1] = a.getValueAtTime(
                            a.keyframes[a.keyframes.length - 1].t / i,
                            0
                          )),
                          (r[0] = s.getValueAtTime(
                            (s.keyframes[s.keyframes.length - 1].t - 0.01) / i,
                            0
                          )),
                          (r[1] = a.getValueAtTime(
                            (a.keyframes[a.keyframes.length - 1].t - 0.01) / i,
                            0
                          )))
                        : ((e = [s.pv, a.pv]),
                          (r[0] = s.getValueAtTime(
                            (s._caching.lastFrame + s.offsetTime - 0.01) / i,
                            s.offsetTime
                          )),
                          (r[1] = a.getValueAtTime(
                            (a._caching.lastFrame + a.offsetTime - 0.01) / i,
                            a.offsetTime
                          )));
                    }
                    this.v.rotate(-Math.atan2(e[1] - r[1], e[0] - r[0]));
                  }
                  this.data.p && this.data.p.s
                    ? this.data.p.z
                      ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                      : this.v.translate(this.px.v, this.py.v, 0)
                    : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                }
                this.frameId = this.elem.globalData.frameId;
              }
            },
            precalculateMatrix: function () {
              if (
                !this.a.k &&
                (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                (this.appliedTransformations = 1),
                !this.s.effectsSequence.length)
              ) {
                if (
                  (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                  (this.appliedTransformations = 2),
                  this.sk)
                ) {
                  if (
                    this.sk.effectsSequence.length ||
                    this.sa.effectsSequence.length
                  )
                    return;
                  this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                    (this.appliedTransformations = 3);
                }
                if (this.r) {
                  if (this.r.effectsSequence.length) return;
                  this.pre.rotate(-this.r.v), (this.appliedTransformations = 4);
                } else
                  this.rz.effectsSequence.length ||
                    this.ry.effectsSequence.length ||
                    this.rx.effectsSequence.length ||
                    this.or.effectsSequence.length ||
                    (this.pre
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                    (this.appliedTransformations = 4));
              }
            },
            autoOrient: function () {},
          }),
          extendPrototype([DynamicPropertyContainer], i),
          (i.prototype.addDynamicProperty = function (t) {
            this._addDynamicProperty(t),
              this.elem.addDynamicProperty(t),
              (this._isDirty = !0);
          }),
          (i.prototype._addDynamicProperty =
            DynamicPropertyContainer.prototype.addDynamicProperty),
          {
            getTransformProperty: function (t, e, r) {
              return new i(t, e, r);
            },
          }
        );
      })();
    function ShapePath() {
      (this.c = !1),
        (this._length = 0),
        (this._maxLength = 8),
        (this.v = createSizedArray(this._maxLength)),
        (this.o = createSizedArray(this._maxLength)),
        (this.i = createSizedArray(this._maxLength));
    }
    (ShapePath.prototype.setPathData = function (t, e) {
      (this.c = t), this.setLength(e);
      for (var r = 0; r < e; )
        (this.v[r] = point_pool.newElement()),
          (this.o[r] = point_pool.newElement()),
          (this.i[r] = point_pool.newElement()),
          (r += 1);
    }),
      (ShapePath.prototype.setLength = function (t) {
        for (; this._maxLength < t; ) this.doubleArrayLength();
        this._length = t;
      }),
      (ShapePath.prototype.doubleArrayLength = function () {
        (this.v = this.v.concat(createSizedArray(this._maxLength))),
          (this.i = this.i.concat(createSizedArray(this._maxLength))),
          (this.o = this.o.concat(createSizedArray(this._maxLength))),
          (this._maxLength *= 2);
      }),
      (ShapePath.prototype.setXYAt = function (t, e, r, i, s) {
        var a;
        switch (
          ((this._length = Math.max(this._length, i + 1)),
          this._length >= this._maxLength && this.doubleArrayLength(),
          r)
        ) {
          case "v":
            a = this.v;
            break;
          case "i":
            a = this.i;
            break;
          case "o":
            a = this.o;
        }
        (!a[i] || (a[i] && !s)) && (a[i] = point_pool.newElement()),
          (a[i][0] = t),
          (a[i][1] = e);
      }),
      (ShapePath.prototype.setTripleAt = function (t, e, r, i, s, a, n, o) {
        this.setXYAt(t, e, "v", n, o),
          this.setXYAt(r, i, "o", n, o),
          this.setXYAt(s, a, "i", n, o);
      }),
      (ShapePath.prototype.reverse = function () {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v,
          r = this.o,
          i = this.i,
          s = 0;
        this.c &&
          (t.setTripleAt(
            e[0][0],
            e[0][1],
            i[0][0],
            i[0][1],
            r[0][0],
            r[0][1],
            0,
            !1
          ),
          (s = 1));
        var a,
          n = this._length - 1,
          o = this._length;
        for (a = s; a < o; a += 1)
          t.setTripleAt(
            e[n][0],
            e[n][1],
            i[n][0],
            i[n][1],
            r[n][0],
            r[n][1],
            a,
            !1
          ),
            (n -= 1);
        return t;
      });
    var ShapePropertyFactory = (function () {
        var s = -999999;
        function t(t, e, r) {
          var i,
            s,
            a,
            n,
            o,
            h,
            p,
            l,
            f,
            m = r.lastIndex,
            c = this.keyframes;
          if (t < c[0].t - this.offsetTime) (i = c[0].s[0]), (a = !0), (m = 0);
          else if (t >= c[c.length - 1].t - this.offsetTime)
            (i = c[c.length - 1].s
              ? c[c.length - 1].s[0]
              : c[c.length - 2].e[0]),
              (a = !0);
          else {
            for (
              var d, u, y = m, g = c.length - 1, v = !0;
              v && ((d = c[y]), !((u = c[y + 1]).t - this.offsetTime > t));

            )
              y < g - 1 ? (y += 1) : (v = !1);
            if (((m = y), !(a = 1 === d.h))) {
              if (t >= u.t - this.offsetTime) l = 1;
              else if (t < d.t - this.offsetTime) l = 0;
              else {
                var b;
                d.__fnct
                  ? (b = d.__fnct)
                  : ((b = BezierFactory.getBezierEasing(
                      d.o.x,
                      d.o.y,
                      d.i.x,
                      d.i.y
                    ).get),
                    (d.__fnct = b)),
                  (l = b(
                    (t - (d.t - this.offsetTime)) /
                      (u.t - this.offsetTime - (d.t - this.offsetTime))
                  ));
              }
              s = u.s ? u.s[0] : d.e[0];
            }
            i = d.s[0];
          }
          for (
            h = e._length, p = i.i[0].length, r.lastIndex = m, n = 0;
            n < h;
            n += 1
          )
            for (o = 0; o < p; o += 1)
              (f = a ? i.i[n][o] : i.i[n][o] + (s.i[n][o] - i.i[n][o]) * l),
                (e.i[n][o] = f),
                (f = a ? i.o[n][o] : i.o[n][o] + (s.o[n][o] - i.o[n][o]) * l),
                (e.o[n][o] = f),
                (f = a ? i.v[n][o] : i.v[n][o] + (s.v[n][o] - i.v[n][o]) * l),
                (e.v[n][o] = f);
        }
        function a() {
          this.paths = this.localShapeCollection;
        }
        function e(t) {
          (function (t, e) {
            if (t._length !== e._length || t.c !== e.c) return !1;
            var r,
              i = t._length;
            for (r = 0; r < i; r += 1)
              if (
                t.v[r][0] !== e.v[r][0] ||
                t.v[r][1] !== e.v[r][1] ||
                t.o[r][0] !== e.o[r][0] ||
                t.o[r][1] !== e.o[r][1] ||
                t.i[r][0] !== e.i[r][0] ||
                t.i[r][1] !== e.i[r][1]
              )
                return !1;
            return !0;
          })(this.v, t) ||
            ((this.v = shape_pool.clone(t)),
            this.localShapeCollection.releaseShapes(),
            this.localShapeCollection.addShape(this.v),
            (this._mdf = !0),
            (this.paths = this.localShapeCollection));
        }
        function r() {
          if (
            this.elem.globalData.frameId !== this.frameId &&
            this.effectsSequence.length
          )
            if (this.lock) this.setVValue(this.pv);
            else {
              (this.lock = !0), (this._mdf = !1);
              var t,
                e = this.kf
                  ? this.pv
                  : this.data.ks
                  ? this.data.ks.k
                  : this.data.pt.k,
                r = this.effectsSequence.length;
              for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);
              this.setVValue(e),
                (this.lock = !1),
                (this.frameId = this.elem.globalData.frameId);
            }
        }
        function n(t, e, r) {
          (this.propType = "shape"),
            (this.comp = t.comp),
            (this.container = t),
            (this.elem = t),
            (this.data = e),
            (this.k = !1),
            (this.kf = !1),
            (this._mdf = !1);
          var i = 3 === r ? e.pt.k : e.ks.k;
          (this.v = shape_pool.clone(i)),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection =
              shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.reset = a),
            (this.effectsSequence = []);
        }
        function i(t) {
          this.effectsSequence.push(t), this.container.addDynamicProperty(this);
        }
        function o(t, e, r) {
          (this.propType = "shape"),
            (this.comp = t.comp),
            (this.elem = t),
            (this.container = t),
            (this.offsetTime = t.data.st),
            (this.keyframes = 3 === r ? e.pt.k : e.ks.k),
            (this.k = !0),
            (this.kf = !0);
          var i = this.keyframes[0].s[0].i.length;
          this.keyframes[0].s[0].i[0].length;
          (this.v = shape_pool.newElement()),
            this.v.setPathData(this.keyframes[0].s[0].c, i),
            (this.pv = shape_pool.clone(this.v)),
            (this.localShapeCollection =
              shapeCollection_pool.newShapeCollection()),
            (this.paths = this.localShapeCollection),
            this.paths.addShape(this.v),
            (this.lastFrame = s),
            (this.reset = a),
            (this._caching = { lastFrame: s, lastIndex: 0 }),
            (this.effectsSequence = [
              function () {
                var t = this.comp.renderedFrame - this.offsetTime,
                  e = this.keyframes[0].t - this.offsetTime,
                  r =
                    this.keyframes[this.keyframes.length - 1].t -
                    this.offsetTime,
                  i = this._caching.lastFrame;
                return (
                  (i !== s && ((i < e && t < e) || (r < i && r < t))) ||
                    ((this._caching.lastIndex =
                      i < t ? this._caching.lastIndex : 0),
                    this.interpolateShape(t, this.pv, this._caching)),
                  (this._caching.lastFrame = t),
                  this.pv
                );
              }.bind(this),
            ]);
        }
        (n.prototype.interpolateShape = t),
          (n.prototype.getValue = r),
          (n.prototype.setVValue = e),
          (n.prototype.addEffect = i),
          (o.prototype.getValue = r),
          (o.prototype.interpolateShape = t),
          (o.prototype.setVValue = e),
          (o.prototype.addEffect = i);
        var h = (function () {
            var n = roundCorner;
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 4),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.localShapeCollection.addShape(this.v),
                (this.d = e.d),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertEllToPath());
            }
            return (
              (t.prototype = {
                reset: a,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertEllToPath());
                },
                convertEllToPath: function () {
                  var t = this.p.v[0],
                    e = this.p.v[1],
                    r = this.s.v[0] / 2,
                    i = this.s.v[1] / 2,
                    s = 3 !== this.d,
                    a = this.v;
                  (a.v[0][0] = t),
                    (a.v[0][1] = e - i),
                    (a.v[1][0] = s ? t + r : t - r),
                    (a.v[1][1] = e),
                    (a.v[2][0] = t),
                    (a.v[2][1] = e + i),
                    (a.v[3][0] = s ? t - r : t + r),
                    (a.v[3][1] = e),
                    (a.i[0][0] = s ? t - r * n : t + r * n),
                    (a.i[0][1] = e - i),
                    (a.i[1][0] = s ? t + r : t - r),
                    (a.i[1][1] = e - i * n),
                    (a.i[2][0] = s ? t + r * n : t - r * n),
                    (a.i[2][1] = e + i),
                    (a.i[3][0] = s ? t - r : t + r),
                    (a.i[3][1] = e + i * n),
                    (a.o[0][0] = s ? t + r * n : t - r * n),
                    (a.o[0][1] = e - i),
                    (a.o[1][0] = s ? t + r : t - r),
                    (a.o[1][1] = e + i * n),
                    (a.o[2][0] = s ? t - r * n : t + r * n),
                    (a.o[2][1] = e + i),
                    (a.o[3][0] = s ? t - r : t + r),
                    (a.o[3][1] = e - i * n);
                },
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          p = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                this.v.setPathData(!0, 0),
                (this.elem = t),
                (this.comp = t.comp),
                (this.data = e),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                1 === e.sy
                  ? ((this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this)),
                    (this.is = PropertyFactory.getProp(t, e.is, 0, 0.01, this)),
                    (this.convertToPath = this.convertStarToPath))
                  : (this.convertToPath = this.convertPolygonToPath),
                (this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this)),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this)),
                (this.or = PropertyFactory.getProp(t, e.or, 0, 0, this)),
                (this.os = PropertyFactory.getProp(t, e.os, 0, 0.01, this)),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertToPath());
            }
            return (
              (t.prototype = {
                reset: a,
                getValue: function () {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertToPath());
                },
                convertStarToPath: function () {
                  var t,
                    e,
                    r,
                    i,
                    s = 2 * Math.floor(this.pt.v),
                    a = (2 * Math.PI) / s,
                    n = !0,
                    o = this.or.v,
                    h = this.ir.v,
                    p = this.os.v,
                    l = this.is.v,
                    f = (2 * Math.PI * o) / (2 * s),
                    m = (2 * Math.PI * h) / (2 * s),
                    c = -Math.PI / 2;
                  c += this.r.v;
                  var d = 3 === this.data.d ? -1 : 1;
                  for (t = this.v._length = 0; t < s; t += 1) {
                    (r = n ? p : l), (i = n ? f : m);
                    var u = (e = n ? o : h) * Math.cos(c),
                      y = e * Math.sin(c),
                      g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                      v =
                        0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                    (u += +this.p.v[0]),
                      (y += +this.p.v[1]),
                      this.v.setTripleAt(
                        u,
                        y,
                        u - g * i * r * d,
                        y - v * i * r * d,
                        u + g * i * r * d,
                        y + v * i * r * d,
                        t,
                        !0
                      ),
                      (n = !n),
                      (c += a * d);
                  }
                },
                convertPolygonToPath: function () {
                  var t,
                    e = Math.floor(this.pt.v),
                    r = (2 * Math.PI) / e,
                    i = this.or.v,
                    s = this.os.v,
                    a = (2 * Math.PI * i) / (4 * e),
                    n = -Math.PI / 2,
                    o = 3 === this.data.d ? -1 : 1;
                  for (n += this.r.v, t = this.v._length = 0; t < e; t += 1) {
                    var h = i * Math.cos(n),
                      p = i * Math.sin(n),
                      l = 0 === h && 0 === p ? 0 : p / Math.sqrt(h * h + p * p),
                      f =
                        0 === h && 0 === p ? 0 : -h / Math.sqrt(h * h + p * p);
                    (h += +this.p.v[0]),
                      (p += +this.p.v[1]),
                      this.v.setTripleAt(
                        h,
                        p,
                        h - l * a * s * o,
                        p - f * a * s * o,
                        h + l * a * s * o,
                        p + f * a * s * o,
                        t,
                        !0
                      ),
                      (n += r * o);
                  }
                  (this.paths.length = 0), (this.paths[0] = this.v);
                },
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })(),
          l = (function () {
            function t(t, e) {
              (this.v = shape_pool.newElement()),
                (this.v.c = !0),
                (this.localShapeCollection =
                  shapeCollection_pool.newShapeCollection()),
                this.localShapeCollection.addShape(this.v),
                (this.paths = this.localShapeCollection),
                (this.elem = t),
                (this.comp = t.comp),
                (this.frameId = -1),
                (this.d = e.d),
                this.initDynamicPropertyContainer(t),
                (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                (this.r = PropertyFactory.getProp(t, e.r, 0, 0, this)),
                this.dynamicProperties.length
                  ? (this.k = !0)
                  : ((this.k = !1), this.convertRectToPath());
            }
            return (
              (t.prototype = {
                convertRectToPath: function () {
                  var t = this.p.v[0],
                    e = this.p.v[1],
                    r = this.s.v[0] / 2,
                    i = this.s.v[1] / 2,
                    s = bm_min(r, i, this.r.v),
                    a = s * (1 - roundCorner);
                  (this.v._length = 0),
                    2 === this.d || 1 === this.d
                      ? (this.v.setTripleAt(
                          t + r,
                          e - i + s,
                          t + r,
                          e - i + s,
                          t + r,
                          e - i + a,
                          0,
                          !0
                        ),
                        this.v.setTripleAt(
                          t + r,
                          e + i - s,
                          t + r,
                          e + i - a,
                          t + r,
                          e + i - s,
                          1,
                          !0
                        ),
                        0 !== s
                          ? (this.v.setTripleAt(
                              t + r - s,
                              e + i,
                              t + r - s,
                              e + i,
                              t + r - a,
                              e + i,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r + s,
                              e + i,
                              t - r + a,
                              e + i,
                              t - r + s,
                              e + i,
                              3,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e + i - s,
                              t - r,
                              e + i - s,
                              t - r,
                              e + i - a,
                              4,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e - i + s,
                              t - r,
                              e - i + a,
                              t - r,
                              e - i + s,
                              5,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r + s,
                              e - i,
                              t - r + s,
                              e - i,
                              t - r + a,
                              e - i,
                              6,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + r - s,
                              e - i,
                              t + r - a,
                              e - i,
                              t + r - s,
                              e - i,
                              7,
                              !0
                            ))
                          : (this.v.setTripleAt(
                              t - r,
                              e + i,
                              t - r + a,
                              e + i,
                              t - r,
                              e + i,
                              2
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e - i,
                              t - r,
                              e - i + a,
                              t - r,
                              e - i,
                              3
                            )))
                      : (this.v.setTripleAt(
                          t + r,
                          e - i + s,
                          t + r,
                          e - i + a,
                          t + r,
                          e - i + s,
                          0,
                          !0
                        ),
                        0 !== s
                          ? (this.v.setTripleAt(
                              t + r - s,
                              e - i,
                              t + r - s,
                              e - i,
                              t + r - a,
                              e - i,
                              1,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r + s,
                              e - i,
                              t - r + a,
                              e - i,
                              t - r + s,
                              e - i,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e - i + s,
                              t - r,
                              e - i + s,
                              t - r,
                              e - i + a,
                              3,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e + i - s,
                              t - r,
                              e + i - a,
                              t - r,
                              e + i - s,
                              4,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r + s,
                              e + i,
                              t - r + s,
                              e + i,
                              t - r + a,
                              e + i,
                              5,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + r - s,
                              e + i,
                              t + r - a,
                              e + i,
                              t + r - s,
                              e + i,
                              6,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + r,
                              e + i - s,
                              t + r,
                              e + i - s,
                              t + r,
                              e + i - a,
                              7,
                              !0
                            ))
                          : (this.v.setTripleAt(
                              t - r,
                              e - i,
                              t - r + a,
                              e - i,
                              t - r,
                              e - i,
                              1,
                              !0
                            ),
                            this.v.setTripleAt(
                              t - r,
                              e + i,
                              t - r,
                              e + i - a,
                              t - r,
                              e + i,
                              2,
                              !0
                            ),
                            this.v.setTripleAt(
                              t + r,
                              e + i,
                              t + r - a,
                              e + i,
                              t + r,
                              e + i,
                              3,
                              !0
                            )));
                },
                getValue: function (t) {
                  this.elem.globalData.frameId !== this.frameId &&
                    ((this.frameId = this.elem.globalData.frameId),
                    this.iterateDynamicProperties(),
                    this._mdf && this.convertRectToPath());
                },
                reset: a,
              }),
              extendPrototype([DynamicPropertyContainer], t),
              t
            );
          })();
        var f = {
          getShapeProp: function (t, e, r) {
            var i;
            return (
              3 === r || 4 === r
                ? (i = (3 === r ? e.pt : e.ks).k.length
                    ? new o(t, e, r)
                    : new n(t, e, r))
                : 5 === r
                ? (i = new l(t, e))
                : 6 === r
                ? (i = new h(t, e))
                : 7 === r && (i = new p(t, e)),
              i.k && t.addDynamicProperty(i),
              i
            );
          },
          getConstructorFunction: function () {
            return n;
          },
          getKeyframedConstructorFunction: function () {
            return o;
          },
        };
        return f;
      })(),
      ShapeModifiers =
        ((Tr = {}),
        (Ur = {}),
        (Tr.registerModifier = function (t, e) {
          Ur[t] || (Ur[t] = e);
        }),
        (Tr.getModifier = function (t, e, r) {
          return new Ur[t](e, r);
        }),
        Tr),
      Tr,
      Ur;
    function ShapeModifier() {}
    function TrimModifier() {}
    function RoundCornersModifier() {}
    function RepeaterModifier() {}
    function ShapeCollection() {
      (this._length = 0),
        (this._maxLength = 4),
        (this.shapes = createSizedArray(this._maxLength));
    }
    function DashProperty(t, e, r, i) {
      (this.elem = t),
        (this.frameId = -1),
        (this.dataProps = createSizedArray(e.length)),
        (this.renderer = r),
        (this.k = !1),
        (this.dashStr = ""),
        (this.dashArray = createTypedArray(
          "float32",
          e.length ? e.length - 1 : 0
        )),
        (this.dashoffset = createTypedArray("float32", 1)),
        this.initDynamicPropertyContainer(i);
      var s,
        a,
        n = e.length || 0;
      for (s = 0; s < n; s += 1)
        (a = PropertyFactory.getProp(t, e[s].v, 0, 0, this)),
          (this.k = a.k || this.k),
          (this.dataProps[s] = { n: e[s].n, p: a });
      this.k || this.getValue(!0), (this._isAnimated = this.k);
    }
    function GradientProperty(t, e, r) {
      (this.data = e), (this.c = createTypedArray("uint8c", 4 * e.p));
      var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
      (this.o = createTypedArray("float32", i)),
        (this._cmdf = !1),
        (this._omdf = !1),
        (this._collapsable = this.checkCollapsable()),
        (this._hasOpacity = i),
        this.initDynamicPropertyContainer(r),
        (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
        (this.k = this.prop.k),
        this.getValue(!0);
    }
    (ShapeModifier.prototype.initModifierProperties = function () {}),
      (ShapeModifier.prototype.addShapeToModifier = function () {}),
      (ShapeModifier.prototype.addShape = function (t) {
        if (!this.closed) {
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: shapeCollection_pool.newShapeCollection(),
          };
          this.shapes.push(e),
            this.addShapeToModifier(e),
            this._isAnimated && t.setAsAnimated();
        }
      }),
      (ShapeModifier.prototype.init = function (t, e) {
        (this.shapes = []),
          (this.elem = t),
          this.initDynamicPropertyContainer(t),
          this.initModifierProperties(t, e),
          (this.frameId = initialDefaultFrame),
          (this.closed = !1),
          (this.k = !1),
          this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (ShapeModifier.prototype.processKeys = function () {
        this.elem.globalData.frameId !== this.frameId &&
          ((this.frameId = this.elem.globalData.frameId),
          this.iterateDynamicProperties());
      }),
      extendPrototype([DynamicPropertyContainer], ShapeModifier),
      extendPrototype([ShapeModifier], TrimModifier),
      (TrimModifier.prototype.initModifierProperties = function (t, e) {
        (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
          (this.sValue = 0),
          (this.eValue = 0),
          (this.getValue = this.processKeys),
          (this.m = e.m),
          (this._isAnimated =
            !!this.s.effectsSequence.length ||
            !!this.e.effectsSequence.length ||
            !!this.o.effectsSequence.length);
      }),
      (TrimModifier.prototype.addShapeToModifier = function (t) {
        t.pathsData = [];
      }),
      (TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, s) {
        var a = [];
        e <= 1
          ? a.push({ s: t, e: e })
          : 1 <= t
          ? a.push({ s: t - 1, e: e - 1 })
          : (a.push({ s: t, e: 1 }), a.push({ s: 0, e: e - 1 }));
        var n,
          o,
          h = [],
          p = a.length;
        for (n = 0; n < p; n += 1) {
          var l, f;
          if ((o = a[n]).e * s < i || o.s * s > i + r);
          else
            (l = o.s * s <= i ? 0 : (o.s * s - i) / r),
              (f = o.e * s >= i + r ? 1 : (o.e * s - i) / r),
              h.push([l, f]);
        }
        return h.length || h.push([0, 0]), h;
      }),
      (TrimModifier.prototype.releasePathsData = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);
        return (t.length = 0), t;
      }),
      (TrimModifier.prototype.processShapes = function (t) {
        var e, r, i;
        if (this._mdf || t) {
          var s = (this.o.v % 360) / 360;
          if (
            (s < 0 && (s += 1),
            (e = (1 < this.s.v ? 1 : this.s.v < 0 ? 0 : this.s.v) + s),
            (r = (1 < this.e.v ? 1 : this.e.v < 0 ? 0 : this.e.v) + s) < e)
          ) {
            var a = e;
            (e = r), (r = a);
          }
          (e = 1e-4 * Math.round(1e4 * e)),
            (r = 1e-4 * Math.round(1e4 * r)),
            (this.sValue = e),
            (this.eValue = r);
        } else (e = this.sValue), (r = this.eValue);
        var n,
          o,
          h,
          p,
          l,
          f,
          m = this.shapes.length,
          c = 0;
        if (r === e)
          for (n = 0; n < m; n += 1)
            this.shapes[n].localShapeCollection.releaseShapes(),
              (this.shapes[n].shape._mdf = !0),
              (this.shapes[n].shape.paths =
                this.shapes[n].localShapeCollection);
        else if ((1 === r && 0 === e) || (0 === r && 1 === e)) {
          if (this._mdf)
            for (n = 0; n < m; n += 1)
              (this.shapes[n].pathsData.length = 0),
                (this.shapes[n].shape._mdf = !0);
        } else {
          var d,
            u,
            y = [];
          for (n = 0; n < m; n += 1)
            if (
              (d = this.shapes[n]).shape._mdf ||
              this._mdf ||
              t ||
              2 === this.m
            ) {
              if (
                ((h = (i = d.shape.paths)._length),
                (f = 0),
                !d.shape._mdf && d.pathsData.length)
              )
                f = d.totalShapeLength;
              else {
                for (
                  p = this.releasePathsData(d.pathsData), o = 0;
                  o < h;
                  o += 1
                )
                  (l = bez.getSegmentsLength(i.shapes[o])),
                    p.push(l),
                    (f += l.totalLength);
                (d.totalShapeLength = f), (d.pathsData = p);
              }
              (c += f), (d.shape._mdf = !0);
            } else d.shape.paths = d.localShapeCollection;
          var g,
            v = e,
            b = r,
            P = 0;
          for (n = m - 1; 0 <= n; n -= 1)
            if ((d = this.shapes[n]).shape._mdf) {
              for (
                (u = d.localShapeCollection).releaseShapes(),
                  2 === this.m && 1 < m
                    ? ((g = this.calculateShapeEdges(
                        e,
                        r,
                        d.totalShapeLength,
                        P,
                        c
                      )),
                      (P += d.totalShapeLength))
                    : (g = [[v, b]]),
                  h = g.length,
                  o = 0;
                o < h;
                o += 1
              ) {
                (v = g[o][0]),
                  (b = g[o][1]),
                  (y.length = 0),
                  b <= 1
                    ? y.push({
                        s: d.totalShapeLength * v,
                        e: d.totalShapeLength * b,
                      })
                    : 1 <= v
                    ? y.push({
                        s: d.totalShapeLength * (v - 1),
                        e: d.totalShapeLength * (b - 1),
                      })
                    : (y.push({
                        s: d.totalShapeLength * v,
                        e: d.totalShapeLength,
                      }),
                      y.push({ s: 0, e: d.totalShapeLength * (b - 1) }));
                var _ = this.addShapes(d, y[0]);
                if (y[0].s !== y[0].e) {
                  if (1 < y.length)
                    if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
                      var A = _.pop();
                      this.addPaths(_, u), (_ = this.addShapes(d, y[1], A));
                    } else this.addPaths(_, u), (_ = this.addShapes(d, y[1]));
                  this.addPaths(_, u);
                }
              }
              d.shape.paths = u;
            }
        }
      }),
      (TrimModifier.prototype.addPaths = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1) e.addShape(t[r]);
      }),
      (TrimModifier.prototype.addSegment = function (t, e, r, i, s, a, n) {
        s.setXYAt(e[0], e[1], "o", a),
          s.setXYAt(r[0], r[1], "i", a + 1),
          n && s.setXYAt(t[0], t[1], "v", a),
          s.setXYAt(i[0], i[1], "v", a + 1);
      }),
      (TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
        e.setXYAt(t[1], t[5], "o", r),
          e.setXYAt(t[2], t[6], "i", r + 1),
          i && e.setXYAt(t[0], t[4], "v", r),
          e.setXYAt(t[3], t[7], "v", r + 1);
      }),
      (TrimModifier.prototype.addShapes = function (t, e, r) {
        var i,
          s,
          a,
          n,
          o,
          h,
          p,
          l,
          f = t.pathsData,
          m = t.shape.paths.shapes,
          c = t.shape.paths._length,
          d = 0,
          u = [],
          y = !0;
        for (
          l = r
            ? ((o = r._length), r._length)
            : ((r = shape_pool.newElement()), (o = 0)),
            u.push(r),
            i = 0;
          i < c;
          i += 1
        ) {
          for (
            h = f[i].lengths,
              r.c = m[i].c,
              a = m[i].c ? h.length : h.length + 1,
              s = 1;
            s < a;
            s += 1
          )
            if (d + (n = h[s - 1]).addedLength < e.s)
              (d += n.addedLength), (r.c = !1);
            else {
              if (d > e.e) {
                r.c = !1;
                break;
              }
              e.s <= d && e.e >= d + n.addedLength
                ? (this.addSegment(
                    m[i].v[s - 1],
                    m[i].o[s - 1],
                    m[i].i[s],
                    m[i].v[s],
                    r,
                    o,
                    y
                  ),
                  (y = !1))
                : ((p = bez.getNewSegment(
                    m[i].v[s - 1],
                    m[i].v[s],
                    m[i].o[s - 1],
                    m[i].i[s],
                    (e.s - d) / n.addedLength,
                    (e.e - d) / n.addedLength,
                    h[s - 1]
                  )),
                  this.addSegmentFromArray(p, r, o, y),
                  (y = !1),
                  (r.c = !1)),
                (d += n.addedLength),
                (o += 1);
            }
          if (m[i].c && h.length) {
            if (((n = h[s - 1]), d <= e.e)) {
              var g = h[s - 1].addedLength;
              e.s <= d && e.e >= d + g
                ? (this.addSegment(
                    m[i].v[s - 1],
                    m[i].o[s - 1],
                    m[i].i[0],
                    m[i].v[0],
                    r,
                    o,
                    y
                  ),
                  (y = !1))
                : ((p = bez.getNewSegment(
                    m[i].v[s - 1],
                    m[i].v[0],
                    m[i].o[s - 1],
                    m[i].i[0],
                    (e.s - d) / g,
                    (e.e - d) / g,
                    h[s - 1]
                  )),
                  this.addSegmentFromArray(p, r, o, y),
                  (y = !1),
                  (r.c = !1));
            } else r.c = !1;
            (d += n.addedLength), (o += 1);
          }
          if (
            (r._length &&
              (r.setXYAt(r.v[l][0], r.v[l][1], "i", l),
              r.setXYAt(
                r.v[r._length - 1][0],
                r.v[r._length - 1][1],
                "o",
                r._length - 1
              )),
            d > e.e)
          )
            break;
          i < c - 1 &&
            ((r = shape_pool.newElement()), (y = !0), u.push(r), (o = 0));
        }
        return u;
      }),
      ShapeModifiers.registerModifier("tm", TrimModifier),
      extendPrototype([ShapeModifier], RoundCornersModifier),
      (RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys),
          (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)),
          (this._isAnimated = !!this.rd.effectsSequence.length);
      }),
      (RoundCornersModifier.prototype.processPath = function (t, e) {
        var r = shape_pool.newElement();
        r.c = t.c;
        var i,
          s,
          a,
          n,
          o,
          h,
          p,
          l,
          f,
          m,
          c,
          d,
          u,
          y = t._length,
          g = 0;
        for (i = 0; i < y; i += 1)
          (s = t.v[i]),
            (n = t.o[i]),
            (a = t.i[i]),
            s[0] === n[0] && s[1] === n[1] && s[0] === a[0] && s[1] === a[1]
              ? (0 !== i && i !== y - 1) || t.c
                ? ((o = 0 === i ? t.v[y - 1] : t.v[i - 1]),
                  (p = (h = Math.sqrt(
                    Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)
                  ))
                    ? Math.min(h / 2, e) / h
                    : 0),
                  (l = d = s[0] + (o[0] - s[0]) * p),
                  (f = u = s[1] - (s[1] - o[1]) * p),
                  (m = l - (l - s[0]) * roundCorner),
                  (c = f - (f - s[1]) * roundCorner),
                  r.setTripleAt(l, f, m, c, d, u, g),
                  (g += 1),
                  (o = i === y - 1 ? t.v[0] : t.v[i + 1]),
                  (p = (h = Math.sqrt(
                    Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)
                  ))
                    ? Math.min(h / 2, e) / h
                    : 0),
                  (l = m = s[0] + (o[0] - s[0]) * p),
                  (f = c = s[1] + (o[1] - s[1]) * p),
                  (d = l - (l - s[0]) * roundCorner),
                  (u = f - (f - s[1]) * roundCorner),
                  r.setTripleAt(l, f, m, c, d, u, g))
                : r.setTripleAt(s[0], s[1], n[0], n[1], a[0], a[1], g)
              : r.setTripleAt(
                  t.v[i][0],
                  t.v[i][1],
                  t.o[i][0],
                  t.o[i][1],
                  t.i[i][0],
                  t.i[i][1],
                  g
                ),
            (g += 1);
        return r;
      }),
      (RoundCornersModifier.prototype.processShapes = function (t) {
        var e,
          r,
          i,
          s,
          a,
          n,
          o = this.shapes.length,
          h = this.rd.v;
        if (0 !== h)
          for (r = 0; r < o; r += 1) {
            if (
              ((a = this.shapes[r]).shape.paths,
              (n = a.localShapeCollection),
              a.shape._mdf || this._mdf || t)
            )
              for (
                n.releaseShapes(),
                  a.shape._mdf = !0,
                  e = a.shape.paths.shapes,
                  s = a.shape.paths._length,
                  i = 0;
                i < s;
                i += 1
              )
                n.addShape(this.processPath(e[i], h));
            a.shape.paths = a.localShapeCollection;
          }
        this.dynamicProperties.length || (this._mdf = !1);
      }),
      ShapeModifiers.registerModifier("rd", RoundCornersModifier),
      extendPrototype([ShapeModifier], RepeaterModifier),
      (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
        (this.getValue = this.processKeys),
          (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
          (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
          (this.tr = TransformPropertyFactory.getTransformProperty(
            t,
            e.tr,
            this
          )),
          (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
          (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
          (this.data = e),
          this.dynamicProperties.length || this.getValue(!0),
          (this._isAnimated = !!this.dynamicProperties.length),
          (this.pMatrix = new Matrix()),
          (this.rMatrix = new Matrix()),
          (this.sMatrix = new Matrix()),
          (this.tMatrix = new Matrix()),
          (this.matrix = new Matrix());
      }),
      (RepeaterModifier.prototype.applyTransforms = function (
        t,
        e,
        r,
        i,
        s,
        a
      ) {
        var n = a ? -1 : 1,
          o = i.s.v[0] + (1 - i.s.v[0]) * (1 - s),
          h = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * n * s, i.p.v[1] * n * s, i.p.v[2]),
          e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
          e.rotate(-i.r.v * n * s),
          e.translate(i.a.v[0], i.a.v[1], i.a.v[2]),
          r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]),
          r.scale(a ? 1 / o : o, a ? 1 / h : h),
          r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }),
      (RepeaterModifier.prototype.init = function (t, e, r, i) {
        (this.elem = t),
          (this.arr = e),
          (this.pos = r),
          (this.elemsData = i),
          (this._currentCopies = 0),
          (this._elements = []),
          (this._groups = []),
          (this.frameId = -1),
          this.initDynamicPropertyContainer(t),
          this.initModifierProperties(t, e[r]);
        for (; 0 < r; ) (r -= 1), this._elements.unshift(e[r]), 1;
        this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
      }),
      (RepeaterModifier.prototype.resetElements = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1)
          (t[e]._processed = !1),
            "gr" === t[e].ty && this.resetElements(t[e].it);
      }),
      (RepeaterModifier.prototype.cloneElements = function (t) {
        t.length;
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }),
      (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
        var r,
          i = t.length;
        for (r = 0; r < i; r += 1)
          (t[r]._render = e),
            "gr" === t[r].ty && this.changeGroupRender(t[r].it, e);
      }),
      (RepeaterModifier.prototype.processShapes = function (t) {
        var e, r, i, s, a;
        if (this._mdf || t) {
          var n,
            o = Math.ceil(this.c.v);
          if (this._groups.length < o) {
            for (; this._groups.length < o; ) {
              var h = { it: this.cloneElements(this._elements), ty: "gr" };
              h.it.push({
                a: { a: 0, ix: 1, k: [0, 0] },
                nm: "Transform",
                o: { a: 0, ix: 7, k: 100 },
                p: { a: 0, ix: 2, k: [0, 0] },
                r: {
                  a: 1,
                  ix: 6,
                  k: [
                    { s: 0, e: 0, t: 0 },
                    { s: 0, e: 0, t: 1 },
                  ],
                },
                s: { a: 0, ix: 3, k: [100, 100] },
                sa: { a: 0, ix: 5, k: 0 },
                sk: { a: 0, ix: 4, k: 0 },
                ty: "tr",
              }),
                this.arr.splice(0, 0, h),
                this._groups.splice(0, 0, h),
                (this._currentCopies += 1);
            }
            this.elem.reloadShapes();
          }
          for (i = a = 0; i <= this._groups.length - 1; i += 1)
            (n = a < o),
              (this._groups[i]._render = n),
              this.changeGroupRender(this._groups[i].it, n),
              (a += 1);
          this._currentCopies = o;
          var p = this.o.v,
            l = p % 1,
            f = 0 < p ? Math.floor(p) : Math.ceil(p),
            m = (this.tr.v.props, this.pMatrix.props),
            c = this.rMatrix.props,
            d = this.sMatrix.props;
          this.pMatrix.reset(),
            this.rMatrix.reset(),
            this.sMatrix.reset(),
            this.tMatrix.reset(),
            this.matrix.reset();
          var u,
            y,
            g = 0;
          if (0 < p) {
            for (; g < f; )
              this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                1,
                !1
              ),
                (g += 1);
            l &&
              (this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                l,
                !1
              ),
              (g += l));
          } else if (p < 0) {
            for (; f < g; )
              this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                1,
                !0
              ),
                (g -= 1);
            l &&
              (this.applyTransforms(
                this.pMatrix,
                this.rMatrix,
                this.sMatrix,
                this.tr,
                -l,
                !0
              ),
              (g -= l));
          }
          for (
            i = 1 === this.data.m ? 0 : this._currentCopies - 1,
              s = 1 === this.data.m ? 1 : -1,
              a = this._currentCopies;
            a;

          ) {
            if (
              ((y = (r = (e = this.elemsData[i].it)[e.length - 1].transform
                .mProps.v.props).length),
              (e[e.length - 1].transform.mProps._mdf = !0),
              (e[e.length - 1].transform.op._mdf = !0),
              (e[e.length - 1].transform.op.v =
                this.so.v +
                (this.eo.v - this.so.v) * (i / (this._currentCopies - 1))),
              0 !== g)
            ) {
              for (
                ((0 !== i && 1 === s) ||
                  (i !== this._currentCopies - 1 && -1 === s)) &&
                  this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    1,
                    !1
                  ),
                  this.matrix.transform(
                    c[0],
                    c[1],
                    c[2],
                    c[3],
                    c[4],
                    c[5],
                    c[6],
                    c[7],
                    c[8],
                    c[9],
                    c[10],
                    c[11],
                    c[12],
                    c[13],
                    c[14],
                    c[15]
                  ),
                  this.matrix.transform(
                    d[0],
                    d[1],
                    d[2],
                    d[3],
                    d[4],
                    d[5],
                    d[6],
                    d[7],
                    d[8],
                    d[9],
                    d[10],
                    d[11],
                    d[12],
                    d[13],
                    d[14],
                    d[15]
                  ),
                  this.matrix.transform(
                    m[0],
                    m[1],
                    m[2],
                    m[3],
                    m[4],
                    m[5],
                    m[6],
                    m[7],
                    m[8],
                    m[9],
                    m[10],
                    m[11],
                    m[12],
                    m[13],
                    m[14],
                    m[15]
                  ),
                  u = 0;
                u < y;
                u += 1
              )
                r[u] = this.matrix.props[u];
              this.matrix.reset();
            } else
              for (this.matrix.reset(), u = 0; u < y; u += 1)
                r[u] = this.matrix.props[u];
            (g += 1), (a -= 1), (i += s);
          }
        } else
          for (a = this._currentCopies, i = 0, s = 1; a; )
            (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v
              .props),
              (e[e.length - 1].transform.mProps._mdf = !1),
              (e[e.length - 1].transform.op._mdf = !1),
              (a -= 1),
              (i += s);
      }),
      (RepeaterModifier.prototype.addShape = function () {}),
      ShapeModifiers.registerModifier("rp", RepeaterModifier),
      (ShapeCollection.prototype.addShape = function (t) {
        this._length === this._maxLength &&
          ((this.shapes = this.shapes.concat(
            createSizedArray(this._maxLength)
          )),
          (this._maxLength *= 2)),
          (this.shapes[this._length] = t),
          (this._length += 1);
      }),
      (ShapeCollection.prototype.releaseShapes = function () {
        var t;
        for (t = 0; t < this._length; t += 1)
          shape_pool.release(this.shapes[t]);
        this._length = 0;
      }),
      (DashProperty.prototype.getValue = function (t) {
        if (
          (this.elem.globalData.frameId !== this.frameId || t) &&
          ((this.frameId = this.elem.globalData.frameId),
          this.iterateDynamicProperties(),
          (this._mdf = this._mdf || t),
          this._mdf)
        ) {
          var e = 0,
            r = this.dataProps.length;
          for (
            "svg" === this.renderer && (this.dashStr = ""), e = 0;
            e < r;
            e += 1
          )
            "o" != this.dataProps[e].n
              ? "svg" === this.renderer
                ? (this.dashStr += " " + this.dataProps[e].p.v)
                : (this.dashArray[e] = this.dataProps[e].p.v)
              : (this.dashoffset[0] = this.dataProps[e].p.v);
        }
      }),
      extendPrototype([DynamicPropertyContainer], DashProperty),
      (GradientProperty.prototype.comparePoints = function (t, e) {
        for (var r = 0, i = this.o.length / 2; r < i; ) {
          if (0.01 < Math.abs(t[4 * r] - t[4 * e + 2 * r])) return !1;
          r += 1;
        }
        return !0;
      }),
      (GradientProperty.prototype.checkCollapsable = function () {
        if (this.o.length / 2 != this.c.length / 4) return !1;
        if (this.data.k.k[0].s)
          for (var t = 0, e = this.data.k.k.length; t < e; ) {
            if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
            t += 1;
          }
        else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
        return !0;
      }),
      (GradientProperty.prototype.getValue = function (t) {
        if (
          (this.prop.getValue(),
          (this._mdf = !1),
          (this._cmdf = !1),
          (this._omdf = !1),
          this.prop._mdf || t)
        ) {
          var e,
            r,
            i,
            s = 4 * this.data.p;
          for (e = 0; e < s; e += 1)
            (r = e % 4 == 0 ? 100 : 255),
              (i = Math.round(this.prop.v[e] * r)),
              this.c[e] !== i && ((this.c[e] = i), (this._cmdf = !t));
          if (this.o.length)
            for (s = this.prop.v.length, e = 4 * this.data.p; e < s; e += 1)
              (r = e % 2 == 0 ? 100 : 1),
                (i =
                  e % 2 == 0
                    ? Math.round(100 * this.prop.v[e])
                    : this.prop.v[e]),
                this.o[e - 4 * this.data.p] !== i &&
                  ((this.o[e - 4 * this.data.p] = i), (this._omdf = !t));
          this._mdf = !t;
        }
      }),
      extendPrototype([DynamicPropertyContainer], GradientProperty);
    var buildShapeString = function (t, e, r, i) {
        if (0 === e) return "";
        var s,
          a = t.o,
          n = t.i,
          o = t.v,
          h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
        for (s = 1; s < e; s += 1)
          h +=
            " C" +
            i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) +
            " " +
            i.applyToPointStringified(n[s][0], n[s][1]) +
            " " +
            i.applyToPointStringified(o[s][0], o[s][1]);
        return (
          r &&
            e &&
            ((h +=
              " C" +
              i.applyToPointStringified(a[s - 1][0], a[s - 1][1]) +
              " " +
              i.applyToPointStringified(n[0][0], n[0][1]) +
              " " +
              i.applyToPointStringified(o[0][0], o[0][1])),
            (h += "z")),
          h
        );
      },
      ImagePreloader = (function () {
        var s = (function () {
          var t = createTag("canvas");
          (t.width = 1), (t.height = 1);
          var e = t.getContext("2d");
          return (e.fillStyle = "#FF0000"), e.fillRect(0, 0, 1, 1), t;
        })();
        function t() {
          (this.loadedAssets += 1),
            this.loadedAssets === this.totalImages &&
              this.imagesLoadedCb &&
              this.imagesLoadedCb(null);
        }
        function e(t) {
          var e = (function (t, e, r) {
              var i = "";
              if (t.e) i = t.p;
              else if (e) {
                var s = t.p;
                -1 !== s.indexOf("images/") && (s = s.split("/")[1]),
                  (i = e + s);
              } else (i = r), (i += t.u ? t.u : ""), (i += t.p);
              return i;
            })(t, this.assetsPath, this.path),
            r = createTag("img");
          (r.crossOrigin = "anonymous"),
            r.addEventListener("load", this._imageLoaded.bind(this), !1),
            r.addEventListener(
              "error",
              function () {
                (i.img = s), this._imageLoaded();
              }.bind(this),
              !1
            ),
            (r.src = e);
          var i = { img: r, assetData: t };
          return i;
        }
        function r(t, e) {
          this.imagesLoadedCb = e;
          var r,
            i = t.length;
          for (r = 0; r < i; r += 1)
            t[r].layers ||
              ((this.totalImages += 1),
              this.images.push(this._createImageData(t[r])));
        }
        function i(t) {
          this.path = t || "";
        }
        function a(t) {
          this.assetsPath = t || "";
        }
        function n(t) {
          for (var e = 0, r = this.images.length; e < r; ) {
            if (this.images[e].assetData === t) return this.images[e].img;
            e += 1;
          }
        }
        function o() {
          (this.imagesLoadedCb = null), (this.images.length = 0);
        }
        function h() {
          return this.totalImages === this.loadedAssets;
        }
        return function () {
          (this.loadAssets = r),
            (this.setAssetsPath = a),
            (this.setPath = i),
            (this.loaded = h),
            (this.destroy = o),
            (this.getImage = n),
            (this._createImageData = e),
            (this._imageLoaded = t),
            (this.assetsPath = ""),
            (this.path = ""),
            (this.totalImages = 0),
            (this.loadedAssets = 0),
            (this.imagesLoadedCb = null),
            (this.images = []);
        };
      })(),
      featureSupport =
        ((lw = { maskType: !0 }),
        (/MSIE 10/i.test(navigator.userAgent) ||
          /MSIE 9/i.test(navigator.userAgent) ||
          /rv:11.0/i.test(navigator.userAgent) ||
          /Edge\/\d./i.test(navigator.userAgent)) &&
          (lw.maskType = !1),
        lw),
      lw,
      filtersFactory =
        ((mw = {}),
        (mw.createFilter = function (t) {
          var e = createNS("filter");
          return (
            e.setAttribute("id", t),
            e.setAttribute("filterUnits", "objectBoundingBox"),
            e.setAttribute("x", "0%"),
            e.setAttribute("y", "0%"),
            e.setAttribute("width", "100%"),
            e.setAttribute("height", "100%"),
            e
          );
        }),
        (mw.createAlphaToLuminanceFilter = function () {
          var t = createNS("feColorMatrix");
          return (
            t.setAttribute("type", "matrix"),
            t.setAttribute("color-interpolation-filters", "sRGB"),
            t.setAttribute(
              "values",
              "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"
            ),
            t
          );
        }),
        mw),
      mw,
      assetLoader = (function () {
        function a(t) {
          return t.response && "object" == typeof t.response
            ? t.response
            : t.response && "string" == typeof t.response
            ? JSON.parse(t.response)
            : t.responseText
            ? JSON.parse(t.responseText)
            : void 0;
        }
        return {
          load: function (t, e, r) {
            var i,
              s = new XMLHttpRequest();
            s.open("GET", t, !0);
            try {
              s.responseType = "json";
            } catch (t) {}
            s.send(),
              (s.onreadystatechange = function () {
                if (4 == s.readyState)
                  if (200 == s.status) (i = a(s)), e(i);
                  else
                    try {
                      (i = a(s)), e(i);
                    } catch (t) {
                      r && r(t);
                    }
              });
          },
        };
      })();
    function TextAnimatorProperty(t, e, r) {
      (this._isFirstFrame = !0),
        (this._hasMaskedPath = !1),
        (this._frameId = -1),
        (this._textData = t),
        (this._renderType = e),
        (this._elem = r),
        (this._animatorsData = createSizedArray(this._textData.a.length)),
        (this._pathData = {}),
        (this._moreOptions = { alignment: {} }),
        (this.renderedLetters = []),
        (this.lettersChangedFlag = !1),
        this.initDynamicPropertyContainer(r);
    }
    function TextAnimatorDataProperty(t, e, r) {
      var i = { propType: !1 },
        s = PropertyFactory.getProp,
        a = e.a;
      (this.a = {
        r: a.r ? s(t, a.r, 0, degToRads, r) : i,
        rx: a.rx ? s(t, a.rx, 0, degToRads, r) : i,
        ry: a.ry ? s(t, a.ry, 0, degToRads, r) : i,
        sk: a.sk ? s(t, a.sk, 0, degToRads, r) : i,
        sa: a.sa ? s(t, a.sa, 0, degToRads, r) : i,
        s: a.s ? s(t, a.s, 1, 0.01, r) : i,
        a: a.a ? s(t, a.a, 1, 0, r) : i,
        o: a.o ? s(t, a.o, 0, 0.01, r) : i,
        p: a.p ? s(t, a.p, 1, 0, r) : i,
        sw: a.sw ? s(t, a.sw, 0, 0, r) : i,
        sc: a.sc ? s(t, a.sc, 1, 0, r) : i,
        fc: a.fc ? s(t, a.fc, 1, 0, r) : i,
        fh: a.fh ? s(t, a.fh, 0, 0, r) : i,
        fs: a.fs ? s(t, a.fs, 0, 0.01, r) : i,
        fb: a.fb ? s(t, a.fb, 0, 0.01, r) : i,
        t: a.t ? s(t, a.t, 0, 0, r) : i,
      }),
        (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r)),
        (this.s.t = e.s.t);
    }
    function LetterProps(t, e, r, i, s, a) {
      (this.o = t),
        (this.sw = e),
        (this.sc = r),
        (this.fc = i),
        (this.m = s),
        (this.p = a),
        (this._mdf = { o: !0, sw: !!e, sc: !!r, fc: !!i, m: !0, p: !0 });
    }
    function TextProperty(t, e) {
      (this._frameId = initialDefaultFrame),
        (this.pv = ""),
        (this.v = ""),
        (this.kf = !1),
        (this._isFirstFrame = !0),
        (this._mdf = !1),
        (this.data = e),
        (this.elem = t),
        (this.comp = this.elem.comp),
        (this.keysIndex = 0),
        (this.canResize = !1),
        (this.minimumFontSize = 1),
        (this.effectsSequence = []),
        (this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1,
        }),
        this.copyData(this.currentData, this.data.d.k[0].s),
        this.searchProperty() || this.completeTextData(this.currentData);
    }
    (TextAnimatorProperty.prototype.searchProperties = function () {
      var t,
        e,
        r = this._textData.a.length,
        i = PropertyFactory.getProp;
      for (t = 0; t < r; t += 1)
        (e = this._textData.a[t]),
          (this._animatorsData[t] = new TextAnimatorDataProperty(
            this._elem,
            e,
            this
          ));
      this._textData.p && "m" in this._textData.p
        ? ((this._pathData = {
            f: i(this._elem, this._textData.p.f, 0, 0, this),
            l: i(this._elem, this._textData.p.l, 0, 0, this),
            r: this._textData.p.r,
            m: this._elem.maskManager.getMaskProperty(this._textData.p.m),
          }),
          (this._hasMaskedPath = !0))
        : (this._hasMaskedPath = !1),
        (this._moreOptions.alignment = i(
          this._elem,
          this._textData.m.a,
          1,
          0,
          this
        ));
    }),
      (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
        if (
          ((this.lettersChangedFlag = e),
          this._mdf ||
            this._isFirstFrame ||
            e ||
            (this._hasMaskedPath && this._pathData.m._mdf))
        ) {
          this._isFirstFrame = !1;
          var r,
            i,
            s,
            a,
            n,
            o,
            h,
            p,
            l,
            f,
            m,
            c,
            d,
            u,
            y,
            g,
            v,
            b,
            P,
            _ = this._moreOptions.alignment.v,
            A = this._animatorsData,
            S = this._textData,
            x = this.mHelper,
            E = this._renderType,
            k = this.renderedLetters.length,
            T = (this.data, t.l);
          if (this._hasMaskedPath) {
            if (
              ((P = this._pathData.m), !this._pathData.n || this._pathData._mdf)
            ) {
              var M,
                D = P.v;
              for (
                this._pathData.r && (D = D.reverse()),
                  n = { tLength: 0, segments: [] },
                  a = D._length - 1,
                  s = g = 0;
                s < a;
                s += 1
              )
                (M = bez.buildBezierData(
                  D.v[s],
                  D.v[s + 1],
                  [D.o[s][0] - D.v[s][0], D.o[s][1] - D.v[s][1]],
                  [D.i[s + 1][0] - D.v[s + 1][0], D.i[s + 1][1] - D.v[s + 1][1]]
                )),
                  (n.tLength += M.segmentLength),
                  n.segments.push(M),
                  (g += M.segmentLength);
              (s = a),
                P.v.c &&
                  ((M = bez.buildBezierData(
                    D.v[s],
                    D.v[0],
                    [D.o[s][0] - D.v[s][0], D.o[s][1] - D.v[s][1]],
                    [D.i[0][0] - D.v[0][0], D.i[0][1] - D.v[0][1]]
                  )),
                  (n.tLength += M.segmentLength),
                  n.segments.push(M),
                  (g += M.segmentLength)),
                (this._pathData.pi = n);
            }
            if (
              ((n = this._pathData.pi),
              (o = this._pathData.f.v),
              (f = 1),
              (l = !(p = m = 0)),
              (u = n.segments),
              o < 0 && P.v.c)
            )
              for (
                n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength),
                  f = (d = u[(m = u.length - 1)].points).length - 1;
                o < 0;

              )
                (o += d[f].partialLength),
                  (f -= 1) < 0 && (f = (d = u[(m -= 1)].points).length - 1);
            (c = (d = u[m].points)[f - 1]), (y = (h = d[f]).partialLength);
          }
          (a = T.length), (i = r = 0);
          var F,
            I,
            C,
            w,
            V = 1.2 * t.finalSize * 0.714,
            R = !0;
          C = A.length;
          var L,
            G,
            N,
            B,
            z,
            O,
            j,
            q,
            H,
            W,
            X,
            K,
            Y,
            $ = -1,
            J = o,
            U = m,
            Z = f,
            Q = -1,
            tt = "",
            et = this.defaultPropsArray;
          if (2 === t.j || 1 === t.j) {
            var rt = 0,
              it = 0,
              st = 2 === t.j ? -0.5 : -1,
              at = 0,
              nt = !0;
            for (s = 0; s < a; s += 1)
              if (T[s].n) {
                for (rt && (rt += it); at < s; )
                  (T[at].animatorJustifyOffset = rt), (at += 1);
                nt = !(rt = 0);
              } else {
                for (I = 0; I < C; I += 1)
                  (F = A[I].a).t.propType &&
                    (nt && 2 === t.j && (it += F.t.v * st),
                    (L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars))
                      .length
                      ? (rt += F.t.v * L[0] * st)
                      : (rt += F.t.v * L * st));
                nt = !1;
              }
            for (rt && (rt += it); at < s; )
              (T[at].animatorJustifyOffset = rt), (at += 1);
          }
          for (s = 0; s < a; s += 1) {
            if ((x.reset(), (z = 1), T[s].n))
              (r = 0),
                (i += t.yOffset),
                (i += R ? 1 : 0),
                (o = J),
                (R = !1),
                0,
                this._hasMaskedPath &&
                  ((f = Z),
                  (c = (d = u[(m = U)].points)[f - 1]),
                  (y = (h = d[f]).partialLength),
                  (p = 0)),
                (Y = W = K = tt = ""),
                (et = this.defaultPropsArray);
            else {
              if (this._hasMaskedPath) {
                if (Q !== T[s].line) {
                  switch (t.j) {
                    case 1:
                      o += g - t.lineWidths[T[s].line];
                      break;
                    case 2:
                      o += (g - t.lineWidths[T[s].line]) / 2;
                  }
                  Q = T[s].line;
                }
                $ !== T[s].ind &&
                  (T[$] && (o += T[$].extra),
                  (o += T[s].an / 2),
                  ($ = T[s].ind)),
                  (o += (_[0] * T[s].an) / 200);
                var ot = 0;
                for (I = 0; I < C; I += 1)
                  (F = A[I].a).p.propType &&
                    ((L = A[I].s.getMult(
                      T[s].anIndexes[I],
                      S.a[I].s.totalChars
                    )).length
                      ? (ot += F.p.v[0] * L[0])
                      : (ot += F.p.v[0] * L)),
                    F.a.propType &&
                      ((L = A[I].s.getMult(
                        T[s].anIndexes[I],
                        S.a[I].s.totalChars
                      )).length
                        ? (ot += F.a.v[0] * L[0])
                        : (ot += F.a.v[0] * L));
                for (l = !0; l; )
                  o + ot <= p + y || !d
                    ? ((v = (o + ot - p) / h.partialLength),
                      (N = c.point[0] + (h.point[0] - c.point[0]) * v),
                      (B = c.point[1] + (h.point[1] - c.point[1]) * v),
                      x.translate((-_[0] * T[s].an) / 200, (-_[1] * V) / 100),
                      (l = !1))
                    : d &&
                      ((p += h.partialLength),
                      (f += 1) >= d.length &&
                        ((f = 0),
                        (d = u[(m += 1)]
                          ? u[m].points
                          : P.v.c
                          ? u[(m = f = 0)].points
                          : ((p -= h.partialLength), null))),
                      d && ((c = h), (y = (h = d[f]).partialLength)));
                (G = T[s].an / 2 - T[s].add), x.translate(-G, 0, 0);
              } else
                (G = T[s].an / 2 - T[s].add),
                  x.translate(-G, 0, 0),
                  x.translate((-_[0] * T[s].an) / 200, (-_[1] * V) / 100, 0);
              for (T[s].l / 2, I = 0; I < C; I += 1)
                (F = A[I].a).t.propType &&
                  ((L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars)),
                  (0 === r && 0 === t.j) ||
                    (this._hasMaskedPath
                      ? L.length
                        ? (o += F.t.v * L[0])
                        : (o += F.t.v * L)
                      : L.length
                      ? (r += F.t.v * L[0])
                      : (r += F.t.v * L)));
              for (
                T[s].l / 2,
                  t.strokeWidthAnim && (j = t.sw || 0),
                  t.strokeColorAnim &&
                    (O = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                  t.fillColorAnim && t.fc && (q = [t.fc[0], t.fc[1], t.fc[2]]),
                  I = 0;
                I < C;
                I += 1
              )
                (F = A[I].a).a.propType &&
                  ((L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars))
                    .length
                    ? x.translate(
                        -F.a.v[0] * L[0],
                        -F.a.v[1] * L[1],
                        F.a.v[2] * L[2]
                      )
                    : x.translate(-F.a.v[0] * L, -F.a.v[1] * L, F.a.v[2] * L));
              for (I = 0; I < C; I += 1)
                (F = A[I].a).s.propType &&
                  ((L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars))
                    .length
                    ? x.scale(
                        1 + (F.s.v[0] - 1) * L[0],
                        1 + (F.s.v[1] - 1) * L[1],
                        1
                      )
                    : x.scale(
                        1 + (F.s.v[0] - 1) * L,
                        1 + (F.s.v[1] - 1) * L,
                        1
                      ));
              for (I = 0; I < C; I += 1) {
                if (
                  ((F = A[I].a),
                  (L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars)),
                  F.sk.propType &&
                    (L.length
                      ? x.skewFromAxis(-F.sk.v * L[0], F.sa.v * L[1])
                      : x.skewFromAxis(-F.sk.v * L, F.sa.v * L)),
                  F.r.propType &&
                    (L.length
                      ? x.rotateZ(-F.r.v * L[2])
                      : x.rotateZ(-F.r.v * L)),
                  F.ry.propType &&
                    (L.length
                      ? x.rotateY(F.ry.v * L[1])
                      : x.rotateY(F.ry.v * L)),
                  F.rx.propType &&
                    (L.length
                      ? x.rotateX(F.rx.v * L[0])
                      : x.rotateX(F.rx.v * L)),
                  F.o.propType &&
                    (L.length
                      ? (z += (F.o.v * L[0] - z) * L[0])
                      : (z += (F.o.v * L - z) * L)),
                  t.strokeWidthAnim &&
                    F.sw.propType &&
                    (L.length ? (j += F.sw.v * L[0]) : (j += F.sw.v * L)),
                  t.strokeColorAnim && F.sc.propType)
                )
                  for (H = 0; H < 3; H += 1)
                    L.length
                      ? (O[H] = O[H] + (F.sc.v[H] - O[H]) * L[0])
                      : (O[H] = O[H] + (F.sc.v[H] - O[H]) * L);
                if (t.fillColorAnim && t.fc) {
                  if (F.fc.propType)
                    for (H = 0; H < 3; H += 1)
                      L.length
                        ? (q[H] = q[H] + (F.fc.v[H] - q[H]) * L[0])
                        : (q[H] = q[H] + (F.fc.v[H] - q[H]) * L);
                  F.fh.propType &&
                    (q = L.length
                      ? addHueToRGB(q, F.fh.v * L[0])
                      : addHueToRGB(q, F.fh.v * L)),
                    F.fs.propType &&
                      (q = L.length
                        ? addSaturationToRGB(q, F.fs.v * L[0])
                        : addSaturationToRGB(q, F.fs.v * L)),
                    F.fb.propType &&
                      (q = L.length
                        ? addBrightnessToRGB(q, F.fb.v * L[0])
                        : addBrightnessToRGB(q, F.fb.v * L));
                }
              }
              for (I = 0; I < C; I += 1)
                (F = A[I].a).p.propType &&
                  ((L = A[I].s.getMult(T[s].anIndexes[I], S.a[I].s.totalChars)),
                  this._hasMaskedPath
                    ? L.length
                      ? x.translate(0, F.p.v[1] * L[0], -F.p.v[2] * L[1])
                      : x.translate(0, F.p.v[1] * L, -F.p.v[2] * L)
                    : L.length
                    ? x.translate(
                        F.p.v[0] * L[0],
                        F.p.v[1] * L[1],
                        -F.p.v[2] * L[2]
                      )
                    : x.translate(F.p.v[0] * L, F.p.v[1] * L, -F.p.v[2] * L));
              if (
                (t.strokeWidthAnim && (W = j < 0 ? 0 : j),
                t.strokeColorAnim &&
                  (X =
                    "rgb(" +
                    Math.round(255 * O[0]) +
                    "," +
                    Math.round(255 * O[1]) +
                    "," +
                    Math.round(255 * O[2]) +
                    ")"),
                t.fillColorAnim &&
                  t.fc &&
                  (K =
                    "rgb(" +
                    Math.round(255 * q[0]) +
                    "," +
                    Math.round(255 * q[1]) +
                    "," +
                    Math.round(255 * q[2]) +
                    ")"),
                this._hasMaskedPath)
              ) {
                if (
                  (x.translate(0, -t.ls),
                  x.translate(0, (_[1] * V) / 100 + i, 0),
                  S.p.p)
                ) {
                  b = (h.point[1] - c.point[1]) / (h.point[0] - c.point[0]);
                  var ht = (180 * Math.atan(b)) / Math.PI;
                  h.point[0] < c.point[0] && (ht += 180),
                    x.rotate((-ht * Math.PI) / 180);
                }
                x.translate(N, B, 0),
                  (o -= (_[0] * T[s].an) / 200),
                  T[s + 1] &&
                    $ !== T[s + 1].ind &&
                    ((o += T[s].an / 2), (o += (t.tr / 1e3) * t.finalSize));
              } else {
                switch (
                  (x.translate(r, i, 0),
                  t.ps && x.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                  t.j)
                ) {
                  case 1:
                    x.translate(
                      T[s].animatorJustifyOffset +
                        t.justifyOffset +
                        (t.boxWidth - t.lineWidths[T[s].line]),
                      0,
                      0
                    );
                    break;
                  case 2:
                    x.translate(
                      T[s].animatorJustifyOffset +
                        t.justifyOffset +
                        (t.boxWidth - t.lineWidths[T[s].line]) / 2,
                      0,
                      0
                    );
                }
                x.translate(0, -t.ls),
                  x.translate(G, 0, 0),
                  x.translate((_[0] * T[s].an) / 200, (_[1] * V) / 100, 0),
                  (r += T[s].l + (t.tr / 1e3) * t.finalSize);
              }
              "html" === E
                ? (tt = x.toCSS())
                : "svg" === E
                ? (tt = x.to2dCSS())
                : (et = [
                    x.props[0],
                    x.props[1],
                    x.props[2],
                    x.props[3],
                    x.props[4],
                    x.props[5],
                    x.props[6],
                    x.props[7],
                    x.props[8],
                    x.props[9],
                    x.props[10],
                    x.props[11],
                    x.props[12],
                    x.props[13],
                    x.props[14],
                    x.props[15],
                  ]),
                (Y = z);
            }
            this.lettersChangedFlag =
              k <= s
                ? ((w = new LetterProps(Y, W, X, K, tt, et)),
                  this.renderedLetters.push(w),
                  (k += 1),
                  !0)
                : (w = this.renderedLetters[s]).update(Y, W, X, K, tt, et) ||
                  this.lettersChangedFlag;
          }
        }
      }),
      (TextAnimatorProperty.prototype.getValue = function () {
        this._elem.globalData.frameId !== this._frameId &&
          ((this._frameId = this._elem.globalData.frameId),
          this.iterateDynamicProperties());
      }),
      (TextAnimatorProperty.prototype.mHelper = new Matrix()),
      (TextAnimatorProperty.prototype.defaultPropsArray = []),
      extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
      (LetterProps.prototype.update = function (t, e, r, i, s, a) {
        (this._mdf.o = !1),
          (this._mdf.sw = !1),
          (this._mdf.sc = !1),
          (this._mdf.fc = !1),
          (this._mdf.m = !1);
        var n = (this._mdf.p = !1);
        return (
          this.o !== t && ((this.o = t), (n = this._mdf.o = !0)),
          this.sw !== e && ((this.sw = e), (n = this._mdf.sw = !0)),
          this.sc !== r && ((this.sc = r), (n = this._mdf.sc = !0)),
          this.fc !== i && ((this.fc = i), (n = this._mdf.fc = !0)),
          this.m !== s && ((this.m = s), (n = this._mdf.m = !0)),
          !a.length ||
            (this.p[0] === a[0] &&
              this.p[1] === a[1] &&
              this.p[4] === a[4] &&
              this.p[5] === a[5] &&
              this.p[12] === a[12] &&
              this.p[13] === a[13]) ||
            ((this.p = a), (n = this._mdf.p = !0)),
          n
        );
      }),
      (TextProperty.prototype.defaultBoxWidth = [0, 0]),
      (TextProperty.prototype.copyData = function (t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        return t;
      }),
      (TextProperty.prototype.setCurrentData = function (t) {
        t.__complete || this.completeTextData(t),
          (this.currentData = t),
          (this.currentData.boxWidth =
            this.currentData.boxWidth || this.defaultBoxWidth),
          (this._mdf = !0);
      }),
      (TextProperty.prototype.searchProperty = function () {
        return this.searchKeyframes();
      }),
      (TextProperty.prototype.searchKeyframes = function () {
        return (
          (this.kf = 1 < this.data.d.k.length),
          this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
          this.kf
        );
      }),
      (TextProperty.prototype.addEffect = function (t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.getValue = function (t) {
        if (
          (this.elem.globalData.frameId !== this.frameId &&
            this.effectsSequence.length) ||
          t
        ) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData,
            r = this.keysIndex;
          if (this.lock) this.setCurrentData(this.currentData);
          else {
            (this.lock = !0), (this._mdf = !1);
            var i,
              s = this.effectsSequence.length,
              a = t || this.data.d.k[this.keysIndex].s;
            for (i = 0; i < s; i += 1)
              a =
                r !== this.keysIndex
                  ? this.effectsSequence[i](a, a.t)
                  : this.effectsSequence[i](this.currentData, a.t);
            e !== a && this.setCurrentData(a),
              (this.pv = this.v = this.currentData),
              (this.lock = !1),
              (this.frameId = this.elem.globalData.frameId);
          }
        }
      }),
      (TextProperty.prototype.getKeyframeValue = function () {
        for (
          var t = this.data.d.k,
            e = this.elem.comp.renderedFrame,
            r = 0,
            i = t.length;
          r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));

        )
          r += 1;
        return (
          this.keysIndex !== r && (this.keysIndex = r),
          this.data.d.k[this.keysIndex].s
        );
      }),
      (TextProperty.prototype.buildFinalText = function (t) {
        for (
          var e = FontManager.getCombinedCharacterCodes(),
            r = [],
            i = 0,
            s = t.length;
          i < s;

        )
          -1 !== e.indexOf(t.charCodeAt(i))
            ? (r[r.length - 1] += t.charAt(i))
            : r.push(t.charAt(i)),
            (i += 1);
        return r;
      }),
      (TextProperty.prototype.completeTextData = function (t) {
        t.__complete = !0;
        var e,
          r,
          i,
          s,
          a,
          n,
          o,
          h = this.elem.globalData.fontManager,
          p = this.data,
          l = [],
          f = 0,
          m = p.m.g,
          c = 0,
          d = 0,
          u = 0,
          y = [],
          g = 0,
          v = 0,
          b = h.getFontByName(t.f),
          P = 0,
          _ = b.fStyle ? b.fStyle.split(" ") : [],
          A = "normal",
          S = "normal";
        for (r = _.length, e = 0; e < r; e += 1)
          switch (_[e].toLowerCase()) {
            case "italic":
              S = "italic";
              break;
            case "bold":
              A = "700";
              break;
            case "black":
              A = "900";
              break;
            case "medium":
              A = "500";
              break;
            case "regular":
            case "normal":
              A = "400";
              break;
            case "light":
            case "thin":
              A = "200";
          }
        (t.fWeight = b.fWeight || A),
          (t.fStyle = S),
          (t.finalSize = t.s),
          (t.finalText = this.buildFinalText(t.t)),
          (r = t.finalText.length),
          (t.finalLineHeight = t.lh);
        var x,
          E = (t.tr / 1e3) * t.finalSize;
        if (t.sz)
          for (var k, T, M = !0, D = t.sz[0], F = t.sz[1]; M; ) {
            (g = k = 0),
              (r = (T = this.buildFinalText(t.t)).length),
              (E = (t.tr / 1e3) * t.finalSize);
            var I = -1;
            for (e = 0; e < r; e += 1)
              (x = T[e].charCodeAt(0)),
                (i = !1),
                " " === T[e]
                  ? (I = e)
                  : (13 !== x && 3 !== x) ||
                    ((i = !(g = 0)),
                    (k += t.finalLineHeight || 1.2 * t.finalSize)),
                D <
                  g +
                    (P = h.chars
                      ? ((o = h.getCharData(T[e], b.fStyle, b.fFamily)),
                        i ? 0 : (o.w * t.finalSize) / 100)
                      : h.measureText(T[e], t.f, t.finalSize)) && " " !== T[e]
                  ? (-1 === I ? (r += 1) : (e = I),
                    (k += t.finalLineHeight || 1.2 * t.finalSize),
                    T.splice(e, I === e ? 1 : 0, "\r"),
                    (I = -1),
                    (g = 0))
                  : ((g += P), (g += E));
            (k += (b.ascent * t.finalSize) / 100),
              this.canResize && t.finalSize > this.minimumFontSize && F < k
                ? ((t.finalSize -= 1),
                  (t.finalLineHeight = (t.finalSize * t.lh) / t.s))
                : ((t.finalText = T), (r = t.finalText.length), (M = !1));
          }
        g = -E;
        var C,
          w = (P = 0);
        for (e = 0; e < r; e += 1)
          if (
            ((i = !1),
            (x = (C = t.finalText[e]).charCodeAt(0)),
            " " === C
              ? (s = "\xa0")
              : 13 === x || 3 === x
              ? ((w = 0),
                y.push(g),
                (v = v < g ? g : v),
                (g = -2 * E),
                (i = !(s = "")),
                (u += 1))
              : (s = t.finalText[e]),
            (P = h.chars
              ? ((o = h.getCharData(C, b.fStyle, h.getFontByName(t.f).fFamily)),
                i ? 0 : (o.w * t.finalSize) / 100)
              : h.measureText(s, t.f, t.finalSize)),
            " " === C ? (w += P + E) : ((g += P + E + w), (w = 0)),
            l.push({
              l: P,
              an: P,
              add: c,
              n: i,
              anIndexes: [],
              val: s,
              line: u,
              animatorJustifyOffset: 0,
            }),
            2 == m)
          ) {
            if (((c += P), "" === s || "\xa0" === s || e === r - 1)) {
              for (("" !== s && "\xa0" !== s) || (c -= P); d <= e; )
                (l[d].an = c), (l[d].ind = f), (l[d].extra = P), (d += 1);
              (f += 1), (c = 0);
            }
          } else if (3 == m) {
            if (((c += P), "" === s || e === r - 1)) {
              for ("" === s && (c -= P); d <= e; )
                (l[d].an = c), (l[d].ind = f), (l[d].extra = P), (d += 1);
              (c = 0), (f += 1);
            }
          } else (l[f].ind = f), (l[f].extra = 0), (f += 1);
        if (((t.l = l), (v = v < g ? g : v), y.push(g), t.sz))
          (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
        else
          switch (((t.boxWidth = v), t.j)) {
            case 1:
              t.justifyOffset = -t.boxWidth;
              break;
            case 2:
              t.justifyOffset = -t.boxWidth / 2;
              break;
            default:
              t.justifyOffset = 0;
          }
        t.lineWidths = y;
        var V,
          R,
          L = p.a;
        n = L.length;
        var G,
          N,
          B = [];
        for (a = 0; a < n; a += 1) {
          for (
            (V = L[a]).a.sc && (t.strokeColorAnim = !0),
              V.a.sw && (t.strokeWidthAnim = !0),
              (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0),
              N = 0,
              G = V.s.b,
              e = 0;
            e < r;
            e += 1
          )
            ((R = l[e]).anIndexes[a] = N),
              ((1 == G && "" !== R.val) ||
                (2 == G && "" !== R.val && "\xa0" !== R.val) ||
                (3 == G && (R.n || "\xa0" == R.val || e == r - 1)) ||
                (4 == G && (R.n || e == r - 1))) &&
                (1 === V.s.rn && B.push(N), (N += 1));
          p.a[a].s.totalChars = N;
          var z,
            O = -1;
          if (1 === V.s.rn)
            for (e = 0; e < r; e += 1)
              O != (R = l[e]).anIndexes[a] &&
                ((O = R.anIndexes[a]),
                (z = B.splice(Math.floor(Math.random() * B.length), 1)[0])),
                (R.anIndexes[a] = z);
        }
        (t.yOffset = t.finalLineHeight || 1.2 * t.finalSize),
          (t.ls = t.ls || 0),
          (t.ascent = (b.ascent * t.finalSize) / 100);
      }),
      (TextProperty.prototype.updateDocumentData = function (t, e) {
        e = void 0 === e ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        (r = this.copyData(r, t)),
          (this.data.d.k[e].s = r),
          this.recalculate(e),
          this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.recalculate = function (t) {
        var e = this.data.d.k[t].s;
        (e.__complete = !1),
          (this.keysIndex = 0),
          (this._isFirstFrame = !0),
          this.getValue(e);
      }),
      (TextProperty.prototype.canResizeFont = function (t) {
        (this.canResize = t),
          this.recalculate(this.keysIndex),
          this.elem.addDynamicProperty(this);
      }),
      (TextProperty.prototype.setMinimumFontSize = function (t) {
        (this.minimumFontSize = Math.floor(t) || 1),
          this.recalculate(this.keysIndex),
          this.elem.addDynamicProperty(this);
      });
    var TextSelectorProp = (function () {
        var p = Math.max,
          l = Math.min,
          f = Math.floor;
        function i(t, e) {
          (this._currentTextLength = -1),
            (this.k = !1),
            (this.data = e),
            (this.elem = t),
            (this.comp = t.comp),
            (this.finalS = 0),
            (this.finalE = 0),
            this.initDynamicPropertyContainer(t),
            (this.s = PropertyFactory.getProp(t, e.s || { k: 0 }, 0, 0, this)),
            (this.e =
              "e" in e
                ? PropertyFactory.getProp(t, e.e, 0, 0, this)
                : { v: 100 }),
            (this.o = PropertyFactory.getProp(t, e.o || { k: 0 }, 0, 0, this)),
            (this.xe = PropertyFactory.getProp(
              t,
              e.xe || { k: 0 },
              0,
              0,
              this
            )),
            (this.ne = PropertyFactory.getProp(
              t,
              e.ne || { k: 0 },
              0,
              0,
              this
            )),
            (this.a = PropertyFactory.getProp(t, e.a, 0, 0.01, this)),
            this.dynamicProperties.length || this.getValue();
        }
        return (
          (i.prototype = {
            getMult: function (t) {
              this._currentTextLength !==
                this.elem.textProperty.currentData.l.length && this.getValue();
              var e = BezierFactory.getBezierEasing(
                  this.ne.v / 100,
                  0,
                  1 - this.xe.v / 100,
                  1
                ).get,
                r = 0,
                i = this.finalS,
                s = this.finalE,
                a = this.data.sh;
              if (2 == a)
                r = e(
                  (r =
                    s === i
                      ? s <= t
                        ? 1
                        : 0
                      : p(0, l(0.5 / (s - i) + (t - i) / (s - i), 1)))
                );
              else if (3 == a)
                r = e(
                  (r =
                    s === i
                      ? s <= t
                        ? 0
                        : 1
                      : 1 - p(0, l(0.5 / (s - i) + (t - i) / (s - i), 1)))
                );
              else if (4 == a)
                s === i
                  ? (r = 0)
                  : (r = p(0, l(0.5 / (s - i) + (t - i) / (s - i), 1))) < 0.5
                  ? (r *= 2)
                  : (r = 1 - 2 * (r - 0.5)),
                  (r = e(r));
              else if (5 == a) {
                if (s === i) r = 0;
                else {
                  var n = s - i,
                    o = -n / 2 + (t = l(p(0, t + 0.5 - i), s - i)),
                    h = n / 2;
                  r = Math.sqrt(1 - (o * o) / (h * h));
                }
                r = e(r);
              } else
                r =
                  6 == a
                    ? e(
                        (r =
                          s === i
                            ? 0
                            : ((t = l(p(0, t + 0.5 - i), s - i)),
                              (1 +
                                Math.cos(
                                  Math.PI + (2 * Math.PI * t) / (s - i)
                                )) /
                                2))
                      )
                    : (t >= f(i) &&
                        (r = t - i < 0 ? 1 - (i - t) : p(0, l(s - t, 1))),
                      e(r));
              return r * this.a.v;
            },
            getValue: function (t) {
              this.iterateDynamicProperties(),
                (this._mdf = t || this._mdf),
                (this._currentTextLength =
                  this.elem.textProperty.currentData.l.length || 0),
                t && 2 === this.data.r && (this.e.v = this._currentTextLength);
              var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                r = this.o.v / e,
                i = this.s.v / e + r,
                s = this.e.v / e + r;
              if (s < i) {
                var a = i;
                (i = s), (s = a);
              }
              (this.finalS = i), (this.finalE = s);
            },
          }),
          extendPrototype([DynamicPropertyContainer], i),
          {
            getTextSelectorProp: function (t, e, r) {
              return new i(t, e, r);
            },
          }
        );
      })(),
      pool_factory = function (t, e, r, i) {
        var s = 0,
          a = t,
          n = createSizedArray(a);
        function o() {
          return s ? n[(s -= 1)] : e();
        }
        return {
          newElement: o,
          release: function (t) {
            s === a && ((n = pooling.double(n)), (a *= 2)),
              r && r(t),
              (n[s] = t),
              (s += 1);
          },
        };
      },
      pooling = {
        double: function (t) {
          return t.concat(createSizedArray(t.length));
        },
      },
      point_pool = pool_factory(8, function () {
        return createTypedArray("float32", 2);
      }),
      shape_pool =
        ((yA = pool_factory(
          4,
          function () {
            return new ShapePath();
          },
          function (t) {
            var e,
              r = t._length;
            for (e = 0; e < r; e += 1)
              point_pool.release(t.v[e]),
                point_pool.release(t.i[e]),
                point_pool.release(t.o[e]),
                (t.v[e] = null),
                (t.i[e] = null),
                (t.o[e] = null);
            (t._length = 0), (t.c = !1);
          }
        )),
        (yA.clone = function (t) {
          var e,
            r = yA.newElement(),
            i = void 0 === t._length ? t.v.length : t._length;
          for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1)
            r.setTripleAt(
              t.v[e][0],
              t.v[e][1],
              t.o[e][0],
              t.o[e][1],
              t.i[e][0],
              t.i[e][1],
              e
            );
          return r;
        }),
        yA),
      yA,
      shapeCollection_pool =
        ((HA = {
          newShapeCollection: function () {
            var t;
            t = IA ? KA[(IA -= 1)] : new ShapeCollection();
            return t;
          },
          release: function (t) {
            var e,
              r = t._length;
            for (e = 0; e < r; e += 1) shape_pool.release(t.shapes[e]);
            (t._length = 0),
              IA === JA && ((KA = pooling.double(KA)), (JA *= 2));
            (KA[IA] = t), (IA += 1);
          },
        }),
        (IA = 0),
        (JA = 4),
        (KA = createSizedArray(JA)),
        HA),
      HA,
      IA,
      JA,
      KA,
      segments_length_pool = pool_factory(
        8,
        function () {
          return { lengths: [], totalLength: 0 };
        },
        function (t) {
          var e,
            r = t.lengths.length;
          for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);
          t.lengths.length = 0;
        }
      ),
      bezier_length_pool = pool_factory(8, function () {
        return {
          addedLength: 0,
          percents: createTypedArray("float32", defaultCurveSegments),
          lengths: createTypedArray("float32", defaultCurveSegments),
        };
      });
    function BaseRenderer() {}
    function SVGRenderer(t, e) {
      (this.animationItem = t),
        (this.layers = null),
        (this.renderedFrame = -1),
        (this.svgElement = createNS("svg"));
      var r = "";
      if (e && e.title) {
        var i = createNS("title"),
          s = createElementID();
        i.setAttribute("id", s),
          (i.textContent = e.title),
          this.svgElement.appendChild(i),
          (r += s);
      }
      if (e && e.description) {
        var a = createNS("desc"),
          n = createElementID();
        a.setAttribute("id", n),
          (a.textContent = e.description),
          this.svgElement.appendChild(a),
          (r += " " + n);
      }
      r && this.svgElement.setAttribute("aria-labelledby", r);
      var o = createNS("defs");
      this.svgElement.appendChild(o);
      var h = createNS("g");
      this.svgElement.appendChild(h),
        (this.layerElement = h),
        (this.renderConfig = {
          preserveAspectRatio: (e && e.preserveAspectRatio) || "xMidYMid meet",
          imagePreserveAspectRatio:
            (e && e.imagePreserveAspectRatio) || "xMidYMid slice",
          progressiveLoad: (e && e.progressiveLoad) || !1,
          hideOnTransparent: !e || !1 !== e.hideOnTransparent,
          viewBoxOnly: (e && e.viewBoxOnly) || !1,
          viewBoxSize: (e && e.viewBoxSize) || !1,
          className: (e && e.className) || "",
        }),
        (this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: o,
          renderConfig: this.renderConfig,
        }),
        (this.elements = []),
        (this.pendingElements = []),
        (this.destroyed = !1),
        (this.rendererType = "svg");
    }
    function MaskElement(t, e, r) {
      (this.data = t),
        (this.element = e),
        (this.globalData = r),
        (this.storedData = []),
        (this.masksProperties = this.data.masksProperties || []),
        (this.maskElement = null);
      var i,
        s = this.globalData.defs,
        a = this.masksProperties ? this.masksProperties.length : 0;
      (this.viewData = createSizedArray(a)), (this.solidPath = "");
      var n,
        o,
        h,
        p,
        l,
        f,
        m,
        c = this.masksProperties,
        d = 0,
        u = [],
        y = createElementID(),
        g = "clipPath",
        v = "clip-path";
      for (i = 0; i < a; i++)
        if (
          ((("a" !== c[i].mode && "n" !== c[i].mode) ||
            c[i].inv ||
            100 !== c[i].o.k ||
            c[i].o.x) &&
            (v = g = "mask"),
          ("s" != c[i].mode && "i" != c[i].mode) || 0 !== d
            ? (p = null)
            : ((p = createNS("rect")).setAttribute("fill", "#ffffff"),
              p.setAttribute("width", this.element.comp.data.w || 0),
              p.setAttribute("height", this.element.comp.data.h || 0),
              u.push(p)),
          (n = createNS("path")),
          "n" != c[i].mode)
        ) {
          var b;
          if (
            ((d += 1),
            n.setAttribute("fill", "s" === c[i].mode ? "#000000" : "#ffffff"),
            n.setAttribute("clip-rule", "nonzero"),
            0 !== c[i].x.k
              ? ((v = g = "mask"),
                (m = PropertyFactory.getProp(
                  this.element,
                  c[i].x,
                  0,
                  null,
                  this.element
                )),
                (b = createElementID()),
                (l = createNS("filter")).setAttribute("id", b),
                (f = createNS("feMorphology")).setAttribute(
                  "operator",
                  "erode"
                ),
                f.setAttribute("in", "SourceGraphic"),
                f.setAttribute("radius", "0"),
                l.appendChild(f),
                s.appendChild(l),
                n.setAttribute(
                  "stroke",
                  "s" === c[i].mode ? "#000000" : "#ffffff"
                ))
              : (m = f = null),
            (this.storedData[i] = {
              elem: n,
              x: m,
              expan: f,
              lastPath: "",
              lastOperator: "",
              filterId: b,
              lastRadius: 0,
            }),
            "i" == c[i].mode)
          ) {
            h = u.length;
            var P = createNS("g");
            for (o = 0; o < h; o += 1) P.appendChild(u[o]);
            var _ = createNS("mask");
            _.setAttribute("mask-type", "alpha"),
              _.setAttribute("id", y + "_" + d),
              _.appendChild(n),
              s.appendChild(_),
              P.setAttribute(
                "mask",
                "url(" + locationHref + "#" + y + "_" + d + ")"
              ),
              (u.length = 0),
              u.push(P);
          } else u.push(n);
          c[i].inv &&
            !this.solidPath &&
            (this.solidPath = this.createLayerSolidPath()),
            (this.viewData[i] = {
              elem: n,
              lastPath: "",
              op: PropertyFactory.getProp(
                this.element,
                c[i].o,
                0,
                0.01,
                this.element
              ),
              prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
              invRect: p,
            }),
            this.viewData[i].prop.k ||
              this.drawPath(c[i], this.viewData[i].prop.v, this.viewData[i]);
        } else
          (this.viewData[i] = {
            op: PropertyFactory.getProp(
              this.element,
              c[i].o,
              0,
              0.01,
              this.element
            ),
            prop: ShapePropertyFactory.getShapeProp(this.element, c[i], 3),
            elem: n,
            lastPath: "",
          }),
            s.appendChild(n);
      for (this.maskElement = createNS(g), a = u.length, i = 0; i < a; i += 1)
        this.maskElement.appendChild(u[i]);
      0 < d &&
        (this.maskElement.setAttribute("id", y),
        this.element.maskedElement.setAttribute(
          v,
          "url(" + locationHref + "#" + y + ")"
        ),
        s.appendChild(this.maskElement)),
        this.viewData.length && this.element.addRenderableComponent(this);
    }
    function HierarchyElement() {}
    function FrameElement() {}
    function TransformElement() {}
    function RenderableElement() {}
    function RenderableDOMElement() {}
    function ProcessedElement(t, e) {
      (this.elem = t), (this.pos = e);
    }
    function SVGStyleData(t, e) {
      (this.data = t),
        (this.type = t.ty),
        (this.d = ""),
        (this.lvl = e),
        (this._mdf = !1),
        (this.closed = !0 === t.hd),
        (this.pElem = createNS("path")),
        (this.msElem = null);
    }
    function SVGShapeData(t, e, r) {
      (this.caches = []),
        (this.styles = []),
        (this.transformers = t),
        (this.lStr = ""),
        (this.sh = r),
        (this.lvl = e),
        (this._isAnimated = !!r.k);
      for (var i = 0, s = t.length; i < s; ) {
        if (t[i].mProps.dynamicProperties.length) {
          this._isAnimated = !0;
          break;
        }
        i += 1;
      }
    }
    function SVGTransformData(t, e, r) {
      (this.transform = { mProps: t, op: e, container: r }),
        (this.elements = []),
        (this._isAnimated =
          this.transform.mProps.dynamicProperties.length ||
          this.transform.op.effectsSequence.length);
    }
    function SVGStrokeStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, "svg", this)),
        (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
        (this.style = r),
        (this._isAnimated = !!this._isAnimated);
    }
    function SVGFillStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
        (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
        (this.style = r);
    }
    function SVGGradientFillStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        this.initGradientData(t, e, r);
    }
    function SVGGradientStrokeStyleData(t, e, r) {
      this.initDynamicPropertyContainer(t),
        (this.getValue = this.iterateDynamicProperties),
        (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
        (this.d = new DashProperty(t, e.d || {}, "svg", this)),
        this.initGradientData(t, e, r),
        (this._isAnimated = !!this._isAnimated);
    }
    function ShapeGroupData() {
      (this.it = []), (this.prevViewData = []), (this.gr = createNS("g"));
    }
    (BaseRenderer.prototype.checkLayers = function (t) {
      var e,
        r,
        i = this.layers.length;
      for (this.completeLayers = !0, e = i - 1; 0 <= e; e--)
        this.elements[e] ||
          ((r = this.layers[e]).ip - r.st <= t - this.layers[e].st &&
            r.op - r.st > t - this.layers[e].st &&
            this.buildItem(e)),
          (this.completeLayers = !!this.elements[e] && this.completeLayers);
      this.checkPendingElements();
    }),
      (BaseRenderer.prototype.createItem = function (t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);
          case 0:
            return this.createComp(t);
          case 1:
            return this.createSolid(t);
          case 3:
            return this.createNull(t);
          case 4:
            return this.createShape(t);
          case 5:
            return this.createText(t);
          case 13:
            return this.createCamera(t);
        }
        return this.createNull(t);
      }),
      (BaseRenderer.prototype.createCamera = function () {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }),
      (BaseRenderer.prototype.buildAllItems = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1) this.buildItem(t);
        this.checkPendingElements();
      }),
      (BaseRenderer.prototype.includeLayers = function (t) {
        this.completeLayers = !1;
        var e,
          r,
          i = t.length,
          s = this.layers.length;
        for (e = 0; e < i; e += 1)
          for (r = 0; r < s; ) {
            if (this.layers[r].id == t[e].id) {
              this.layers[r] = t[e];
              break;
            }
            r += 1;
          }
      }),
      (BaseRenderer.prototype.setProjectInterface = function (t) {
        this.globalData.projectInterface = t;
      }),
      (BaseRenderer.prototype.initItems = function () {
        this.globalData.progressiveLoad || this.buildAllItems();
      }),
      (BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
        for (
          var i = this.elements, s = this.layers, a = 0, n = s.length;
          a < n;

        )
          s[a].ind == e &&
            (i[a] && !0 !== i[a]
              ? (r.push(i[a]),
                i[a].setAsParent(),
                void 0 !== s[a].parent
                  ? this.buildElementParenting(t, s[a].parent, r)
                  : t.setHierarchy(r))
              : (this.buildItem(a), this.addPendingElement(t))),
            (a += 1);
      }),
      (BaseRenderer.prototype.addPendingElement = function (t) {
        this.pendingElements.push(t);
      }),
      (BaseRenderer.prototype.searchExtraCompositions = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1)
          if (t[e].xt) {
            var i = this.createComp(t[e]);
            i.initExpressions(),
              this.globalData.projectInterface.registerComposition(i);
          }
      }),
      (BaseRenderer.prototype.setupGlobalData = function (t, e) {
        (this.globalData.fontManager = new FontManager()),
          this.globalData.fontManager.addChars(t.chars),
          this.globalData.fontManager.addFonts(t.fonts, e),
          (this.globalData.getAssetData = this.animationItem.getAssetData.bind(
            this.animationItem
          )),
          (this.globalData.getAssetsPath =
            this.animationItem.getAssetsPath.bind(this.animationItem)),
          (this.globalData.imageLoader = this.animationItem.imagePreloader),
          (this.globalData.frameId = 0),
          (this.globalData.frameRate = t.fr),
          (this.globalData.nm = t.nm),
          (this.globalData.compSize = { w: t.w, h: t.h });
      }),
      extendPrototype([BaseRenderer], SVGRenderer),
      (SVGRenderer.prototype.createNull = function (t) {
        return new NullElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createShape = function (t) {
        return new SVGShapeElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createText = function (t) {
        return new SVGTextElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createImage = function (t) {
        return new IImageElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createComp = function (t) {
        return new SVGCompElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.createSolid = function (t) {
        return new ISolidElement(t, this.globalData, this);
      }),
      (SVGRenderer.prototype.configAnimation = function (t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
          this.renderConfig.viewBoxSize
            ? this.svgElement.setAttribute(
                "viewBox",
                this.renderConfig.viewBoxSize
              )
            : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
          this.renderConfig.viewBoxOnly ||
            (this.svgElement.setAttribute("width", t.w),
            this.svgElement.setAttribute("height", t.h),
            (this.svgElement.style.width = "100%"),
            (this.svgElement.style.height = "100%"),
            (this.svgElement.style.transform = "translate3d(0,0,0)")),
          this.renderConfig.className &&
            this.svgElement.setAttribute("class", this.renderConfig.className),
          this.svgElement.setAttribute(
            "preserveAspectRatio",
            this.renderConfig.preserveAspectRatio
          ),
          this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e),
          (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
          (this.data = t);
        var r = createNS("clipPath"),
          i = createNS("rect");
        i.setAttribute("width", t.w),
          i.setAttribute("height", t.h),
          i.setAttribute("x", 0),
          i.setAttribute("y", 0);
        var s = createElementID();
        r.setAttribute("id", s),
          r.appendChild(i),
          this.layerElement.setAttribute(
            "clip-path",
            "url(" + locationHref + "#" + s + ")"
          ),
          e.appendChild(r),
          (this.layers = t.layers),
          (this.elements = createSizedArray(t.layers.length));
      }),
      (SVGRenderer.prototype.destroy = function () {
        (this.animationItem.wrapper.innerHTML = ""),
          (this.layerElement = null),
          (this.globalData.defs = null);
        var t,
          e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
        (this.elements.length = 0),
          (this.destroyed = !0),
          (this.animationItem = null);
      }),
      (SVGRenderer.prototype.updateContainerSize = function () {}),
      (SVGRenderer.prototype.buildItem = function (t) {
        var e = this.elements;
        if (!e[t] && 99 != this.layers[t].ty) {
          e[t] = !0;
          var r = this.createItem(this.layers[t]);
          (e[t] = r),
            expressionsPlugin &&
              (0 === this.layers[t].ty &&
                this.globalData.projectInterface.registerComposition(r),
              r.initExpressions()),
            this.appendElementInPos(r, t),
            this.layers[t].tt &&
              (this.elements[t - 1] && !0 !== this.elements[t - 1]
                ? r.setMatte(e[t - 1].layerId)
                : (this.buildItem(t - 1), this.addPendingElement(r)));
        }
      }),
      (SVGRenderer.prototype.checkPendingElements = function () {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          if ((t.checkParenting(), t.data.tt))
            for (var e = 0, r = this.elements.length; e < r; ) {
              if (this.elements[e] === t) {
                t.setMatte(this.elements[e - 1].layerId);
                break;
              }
              e += 1;
            }
        }
      }),
      (SVGRenderer.prototype.renderFrame = function (t) {
        if (this.renderedFrame !== t && !this.destroyed) {
          null === t ? (t = this.renderedFrame) : (this.renderedFrame = t),
            (this.globalData.frameNum = t),
            (this.globalData.frameId += 1),
            (this.globalData.projectInterface.currentFrame = t),
            (this.globalData._mdf = !1);
          var e,
            r = this.layers.length;
          for (
            this.completeLayers || this.checkLayers(t), e = r - 1;
            0 <= e;
            e--
          )
            (this.completeLayers || this.elements[e]) &&
              this.elements[e].prepareFrame(t - this.layers[e].st);
          if (this.globalData._mdf)
            for (e = 0; e < r; e += 1)
              (this.completeLayers || this.elements[e]) &&
                this.elements[e].renderFrame();
        }
      }),
      (SVGRenderer.prototype.appendElementInPos = function (t, e) {
        var r = t.getBaseElement();
        if (r) {
          for (var i, s = 0; s < e; )
            this.elements[s] &&
              !0 !== this.elements[s] &&
              this.elements[s].getBaseElement() &&
              (i = this.elements[s].getBaseElement()),
              (s += 1);
          i
            ? this.layerElement.insertBefore(r, i)
            : this.layerElement.appendChild(r);
        }
      }),
      (SVGRenderer.prototype.hide = function () {
        this.layerElement.style.display = "none";
      }),
      (SVGRenderer.prototype.show = function () {
        this.layerElement.style.display = "block";
      }),
      (MaskElement.prototype.getMaskProperty = function (t) {
        return this.viewData[t].prop;
      }),
      (MaskElement.prototype.renderFrame = function (t) {
        var e,
          r = this.element.finalTransform.mat,
          i = this.masksProperties.length;
        for (e = 0; e < i; e++)
          if (
            ((this.viewData[e].prop._mdf || t) &&
              this.drawPath(
                this.masksProperties[e],
                this.viewData[e].prop.v,
                this.viewData[e]
              ),
            (this.viewData[e].op._mdf || t) &&
              this.viewData[e].elem.setAttribute(
                "fill-opacity",
                this.viewData[e].op.v
              ),
            "n" !== this.masksProperties[e].mode &&
              (this.viewData[e].invRect &&
                (this.element.finalTransform.mProp._mdf || t) &&
                (this.viewData[e].invRect.setAttribute("x", -r.props[12]),
                this.viewData[e].invRect.setAttribute("y", -r.props[13])),
              this.storedData[e].x && (this.storedData[e].x._mdf || t)))
          ) {
            var s = this.storedData[e].expan;
            this.storedData[e].x.v < 0
              ? ("erode" !== this.storedData[e].lastOperator &&
                  ((this.storedData[e].lastOperator = "erode"),
                  this.storedData[e].elem.setAttribute(
                    "filter",
                    "url(" +
                      locationHref +
                      "#" +
                      this.storedData[e].filterId +
                      ")"
                  )),
                s.setAttribute("radius", -this.storedData[e].x.v))
              : ("dilate" !== this.storedData[e].lastOperator &&
                  ((this.storedData[e].lastOperator = "dilate"),
                  this.storedData[e].elem.setAttribute("filter", null)),
                this.storedData[e].elem.setAttribute(
                  "stroke-width",
                  2 * this.storedData[e].x.v
                ));
          }
      }),
      (MaskElement.prototype.getMaskelement = function () {
        return this.maskElement;
      }),
      (MaskElement.prototype.createLayerSolidPath = function () {
        var t = "M0,0 ";
        return (
          (t += " h" + this.globalData.compSize.w),
          (t += " v" + this.globalData.compSize.h),
          (t += " h-" + this.globalData.compSize.w),
          (t += " v-" + this.globalData.compSize.h + " ")
        );
      }),
      (MaskElement.prototype.drawPath = function (t, e, r) {
        var i,
          s,
          a = " M" + e.v[0][0] + "," + e.v[0][1];
        for (s = e._length, i = 1; i < s; i += 1)
          a +=
            " C" +
            e.o[i - 1][0] +
            "," +
            e.o[i - 1][1] +
            " " +
            e.i[i][0] +
            "," +
            e.i[i][1] +
            " " +
            e.v[i][0] +
            "," +
            e.v[i][1];
        if (
          (e.c &&
            1 < s &&
            (a +=
              " C" +
              e.o[i - 1][0] +
              "," +
              e.o[i - 1][1] +
              " " +
              e.i[0][0] +
              "," +
              e.i[0][1] +
              " " +
              e.v[0][0] +
              "," +
              e.v[0][1]),
          r.lastPath !== a)
        ) {
          var n = "";
          r.elem &&
            (e.c && (n = t.inv ? this.solidPath + a : a),
            r.elem.setAttribute("d", n)),
            (r.lastPath = a);
        }
      }),
      (MaskElement.prototype.destroy = function () {
        (this.element = null),
          (this.globalData = null),
          (this.maskElement = null),
          (this.data = null),
          (this.masksProperties = null);
      }),
      (HierarchyElement.prototype = {
        initHierarchy: function () {
          (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
        },
        setHierarchy: function (t) {
          this.hierarchy = t;
        },
        setAsParent: function () {
          this._isParent = !0;
        },
        checkParenting: function () {
          void 0 !== this.data.parent &&
            this.comp.buildElementParenting(this, this.data.parent, []);
        },
      }),
      (FrameElement.prototype = {
        initFrame: function () {
          (this._isFirstFrame = !1),
            (this.dynamicProperties = []),
            (this._mdf = !1);
        },
        prepareProperties: function (t, e) {
          var r,
            i = this.dynamicProperties.length;
          for (r = 0; r < i; r += 1)
            (e ||
              (this._isParent &&
                "transform" === this.dynamicProperties[r].propType)) &&
              (this.dynamicProperties[r].getValue(),
              this.dynamicProperties[r]._mdf &&
                ((this.globalData._mdf = !0), (this._mdf = !0)));
        },
        addDynamicProperty: function (t) {
          -1 === this.dynamicProperties.indexOf(t) &&
            this.dynamicProperties.push(t);
        },
      }),
      (TransformElement.prototype = {
        initTransform: function () {
          (this.finalTransform = {
            mProp: this.data.ks
              ? TransformPropertyFactory.getTransformProperty(
                  this,
                  this.data.ks,
                  this
                )
              : { o: 0 },
            _matMdf: !1,
            _opMdf: !1,
            mat: new Matrix(),
          }),
            this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
            this.data.ty;
        },
        renderTransform: function () {
          if (
            ((this.finalTransform._opMdf =
              this.finalTransform.mProp.o._mdf || this._isFirstFrame),
            (this.finalTransform._matMdf =
              this.finalTransform.mProp._mdf || this._isFirstFrame),
            this.hierarchy)
          ) {
            var t,
              e = this.finalTransform.mat,
              r = 0,
              i = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; r < i; ) {
                if (this.hierarchy[r].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = !0;
                  break;
                }
                r += 1;
              }
            if (this.finalTransform._matMdf)
              for (
                t = this.finalTransform.mProp.v.props,
                  e.cloneFromProps(t),
                  r = 0;
                r < i;
                r += 1
              )
                (t = this.hierarchy[r].finalTransform.mProp.v.props),
                  e.transform(
                    t[0],
                    t[1],
                    t[2],
                    t[3],
                    t[4],
                    t[5],
                    t[6],
                    t[7],
                    t[8],
                    t[9],
                    t[10],
                    t[11],
                    t[12],
                    t[13],
                    t[14],
                    t[15]
                  );
          }
        },
        globalToLocal: function (t) {
          var e = [];
          e.push(this.finalTransform);
          for (var r = !0, i = this.comp; r; )
            i.finalTransform
              ? (i.data.hasMask && e.splice(0, 0, i.finalTransform),
                (i = i.comp))
              : (r = !1);
          var s,
            a,
            n = e.length;
          for (s = 0; s < n; s += 1)
            (a = e[s].mat.applyToPointArray(0, 0, 0)),
              (t = [t[0] - a[0], t[1] - a[1], 0]);
          return t;
        },
        mHelper: new Matrix(),
      }),
      (RenderableElement.prototype = {
        initRenderable: function () {
          (this.isInRange = !1),
            (this.hidden = !1),
            (this.isTransparent = !1),
            (this.renderableComponents = []);
        },
        addRenderableComponent: function (t) {
          -1 === this.renderableComponents.indexOf(t) &&
            this.renderableComponents.push(t);
        },
        removeRenderableComponent: function (t) {
          -1 !== this.renderableComponents.indexOf(t) &&
            this.renderableComponents.splice(
              this.renderableComponents.indexOf(t),
              1
            );
        },
        prepareRenderableFrame: function (t) {
          this.checkLayerLimits(t);
        },
        checkTransparency: function () {
          this.finalTransform.mProp.o.v <= 0
            ? !this.isTransparent &&
              this.globalData.renderConfig.hideOnTransparent &&
              ((this.isTransparent = !0), this.hide())
            : this.isTransparent && ((this.isTransparent = !1), this.show());
        },
        checkLayerLimits: function (t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
            ? !0 !== this.isInRange &&
              ((this.globalData._mdf = !0),
              (this._mdf = !0),
              (this.isInRange = !0),
              this.show())
            : !1 !== this.isInRange &&
              ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide());
        },
        renderRenderable: function () {
          var t,
            e = this.renderableComponents.length;
          for (t = 0; t < e; t += 1)
            this.renderableComponents[t].renderFrame(this._isFirstFrame);
        },
        sourceRectAtTime: function () {
          return { top: 0, left: 0, width: 100, height: 100 };
        },
        getLayerSize: function () {
          return 5 === this.data.ty
            ? { w: this.data.textData.width, h: this.data.textData.height }
            : { w: this.data.width, h: this.data.height };
        },
      }),
      extendPrototype(
        [
          RenderableElement,
          createProxyFunction({
            initElement: function (t, e, r) {
              this.initFrame(),
                this.initBaseData(t, e, r),
                this.initTransform(t, e, r),
                this.initHierarchy(),
                this.initRenderable(),
                this.initRendererElement(),
                this.createContainerElements(),
                this.createRenderableComponents(),
                this.createContent(),
                this.hide();
            },
            hide: function () {
              this.hidden ||
                (this.isInRange && !this.isTransparent) ||
                (((this.baseElement || this.layerElement).style.display =
                  "none"),
                (this.hidden = !0));
            },
            show: function () {
              this.isInRange &&
                !this.isTransparent &&
                (this.data.hd ||
                  ((this.baseElement || this.layerElement).style.display =
                    "block"),
                (this.hidden = !1),
                (this._isFirstFrame = !0));
            },
            renderFrame: function () {
              this.data.hd ||
                this.hidden ||
                (this.renderTransform(),
                this.renderRenderable(),
                this.renderElement(),
                this.renderInnerContent(),
                this._isFirstFrame && (this._isFirstFrame = !1));
            },
            renderInnerContent: function () {},
            prepareFrame: function (t) {
              (this._mdf = !1),
                this.prepareRenderableFrame(t),
                this.prepareProperties(t, this.isInRange),
                this.checkTransparency();
            },
            destroy: function () {
              (this.innerElem = null), this.destroyBaseElement();
            },
          }),
        ],
        RenderableDOMElement
      ),
      (SVGStyleData.prototype.reset = function () {
        (this.d = ""), (this._mdf = !1);
      }),
      (SVGShapeData.prototype.setAsAnimated = function () {
        this._isAnimated = !0;
      }),
      extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
      extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
      (SVGGradientFillStyleData.prototype.initGradientData = function (
        t,
        e,
        r
      ) {
        (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
          (this.s = PropertyFactory.getProp(t, e.s, 1, null, this)),
          (this.e = PropertyFactory.getProp(t, e.e, 1, null, this)),
          (this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, 0.01, this)),
          (this.a = PropertyFactory.getProp(
            t,
            e.a || { k: 0 },
            0,
            degToRads,
            this
          )),
          (this.g = new GradientProperty(t, e.g, this)),
          (this.style = r),
          (this.stops = []),
          this.setGradientData(r.pElem, e),
          this.setGradientOpacity(e, r),
          (this._isAnimated = !!this._isAnimated);
      }),
      (SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
        var r = createElementID(),
          i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r),
          i.setAttribute("spreadMethod", "pad"),
          i.setAttribute("gradientUnits", "userSpaceOnUse");
        var s,
          a,
          n,
          o = [];
        for (n = 4 * e.g.p, a = 0; a < n; a += 4)
          (s = createNS("stop")), i.appendChild(s), o.push(s);
        t.setAttribute(
          "gf" === e.ty ? "fill" : "stroke",
          "url(" + locationHref + "#" + r + ")"
        ),
          (this.gf = i),
          (this.cst = o);
      }),
      (SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r,
            i,
            s,
            a = createNS("mask"),
            n = createNS("path");
          a.appendChild(n);
          var o = createElementID(),
            h = createElementID();
          a.setAttribute("id", h);
          var p = createNS(1 === t.t ? "linearGradient" : "radialGradient");
          p.setAttribute("id", o),
            p.setAttribute("spreadMethod", "pad"),
            p.setAttribute("gradientUnits", "userSpaceOnUse"),
            (s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length);
          var l = this.stops;
          for (i = 4 * t.g.p; i < s; i += 2)
            (r = createNS("stop")).setAttribute(
              "stop-color",
              "rgb(255,255,255)"
            ),
              p.appendChild(r),
              l.push(r);
          n.setAttribute(
            "gf" === t.ty ? "fill" : "stroke",
            "url(" + locationHref + "#" + o + ")"
          ),
            (this.of = p),
            (this.ms = a),
            (this.ost = l),
            (this.maskId = h),
            (e.msElem = n);
        }
      }),
      extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
      extendPrototype(
        [SVGGradientFillStyleData, DynamicPropertyContainer],
        SVGGradientStrokeStyleData
      );
    var SVGElementsRenderer = (function () {
      var y = new Matrix(),
        g = new Matrix();
      function e(t, e, r) {
        (r || e.transform.op._mdf) &&
          e.transform.container.setAttribute("opacity", e.transform.op.v),
          (r || e.transform.mProps._mdf) &&
            e.transform.container.setAttribute(
              "transform",
              e.transform.mProps.v.to2dCSS()
            );
      }
      function r(t, e, r) {
        var i,
          s,
          a,
          n,
          o,
          h,
          p,
          l,
          f,
          m,
          c,
          d = e.styles.length,
          u = e.lvl;
        for (h = 0; h < d; h += 1) {
          if (((n = e.sh._mdf || r), e.styles[h].lvl < u)) {
            for (
              l = g.reset(),
                m = u - e.styles[h].lvl,
                c = e.transformers.length - 1;
              !n && 0 < m;

            )
              (n = e.transformers[c].mProps._mdf || n), m--, c--;
            if (n)
              for (
                m = u - e.styles[h].lvl, c = e.transformers.length - 1;
                0 < m;

              )
                (f = e.transformers[c].mProps.v.props),
                  l.transform(
                    f[0],
                    f[1],
                    f[2],
                    f[3],
                    f[4],
                    f[5],
                    f[6],
                    f[7],
                    f[8],
                    f[9],
                    f[10],
                    f[11],
                    f[12],
                    f[13],
                    f[14],
                    f[15]
                  ),
                  m--,
                  c--;
          } else l = y;
          if (((s = (p = e.sh.paths)._length), n)) {
            for (a = "", i = 0; i < s; i += 1)
              (o = p.shapes[i]) &&
                o._length &&
                (a += buildShapeString(o, o._length, o.c, l));
            e.caches[h] = a;
          } else a = e.caches[h];
          (e.styles[h].d += !0 === t.hd ? "" : a),
            (e.styles[h]._mdf = n || e.styles[h]._mdf);
        }
      }
      function i(t, e, r) {
        var i = e.style;
        (e.c._mdf || r) &&
          i.pElem.setAttribute(
            "fill",
            "rgb(" +
              bm_floor(e.c.v[0]) +
              "," +
              bm_floor(e.c.v[1]) +
              "," +
              bm_floor(e.c.v[2]) +
              ")"
          ),
          (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v);
      }
      function s(t, e, r) {
        a(t, e, r), n(t, e, r);
      }
      function a(t, e, r) {
        var i,
          s,
          a,
          n,
          o,
          h = e.gf,
          p = e.g._hasOpacity,
          l = e.s.v,
          f = e.e.v;
        if (e.o._mdf || r) {
          var m = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
          e.style.pElem.setAttribute(m, e.o.v);
        }
        if (e.s._mdf || r) {
          var c = 1 === t.t ? "x1" : "cx",
            d = "x1" === c ? "y1" : "cy";
          h.setAttribute(c, l[0]),
            h.setAttribute(d, l[1]),
            p &&
              !e.g._collapsable &&
              (e.of.setAttribute(c, l[0]), e.of.setAttribute(d, l[1]));
        }
        if (e.g._cmdf || r) {
          i = e.cst;
          var u = e.g.c;
          for (a = i.length, s = 0; s < a; s += 1)
            (n = i[s]).setAttribute("offset", u[4 * s] + "%"),
              n.setAttribute(
                "stop-color",
                "rgb(" +
                  u[4 * s + 1] +
                  "," +
                  u[4 * s + 2] +
                  "," +
                  u[4 * s + 3] +
                  ")"
              );
        }
        if (p && (e.g._omdf || r)) {
          var y = e.g.o;
          for (
            a = (i = e.g._collapsable ? e.cst : e.ost).length, s = 0;
            s < a;
            s += 1
          )
            (n = i[s]),
              e.g._collapsable || n.setAttribute("offset", y[2 * s] + "%"),
              n.setAttribute("stop-opacity", y[2 * s + 1]);
        }
        if (1 === t.t)
          (e.e._mdf || r) &&
            (h.setAttribute("x2", f[0]),
            h.setAttribute("y2", f[1]),
            p &&
              !e.g._collapsable &&
              (e.of.setAttribute("x2", f[0]), e.of.setAttribute("y2", f[1])));
        else if (
          ((e.s._mdf || e.e._mdf || r) &&
            ((o = Math.sqrt(
              Math.pow(l[0] - f[0], 2) + Math.pow(l[1] - f[1], 2)
            )),
            h.setAttribute("r", o),
            p && !e.g._collapsable && e.of.setAttribute("r", o)),
          e.e._mdf || e.h._mdf || e.a._mdf || r)
        ) {
          o ||
            (o = Math.sqrt(
              Math.pow(l[0] - f[0], 2) + Math.pow(l[1] - f[1], 2)
            ));
          var g = Math.atan2(f[1] - l[1], f[0] - l[0]),
            v = o * (1 <= e.h.v ? 0.99 : e.h.v <= -1 ? -0.99 : e.h.v),
            b = Math.cos(g + e.a.v) * v + l[0],
            P = Math.sin(g + e.a.v) * v + l[1];
          h.setAttribute("fx", b),
            h.setAttribute("fy", P),
            p &&
              !e.g._collapsable &&
              (e.of.setAttribute("fx", b), e.of.setAttribute("fy", P));
        }
      }
      function n(t, e, r) {
        var i = e.style,
          s = e.d;
        s &&
          (s._mdf || r) &&
          s.dashStr &&
          (i.pElem.setAttribute("stroke-dasharray", s.dashStr),
          i.pElem.setAttribute("stroke-dashoffset", s.dashoffset[0])),
          e.c &&
            (e.c._mdf || r) &&
            i.pElem.setAttribute(
              "stroke",
              "rgb(" +
                bm_floor(e.c.v[0]) +
                "," +
                bm_floor(e.c.v[1]) +
                "," +
                bm_floor(e.c.v[2]) +
                ")"
            ),
          (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v),
          (e.w._mdf || r) &&
            (i.pElem.setAttribute("stroke-width", e.w.v),
            i.msElem && i.msElem.setAttribute("stroke-width", e.w.v));
      }
      return {
        createRenderFunction: function (t) {
          t.ty;
          switch (t.ty) {
            case "fl":
              return i;
            case "gf":
              return a;
            case "gs":
              return s;
            case "st":
              return n;
            case "sh":
            case "el":
            case "rc":
            case "sr":
              return r;
            case "tr":
              return e;
          }
        },
      };
    })();
    function ShapeTransformManager() {
      (this.sequences = {}),
        (this.sequenceList = []),
        (this.transform_key_count = 0);
    }
    function BaseElement() {}
    function NullElement(t, e, r) {
      this.initFrame(),
        this.initBaseData(t, e, r),
        this.initFrame(),
        this.initTransform(t, e, r),
        this.initHierarchy();
    }
    function SVGBaseElement() {}
    function IShapeElement() {}
    function ITextElement() {}
    function ICompElement() {}
    function IImageElement(t, e, r) {
      (this.assetData = e.getAssetData(t.refId)),
        this.initElement(t, e, r),
        (this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h,
        });
    }
    function ISolidElement(t, e, r) {
      this.initElement(t, e, r);
    }
    function SVGCompElement(t, e, r) {
      (this.layers = t.layers),
        (this.supports3d = !0),
        (this.completeLayers = !1),
        (this.pendingElements = []),
        (this.elements = this.layers
          ? createSizedArray(this.layers.length)
          : []),
        this.initElement(t, e, r),
        (this.tm = t.tm
          ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
          : { _placeholder: !0 });
    }
    function SVGTextElement(t, e, r) {
      (this.textSpans = []),
        (this.renderType = "svg"),
        this.initElement(t, e, r);
    }
    function SVGShapeElement(t, e, r) {
      (this.shapes = []),
        (this.shapesData = t.shapes),
        (this.stylesList = []),
        (this.shapeModifiers = []),
        (this.itemsData = []),
        (this.processedElements = []),
        (this.animatedContents = []),
        this.initElement(t, e, r),
        (this.prevViewData = []);
    }
    function SVGTintFilter(t, e) {
      this.filterManager = e;
      var r = createNS("feColorMatrix");
      if (
        (r.setAttribute("type", "matrix"),
        r.setAttribute("color-interpolation-filters", "linearRGB"),
        r.setAttribute(
          "values",
          "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        ),
        r.setAttribute("result", "f1"),
        t.appendChild(r),
        (r = createNS("feColorMatrix")).setAttribute("type", "matrix"),
        r.setAttribute("color-interpolation-filters", "sRGB"),
        r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        r.setAttribute("result", "f2"),
        t.appendChild(r),
        (this.matrixFilter = r),
        100 !== e.effectElements[2].p.v || e.effectElements[2].p.k)
      ) {
        var i,
          s = createNS("feMerge");
        t.appendChild(s),
          (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
          s.appendChild(i),
          (i = createNS("feMergeNode")).setAttribute("in", "f2"),
          s.appendChild(i);
      }
    }
    function SVGFillFilter(t, e) {
      this.filterManager = e;
      var r = createNS("feColorMatrix");
      r.setAttribute("type", "matrix"),
        r.setAttribute("color-interpolation-filters", "sRGB"),
        r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"),
        t.appendChild(r),
        (this.matrixFilter = r);
    }
    function SVGGaussianBlurEffect(t, e) {
      t.setAttribute("x", "-100%"),
        t.setAttribute("y", "-100%"),
        t.setAttribute("width", "300%"),
        t.setAttribute("height", "300%"),
        (this.filterManager = e);
      var r = createNS("feGaussianBlur");
      t.appendChild(r), (this.feGaussianBlur = r);
    }
    function SVGStrokeEffect(t, e) {
      (this.initialized = !1),
        (this.filterManager = e),
        (this.elem = t),
        (this.paths = []);
    }
    function SVGTritoneFilter(t, e) {
      this.filterManager = e;
      var r = createNS("feColorMatrix");
      r.setAttribute("type", "matrix"),
        r.setAttribute("color-interpolation-filters", "linearRGB"),
        r.setAttribute(
          "values",
          "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"
        ),
        r.setAttribute("result", "f1"),
        t.appendChild(r);
      var i = createNS("feComponentTransfer");
      i.setAttribute("color-interpolation-filters", "sRGB"),
        t.appendChild(i),
        (this.matrixFilter = i);
      var s = createNS("feFuncR");
      s.setAttribute("type", "table"), i.appendChild(s), (this.feFuncR = s);
      var a = createNS("feFuncG");
      a.setAttribute("type", "table"), i.appendChild(a), (this.feFuncG = a);
      var n = createNS("feFuncB");
      n.setAttribute("type", "table"), i.appendChild(n), (this.feFuncB = n);
    }
    function SVGProLevelsFilter(t, e) {
      this.filterManager = e;
      var r = this.filterManager.effectElements,
        i = createNS("feComponentTransfer");
      (r[10].p.k ||
        0 !== r[10].p.v ||
        r[11].p.k ||
        1 !== r[11].p.v ||
        r[12].p.k ||
        1 !== r[12].p.v ||
        r[13].p.k ||
        0 !== r[13].p.v ||
        r[14].p.k ||
        1 !== r[14].p.v) &&
        (this.feFuncR = this.createFeFunc("feFuncR", i)),
        (r[17].p.k ||
          0 !== r[17].p.v ||
          r[18].p.k ||
          1 !== r[18].p.v ||
          r[19].p.k ||
          1 !== r[19].p.v ||
          r[20].p.k ||
          0 !== r[20].p.v ||
          r[21].p.k ||
          1 !== r[21].p.v) &&
          (this.feFuncG = this.createFeFunc("feFuncG", i)),
        (r[24].p.k ||
          0 !== r[24].p.v ||
          r[25].p.k ||
          1 !== r[25].p.v ||
          r[26].p.k ||
          1 !== r[26].p.v ||
          r[27].p.k ||
          0 !== r[27].p.v ||
          r[28].p.k ||
          1 !== r[28].p.v) &&
          (this.feFuncB = this.createFeFunc("feFuncB", i)),
        (r[31].p.k ||
          0 !== r[31].p.v ||
          r[32].p.k ||
          1 !== r[32].p.v ||
          r[33].p.k ||
          1 !== r[33].p.v ||
          r[34].p.k ||
          0 !== r[34].p.v ||
          r[35].p.k ||
          1 !== r[35].p.v) &&
          (this.feFuncA = this.createFeFunc("feFuncA", i)),
        (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) &&
          (i.setAttribute("color-interpolation-filters", "sRGB"),
          t.appendChild(i),
          (i = createNS("feComponentTransfer"))),
        (r[3].p.k ||
          0 !== r[3].p.v ||
          r[4].p.k ||
          1 !== r[4].p.v ||
          r[5].p.k ||
          1 !== r[5].p.v ||
          r[6].p.k ||
          0 !== r[6].p.v ||
          r[7].p.k ||
          1 !== r[7].p.v) &&
          (i.setAttribute("color-interpolation-filters", "sRGB"),
          t.appendChild(i),
          (this.feFuncRComposed = this.createFeFunc("feFuncR", i)),
          (this.feFuncGComposed = this.createFeFunc("feFuncG", i)),
          (this.feFuncBComposed = this.createFeFunc("feFuncB", i)));
    }
    function SVGDropShadowEffect(t, e) {
      t.setAttribute("x", "-100%"),
        t.setAttribute("y", "-100%"),
        t.setAttribute("width", "400%"),
        t.setAttribute("height", "400%"),
        (this.filterManager = e);
      var r = createNS("feGaussianBlur");
      r.setAttribute("in", "SourceAlpha"),
        r.setAttribute("result", "drop_shadow_1"),
        r.setAttribute("stdDeviation", "0"),
        (this.feGaussianBlur = r),
        t.appendChild(r);
      var i = createNS("feOffset");
      i.setAttribute("dx", "25"),
        i.setAttribute("dy", "0"),
        i.setAttribute("in", "drop_shadow_1"),
        i.setAttribute("result", "drop_shadow_2"),
        (this.feOffset = i),
        t.appendChild(i);
      var s = createNS("feFlood");
      s.setAttribute("flood-color", "#00ff00"),
        s.setAttribute("flood-opacity", "1"),
        s.setAttribute("result", "drop_shadow_3"),
        (this.feFlood = s),
        t.appendChild(s);
      var a = createNS("feComposite");
      a.setAttribute("in", "drop_shadow_3"),
        a.setAttribute("in2", "drop_shadow_2"),
        a.setAttribute("operator", "in"),
        a.setAttribute("result", "drop_shadow_4"),
        t.appendChild(a);
      var n,
        o = createNS("feMerge");
      t.appendChild(o),
        (n = createNS("feMergeNode")),
        o.appendChild(n),
        (n = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"),
        (this.feMergeNode = n),
        (this.feMerge = o),
        (this.originalNodeAdded = !1),
        o.appendChild(n);
    }
    (ShapeTransformManager.prototype = {
      addTransformSequence: function (t) {
        var e,
          r = t.length,
          i = "_";
        for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
        var s = this.sequences[i];
        return (
          s ||
            ((s = {
              transforms: [].concat(t),
              finalTransform: new Matrix(),
              _mdf: !1,
            }),
            (this.sequences[i] = s),
            this.sequenceList.push(s)),
          s
        );
      },
      processSequence: function (t, e) {
        for (var r, i = 0, s = t.transforms.length, a = e; i < s && !e; ) {
          if (t.transforms[i].transform.mProps._mdf) {
            a = !0;
            break;
          }
          i += 1;
        }
        if (a)
          for (t.finalTransform.reset(), i = s - 1; 0 <= i; i -= 1)
            (r = t.transforms[i].transform.mProps.v.props),
              t.finalTransform.transform(
                r[0],
                r[1],
                r[2],
                r[3],
                r[4],
                r[5],
                r[6],
                r[7],
                r[8],
                r[9],
                r[10],
                r[11],
                r[12],
                r[13],
                r[14],
                r[15]
              );
        t._mdf = a;
      },
      processSequences: function (t) {
        var e,
          r = this.sequenceList.length;
        for (e = 0; e < r; e += 1)
          this.processSequence(this.sequenceList[e], t);
      },
      getNewKey: function () {
        return "_" + this.transform_key_count++;
      },
    }),
      (BaseElement.prototype = {
        checkMasks: function () {
          if (!this.data.hasMask) return !1;
          for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
            if (
              "n" !== this.data.masksProperties[t].mode &&
              !1 !== this.data.masksProperties[t].cl
            )
              return !0;
            t += 1;
          }
          return !1;
        },
        initExpressions: function () {
          (this.layerInterface = LayerExpressionInterface(this)),
            this.data.hasMask &&
              this.maskManager &&
              this.layerInterface.registerMaskInterface(this.maskManager);
          var t = EffectsExpressionInterface.createEffectsInterface(
            this,
            this.layerInterface
          );
          this.layerInterface.registerEffectsInterface(t),
            0 === this.data.ty || this.data.xt
              ? (this.compInterface = CompExpressionInterface(this))
              : 4 === this.data.ty
              ? ((this.layerInterface.shapeInterface = ShapeExpressionInterface(
                  this.shapesData,
                  this.itemsData,
                  this.layerInterface
                )),
                (this.layerInterface.content =
                  this.layerInterface.shapeInterface))
              : 5 === this.data.ty &&
                ((this.layerInterface.textInterface =
                  TextExpressionInterface(this)),
                (this.layerInterface.text = this.layerInterface.textInterface));
        },
        setBlendMode: function () {
          var t = getBlendMode(this.data.bm);
          (this.baseElement || this.layerElement).style["mix-blend-mode"] = t;
        },
        initBaseData: function (t, e, r) {
          (this.globalData = e),
            (this.comp = r),
            (this.data = t),
            (this.layerId = createElementID()),
            this.data.sr || (this.data.sr = 1),
            (this.effectsManager = new EffectsManager(
              this.data,
              this,
              this.dynamicProperties
            ));
        },
        getType: function () {
          return this.type;
        },
        sourceRectAtTime: function () {},
      }),
      (NullElement.prototype.prepareFrame = function (t) {
        this.prepareProperties(t, !0);
      }),
      (NullElement.prototype.renderFrame = function () {}),
      (NullElement.prototype.getBaseElement = function () {
        return null;
      }),
      (NullElement.prototype.destroy = function () {}),
      (NullElement.prototype.sourceRectAtTime = function () {}),
      (NullElement.prototype.hide = function () {}),
      extendPrototype(
        [BaseElement, TransformElement, HierarchyElement, FrameElement],
        NullElement
      ),
      (SVGBaseElement.prototype = {
        initRendererElement: function () {
          this.layerElement = createNS("g");
        },
        createContainerElements: function () {
          (this.matteElement = createNS("g")),
            (this.transformedElement = this.layerElement),
            (this.maskedElement = this.layerElement),
            (this._sizeChanged = !1);
          var t,
            e,
            r,
            i = null;
          if (this.data.td) {
            if (3 == this.data.td || 1 == this.data.td) {
              var s = createNS("mask");
              s.setAttribute("id", this.layerId),
                s.setAttribute(
                  "mask-type",
                  3 == this.data.td ? "luminance" : "alpha"
                ),
                s.appendChild(this.layerElement),
                (i = s),
                this.globalData.defs.appendChild(s),
                featureSupport.maskType ||
                  1 != this.data.td ||
                  (s.setAttribute("mask-type", "luminance"),
                  (t = createElementID()),
                  (e = filtersFactory.createFilter(t)),
                  this.globalData.defs.appendChild(e),
                  e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                  (r = createNS("g")).appendChild(this.layerElement),
                  (i = r),
                  s.appendChild(r),
                  r.setAttribute(
                    "filter",
                    "url(" + locationHref + "#" + t + ")"
                  ));
            } else if (2 == this.data.td) {
              var a = createNS("mask");
              a.setAttribute("id", this.layerId),
                a.setAttribute("mask-type", "alpha");
              var n = createNS("g");
              a.appendChild(n),
                (t = createElementID()),
                (e = filtersFactory.createFilter(t));
              var o = createNS("feComponentTransfer");
              o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
              var h = createNS("feFuncA");
              h.setAttribute("type", "table"),
                h.setAttribute("tableValues", "1.0 0.0"),
                o.appendChild(h),
                this.globalData.defs.appendChild(e);
              var p = createNS("rect");
              p.setAttribute("width", this.comp.data.w),
                p.setAttribute("height", this.comp.data.h),
                p.setAttribute("x", "0"),
                p.setAttribute("y", "0"),
                p.setAttribute("fill", "#ffffff"),
                p.setAttribute("opacity", "0"),
                n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"),
                n.appendChild(p),
                n.appendChild(this.layerElement),
                (i = n),
                featureSupport.maskType ||
                  (a.setAttribute("mask-type", "luminance"),
                  e.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                  (r = createNS("g")),
                  n.appendChild(p),
                  r.appendChild(this.layerElement),
                  (i = r),
                  n.appendChild(r)),
                this.globalData.defs.appendChild(a);
            }
          } else
            this.data.tt
              ? (this.matteElement.appendChild(this.layerElement),
                (i = this.matteElement),
                (this.baseElement = this.matteElement))
              : (this.baseElement = this.layerElement);
          if (
            (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
            this.data.cl &&
              this.layerElement.setAttribute("class", this.data.cl),
            0 === this.data.ty && !this.data.hd)
          ) {
            var l = createNS("clipPath"),
              f = createNS("path");
            f.setAttribute(
              "d",
              "M0,0 L" +
                this.data.w +
                ",0 L" +
                this.data.w +
                "," +
                this.data.h +
                " L0," +
                this.data.h +
                "z"
            );
            var m = createElementID();
            if (
              (l.setAttribute("id", m),
              l.appendChild(f),
              this.globalData.defs.appendChild(l),
              this.checkMasks())
            ) {
              var c = createNS("g");
              c.setAttribute(
                "clip-path",
                "url(" + locationHref + "#" + m + ")"
              ),
                c.appendChild(this.layerElement),
                (this.transformedElement = c),
                i
                  ? i.appendChild(this.transformedElement)
                  : (this.baseElement = this.transformedElement);
            } else
              this.layerElement.setAttribute(
                "clip-path",
                "url(" + locationHref + "#" + m + ")"
              );
          }
          0 !== this.data.bm && this.setBlendMode();
        },
        renderElement: function () {
          this.finalTransform._matMdf &&
            this.transformedElement.setAttribute(
              "transform",
              this.finalTransform.mat.to2dCSS()
            ),
            this.finalTransform._opMdf &&
              this.transformedElement.setAttribute(
                "opacity",
                this.finalTransform.mProp.o.v
              );
        },
        destroyBaseElement: function () {
          (this.layerElement = null),
            (this.matteElement = null),
            this.maskManager.destroy();
        },
        getBaseElement: function () {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function () {
          (this.maskManager = new MaskElement(
            this.data,
            this,
            this.globalData
          )),
            (this.renderableEffectsManager = new SVGEffects(this));
        },
        setMatte: function (t) {
          this.matteElement &&
            this.matteElement.setAttribute(
              "mask",
              "url(" + locationHref + "#" + t + ")"
            );
        },
      }),
      (IShapeElement.prototype = {
        addShapeToModifiers: function (t) {
          var e,
            r = this.shapeModifiers.length;
          for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t);
        },
        isShapeInAnimatedModifiers: function (t) {
          for (var e = this.shapeModifiers.length; 0 < e; )
            if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
          return !1;
        },
        renderModifiers: function () {
          if (this.shapeModifiers.length) {
            var t,
              e = this.shapes.length;
            for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
            for (t = (e = this.shapeModifiers.length) - 1; 0 <= t; t -= 1)
              this.shapeModifiers[t].processShapes(this._isFirstFrame);
          }
        },
        lcEnum: { 1: "butt", 2: "round", 3: "square" },
        ljEnum: { 1: "miter", 2: "round", 3: "bevel" },
        searchProcessedElement: function (t) {
          for (var e = this.processedElements, r = 0, i = e.length; r < i; ) {
            if (e[r].elem === t) return e[r].pos;
            r += 1;
          }
          return 0;
        },
        addProcessedElement: function (t, e) {
          for (var r = this.processedElements, i = r.length; i; )
            if (r[(i -= 1)].elem === t) return void (r[i].pos = e);
          r.push(new ProcessedElement(t, e));
        },
        prepareFrame: function (t) {
          this.prepareRenderableFrame(t),
            this.prepareProperties(t, this.isInRange);
        },
      }),
      (ITextElement.prototype.initElement = function (t, e, r) {
        (this.lettersChangedFlag = !0),
          this.initFrame(),
          this.initBaseData(t, e, r),
          (this.textProperty = new TextProperty(
            this,
            t.t,
            this.dynamicProperties
          )),
          (this.textAnimator = new TextAnimatorProperty(
            t.t,
            this.renderType,
            this
          )),
          this.initTransform(t, e, r),
          this.initHierarchy(),
          this.initRenderable(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          this.createContent(),
          this.hide(),
          this.textAnimator.searchProperties(this.dynamicProperties);
      }),
      (ITextElement.prototype.prepareFrame = function (t) {
        (this._mdf = !1),
          this.prepareRenderableFrame(t),
          this.prepareProperties(t, this.isInRange),
          (this.textProperty._mdf || this.textProperty._isFirstFrame) &&
            (this.buildNewText(),
            (this.textProperty._isFirstFrame = !1),
            (this.textProperty._mdf = !1));
      }),
      (ITextElement.prototype.createPathShape = function (t, e) {
        var r,
          i,
          s = e.length,
          a = "";
        for (r = 0; r < s; r += 1)
          (i = e[r].ks.k), (a += buildShapeString(i, i.i.length, !0, t));
        return a;
      }),
      (ITextElement.prototype.updateDocumentData = function (t, e) {
        this.textProperty.updateDocumentData(t, e);
      }),
      (ITextElement.prototype.canResizeFont = function (t) {
        this.textProperty.canResizeFont(t);
      }),
      (ITextElement.prototype.setMinimumFontSize = function (t) {
        this.textProperty.setMinimumFontSize(t);
      }),
      (ITextElement.prototype.applyTextPropertiesToMatrix = function (
        t,
        e,
        r,
        i,
        s
      ) {
        switch (
          (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
          e.translate(0, -t.ls, 0),
          t.j)
        ) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
            break;
          case 2:
            e.translate(
              t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2,
              0,
              0
            );
        }
        e.translate(i, s, 0);
      }),
      (ITextElement.prototype.buildColor = function (t) {
        return (
          "rgb(" +
          Math.round(255 * t[0]) +
          "," +
          Math.round(255 * t[1]) +
          "," +
          Math.round(255 * t[2]) +
          ")"
        );
      }),
      (ITextElement.prototype.emptyProp = new LetterProps()),
      (ITextElement.prototype.destroy = function () {}),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
        ],
        ICompElement
      ),
      (ICompElement.prototype.initElement = function (t, e, r) {
        this.initFrame(),
          this.initBaseData(t, e, r),
          this.initTransform(t, e, r),
          this.initRenderable(),
          this.initHierarchy(),
          this.initRendererElement(),
          this.createContainerElements(),
          this.createRenderableComponents(),
          (!this.data.xt && e.progressiveLoad) || this.buildAllItems(),
          this.hide();
      }),
      (ICompElement.prototype.prepareFrame = function (t) {
        if (
          ((this._mdf = !1),
          this.prepareRenderableFrame(t),
          this.prepareProperties(t, this.isInRange),
          this.isInRange || this.data.xt)
        ) {
          if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
          else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1),
              (this.renderedFrame = e);
          }
          var r,
            i = this.elements.length;
          for (
            this.completeLayers || this.checkLayers(this.renderedFrame),
              r = i - 1;
            0 <= r;
            r -= 1
          )
            (this.completeLayers || this.elements[r]) &&
              (this.elements[r].prepareFrame(
                this.renderedFrame - this.layers[r].st
              ),
              this.elements[r]._mdf && (this._mdf = !0));
        }
      }),
      (ICompElement.prototype.renderInnerContent = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1)
          (this.completeLayers || this.elements[t]) &&
            this.elements[t].renderFrame();
      }),
      (ICompElement.prototype.setElements = function (t) {
        this.elements = t;
      }),
      (ICompElement.prototype.getElements = function () {
        return this.elements;
      }),
      (ICompElement.prototype.destroyElements = function () {
        var t,
          e = this.layers.length;
        for (t = 0; t < e; t += 1)
          this.elements[t] && this.elements[t].destroy();
      }),
      (ICompElement.prototype.destroy = function () {
        this.destroyElements(), this.destroyBaseElement();
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
        ],
        IImageElement
      ),
      (IImageElement.prototype.createContent = function () {
        var t = this.globalData.getAssetsPath(this.assetData);
        (this.innerElem = createNS("image")),
          this.innerElem.setAttribute("width", this.assetData.w + "px"),
          this.innerElem.setAttribute("height", this.assetData.h + "px"),
          this.innerElem.setAttribute(
            "preserveAspectRatio",
            this.assetData.pr ||
              this.globalData.renderConfig.imagePreserveAspectRatio
          ),
          this.innerElem.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "href",
            t
          ),
          this.layerElement.appendChild(this.innerElem);
      }),
      (IImageElement.prototype.sourceRectAtTime = function () {
        return this.sourceRect;
      }),
      extendPrototype([IImageElement], ISolidElement),
      (ISolidElement.prototype.createContent = function () {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw),
          t.setAttribute("height", this.data.sh),
          t.setAttribute("fill", this.data.sc),
          this.layerElement.appendChild(t);
      }),
      extendPrototype(
        [SVGRenderer, ICompElement, SVGBaseElement],
        SVGCompElement
      ),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
          ITextElement,
        ],
        SVGTextElement
      ),
      (SVGTextElement.prototype.createContent = function () {
        this.data.singleShape &&
          !this.globalData.fontManager.chars &&
          (this.textContainer = createNS("text"));
      }),
      (SVGTextElement.prototype.buildTextContents = function (t) {
        for (var e = 0, r = t.length, i = [], s = ""; e < r; )
          t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3)
            ? (i.push(s), (s = ""))
            : (s += t[e]),
            (e += 1);
        return i.push(s), i;
      }),
      (SVGTextElement.prototype.buildNewText = function () {
        var t,
          e,
          r = this.textProperty.currentData;
        (this.renderedLetters = createSizedArray(r ? r.l.length : 0)),
          r.fc
            ? this.layerElement.setAttribute("fill", this.buildColor(r.fc))
            : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"),
          r.sc &&
            (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)),
            this.layerElement.setAttribute("stroke-width", r.sw)),
          this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
        else {
          this.layerElement.setAttribute("font-family", i.fFamily);
          var s = r.fWeight,
            a = r.fStyle;
          this.layerElement.setAttribute("font-style", a),
            this.layerElement.setAttribute("font-weight", s);
        }
        this.layerElement.setAttribute("arial-label", r.t);
        var n,
          o = r.l || [],
          h = !!this.globalData.fontManager.chars;
        e = o.length;
        var p,
          l = this.mHelper,
          f = "",
          m = this.data.singleShape,
          c = 0,
          d = 0,
          u = !0,
          y = (r.tr / 1e3) * r.finalSize;
        if (!m || h || r.sz) {
          var g,
            v,
            b = this.textSpans.length;
          for (t = 0; t < e; t += 1)
            (h && m && 0 !== t) ||
              ((n = t < b ? this.textSpans[t] : createNS(h ? "path" : "text")),
              b <= t &&
                (n.setAttribute("stroke-linecap", "butt"),
                n.setAttribute("stroke-linejoin", "round"),
                n.setAttribute("stroke-miterlimit", "4"),
                (this.textSpans[t] = n),
                this.layerElement.appendChild(n)),
              (n.style.display = "inherit")),
              l.reset(),
              l.scale(r.finalSize / 100, r.finalSize / 100),
              m &&
                (o[t].n &&
                  ((c = -y), (d += r.yOffset), (d += u ? 1 : 0), (u = !1)),
                this.applyTextPropertiesToMatrix(r, l, o[t].line, c, d),
                (c += o[t].l || 0),
                (c += y)),
              h
                ? ((p = (g =
                    ((v = this.globalData.fontManager.getCharData(
                      r.finalText[t],
                      i.fStyle,
                      this.globalData.fontManager.getFontByName(r.f).fFamily
                    )) &&
                      v.data) ||
                    {}).shapes
                    ? g.shapes[0].it
                    : []),
                  m
                    ? (f += this.createPathShape(l, p))
                    : n.setAttribute("d", this.createPathShape(l, p)))
                : (m &&
                    n.setAttribute(
                      "transform",
                      "translate(" + l.props[12] + "," + l.props[13] + ")"
                    ),
                  (n.textContent = o[t].val),
                  n.setAttributeNS(
                    "http://www.w3.org/XML/1998/namespace",
                    "xml:space",
                    "preserve"
                  ));
          m && n && n.setAttribute("d", f);
        } else {
          var P = this.textContainer,
            _ = "start";
          switch (r.j) {
            case 1:
              _ = "end";
              break;
            case 2:
              _ = "middle";
          }
          P.setAttribute("text-anchor", _), P.setAttribute("letter-spacing", y);
          var A = this.buildTextContents(r.finalText);
          for (
            e = A.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0;
            t < e;
            t += 1
          )
            ((n = this.textSpans[t] || createNS("tspan")).textContent = A[t]),
              n.setAttribute("x", 0),
              n.setAttribute("y", d),
              (n.style.display = "inherit"),
              P.appendChild(n),
              (this.textSpans[t] = n),
              (d += r.finalLineHeight);
          this.layerElement.appendChild(P);
        }
        for (; t < this.textSpans.length; )
          (this.textSpans[t].style.display = "none"), (t += 1);
        this._sizeChanged = !0;
      }),
      (SVGTextElement.prototype.sourceRectAtTime = function (t) {
        if (
          (this.prepareFrame(this.comp.renderedFrame - this.data.st),
          this.renderInnerContent(),
          this._sizeChanged)
        ) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = { top: e.y, left: e.x, width: e.width, height: e.height };
        }
        return this.bbox;
      }),
      (SVGTextElement.prototype.renderInnerContent = function () {
        if (
          !this.data.singleShape &&
          (this.textAnimator.getMeasures(
            this.textProperty.currentData,
            this.lettersChangedFlag
          ),
          this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
        ) {
          var t, e;
          this._sizeChanged = !0;
          var r,
            i,
            s = this.textAnimator.renderedLetters,
            a = this.textProperty.currentData.l;
          for (e = a.length, t = 0; t < e; t += 1)
            a[t].n ||
              ((r = s[t]),
              (i = this.textSpans[t]),
              r._mdf.m && i.setAttribute("transform", r.m),
              r._mdf.o && i.setAttribute("opacity", r.o),
              r._mdf.sw && i.setAttribute("stroke-width", r.sw),
              r._mdf.sc && i.setAttribute("stroke", r.sc),
              r._mdf.fc && i.setAttribute("fill", r.fc));
        }
      }),
      extendPrototype(
        [
          BaseElement,
          TransformElement,
          SVGBaseElement,
          IShapeElement,
          HierarchyElement,
          FrameElement,
          RenderableDOMElement,
        ],
        SVGShapeElement
      ),
      (SVGShapeElement.prototype.initSecondaryElement = function () {}),
      (SVGShapeElement.prototype.identityMatrix = new Matrix()),
      (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
      (SVGShapeElement.prototype.createContent = function () {
        this.searchShapes(
          this.shapesData,
          this.itemsData,
          this.prevViewData,
          this.layerElement,
          0,
          [],
          !0
        ),
          this.filterUniqueShapes();
      }),
      (SVGShapeElement.prototype.filterUniqueShapes = function () {
        var t,
          e,
          r,
          i,
          s = this.shapes.length,
          a = this.stylesList.length,
          n = [],
          o = !1;
        for (r = 0; r < a; r += 1) {
          for (i = this.stylesList[r], o = !1, t = n.length = 0; t < s; t += 1)
            -1 !== (e = this.shapes[t]).styles.indexOf(i) &&
              (n.push(e), (o = e._isAnimated || o));
          1 < n.length && o && this.setShapesAsAnimated(n);
        }
      }),
      (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
        var e,
          r = t.length;
        for (e = 0; e < r; e += 1) t[e].setAsAnimated();
      }),
      (SVGShapeElement.prototype.createStyleElement = function (t, e) {
        var r,
          i = new SVGStyleData(t, e),
          s = i.pElem;
        if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
        else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
        else if ("gf" === t.ty || "gs" === t.ty) {
          (r = new (
            "gf" === t.ty
              ? SVGGradientFillStyleData
              : SVGGradientStrokeStyleData
          )(this, t, i)),
            this.globalData.defs.appendChild(r.gf),
            r.maskId &&
              (this.globalData.defs.appendChild(r.ms),
              this.globalData.defs.appendChild(r.of),
              s.setAttribute(
                "mask",
                "url(" + locationHref + "#" + r.maskId + ")"
              ));
        }
        return (
          ("st" !== t.ty && "gs" !== t.ty) ||
            (s.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"),
            s.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"),
            s.setAttribute("fill-opacity", "0"),
            1 === t.lj && s.setAttribute("stroke-miterlimit", t.ml)),
          2 === t.r && s.setAttribute("fill-rule", "evenodd"),
          t.ln && s.setAttribute("id", t.ln),
          t.cl && s.setAttribute("class", t.cl),
          t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)),
          this.stylesList.push(i),
          this.addToAnimatedContents(t, r),
          r
        );
      }),
      (SVGShapeElement.prototype.createGroupElement = function (t) {
        var e = new ShapeGroupData();
        return (
          t.ln && e.gr.setAttribute("id", t.ln),
          t.cl && e.gr.setAttribute("class", t.cl),
          t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)),
          e
        );
      }),
      (SVGShapeElement.prototype.createTransformElement = function (t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this),
          i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i;
      }),
      (SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
        var i = 4;
        "rc" === t.ty
          ? (i = 5)
          : "el" === t.ty
          ? (i = 6)
          : "sr" === t.ty && (i = 7);
        var s = new SVGShapeData(
          e,
          r,
          ShapePropertyFactory.getShapeProp(this, t, i, this)
        );
        return (
          this.shapes.push(s),
          this.addShapeToModifiers(s),
          this.addToAnimatedContents(t, s),
          s
        );
      }),
      (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i; ) {
          if (this.animatedContents[r].element === e) return;
          r += 1;
        }
        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(t),
          element: e,
          data: t,
        });
      }),
      (SVGShapeElement.prototype.setElementStyles = function (t) {
        var e,
          r = t.styles,
          i = this.stylesList.length;
        for (e = 0; e < i; e += 1)
          this.stylesList[e].closed || r.push(this.stylesList[e]);
      }),
      (SVGShapeElement.prototype.reloadShapes = function () {
        this._isFirstFrame = !0;
        var t,
          e = this.itemsData.length;
        for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
        for (
          this.searchShapes(
            this.shapesData,
            this.itemsData,
            this.prevViewData,
            this.layerElement,
            0,
            [],
            !0
          ),
            this.filterUniqueShapes(),
            e = this.dynamicProperties.length,
            t = 0;
          t < e;
          t += 1
        )
          this.dynamicProperties[t].getValue();
        this.renderModifiers();
      }),
      (SVGShapeElement.prototype.searchShapes = function (t, e, r, i, s, a, n) {
        var o,
          h,
          p,
          l,
          f,
          m,
          c = [].concat(a),
          d = t.length - 1,
          u = [],
          y = [];
        for (o = d; 0 <= o; o -= 1) {
          if (
            ((m = this.searchProcessedElement(t[o]))
              ? (e[o] = r[m - 1])
              : (t[o]._render = n),
            "fl" == t[o].ty ||
              "st" == t[o].ty ||
              "gf" == t[o].ty ||
              "gs" == t[o].ty)
          )
            m
              ? (e[o].style.closed = !1)
              : (e[o] = this.createStyleElement(t[o], s)),
              t[o]._render && i.appendChild(e[o].style.pElem),
              u.push(e[o].style);
          else if ("gr" == t[o].ty) {
            if (m)
              for (p = e[o].it.length, h = 0; h < p; h += 1)
                e[o].prevViewData[h] = e[o].it[h];
            else e[o] = this.createGroupElement(t[o]);
            this.searchShapes(
              t[o].it,
              e[o].it,
              e[o].prevViewData,
              e[o].gr,
              s + 1,
              c,
              n
            ),
              t[o]._render && i.appendChild(e[o].gr);
          } else
            "tr" == t[o].ty
              ? (m || (e[o] = this.createTransformElement(t[o], i)),
                (l = e[o].transform),
                c.push(l))
              : "sh" == t[o].ty ||
                "rc" == t[o].ty ||
                "el" == t[o].ty ||
                "sr" == t[o].ty
              ? (m || (e[o] = this.createShapeElement(t[o], c, s)),
                this.setElementStyles(e[o]))
              : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty
              ? (m
                  ? ((f = e[o]).closed = !1)
                  : ((f = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]),
                    (e[o] = f),
                    this.shapeModifiers.push(f)),
                y.push(f))
              : "rp" == t[o].ty &&
                (m
                  ? ((f = e[o]).closed = !0)
                  : ((f = ShapeModifiers.getModifier(t[o].ty)),
                    (e[o] = f).init(this, t, o, e),
                    this.shapeModifiers.push(f),
                    (n = !1)),
                y.push(f));
          this.addProcessedElement(t[o], o + 1);
        }
        for (d = u.length, o = 0; o < d; o += 1) u[o].closed = !0;
        for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0;
      }),
      (SVGShapeElement.prototype.renderInnerContent = function () {
        this.renderModifiers();
        var t,
          e = this.stylesList.length;
        for (t = 0; t < e; t += 1) this.stylesList[t].reset();
        for (this.renderShape(), t = 0; t < e; t += 1)
          (this.stylesList[t]._mdf || this._isFirstFrame) &&
            (this.stylesList[t].msElem &&
              (this.stylesList[t].msElem.setAttribute(
                "d",
                this.stylesList[t].d
              ),
              (this.stylesList[t].d = "M0 0" + this.stylesList[t].d)),
            this.stylesList[t].pElem.setAttribute(
              "d",
              this.stylesList[t].d || "M0 0"
            ));
      }),
      (SVGShapeElement.prototype.renderShape = function () {
        var t,
          e,
          r = this.animatedContents.length;
        for (t = 0; t < r; t += 1)
          (e = this.animatedContents[t]),
            (this._isFirstFrame || e.element._isAnimated) &&
              !0 !== e.data &&
              e.fn(e.data, e.element, this._isFirstFrame);
      }),
      (SVGShapeElement.prototype.destroy = function () {
        this.destroyBaseElement(),
          (this.shapesData = null),
          (this.itemsData = null);
      }),
      (SVGTintFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            i = this.filterManager.effectElements[2].p.v / 100;
          this.matrixFilter.setAttribute(
            "values",
            r[0] -
              e[0] +
              " 0 0 0 " +
              e[0] +
              " " +
              (r[1] - e[1]) +
              " 0 0 0 " +
              e[1] +
              " " +
              (r[2] - e[2]) +
              " 0 0 0 " +
              e[2] +
              " 0 0 0 " +
              i +
              " 0"
          );
        }
      }),
      (SVGFillFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v,
            r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute(
            "values",
            "0 0 0 0 " +
              e[0] +
              " 0 0 0 0 " +
              e[1] +
              " 0 0 0 0 " +
              e[2] +
              " 0 0 0 " +
              r +
              " 0"
          );
        }
      }),
      (SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = 0.3 * this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            i = 3 == r ? 0 : e,
            s = 2 == r ? 0 : e;
          this.feGaussianBlur.setAttribute("stdDeviation", i + " " + s);
          var a =
            1 == this.filterManager.effectElements[2].p.v
              ? "wrap"
              : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      }),
      (SVGStrokeEffect.prototype.initialize = function () {
        var t,
          e,
          r,
          i,
          s =
            this.elem.layerElement.children ||
            this.elem.layerElement.childNodes;
        for (
          1 === this.filterManager.effectElements[1].p.v
            ? ((i = this.elem.maskManager.masksProperties.length), (r = 0))
            : (i = (r = this.filterManager.effectElements[0].p.v - 1) + 1),
            (e = createNS("g")).setAttribute("fill", "none"),
            e.setAttribute("stroke-linecap", "round"),
            e.setAttribute("stroke-dashoffset", 1);
          r < i;
          r += 1
        )
          (t = createNS("path")),
            e.appendChild(t),
            this.paths.push({ p: t, m: r });
        if (3 === this.filterManager.effectElements[10].p.v) {
          var a = createNS("mask"),
            n = createElementID();
          a.setAttribute("id", n),
            a.setAttribute("mask-type", "alpha"),
            a.appendChild(e),
            this.elem.globalData.defs.appendChild(a);
          var o = createNS("g");
          for (
            o.setAttribute("mask", "url(" + locationHref + "#" + n + ")");
            s[0];

          )
            o.appendChild(s[0]);
          this.elem.layerElement.appendChild(o),
            (this.masker = a),
            e.setAttribute("stroke", "#fff");
        } else if (
          1 === this.filterManager.effectElements[10].p.v ||
          2 === this.filterManager.effectElements[10].p.v
        ) {
          if (2 === this.filterManager.effectElements[10].p.v)
            for (
              s =
                this.elem.layerElement.children ||
                this.elem.layerElement.childNodes;
              s.length;

            )
              this.elem.layerElement.removeChild(s[0]);
          this.elem.layerElement.appendChild(e),
            this.elem.layerElement.removeAttribute("mask"),
            e.setAttribute("stroke", "#fff");
        }
        (this.initialized = !0), (this.pathMasker = e);
      }),
      (SVGStrokeEffect.prototype.renderFrame = function (t) {
        this.initialized || this.initialize();
        var e,
          r,
          i,
          s = this.paths.length;
        for (e = 0; e < s; e += 1)
          if (
            -1 !== this.paths[e].m &&
            ((r = this.elem.maskManager.viewData[this.paths[e].m]),
            (i = this.paths[e].p),
            (t || this.filterManager._mdf || r.prop._mdf) &&
              i.setAttribute("d", r.lastPath),
            t ||
              this.filterManager.effectElements[9].p._mdf ||
              this.filterManager.effectElements[4].p._mdf ||
              this.filterManager.effectElements[7].p._mdf ||
              this.filterManager.effectElements[8].p._mdf ||
              r.prop._mdf)
          ) {
            var a;
            if (
              0 !== this.filterManager.effectElements[7].p.v ||
              100 !== this.filterManager.effectElements[8].p.v
            ) {
              var n =
                  Math.min(
                    this.filterManager.effectElements[7].p.v,
                    this.filterManager.effectElements[8].p.v
                  ) / 100,
                o =
                  Math.max(
                    this.filterManager.effectElements[7].p.v,
                    this.filterManager.effectElements[8].p.v
                  ) / 100,
                h = i.getTotalLength();
              a = "0 0 0 " + h * n + " ";
              var p,
                l = h * (o - n),
                f =
                  1 +
                  (2 *
                    this.filterManager.effectElements[4].p.v *
                    this.filterManager.effectElements[9].p.v) /
                    100,
                m = Math.floor(l / f);
              for (p = 0; p < m; p += 1)
                a +=
                  "1 " +
                  (2 *
                    this.filterManager.effectElements[4].p.v *
                    this.filterManager.effectElements[9].p.v) /
                    100 +
                  " ";
              a += "0 " + 10 * h + " 0 0";
            } else
              a =
                "1 " +
                (2 *
                  this.filterManager.effectElements[4].p.v *
                  this.filterManager.effectElements[9].p.v) /
                  100;
            i.setAttribute("stroke-dasharray", a);
          }
        if (
          ((t || this.filterManager.effectElements[4].p._mdf) &&
            this.pathMasker.setAttribute(
              "stroke-width",
              2 * this.filterManager.effectElements[4].p.v
            ),
          (t || this.filterManager.effectElements[6].p._mdf) &&
            this.pathMasker.setAttribute(
              "opacity",
              this.filterManager.effectElements[6].p.v
            ),
          (1 === this.filterManager.effectElements[10].p.v ||
            2 === this.filterManager.effectElements[10].p.v) &&
            (t || this.filterManager.effectElements[3].p._mdf))
        ) {
          var c = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute(
            "stroke",
            "rgb(" +
              bm_floor(255 * c[0]) +
              "," +
              bm_floor(255 * c[1]) +
              "," +
              bm_floor(255 * c[2]) +
              ")"
          );
        }
      }),
      (SVGTritoneFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v,
            r = this.filterManager.effectElements[1].p.v,
            i = this.filterManager.effectElements[2].p.v,
            s = i[0] + " " + r[0] + " " + e[0],
            a = i[1] + " " + r[1] + " " + e[1],
            n = i[2] + " " + r[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", s),
            this.feFuncG.setAttribute("tableValues", a),
            this.feFuncB.setAttribute("tableValues", n);
        }
      }),
      (SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
        var r = createNS(t);
        return r.setAttribute("type", "table"), e.appendChild(r), r;
      }),
      (SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, s) {
        for (
          var a,
            n,
            o = 0,
            h = Math.min(t, e),
            p = Math.max(t, e),
            l = Array.call(null, { length: 256 }),
            f = 0,
            m = s - i,
            c = e - t;
          o <= 256;

        )
          (n =
            (a = o / 256) <= h
              ? c < 0
                ? s
                : i
              : p <= a
              ? c < 0
                ? i
                : s
              : i + m * Math.pow((a - t) / c, 1 / r)),
            (l[f++] = n),
            (o += 256 / 255);
        return l.join(" ");
      }),
      (SVGProLevelsFilter.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          var e,
            r = this.filterManager.effectElements;
          this.feFuncRComposed &&
            (t ||
              r[3].p._mdf ||
              r[4].p._mdf ||
              r[5].p._mdf ||
              r[6].p._mdf ||
              r[7].p._mdf) &&
            ((e = this.getTableValue(
              r[3].p.v,
              r[4].p.v,
              r[5].p.v,
              r[6].p.v,
              r[7].p.v
            )),
            this.feFuncRComposed.setAttribute("tableValues", e),
            this.feFuncGComposed.setAttribute("tableValues", e),
            this.feFuncBComposed.setAttribute("tableValues", e)),
            this.feFuncR &&
              (t ||
                r[10].p._mdf ||
                r[11].p._mdf ||
                r[12].p._mdf ||
                r[13].p._mdf ||
                r[14].p._mdf) &&
              ((e = this.getTableValue(
                r[10].p.v,
                r[11].p.v,
                r[12].p.v,
                r[13].p.v,
                r[14].p.v
              )),
              this.feFuncR.setAttribute("tableValues", e)),
            this.feFuncG &&
              (t ||
                r[17].p._mdf ||
                r[18].p._mdf ||
                r[19].p._mdf ||
                r[20].p._mdf ||
                r[21].p._mdf) &&
              ((e = this.getTableValue(
                r[17].p.v,
                r[18].p.v,
                r[19].p.v,
                r[20].p.v,
                r[21].p.v
              )),
              this.feFuncG.setAttribute("tableValues", e)),
            this.feFuncB &&
              (t ||
                r[24].p._mdf ||
                r[25].p._mdf ||
                r[26].p._mdf ||
                r[27].p._mdf ||
                r[28].p._mdf) &&
              ((e = this.getTableValue(
                r[24].p.v,
                r[25].p.v,
                r[26].p.v,
                r[27].p.v,
                r[28].p.v
              )),
              this.feFuncB.setAttribute("tableValues", e)),
            this.feFuncA &&
              (t ||
                r[31].p._mdf ||
                r[32].p._mdf ||
                r[33].p._mdf ||
                r[34].p._mdf ||
                r[35].p._mdf) &&
              ((e = this.getTableValue(
                r[31].p.v,
                r[32].p.v,
                r[33].p.v,
                r[34].p.v,
                r[35].p.v
              )),
              this.feFuncA.setAttribute("tableValues", e));
        }
      }),
      (SVGDropShadowEffect.prototype.renderFrame = function (t) {
        if (t || this.filterManager._mdf) {
          if (
            ((t || this.filterManager.effectElements[4].p._mdf) &&
              this.feGaussianBlur.setAttribute(
                "stdDeviation",
                this.filterManager.effectElements[4].p.v / 4
              ),
            t || this.filterManager.effectElements[0].p._mdf)
          ) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute(
              "flood-color",
              rgbToHex(
                Math.round(255 * e[0]),
                Math.round(255 * e[1]),
                Math.round(255 * e[2])
              )
            );
          }
          if (
            ((t || this.filterManager.effectElements[1].p._mdf) &&
              this.feFlood.setAttribute(
                "flood-opacity",
                this.filterManager.effectElements[1].p.v / 255
              ),
            t ||
              this.filterManager.effectElements[2].p._mdf ||
              this.filterManager.effectElements[3].p._mdf)
          ) {
            var r = this.filterManager.effectElements[3].p.v,
              i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
              s = r * Math.cos(i),
              a = r * Math.sin(i);
            this.feOffset.setAttribute("dx", s),
              this.feOffset.setAttribute("dy", a);
          }
        }
      });
    var _svgMatteSymbols = [];
    function SVGMatte3Effect(t, e, r) {
      (this.initialized = !1),
        (this.filterManager = e),
        (this.filterElem = t),
        ((this.elem = r).matteElement = createNS("g")),
        r.matteElement.appendChild(r.layerElement),
        r.matteElement.appendChild(r.transformedElement),
        (r.baseElement = r.matteElement);
    }
    function SVGEffects(t) {
      var e,
        r,
        i = t.data.ef ? t.data.ef.length : 0,
        s = createElementID(),
        a = filtersFactory.createFilter(s),
        n = 0;
      for (this.filters = [], e = 0; e < i; e += 1)
        (r = null),
          20 === t.data.ef[e].ty
            ? ((n += 1),
              (r = new SVGTintFilter(a, t.effectsManager.effectElements[e])))
            : 21 === t.data.ef[e].ty
            ? ((n += 1),
              (r = new SVGFillFilter(a, t.effectsManager.effectElements[e])))
            : 22 === t.data.ef[e].ty
            ? (r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]))
            : 23 === t.data.ef[e].ty
            ? ((n += 1),
              (r = new SVGTritoneFilter(a, t.effectsManager.effectElements[e])))
            : 24 === t.data.ef[e].ty
            ? ((n += 1),
              (r = new SVGProLevelsFilter(
                a,
                t.effectsManager.effectElements[e]
              )))
            : 25 === t.data.ef[e].ty
            ? ((n += 1),
              (r = new SVGDropShadowEffect(
                a,
                t.effectsManager.effectElements[e]
              )))
            : 28 === t.data.ef[e].ty
            ? (r = new SVGMatte3Effect(
                a,
                t.effectsManager.effectElements[e],
                t
              ))
            : 29 === t.data.ef[e].ty &&
              ((n += 1),
              (r = new SVGGaussianBlurEffect(
                a,
                t.effectsManager.effectElements[e]
              ))),
          r && this.filters.push(r);
      n &&
        (t.globalData.defs.appendChild(a),
        t.layerElement.setAttribute(
          "filter",
          "url(" + locationHref + "#" + s + ")"
        )),
        this.filters.length && t.addRenderableComponent(this);
    }
    (SVGMatte3Effect.prototype.findSymbol = function (t) {
      for (var e = 0, r = _svgMatteSymbols.length; e < r; ) {
        if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
        e += 1;
      }
      return null;
    }),
      (SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
        var r = t.layerElement.parentNode;
        if (r) {
          for (
            var i, s = r.children, a = 0, n = s.length;
            a < n && s[a] !== t.layerElement;

          )
            a += 1;
          a <= n - 2 && (i = s[a + 1]);
          var o = createNS("use");
          o.setAttribute("href", "#" + e),
            i ? r.insertBefore(o, i) : r.appendChild(o);
        }
      }),
      (SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
        if (!this.findSymbol(e)) {
          var r = createElementID(),
            i = createNS("mask");
          i.setAttribute("id", e.layerId),
            i.setAttribute("mask-type", "alpha"),
            _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(i);
          var a = createNS("symbol");
          a.setAttribute("id", r),
            this.replaceInParent(e, r),
            a.appendChild(e.layerElement),
            s.appendChild(a);
          var n = createNS("use");
          n.setAttribute("href", "#" + r),
            i.appendChild(n),
            (e.data.hd = !1),
            e.show();
        }
        t.setMatte(e.layerId);
      }),
      (SVGMatte3Effect.prototype.initialize = function () {
        for (
          var t = this.filterManager.effectElements[0].p.v,
            e = this.elem.comp.elements,
            r = 0,
            i = e.length;
          r < i;

        )
          e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]),
            (r += 1);
        this.initialized = !0;
      }),
      (SVGMatte3Effect.prototype.renderFrame = function () {
        this.initialized || this.initialize();
      }),
      (SVGEffects.prototype.renderFrame = function (t) {
        var e,
          r = this.filters.length;
        for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t);
      });
    var animationManager = (function () {
        var t = {},
          s = [],
          i = 0,
          a = 0,
          n = 0,
          o = !0,
          h = !1;
        function r(t) {
          for (var e = 0, r = t.target; e < a; )
            s[e].animation === r &&
              (s.splice(e, 1), (e -= 1), (a -= 1), r.isPaused || f()),
              (e += 1);
        }
        function p(t, e) {
          if (!t) return null;
          for (var r = 0; r < a; ) {
            if (s[r].elem == t && null !== s[r].elem) return s[r].animation;
            r += 1;
          }
          var i = new AnimationItem();
          return m(i, t), i.setData(t, e), i;
        }
        function l() {
          (n += 1), d();
        }
        function f() {
          n -= 1;
        }
        function m(t, e) {
          t.addEventListener("destroy", r),
            t.addEventListener("_active", l),
            t.addEventListener("_idle", f),
            s.push({ elem: e, animation: t }),
            (a += 1);
        }
        function c(t) {
          var e,
            r = t - i;
          for (e = 0; e < a; e += 1) s[e].animation.advanceTime(r);
          (i = t), n && !h ? window.requestAnimationFrame(c) : (o = !0);
        }
        function e(t) {
          (i = t), window.requestAnimationFrame(c);
        }
        function d() {
          !h && n && o && (window.requestAnimationFrame(e), (o = !1));
        }
        return (
          (t.registerAnimation = p),
          (t.loadAnimation = function (t) {
            var e = new AnimationItem();
            return m(e, null), e.setParams(t), e;
          }),
          (t.setSpeed = function (t, e) {
            var r;
            for (r = 0; r < a; r += 1) s[r].animation.setSpeed(t, e);
          }),
          (t.setDirection = function (t, e) {
            var r;
            for (r = 0; r < a; r += 1) s[r].animation.setDirection(t, e);
          }),
          (t.play = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.play(t);
          }),
          (t.pause = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.pause(t);
          }),
          (t.stop = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.stop(t);
          }),
          (t.togglePause = function (t) {
            var e;
            for (e = 0; e < a; e += 1) s[e].animation.togglePause(t);
          }),
          (t.searchAnimations = function (t, e, r) {
            var i,
              s = [].concat(
                [].slice.call(document.getElementsByClassName("lottie")),
                [].slice.call(document.getElementsByClassName("bodymovin"))
              ),
              a = s.length;
            for (i = 0; i < a; i += 1)
              r && s[i].setAttribute("data-bm-type", r), p(s[i], t);
            if (e && 0 === a) {
              r || (r = "svg");
              var n = document.getElementsByTagName("body")[0];
              n.innerHTML = "";
              var o = createTag("div");
              (o.style.width = "100%"),
                (o.style.height = "100%"),
                o.setAttribute("data-bm-type", r),
                n.appendChild(o),
                p(o, t);
            }
          }),
          (t.resize = function () {
            var t;
            for (t = 0; t < a; t += 1) s[t].animation.resize();
          }),
          (t.goToAndStop = function (t, e, r) {
            var i;
            for (i = 0; i < a; i += 1) s[i].animation.goToAndStop(t, e, r);
          }),
          (t.destroy = function (t) {
            var e;
            for (e = a - 1; 0 <= e; e -= 1) s[e].animation.destroy(t);
          }),
          (t.freeze = function () {
            h = !0;
          }),
          (t.unfreeze = function () {
            (h = !1), d();
          }),
          (t.getRegisteredAnimations = function () {
            var t,
              e = s.length,
              r = [];
            for (t = 0; t < e; t += 1) r.push(s[t].animation);
            return r;
          }),
          t
        );
      })(),
      AnimationItem = function () {
        (this._cbs = []),
          (this.name = ""),
          (this.path = ""),
          (this.isLoaded = !1),
          (this.currentFrame = 0),
          (this.currentRawFrame = 0),
          (this.totalFrames = 0),
          (this.frameRate = 0),
          (this.frameMult = 0),
          (this.playSpeed = 1),
          (this.playDirection = 1),
          (this.playCount = 0),
          (this.animationData = {}),
          (this.assets = []),
          (this.isPaused = !0),
          (this.autoplay = !1),
          (this.loop = !0),
          (this.renderer = null),
          (this.animationID = createElementID()),
          (this.assetsPath = ""),
          (this.timeCompleted = 0),
          (this.segmentPos = 0),
          (this.subframeEnabled = subframeEnabled),
          (this.segments = []),
          (this._idle = !0),
          (this._completedLoop = !1),
          (this.projectInterface = ProjectInterface()),
          (this.imagePreloader = new ImagePreloader());
      };
    extendPrototype([BaseEvent], AnimationItem),
      (AnimationItem.prototype.setParams = function (t) {
        t.context && (this.context = t.context),
          (t.wrapper || t.container) &&
            (this.wrapper = t.wrapper || t.container);
        var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
        switch (e) {
          case "canvas":
            this.renderer = new CanvasRenderer(this, t.rendererSettings);
            break;
          case "svg":
            this.renderer = new SVGRenderer(this, t.rendererSettings);
            break;
          default:
            this.renderer = new HybridRenderer(this, t.rendererSettings);
        }
        this.renderer.setProjectInterface(this.projectInterface),
          (this.animType = e),
          "" === t.loop ||
            null === t.loop ||
            (!1 === t.loop
              ? (this.loop = !1)
              : !0 === t.loop
              ? (this.loop = !0)
              : (this.loop = parseInt(t.loop))),
          (this.autoplay = !("autoplay" in t) || t.autoplay),
          (this.name = t.name ? t.name : ""),
          (this.autoloadSegments =
            !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments),
          (this.assetsPath = t.assetsPath),
          t.animationData
            ? this.configAnimation(t.animationData)
            : t.path &&
              ("json" != t.path.substr(-4) &&
                ("/" != t.path.substr(-1, 1) && (t.path += "/"),
                (t.path += "data.json")),
              -1 != t.path.lastIndexOf("\\")
                ? (this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1))
                : (this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1)),
              (this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1)),
              (this.fileName = this.fileName.substr(
                0,
                this.fileName.lastIndexOf(".json")
              )),
              assetLoader.load(
                t.path,
                this.configAnimation.bind(this),
                function () {
                  this.trigger("data_failed");
                }.bind(this)
              ));
      }),
      (AnimationItem.prototype.setData = function (t, e) {
        var r = {
            wrapper: t,
            animationData: e
              ? "object" == typeof e
                ? e
                : JSON.parse(e)
              : null,
          },
          i = t.attributes;
        (r.path = i.getNamedItem("data-animation-path")
          ? i.getNamedItem("data-animation-path").value
          : i.getNamedItem("data-bm-path")
          ? i.getNamedItem("data-bm-path").value
          : i.getNamedItem("bm-path")
          ? i.getNamedItem("bm-path").value
          : ""),
          (r.animType = i.getNamedItem("data-anim-type")
            ? i.getNamedItem("data-anim-type").value
            : i.getNamedItem("data-bm-type")
            ? i.getNamedItem("data-bm-type").value
            : i.getNamedItem("bm-type")
            ? i.getNamedItem("bm-type").value
            : i.getNamedItem("data-bm-renderer")
            ? i.getNamedItem("data-bm-renderer").value
            : i.getNamedItem("bm-renderer")
            ? i.getNamedItem("bm-renderer").value
            : "canvas");
        var s = i.getNamedItem("data-anim-loop")
          ? i.getNamedItem("data-anim-loop").value
          : i.getNamedItem("data-bm-loop")
          ? i.getNamedItem("data-bm-loop").value
          : i.getNamedItem("bm-loop")
          ? i.getNamedItem("bm-loop").value
          : "";
        "" === s || (r.loop = "false" !== s && ("true" === s || parseInt(s)));
        var a = i.getNamedItem("data-anim-autoplay")
          ? i.getNamedItem("data-anim-autoplay").value
          : i.getNamedItem("data-bm-autoplay")
          ? i.getNamedItem("data-bm-autoplay").value
          : !i.getNamedItem("bm-autoplay") ||
            i.getNamedItem("bm-autoplay").value;
        (r.autoplay = "false" !== a),
          (r.name = i.getNamedItem("data-name")
            ? i.getNamedItem("data-name").value
            : i.getNamedItem("data-bm-name")
            ? i.getNamedItem("data-bm-name").value
            : i.getNamedItem("bm-name")
            ? i.getNamedItem("bm-name").value
            : ""),
          "false" ===
            (i.getNamedItem("data-anim-prerender")
              ? i.getNamedItem("data-anim-prerender").value
              : i.getNamedItem("data-bm-prerender")
              ? i.getNamedItem("data-bm-prerender").value
              : i.getNamedItem("bm-prerender")
              ? i.getNamedItem("bm-prerender").value
              : "") && (r.prerender = !1),
          this.setParams(r);
      }),
      (AnimationItem.prototype.includeLayers = function (t) {
        t.op > this.animationData.op &&
          ((this.animationData.op = t.op),
          (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
        var e,
          r,
          i = this.animationData.layers,
          s = i.length,
          a = t.layers,
          n = a.length;
        for (r = 0; r < n; r += 1)
          for (e = 0; e < s; ) {
            if (i[e].id == a[r].id) {
              i[e] = a[r];
              break;
            }
            e += 1;
          }
        if (
          ((t.chars || t.fonts) &&
            (this.renderer.globalData.fontManager.addChars(t.chars),
            this.renderer.globalData.fontManager.addFonts(
              t.fonts,
              this.renderer.globalData.defs
            )),
          t.assets)
        )
          for (s = t.assets.length, e = 0; e < s; e += 1)
            this.animationData.assets.push(t.assets[e]);
        (this.animationData.__complete = !1),
          dataManager.completeData(
            this.animationData,
            this.renderer.globalData.fontManager
          ),
          this.renderer.includeLayers(t.layers),
          expressionsPlugin && expressionsPlugin.initExpressions(this),
          this.loadNextSegment();
      }),
      (AnimationItem.prototype.loadNextSegment = function () {
        var t = this.animationData.segments;
        if (!t || 0 === t.length || !this.autoloadSegments)
          return (
            this.trigger("data_ready"),
            void (this.timeCompleted = this.totalFrames)
          );
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        (this.segmentPos += 1),
          assetLoader.load(
            r,
            this.includeLayers.bind(this),
            function () {
              this.trigger("data_failed");
            }.bind(this)
          );
      }),
      (AnimationItem.prototype.loadSegments = function () {
        this.animationData.segments || (this.timeCompleted = this.totalFrames),
          this.loadNextSegment();
      }),
      (AnimationItem.prototype.imagesLoaded = function () {
        this.trigger("loaded_images"), this.checkLoaded();
      }),
      (AnimationItem.prototype.preloadImages = function () {
        this.imagePreloader.setAssetsPath(this.assetsPath),
          this.imagePreloader.setPath(this.path),
          this.imagePreloader.loadAssets(
            this.animationData.assets,
            this.imagesLoaded.bind(this)
          );
      }),
      (AnimationItem.prototype.configAnimation = function (t) {
        this.renderer &&
          ((this.animationData = t),
          (this.totalFrames = Math.floor(
            this.animationData.op - this.animationData.ip
          )),
          this.renderer.configAnimation(t),
          t.assets || (t.assets = []),
          this.renderer.searchExtraCompositions(t.assets),
          (this.assets = this.animationData.assets),
          (this.frameRate = this.animationData.fr),
          (this.firstFrame = Math.round(this.animationData.ip)),
          (this.frameMult = this.animationData.fr / 1e3),
          this.trigger("config_ready"),
          this.preloadImages(),
          this.loadSegments(),
          this.updaFrameModifier(),
          this.waitForFontsLoaded());
      }),
      (AnimationItem.prototype.waitForFontsLoaded = function () {
        this.renderer &&
          (this.renderer.globalData.fontManager.loaded()
            ? this.checkLoaded()
            : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }),
      (AnimationItem.prototype.checkLoaded = function () {
        this.isLoaded ||
          !this.renderer.globalData.fontManager.loaded() ||
          (!this.imagePreloader.loaded() &&
            "canvas" === this.renderer.rendererType) ||
          ((this.isLoaded = !0),
          dataManager.completeData(
            this.animationData,
            this.renderer.globalData.fontManager
          ),
          expressionsPlugin && expressionsPlugin.initExpressions(this),
          this.renderer.initItems(),
          setTimeout(
            function () {
              this.trigger("DOMLoaded");
            }.bind(this),
            0
          ),
          this.gotoFrame(),
          this.autoplay && this.play());
      }),
      (AnimationItem.prototype.resize = function () {
        this.renderer.updateContainerSize();
      }),
      (AnimationItem.prototype.setSubframe = function (t) {
        this.subframeEnabled = !!t;
      }),
      (AnimationItem.prototype.gotoFrame = function () {
        (this.currentFrame = this.subframeEnabled
          ? this.currentRawFrame
          : ~~this.currentRawFrame),
          this.timeCompleted !== this.totalFrames &&
            this.currentFrame > this.timeCompleted &&
            (this.currentFrame = this.timeCompleted),
          this.trigger("enterFrame"),
          this.renderFrame();
      }),
      (AnimationItem.prototype.renderFrame = function () {
        !1 !== this.isLoaded &&
          this.renderer.renderFrame(this.currentFrame + this.firstFrame);
      }),
      (AnimationItem.prototype.play = function (t) {
        (t && this.name != t) ||
          (!0 === this.isPaused &&
            ((this.isPaused = !1),
            this._idle && ((this._idle = !1), this.trigger("_active"))));
      }),
      (AnimationItem.prototype.pause = function (t) {
        (t && this.name != t) ||
          (!1 === this.isPaused &&
            ((this.isPaused = !0), (this._idle = !0), this.trigger("_idle")));
      }),
      (AnimationItem.prototype.togglePause = function (t) {
        (t && this.name != t) ||
          (!0 === this.isPaused ? this.play() : this.pause());
      }),
      (AnimationItem.prototype.stop = function (t) {
        (t && this.name != t) ||
          (this.pause(),
          (this.playCount = 0),
          (this._completedLoop = !1),
          this.setCurrentRawFrameValue(0));
      }),
      (AnimationItem.prototype.goToAndStop = function (t, e, r) {
        (r && this.name != r) ||
          (e
            ? this.setCurrentRawFrameValue(t)
            : this.setCurrentRawFrameValue(t * this.frameModifier),
          this.pause());
      }),
      (AnimationItem.prototype.goToAndPlay = function (t, e, r) {
        this.goToAndStop(t, e, r), this.play();
      }),
      (AnimationItem.prototype.advanceTime = function (t) {
        if (!0 !== this.isPaused && !1 !== this.isLoaded) {
          var e = this.currentRawFrame + t * this.frameModifier,
            r = !1;
          e >= this.totalFrames - 1 && 0 < this.frameModifier
            ? this.loop && this.playCount !== this.loop
              ? e >= this.totalFrames
                ? ((this.playCount += 1),
                  this.checkSegments(e % this.totalFrames) ||
                    (this.setCurrentRawFrameValue(e % this.totalFrames),
                    (this._completedLoop = !0),
                    this.trigger("loopComplete")))
                : this.setCurrentRawFrameValue(e)
              : this.checkSegments(
                  e > this.totalFrames ? e % this.totalFrames : 0
                ) || ((r = !0), (e = this.totalFrames - 1))
            : e < 0
            ? this.checkSegments(e % this.totalFrames) ||
              (!this.loop || (this.playCount-- <= 0 && !0 !== this.loop)
                ? ((r = !0), (e = 0))
                : (this.setCurrentRawFrameValue(
                    this.totalFrames + (e % this.totalFrames)
                  ),
                  this._completedLoop
                    ? this.trigger("loopComplete")
                    : (this._completedLoop = !0)))
            : this.setCurrentRawFrameValue(e),
            r &&
              (this.setCurrentRawFrameValue(e),
              this.pause(),
              this.trigger("complete"));
        }
      }),
      (AnimationItem.prototype.adjustSegment = function (t, e) {
        (this.playCount = 0),
          t[1] < t[0]
            ? (0 < this.frameModifier &&
                (this.playSpeed < 0
                  ? this.setSpeed(-this.playSpeed)
                  : this.setDirection(-1)),
              (this.timeCompleted = this.totalFrames = t[0] - t[1]),
              (this.firstFrame = t[1]),
              this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
            : t[1] > t[0] &&
              (this.frameModifier < 0 &&
                (this.playSpeed < 0
                  ? this.setSpeed(-this.playSpeed)
                  : this.setDirection(1)),
              (this.timeCompleted = this.totalFrames = t[1] - t[0]),
              (this.firstFrame = t[0]),
              this.setCurrentRawFrameValue(0.001 + e)),
          this.trigger("segmentStart");
      }),
      (AnimationItem.prototype.setSegment = function (t, e) {
        var r = -1;
        this.isPaused &&
          (this.currentRawFrame + this.firstFrame < t
            ? (r = t)
            : this.currentRawFrame + this.firstFrame > e && (r = e - t)),
          (this.firstFrame = t),
          (this.timeCompleted = this.totalFrames = e - t),
          -1 !== r && this.goToAndStop(r, !0);
      }),
      (AnimationItem.prototype.playSegments = function (t, e) {
        if ((e && (this.segments.length = 0), "object" == typeof t[0])) {
          var r,
            i = t.length;
          for (r = 0; r < i; r += 1) this.segments.push(t[r]);
        } else this.segments.push(t);
        this.segments.length &&
          e &&
          this.adjustSegment(this.segments.shift(), 0),
          this.isPaused && this.play();
      }),
      (AnimationItem.prototype.resetSegments = function (t) {
        (this.segments.length = 0),
          this.segments.push([this.animationData.ip, this.animationData.op]),
          t && this.checkSegments(0);
      }),
      (AnimationItem.prototype.checkSegments = function (t) {
        return (
          !!this.segments.length &&
          (this.adjustSegment(this.segments.shift(), t), !0)
        );
      }),
      (AnimationItem.prototype.destroy = function (t) {
        (t && this.name != t) ||
          !this.renderer ||
          (this.renderer.destroy(),
          this.imagePreloader.destroy(),
          this.trigger("destroy"),
          (this._cbs = null),
          (this.onEnterFrame =
            this.onLoopComplete =
            this.onComplete =
            this.onSegmentStart =
            this.onDestroy =
              null),
          (this.renderer = null));
      }),
      (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
        (this.currentRawFrame = t), this.gotoFrame();
      }),
      (AnimationItem.prototype.setSpeed = function (t) {
        (this.playSpeed = t), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.setDirection = function (t) {
        (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
      }),
      (AnimationItem.prototype.updaFrameModifier = function () {
        this.frameModifier =
          this.frameMult * this.playSpeed * this.playDirection;
      }),
      (AnimationItem.prototype.getPath = function () {
        return this.path;
      }),
      (AnimationItem.prototype.getAssetsPath = function (t) {
        var e = "";
        if (t.e) e = t.p;
        else if (this.assetsPath) {
          var r = t.p;
          -1 !== r.indexOf("images/") && (r = r.split("/")[1]),
            (e = this.assetsPath + r);
        } else (e = this.path), (e += t.u ? t.u : ""), (e += t.p);
        return e;
      }),
      (AnimationItem.prototype.getAssetData = function (t) {
        for (var e = 0, r = this.assets.length; e < r; ) {
          if (t == this.assets[e].id) return this.assets[e];
          e += 1;
        }
      }),
      (AnimationItem.prototype.hide = function () {
        this.renderer.hide();
      }),
      (AnimationItem.prototype.show = function () {
        this.renderer.show();
      }),
      (AnimationItem.prototype.getDuration = function (t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }),
      (AnimationItem.prototype.trigger = function (t) {
        if (this._cbs && this._cbs[t])
          switch (t) {
            case "enterFrame":
              this.triggerEvent(
                t,
                new BMEnterFrameEvent(
                  t,
                  this.currentFrame,
                  this.totalFrames,
                  this.frameModifier
                )
              );
              break;
            case "loopComplete":
              this.triggerEvent(
                t,
                new BMCompleteLoopEvent(
                  t,
                  this.loop,
                  this.playCount,
                  this.frameMult
                )
              );
              break;
            case "complete":
              this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
              break;
            case "segmentStart":
              this.triggerEvent(
                t,
                new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)
              );
              break;
            case "destroy":
              this.triggerEvent(t, new BMDestroyEvent(t, this));
              break;
            default:
              this.triggerEvent(t);
          }
        "enterFrame" === t &&
          this.onEnterFrame &&
          this.onEnterFrame.call(
            this,
            new BMEnterFrameEvent(
              t,
              this.currentFrame,
              this.totalFrames,
              this.frameMult
            )
          ),
          "loopComplete" === t &&
            this.onLoopComplete &&
            this.onLoopComplete.call(
              this,
              new BMCompleteLoopEvent(
                t,
                this.loop,
                this.playCount,
                this.frameMult
              )
            ),
          "complete" === t &&
            this.onComplete &&
            this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)),
          "segmentStart" === t &&
            this.onSegmentStart &&
            this.onSegmentStart.call(
              this,
              new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)
            ),
          "destroy" === t &&
            this.onDestroy &&
            this.onDestroy.call(this, new BMDestroyEvent(t, this));
      });
    var Expressions =
        ((sO = {}),
        (sO.initExpressions = function (t) {
          var e = 0,
            r = [];
          function i() {
            var t,
              e = r.length;
            for (t = 0; t < e; t += 1) r[t].release();
            r.length = 0;
          }
          (t.renderer.compInterface = CompExpressionInterface(t.renderer)),
            t.renderer.globalData.projectInterface.registerComposition(
              t.renderer
            ),
            (t.renderer.globalData.pushExpression = function () {
              e += 1;
            }),
            (t.renderer.globalData.popExpression = function () {
              0 == (e -= 1) && i();
            }),
            (t.renderer.globalData.registerExpressionProperty = function (t) {
              -1 === r.indexOf(t) && r.push(t);
            });
        }),
        sO),
      sO;
    expressionsPlugin = Expressions;
    var ExpressionManager = (function () {
        var ob = {},
          Math = BMMath,
          window = null,
          document = null;
        function $bm_isInstanceOfArray(t) {
          return t.constructor === Array || t.constructor === Float32Array;
        }
        function isNumerable(t, e) {
          return (
            "number" === t ||
            "boolean" === t ||
            "string" === t ||
            e instanceof Number
          );
        }
        function $bm_neg(t) {
          var e = typeof t;
          if ("number" === e || "boolean" === e || t instanceof Number)
            return -t;
          if ($bm_isInstanceOfArray(t)) {
            var r,
              i = t.length,
              s = [];
            for (r = 0; r < i; r += 1) s[r] = -t[r];
            return s;
          }
          return t.propType ? t.v : void 0;
        }
        var easeInBez = BezierFactory.getBezierEasing(
            0.333,
            0,
            0.833,
            0.833,
            "easeIn"
          ).get,
          easeOutBez = BezierFactory.getBezierEasing(
            0.167,
            0.167,
            0.667,
            1,
            "easeOut"
          ).get,
          easeInOutBez = BezierFactory.getBezierEasing(
            0.33,
            0,
            0.667,
            1,
            "easeInOut"
          ).get;
        function sum(t, e) {
          var r = typeof t,
            i = typeof e;
          if ("string" === r || "string" === i) return t + e;
          if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
            return ((t = t.slice(0))[0] = t[0] + e), t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
            return ((e = e.slice(0))[0] = t + e[0]), e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (
              var s = 0, a = t.length, n = e.length, o = [];
              s < a || s < n;

            )
              ("number" == typeof t[s] || t[s] instanceof Number) &&
              ("number" == typeof e[s] || e[s] instanceof Number)
                ? (o[s] = t[s] + e[s])
                : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]),
                (s += 1);
            return o;
          }
          return 0;
        }
        var add = sum;
        function sub(t, e) {
          var r = typeof t,
            i = typeof e;
          if (isNumerable(r, t) && isNumerable(i, e))
            return (
              "string" === r && (t = parseInt(t)),
              "string" === i && (e = parseInt(e)),
              t - e
            );
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
            return ((t = t.slice(0))[0] = t[0] - e), t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
            return ((e = e.slice(0))[0] = t - e[0]), e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (
              var s = 0, a = t.length, n = e.length, o = [];
              s < a || s < n;

            )
              ("number" == typeof t[s] || t[s] instanceof Number) &&
              ("number" == typeof e[s] || e[s] instanceof Number)
                ? (o[s] = t[s] - e[s])
                : (o[s] = void 0 === e[s] ? t[s] : t[s] || e[s]),
                (s += 1);
            return o;
          }
          return 0;
        }
        function mul(t, e) {
          var r,
            i,
            s,
            a = typeof t,
            n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t * e;
          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (
              s = t.length, r = createTypedArray("float32", s), i = 0;
              i < s;
              i += 1
            )
              r[i] = t[i] * e;
            return r;
          }
          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (
              s = e.length, r = createTypedArray("float32", s), i = 0;
              i < s;
              i += 1
            )
              r[i] = t * e[i];
            return r;
          }
          return 0;
        }
        function div(t, e) {
          var r,
            i,
            s,
            a = typeof t,
            n = typeof e;
          if (isNumerable(a, t) && isNumerable(n, e)) return t / e;
          if ($bm_isInstanceOfArray(t) && isNumerable(n, e)) {
            for (
              s = t.length, r = createTypedArray("float32", s), i = 0;
              i < s;
              i += 1
            )
              r[i] = t[i] / e;
            return r;
          }
          if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
            for (
              s = e.length, r = createTypedArray("float32", s), i = 0;
              i < s;
              i += 1
            )
              r[i] = t / e[i];
            return r;
          }
          return 0;
        }
        function mod(t, e) {
          return (
            "string" == typeof t && (t = parseInt(t)),
            "string" == typeof e && (e = parseInt(e)),
            t % e
          );
        }
        var $bm_sum = sum,
          $bm_sub = sub,
          $bm_mul = mul,
          $bm_div = div,
          $bm_mod = mod;
        function clamp(t, e, r) {
          if (r < e) {
            var i = r;
            (r = e), (e = i);
          }
          return Math.min(Math.max(t, e), r);
        }
        function radiansToDegrees(t) {
          return t / degToRads;
        }
        var radians_to_degrees = radiansToDegrees;
        function degreesToRadians(t) {
          return t * degToRads;
        }
        var degrees_to_radians = radiansToDegrees,
          helperLengthArray = [0, 0, 0, 0, 0, 0];
        function length(t, e) {
          if ("number" == typeof t || t instanceof Number)
            return (e = e || 0), Math.abs(t - e);
          e || (e = helperLengthArray);
          var r,
            i = Math.min(t.length, e.length),
            s = 0;
          for (r = 0; r < i; r += 1) s += Math.pow(e[r] - t[r], 2);
          return Math.sqrt(s);
        }
        function normalize(t) {
          return div(t, length(t));
        }
        function rgbToHsl(t) {
          var e,
            r,
            i = t[0],
            s = t[1],
            a = t[2],
            n = Math.max(i, s, a),
            o = Math.min(i, s, a),
            h = (n + o) / 2;
          if (n == o) e = r = 0;
          else {
            var p = n - o;
            switch (((r = 0.5 < h ? p / (2 - n - o) : p / (n + o)), n)) {
              case i:
                e = (s - a) / p + (s < a ? 6 : 0);
                break;
              case s:
                e = (a - i) / p + 2;
                break;
              case a:
                e = (i - s) / p + 4;
            }
            e /= 6;
          }
          return [e, r, h, t[3]];
        }
        function hue2rgb(t, e, r) {
          return (
            r < 0 && (r += 1),
            1 < r && (r -= 1),
            r < 1 / 6
              ? t + 6 * (e - t) * r
              : r < 0.5
              ? e
              : r < 2 / 3
              ? t + (e - t) * (2 / 3 - r) * 6
              : t
          );
        }
        function hslToRgb(t) {
          var e,
            r,
            i,
            s = t[0],
            a = t[1],
            n = t[2];
          if (0 === a) e = r = i = n;
          else {
            var o = n < 0.5 ? n * (1 + a) : n + a - n * a,
              h = 2 * n - o;
            (e = hue2rgb(h, o, s + 1 / 3)),
              (r = hue2rgb(h, o, s)),
              (i = hue2rgb(h, o, s - 1 / 3));
          }
          return [e, r, i, t[3]];
        }
        function linear(t, e, r, i, s) {
          if (
            ((void 0 !== i && void 0 !== s) ||
              ((i = e), (s = r), (e = 0), (r = 1)),
            r < e)
          ) {
            var a = r;
            (r = e), (e = a);
          }
          if (t <= e) return i;
          if (r <= t) return s;
          var n = r === e ? 0 : (t - e) / (r - e);
          if (!i.length) return i + (s - i) * n;
          var o,
            h = i.length,
            p = createTypedArray("float32", h);
          for (o = 0; o < h; o += 1) p[o] = i[o] + (s[o] - i[o]) * n;
          return p;
        }
        function random(t, e) {
          if (
            (void 0 === e &&
              (void 0 === t ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))),
            e.length)
          ) {
            var r,
              i = e.length;
            t || (t = createTypedArray("float32", i));
            var s = createTypedArray("float32", i),
              a = BMMath.random();
            for (r = 0; r < i; r += 1) s[r] = t[r] + a * (e[r] - t[r]);
            return s;
          }
          return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
        }
        function createPath(t, e, r, i) {
          var s,
            a = t.length,
            n = shape_pool.newElement();
          n.setPathData(!!i, a);
          var o,
            h,
            p = [0, 0];
          for (s = 0; s < a; s += 1)
            (o = e && e[s] ? e[s] : p),
              (h = r && r[s] ? r[s] : p),
              n.setTripleAt(
                t[s][0],
                t[s][1],
                h[0] + t[s][0],
                h[1] + t[s][1],
                o[0] + t[s][0],
                o[1] + t[s][1],
                s,
                !0
              );
          return n;
        }
        function initiateExpression(elem, data, property) {
          var val = data.x,
            needsVelocity = /velocity(?![\w\d])/.test(val),
            _needsRandom = -1 !== val.indexOf("random"),
            elemType = elem.data.ty,
            transform,
            $bm_transform,
            content,
            effect,
            thisProperty = property;
          (thisProperty.valueAtTime = thisProperty.getValueAtTime),
            Object.defineProperty(thisProperty, "value", {
              get: function () {
                return thisProperty.v;
              },
            }),
            (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
            (elem.comp.displayStartTime = 0);
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
            outPoint = elem.data.op / elem.comp.globalData.frameRate,
            width = elem.data.sw ? elem.data.sw : 0,
            height = elem.data.sh ? elem.data.sh : 0,
            name = elem.data.nm,
            loopIn,
            loop_in,
            loopOut,
            loop_out,
            smooth,
            toWorld,
            fromWorld,
            fromComp,
            toComp,
            fromCompToSurface,
            position,
            rotation,
            anchorPoint,
            scale,
            thisLayer,
            thisComp,
            mask,
            valueAtTime,
            velocityAtTime,
            __expression_functions = [],
            scoped_bm_rt;
          if (data.xf) {
            var i,
              len = data.xf.length;
            for (i = 0; i < len; i += 1)
              __expression_functions[i] = eval(
                "(function(){ return " + data.xf[i] + "}())"
              );
          }
          var expression_function = eval(
              "[function _expression_function(){" +
                val +
                ";scoped_bm_rt=$bm_rt}]"
            )[0],
            numKeys = property.kf ? data.k.length : 0,
            active = !this.data || !0 !== this.data.hd,
            wiggle = function (t, e) {
              var r,
                i,
                s = this.pv.length ? this.pv.length : 1,
                a = createTypedArray("float32", s);
              var n = Math.floor(5 * time);
              for (i = r = 0; r < n; ) {
                for (i = 0; i < s; i += 1) a[i] += -e + 2 * e * BMMath.random();
                r += 1;
              }
              var o = 5 * time,
                h = o - Math.floor(o),
                p = createTypedArray("float32", s);
              if (1 < s) {
                for (i = 0; i < s; i += 1)
                  p[i] = this.pv[i] + a[i] + (-e + 2 * e * BMMath.random()) * h;
                return p;
              }
              return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * h;
            }.bind(this);
          function loopInDuration(t, e) {
            return loopIn(t, e, !0);
          }
          function loopOutDuration(t, e) {
            return loopOut(t, e, !0);
          }
          thisProperty.loopIn &&
            ((loopIn = thisProperty.loopIn.bind(thisProperty)),
            (loop_in = loopIn)),
            thisProperty.loopOut &&
              ((loopOut = thisProperty.loopOut.bind(thisProperty)),
              (loop_out = loopOut)),
            thisProperty.smooth &&
              (smooth = thisProperty.smooth.bind(thisProperty)),
            this.getValueAtTime &&
              (valueAtTime = this.getValueAtTime.bind(this)),
            this.getVelocityAtTime &&
              (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(
              elem.comp.globalData.projectInterface
            ),
            time,
            velocity,
            value,
            text,
            textIndex,
            textTotal,
            selectorValue;
          function lookAt(t, e) {
            var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
              i =
                Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) /
                degToRads;
            return [-Math.atan2(r[1], r[2]) / degToRads, i, 0];
          }
          function easeOut(t, e, r, i, s) {
            return applyEase(easeOutBez, t, e, r, i, s);
          }
          function easeIn(t, e, r, i, s) {
            return applyEase(easeInBez, t, e, r, i, s);
          }
          function ease(t, e, r, i, s) {
            return applyEase(easeInOutBez, t, e, r, i, s);
          }
          function applyEase(t, e, r, i, s, a) {
            void 0 === s ? ((s = r), (a = i)) : (e = (e - r) / (i - r));
            var n = t((e = 1 < e ? 1 : e < 0 ? 0 : e));
            if ($bm_isInstanceOfArray(s)) {
              var o,
                h = s.length,
                p = createTypedArray("float32", h);
              for (o = 0; o < h; o += 1) p[o] = (a[o] - s[o]) * n + s[o];
              return p;
            }
            return (a - s) * n + s;
          }
          function nearestKey(t) {
            var e,
              r,
              i,
              s = data.k.length;
            if (data.k.length && "number" != typeof data.k[0])
              if (
                ((r = -1), (t *= elem.comp.globalData.frameRate) < data.k[0].t)
              )
                (r = 1), (i = data.k[0].t);
              else {
                for (e = 0; e < s - 1; e += 1) {
                  if (t === data.k[e].t) {
                    (r = e + 1), (i = data.k[e].t);
                    break;
                  }
                  if (t > data.k[e].t && t < data.k[e + 1].t) {
                    i =
                      t - data.k[e].t > data.k[e + 1].t - t
                        ? ((r = e + 2), data.k[e + 1].t)
                        : ((r = e + 1), data.k[e].t);
                    break;
                  }
                }
                -1 === r && ((r = e + 1), (i = data.k[e].t));
              }
            else i = r = 0;
            var a = {};
            return (
              (a.index = r), (a.time = i / elem.comp.globalData.frameRate), a
            );
          }
          function key(t) {
            var e, r, i, s;
            if (!data.k.length || "number" == typeof data.k[0])
              throw new Error("The property has no keyframe at index " + t);
            for (
              t -= 1,
                e = {
                  time: data.k[t].t / elem.comp.globalData.frameRate,
                  value: [],
                },
                i = (s =
                  t !== data.k.length - 1 || data.k[t].h
                    ? data.k[t].s
                    : data.k[t].s || 0 === data.k[t].s
                    ? data.k[t - 1].s
                    : data.k[t].e).length,
                r = 0;
              r < i;
              r += 1
            )
              (e[r] = s[r]), (e.value[r] = s[r]);
            return e;
          }
          function framesToTime(t, e) {
            return e || (e = elem.comp.globalData.frameRate), t / e;
          }
          function timeToFrames(t, e) {
            return (
              t || 0 === t || (t = time),
              e || (e = elem.comp.globalData.frameRate),
              t * e
            );
          }
          function seedRandom(t) {
            BMMath.seedrandom(randSeed + t);
          }
          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }
          function substring(t, e) {
            return "string" == typeof value
              ? void 0 === e
                ? value.substring(t)
                : value.substring(t, e)
              : "";
          }
          function substr(t, e) {
            return "string" == typeof value
              ? void 0 === e
                ? value.substr(t)
                : value.substr(t, e)
              : "";
          }
          var index = elem.data.ind,
            hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
            parent,
            randSeed = Math.floor(1e6 * Math.random()),
            globalData = elem.globalData;
          function executeExpression(t) {
            return (
              (value = t),
              _needsRandom && seedRandom(randSeed),
              this.frameExpressionId === elem.globalData.frameId &&
              "textSelector" !== this.propType
                ? value
                : ("textSelector" === this.propType &&
                    ((textIndex = this.textIndex),
                    (textTotal = this.textTotal),
                    (selectorValue = this.selectorValue)),
                  thisLayer ||
                    ((text = elem.layerInterface.text),
                    (thisLayer = elem.layerInterface),
                    (thisComp = elem.comp.compInterface),
                    (toWorld = thisLayer.toWorld.bind(thisLayer)),
                    (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                    (fromComp = thisLayer.fromComp.bind(thisLayer)),
                    (toComp = thisLayer.toComp.bind(thisLayer)),
                    (mask = thisLayer.mask
                      ? thisLayer.mask.bind(thisLayer)
                      : null),
                    (fromCompToSurface = fromComp)),
                  transform ||
                    ((transform = elem.layerInterface("ADBE Transform Group")),
                    ($bm_transform = transform) &&
                      (anchorPoint = transform.anchorPoint)),
                  4 !== elemType ||
                    content ||
                    (content = thisLayer("ADBE Root Vectors Group")),
                  effect || (effect = thisLayer(4)),
                  (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) &&
                    !parent &&
                    (parent = elem.hierarchy[0].layerInterface),
                  (time =
                    this.comp.renderedFrame / this.comp.globalData.frameRate),
                  needsVelocity && (velocity = velocityAtTime(time)),
                  expression_function(),
                  (this.frameExpressionId = elem.globalData.frameId),
                  "shape" === scoped_bm_rt.propType &&
                    (scoped_bm_rt = scoped_bm_rt.v),
                  scoped_bm_rt)
            );
          }
          return executeExpression;
        }
        return (ob.initiateExpression = initiateExpression), ob;
      })(),
      expressionHelpers = {
        searchExpressions: function (t, e, r) {
          e.x &&
            ((r.k = !0),
            (r.x = !0),
            (r.initiateExpression = ExpressionManager.initiateExpression),
            r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)));
        },
        getSpeedAtTime: function (t) {
          var e = this.getValueAtTime(t),
            r = this.getValueAtTime(t + -0.01),
            i = 0;
          if (e.length) {
            var s;
            for (s = 0; s < e.length; s += 1) i += Math.pow(r[s] - e[s], 2);
            i = 100 * Math.sqrt(i);
          } else i = 0;
          return i;
        },
        getVelocityAtTime: function (t) {
          if (void 0 !== this.vel) return this.vel;
          var e,
            r,
            i = this.getValueAtTime(t),
            s = this.getValueAtTime(t + -0.001);
          if (i.length)
            for (
              e = createTypedArray("float32", i.length), r = 0;
              r < i.length;
              r += 1
            )
              e[r] = (s[r] - i[r]) / -0.001;
          else e = (s - i) / -0.001;
          return e;
        },
        getValueAtTime: function (t) {
          return (
            (t *= this.elem.globalData.frameRate),
            (t -= this.offsetTime) !== this._cachingAtTime.lastFrame &&
              ((this._cachingAtTime.lastIndex =
                this._cachingAtTime.lastFrame < t
                  ? this._cachingAtTime.lastIndex
                  : 0),
              (this._cachingAtTime.value = this.interpolateValue(
                t,
                this._cachingAtTime
              )),
              (this._cachingAtTime.lastFrame = t)),
            this._cachingAtTime.value
          );
        },
        getStaticValueAtTime: function () {
          return this.pv;
        },
        setGroupProperty: function (t) {
          this.propertyGroup = t;
        },
      };
    !(function () {
      function o(t, e, r) {
        if (!this.k || !this.keyframes) return this.pv;
        t = t ? t.toLowerCase() : "";
        var i,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          p = this.keyframes,
          l = p[p.length - 1].t;
        if (h <= l) return this.pv;
        if (
          (r
            ? (s =
                l -
                (i = e
                  ? Math.abs(l - elem.comp.globalData.frameRate * e)
                  : Math.max(0, l - this.elem.data.ip)))
            : ((!e || e > p.length - 1) && (e = p.length - 1),
              (i = l - (s = p[p.length - 1 - e].t))),
          "pingpong" === t)
        ) {
          if (Math.floor((h - s) / i) % 2 != 0)
            return this.getValueAtTime(
              (i - ((h - s) % i) + s) / this.comp.globalData.frameRate,
              0
            );
        } else {
          if ("offset" === t) {
            var f = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              m = this.getValueAtTime(l / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(
                (((h - s) % i) + s) / this.comp.globalData.frameRate,
                0
              ),
              d = Math.floor((h - s) / i);
            if (this.pv.length) {
              for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1)
                o[a] = (m[a] - f[a]) * d + c[a];
              return o;
            }
            return (m - f) * d + c;
          }
          if ("continue" === t) {
            var u = this.getValueAtTime(l / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime(
                (l - 0.001) / this.comp.globalData.frameRate,
                0
              );
            if (this.pv.length) {
              for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1)
                o[a] =
                  u[a] +
                  ((u[a] - y[a]) * ((h - l) / this.comp.globalData.frameRate)) /
                    5e-4;
              return o;
            }
            return u + ((h - l) / 0.001) * (u - y);
          }
        }
        return this.getValueAtTime(
          (((h - s) % i) + s) / this.comp.globalData.frameRate,
          0
        );
      }
      function h(t, e, r) {
        if (!this.k) return this.pv;
        t = t ? t.toLowerCase() : "";
        var i,
          s,
          a,
          n,
          o,
          h = this.comp.renderedFrame,
          p = this.keyframes,
          l = p[0].t;
        if (l <= h) return this.pv;
        if (
          (r
            ? (s =
                l +
                (i = e
                  ? Math.abs(elem.comp.globalData.frameRate * e)
                  : Math.max(0, this.elem.data.op - l)))
            : ((!e || e > p.length - 1) && (e = p.length - 1),
              (i = (s = p[e].t) - l)),
          "pingpong" === t)
        ) {
          if (Math.floor((l - h) / i) % 2 == 0)
            return this.getValueAtTime(
              (((l - h) % i) + l) / this.comp.globalData.frameRate,
              0
            );
        } else {
          if ("offset" === t) {
            var f = this.getValueAtTime(l / this.comp.globalData.frameRate, 0),
              m = this.getValueAtTime(s / this.comp.globalData.frameRate, 0),
              c = this.getValueAtTime(
                (i - ((l - h) % i) + l) / this.comp.globalData.frameRate,
                0
              ),
              d = Math.floor((l - h) / i) + 1;
            if (this.pv.length) {
              for (n = (o = new Array(f.length)).length, a = 0; a < n; a += 1)
                o[a] = c[a] - (m[a] - f[a]) * d;
              return o;
            }
            return c - (m - f) * d;
          }
          if ("continue" === t) {
            var u = this.getValueAtTime(l / this.comp.globalData.frameRate, 0),
              y = this.getValueAtTime(
                (l + 0.001) / this.comp.globalData.frameRate,
                0
              );
            if (this.pv.length) {
              for (n = (o = new Array(u.length)).length, a = 0; a < n; a += 1)
                o[a] = u[a] + ((u[a] - y[a]) * (l - h)) / 0.001;
              return o;
            }
            return u + ((u - y) * (l - h)) / 0.001;
          }
        }
        return this.getValueAtTime(
          (i - ((l - h) % i) + l) / this.comp.globalData.frameRate,
          0
        );
      }
      function p(t, e) {
        if (!this.k) return this.pv;
        if (((t = 0.5 * (t || 0.4)), (e = Math.floor(e || 5)) <= 1))
          return this.pv;
        var r,
          i,
          s = this.comp.renderedFrame / this.comp.globalData.frameRate,
          a = s - t,
          n = 1 < e ? (s + t - a) / (e - 1) : 1,
          o = 0,
          h = 0;
        for (
          r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0;
          o < e;

        ) {
          if (((i = this.getValueAtTime(a + o * n)), this.pv.length))
            for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
          else r += i;
          o += 1;
        }
        if (this.pv.length) for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
        else r /= e;
        return r;
      }
      var s = TransformPropertyFactory.getTransformProperty;
      TransformPropertyFactory.getTransformProperty = function (t, e, r) {
        var i = s(t, e, r);
        return (
          i.dynamicProperties.length
            ? (i.getValueAtTime = function (t) {
                console.warn("Transform at time not supported");
              }.bind(i))
            : (i.getValueAtTime = function (t) {}.bind(i)),
          (i.setGroupProperty = expressionHelpers.setGroupProperty),
          i
        );
      };
      var l = PropertyFactory.getProp;
      PropertyFactory.getProp = function (t, e, r, i, s) {
        var a = l(t, e, r, i, s);
        a.kf
          ? (a.getValueAtTime = expressionHelpers.getValueAtTime.bind(a))
          : (a.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(a)),
          (a.setGroupProperty = expressionHelpers.setGroupProperty),
          (a.loopOut = o),
          (a.loopIn = h),
          (a.smooth = p),
          (a.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(a)),
          (a.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(a)),
          (a.numKeys = 1 === e.a ? e.k.length : 0),
          (a.propertyIndex = e.ix);
        var n = 0;
        return (
          0 !== r &&
            (n = createTypedArray(
              "float32",
              1 === e.a ? e.k[0].s.length : e.k.length
            )),
          (a._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: n,
          }),
          expressionHelpers.searchExpressions(t, e, a),
          a.k && s.addDynamicProperty(a),
          a
        );
      };
      var t = ShapePropertyFactory.getConstructorFunction(),
        e = ShapePropertyFactory.getKeyframedConstructorFunction();
      function r() {}
      (r.prototype = {
        vertices: function (t, e) {
          this.k && this.getValue();
          var r = this.v;
          void 0 !== e && (r = this.getValueAtTime(e, 0));
          var i,
            s = r._length,
            a = r[t],
            n = r.v,
            o = createSizedArray(s);
          for (i = 0; i < s; i += 1)
            o[i] =
              "i" === t || "o" === t
                ? [a[i][0] - n[i][0], a[i][1] - n[i][1]]
                : [a[i][0], a[i][1]];
          return o;
        },
        points: function (t) {
          return this.vertices("v", t);
        },
        inTangents: function (t) {
          return this.vertices("i", t);
        },
        outTangents: function (t) {
          return this.vertices("o", t);
        },
        isClosed: function () {
          return this.v.c;
        },
        pointOnPath: function (t, e) {
          var r = this.v;
          void 0 !== e && (r = this.getValueAtTime(e, 0)),
            this._segmentsLength ||
              (this._segmentsLength = bez.getSegmentsLength(r));
          for (
            var i,
              s = this._segmentsLength,
              a = s.lengths,
              n = s.totalLength * t,
              o = 0,
              h = a.length,
              p = 0;
            o < h;

          ) {
            if (p + a[o].addedLength > n) {
              var l = o,
                f = r.c && o === h - 1 ? 0 : o + 1,
                m = (n - p) / a[o].addedLength;
              i = bez.getPointInSegment(
                r.v[l],
                r.v[f],
                r.o[l],
                r.i[f],
                m,
                a[o]
              );
              break;
            }
            (p += a[o].addedLength), (o += 1);
          }
          return (
            i ||
              (i = r.c
                ? [r.v[0][0], r.v[0][1]]
                : [r.v[r._length - 1][0], r.v[r._length - 1][1]]),
            i
          );
        },
        vectorOnPath: function (t, e, r) {
          t = 1 == t ? (this.v.c ? 0 : 0.999) : t;
          var i = this.pointOnPath(t, e),
            s = this.pointOnPath(t + 0.001, e),
            a = s[0] - i[0],
            n = s[1] - i[1],
            o = Math.sqrt(Math.pow(a, 2) + Math.pow(n, 2));
          return "tangent" === r ? [a / o, n / o] : [-n / o, a / o];
        },
        tangentOnPath: function (t, e) {
          return this.vectorOnPath(t, e, "tangent");
        },
        normalOnPath: function (t, e) {
          return this.vectorOnPath(t, e, "normal");
        },
        setGroupProperty: expressionHelpers.setGroupProperty,
        getValueAtTime: expressionHelpers.getStaticValueAtTime,
      }),
        extendPrototype([r], t),
        extendPrototype([r], e),
        (e.prototype.getValueAtTime = function (t) {
          return (
            this._cachingAtTime ||
              (this._cachingAtTime = {
                shapeValue: shape_pool.clone(this.pv),
                lastIndex: 0,
                lastTime: initialDefaultFrame,
              }),
            (t *= this.elem.globalData.frameRate),
            (t -= this.offsetTime) !== this._cachingAtTime.lastTime &&
              ((this._cachingAtTime.lastIndex =
                this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0),
              (this._cachingAtTime.lastTime = t),
              this.interpolateShape(
                t,
                this._cachingAtTime.shapeValue,
                this._cachingAtTime
              )),
            this._cachingAtTime.shapeValue
          );
        }),
        (e.prototype.initiateExpression = ExpressionManager.initiateExpression);
      var n = ShapePropertyFactory.getShapeProp;
      ShapePropertyFactory.getShapeProp = function (t, e, r, i, s) {
        var a = n(t, e, r, i, s);
        return (
          (a.propertyIndex = e.ix),
          (a.lock = !1),
          3 === r
            ? expressionHelpers.searchExpressions(t, e.pt, a)
            : 4 === r && expressionHelpers.searchExpressions(t, e.ks, a),
          a.k && t.addDynamicProperty(a),
          a
        );
      };
    })(),
      (TextProperty.prototype.getExpressionValue = function (t, e) {
        var r = this.calculateExpression(e);
        if (t.t === r) return t;
        var i = {};
        return (
          this.copyData(i, t), (i.t = r.toString()), (i.__complete = !1), i
        );
      }),
      (TextProperty.prototype.searchProperty = function () {
        var t = this.searchKeyframes(),
          e = this.searchExpressions();
        return (this.kf = t || e), this.kf;
      }),
      (TextProperty.prototype.searchExpressions = function () {
        if (this.data.d.x)
          return (
            (this.calculateExpression =
              ExpressionManager.initiateExpression.bind(this)(
                this.elem,
                this.data.d,
                this
              )),
            this.addEffect(this.getExpressionValue.bind(this)),
            !0
          );
      });
    var ShapeExpressionInterface = (function () {
        function f(t, e, r) {
          var i,
            s = [],
            a = t ? t.length : 0;
          for (i = 0; i < a; i += 1)
            "gr" == t[i].ty
              ? s.push(n(t[i], e[i], r))
              : "fl" == t[i].ty
              ? s.push(o(t[i], e[i], r))
              : "st" == t[i].ty
              ? s.push(h(t[i], e[i], r))
              : "tm" == t[i].ty
              ? s.push(p(t[i], e[i], r))
              : "tr" == t[i].ty ||
                ("el" == t[i].ty
                  ? s.push(l(t[i], e[i], r))
                  : "sr" == t[i].ty
                  ? s.push(m(t[i], e[i], r))
                  : "sh" == t[i].ty
                  ? s.push(y(t[i], e[i], r))
                  : "rc" == t[i].ty
                  ? s.push(c(t[i], e[i], r))
                  : "rd" == t[i].ty
                  ? s.push(d(t[i], e[i], r))
                  : "rp" == t[i].ty && s.push(u(t[i], e[i], r)));
          return s;
        }
        function n(t, e, r) {
          var i = function (t) {
            switch (t) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return i.content;
              default:
                return i.transform;
            }
          };
          i.propertyGroup = function (t) {
            return 1 === t ? i : r(t - 1);
          };
          var s,
            a,
            n,
            o,
            h,
            p =
              ((s = t),
              (a = e),
              (n = i.propertyGroup),
              ((h = function (t) {
                for (var e = 0, r = o.length; e < r; ) {
                  if (
                    o[e]._name === t ||
                    o[e].mn === t ||
                    o[e].propertyIndex === t ||
                    o[e].ix === t ||
                    o[e].ind === t
                  )
                    return o[e];
                  e += 1;
                }
                if ("number" == typeof t) return o[t - 1];
              }).propertyGroup = function (t) {
                return 1 === t ? h : n(t - 1);
              }),
              (o = f(s.it, a.it, h.propertyGroup)),
              (h.numProperties = o.length),
              (h.propertyIndex = s.cix),
              (h._name = s.nm),
              h),
            l = (function (e, t, r) {
              function i(t) {
                return 1 == t ? s : r(--t);
              }
              t.transform.mProps.o.setGroupProperty(i),
                t.transform.mProps.p.setGroupProperty(i),
                t.transform.mProps.a.setGroupProperty(i),
                t.transform.mProps.s.setGroupProperty(i),
                t.transform.mProps.r.setGroupProperty(i),
                t.transform.mProps.sk &&
                  (t.transform.mProps.sk.setGroupProperty(i),
                  t.transform.mProps.sa.setGroupProperty(i));
              function s(t) {
                return e.a.ix === t || "Anchor Point" === t
                  ? s.anchorPoint
                  : e.o.ix === t || "Opacity" === t
                  ? s.opacity
                  : e.p.ix === t || "Position" === t
                  ? s.position
                  : e.r.ix === t ||
                    "Rotation" === t ||
                    "ADBE Vector Rotation" === t
                  ? s.rotation
                  : e.s.ix === t || "Scale" === t
                  ? s.scale
                  : (e.sk && e.sk.ix === t) || "Skew" === t
                  ? s.skew
                  : (e.sa && e.sa.ix === t) || "Skew Axis" === t
                  ? s.skewAxis
                  : void 0;
              }
              return (
                t.transform.op.setGroupProperty(i),
                Object.defineProperties(s, {
                  opacity: {
                    get: ExpressionPropertyInterface(t.transform.mProps.o),
                  },
                  position: {
                    get: ExpressionPropertyInterface(t.transform.mProps.p),
                  },
                  anchorPoint: {
                    get: ExpressionPropertyInterface(t.transform.mProps.a),
                  },
                  scale: {
                    get: ExpressionPropertyInterface(t.transform.mProps.s),
                  },
                  rotation: {
                    get: ExpressionPropertyInterface(t.transform.mProps.r),
                  },
                  skew: {
                    get: ExpressionPropertyInterface(t.transform.mProps.sk),
                  },
                  skewAxis: {
                    get: ExpressionPropertyInterface(t.transform.mProps.sa),
                  },
                  _name: { value: e.nm },
                }),
                (s.ty = "tr"),
                (s.mn = e.mn),
                (s.propertyGroup = r),
                s
              );
            })(t.it[t.it.length - 1], e.it[e.it.length - 1], i.propertyGroup);
          return (
            (i.content = p),
            (i.transform = l),
            Object.defineProperty(i, "_name", {
              get: function () {
                return t.nm;
              },
            }),
            (i.numProperties = t.np),
            (i.propertyIndex = t.ix),
            (i.nm = t.nm),
            (i.mn = t.mn),
            i
          );
        }
        function o(t, e, r) {
          function i(t) {
            return "Color" === t || "color" === t
              ? i.color
              : "Opacity" === t || "opacity" === t
              ? i.opacity
              : void 0;
          }
          return (
            Object.defineProperties(i, {
              color: { get: ExpressionPropertyInterface(e.c) },
              opacity: { get: ExpressionPropertyInterface(e.o) },
              _name: { value: t.nm },
              mn: { value: t.mn },
            }),
            e.c.setGroupProperty(r),
            e.o.setGroupProperty(r),
            i
          );
        }
        function h(t, e, r) {
          function i(t) {
            return 1 === t ? ob : r(t - 1);
          }
          function s(t) {
            return 1 === t ? h : i(t - 1);
          }
          var a,
            n,
            o = t.d ? t.d.length : 0,
            h = {};
          for (a = 0; a < o; a += 1)
            (n = a),
              Object.defineProperty(h, t.d[n].nm, {
                get: ExpressionPropertyInterface(e.d.dataProps[n].p),
              }),
              e.d.dataProps[a].p.setGroupProperty(s);
          function p(t) {
            return "Color" === t || "color" === t
              ? p.color
              : "Opacity" === t || "opacity" === t
              ? p.opacity
              : "Stroke Width" === t || "stroke width" === t
              ? p.strokeWidth
              : void 0;
          }
          return (
            Object.defineProperties(p, {
              color: { get: ExpressionPropertyInterface(e.c) },
              opacity: { get: ExpressionPropertyInterface(e.o) },
              strokeWidth: { get: ExpressionPropertyInterface(e.w) },
              dash: {
                get: function () {
                  return h;
                },
              },
              _name: { value: t.nm },
              mn: { value: t.mn },
            }),
            e.c.setGroupProperty(i),
            e.o.setGroupProperty(i),
            e.w.setGroupProperty(i),
            p
          );
        }
        function p(e, t, r) {
          function i(t) {
            return 1 == t ? s : r(--t);
          }
          function s(t) {
            return t === e.e.ix || "End" === t || "end" === t
              ? s.end
              : t === e.s.ix
              ? s.start
              : t === e.o.ix
              ? s.offset
              : void 0;
          }
          return (
            (s.propertyIndex = e.ix),
            t.s.setGroupProperty(i),
            t.e.setGroupProperty(i),
            t.o.setGroupProperty(i),
            (s.propertyIndex = e.ix),
            (s.propertyGroup = r),
            Object.defineProperties(s, {
              start: { get: ExpressionPropertyInterface(t.s) },
              end: { get: ExpressionPropertyInterface(t.e) },
              offset: { get: ExpressionPropertyInterface(t.o) },
              _name: { value: e.nm },
            }),
            (s.mn = e.mn),
            s
          );
        }
        function l(e, t, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }
          a.propertyIndex = e.ix;
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t ? a.position : e.s.ix === t ? a.size : void 0;
          }
          return (
            s.s.setGroupProperty(i),
            s.p.setGroupProperty(i),
            Object.defineProperties(a, {
              size: { get: ExpressionPropertyInterface(s.s) },
              position: { get: ExpressionPropertyInterface(s.p) },
              _name: { value: e.nm },
            }),
            (a.mn = e.mn),
            a
          );
        }
        function m(e, t, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t
              ? a.position
              : e.r.ix === t
              ? a.rotation
              : e.pt.ix === t
              ? a.points
              : e.or.ix === t || "ADBE Vector Star Outer Radius" === t
              ? a.outerRadius
              : e.os.ix === t
              ? a.outerRoundness
              : !e.ir ||
                (e.ir.ix !== t && "ADBE Vector Star Inner Radius" !== t)
              ? e.is && e.is.ix === t
                ? a.innerRoundness
                : void 0
              : a.innerRadius;
          }
          return (
            (a.propertyIndex = e.ix),
            s.or.setGroupProperty(i),
            s.os.setGroupProperty(i),
            s.pt.setGroupProperty(i),
            s.p.setGroupProperty(i),
            s.r.setGroupProperty(i),
            e.ir && (s.ir.setGroupProperty(i), s.is.setGroupProperty(i)),
            Object.defineProperties(a, {
              position: { get: ExpressionPropertyInterface(s.p) },
              rotation: { get: ExpressionPropertyInterface(s.r) },
              points: { get: ExpressionPropertyInterface(s.pt) },
              outerRadius: { get: ExpressionPropertyInterface(s.or) },
              outerRoundness: { get: ExpressionPropertyInterface(s.os) },
              innerRadius: { get: ExpressionPropertyInterface(s.ir) },
              innerRoundness: { get: ExpressionPropertyInterface(s.is) },
              _name: { value: e.nm },
            }),
            (a.mn = e.mn),
            a
          );
        }
        function c(e, t, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }
          var s = "tm" === t.sh.ty ? t.sh.prop : t.sh;
          function a(t) {
            return e.p.ix === t
              ? a.position
              : e.r.ix === t
              ? a.roundness
              : e.s.ix === t || "Size" === t || "ADBE Vector Rect Size" === t
              ? a.size
              : void 0;
          }
          return (
            (a.propertyIndex = e.ix),
            s.p.setGroupProperty(i),
            s.s.setGroupProperty(i),
            s.r.setGroupProperty(i),
            Object.defineProperties(a, {
              position: { get: ExpressionPropertyInterface(s.p) },
              roundness: { get: ExpressionPropertyInterface(s.r) },
              size: { get: ExpressionPropertyInterface(s.s) },
              _name: { value: e.nm },
            }),
            (a.mn = e.mn),
            a
          );
        }
        function d(e, t, r) {
          var i = t;
          function s(t) {
            if (e.r.ix === t || "Round Corners 1" === t) return s.radius;
          }
          return (
            (s.propertyIndex = e.ix),
            i.rd.setGroupProperty(function (t) {
              return 1 == t ? s : r(--t);
            }),
            Object.defineProperties(s, {
              radius: { get: ExpressionPropertyInterface(i.rd) },
              _name: { value: e.nm },
            }),
            (s.mn = e.mn),
            s
          );
        }
        function u(e, t, r) {
          function i(t) {
            return 1 == t ? a : r(--t);
          }
          var s = t;
          function a(t) {
            return e.c.ix === t || "Copies" === t
              ? a.copies
              : e.o.ix === t || "Offset" === t
              ? a.offset
              : void 0;
          }
          return (
            (a.propertyIndex = e.ix),
            s.c.setGroupProperty(i),
            s.o.setGroupProperty(i),
            Object.defineProperties(a, {
              copies: { get: ExpressionPropertyInterface(s.c) },
              offset: { get: ExpressionPropertyInterface(s.o) },
              _name: { value: e.nm },
            }),
            (a.mn = e.mn),
            a
          );
        }
        function y(t, e, r) {
          var i = e.sh;
          function s(t) {
            if (
              "Shape" === t ||
              "shape" === t ||
              "Path" === t ||
              "path" === t ||
              "ADBE Vector Shape" === t ||
              2 === t
            )
              return s.path;
          }
          return (
            i.setGroupProperty(function (t) {
              return 1 == t ? s : r(--t);
            }),
            Object.defineProperties(s, {
              path: {
                get: function () {
                  return i.k && i.getValue(), i;
                },
              },
              shape: {
                get: function () {
                  return i.k && i.getValue(), i;
                },
              },
              _name: { value: t.nm },
              ix: { value: t.ix },
              mn: { value: t.mn },
            }),
            s
          );
        }
        return function (t, e, r) {
          var i;
          function s(t) {
            if ("number" == typeof t) return i[t - 1];
            for (var e = 0, r = i.length; e < r; ) {
              if (i[e]._name === t) return i[e];
              e += 1;
            }
          }
          return (
            (s.propertyGroup = r),
            (i = f(t, e, s)),
            (s.numProperties = i.length),
            s
          );
        };
      })(),
      TextExpressionInterface = function (e) {
        var r;
        function t() {}
        return (
          Object.defineProperty(t, "sourceText", {
            get: function () {
              e.textProperty.getValue();
              var t = e.textProperty.currentData.t;
              return (
                void 0 !== t &&
                  ((e.textProperty.currentData.t = void 0),
                  ((r = new String(t)).value = t || new String(t))),
                r
              );
            },
          }),
          t
        );
      },
      LayerExpressionInterface = (function () {
        function s(t, e) {
          var r = new Matrix();
          if (
            (r.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(r),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var i,
              s = this._elem.hierarchy.length;
            for (i = 0; i < s; i += 1)
              this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
            return r.applyToPointArray(t[0], t[1], t[2] || 0);
          }
          return r.applyToPointArray(t[0], t[1], t[2] || 0);
        }
        function a(t, e) {
          var r = new Matrix();
          if (
            (r.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(r),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var i,
              s = this._elem.hierarchy.length;
            for (i = 0; i < s; i += 1)
              this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
            return r.inversePoint(t);
          }
          return r.inversePoint(t);
        }
        function n(t) {
          var e = new Matrix();
          if (
            (e.reset(),
            this._elem.finalTransform.mProp.applyToMatrix(e),
            this._elem.hierarchy && this._elem.hierarchy.length)
          ) {
            var r,
              i = this._elem.hierarchy.length;
            for (r = 0; r < i; r += 1)
              this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
            return e.inversePoint(t);
          }
          return e.inversePoint(t);
        }
        function o() {
          return [1, 1, 1, 1];
        }
        return function (e) {
          var r;
          function i(t) {
            switch (t) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return i.shapeInterface;
              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return r;
              case 4:
              case "ADBE Effect Parade":
              case "effects":
              case "Effects":
                return i.effect;
            }
          }
          (i.toWorld = s),
            (i.fromWorld = a),
            (i.toComp = s),
            (i.fromComp = n),
            (i.sampleImage = o),
            (i.sourceRectAtTime = e.sourceRectAtTime.bind(e));
          var t = getDescriptor(
            (r = TransformExpressionInterface(
              (i._elem = e).finalTransform.mProp
            )),
            "anchorPoint"
          );
          return (
            Object.defineProperties(i, {
              hasParent: {
                get: function () {
                  return e.hierarchy.length;
                },
              },
              parent: {
                get: function () {
                  return e.hierarchy[0].layerInterface;
                },
              },
              rotation: getDescriptor(r, "rotation"),
              scale: getDescriptor(r, "scale"),
              position: getDescriptor(r, "position"),
              opacity: getDescriptor(r, "opacity"),
              anchorPoint: t,
              anchor_point: t,
              transform: {
                get: function () {
                  return r;
                },
              },
              active: {
                get: function () {
                  return e.isInRange;
                },
              },
            }),
            (i.startTime = e.data.st),
            (i.index = e.data.ind),
            (i.source = e.data.refId),
            (i.height = 0 === e.data.ty ? e.data.h : 100),
            (i.width = 0 === e.data.ty ? e.data.w : 100),
            (i.inPoint = e.data.ip / e.comp.globalData.frameRate),
            (i.outPoint = e.data.op / e.comp.globalData.frameRate),
            (i._name = e.data.nm),
            (i.registerMaskInterface = function (t) {
              i.mask = new MaskManagerInterface(t, e);
            }),
            (i.registerEffectsInterface = function (t) {
              i.effect = t;
            }),
            i
          );
        };
      })(),
      CompExpressionInterface = function (i) {
        function t(t) {
          for (var e = 0, r = i.layers.length; e < r; ) {
            if (i.layers[e].nm === t || i.layers[e].ind === t)
              return i.elements[e].layerInterface;
            e += 1;
          }
          return null;
        }
        return (
          Object.defineProperty(t, "_name", { value: i.data.nm }),
          ((t.layer = t).pixelAspect = 1),
          (t.height = i.data.h || i.globalData.compSize.h),
          (t.width = i.data.w || i.globalData.compSize.w),
          (t.pixelAspect = 1),
          (t.frameDuration = 1 / i.globalData.frameRate),
          (t.displayStartTime = 0),
          (t.numLayers = i.layers.length),
          t
        );
      },
      TransformExpressionInterface = function (t) {
        function e(t) {
          switch (t) {
            case "scale":
            case "Scale":
            case "ADBE Scale":
            case 6:
              return e.scale;
            case "rotation":
            case "Rotation":
            case "ADBE Rotation":
            case "ADBE Rotate Z":
            case 10:
              return e.rotation;
            case "ADBE Rotate X":
              return e.xRotation;
            case "ADBE Rotate Y":
              return e.yRotation;
            case "position":
            case "Position":
            case "ADBE Position":
            case 2:
              return e.position;
            case "ADBE Position_0":
              return e.xPosition;
            case "ADBE Position_1":
              return e.yPosition;
            case "ADBE Position_2":
              return e.zPosition;
            case "anchorPoint":
            case "AnchorPoint":
            case "Anchor Point":
            case "ADBE AnchorPoint":
            case 1:
              return e.anchorPoint;
            case "opacity":
            case "Opacity":
            case 11:
              return e.opacity;
          }
        }
        if (
          (Object.defineProperty(e, "rotation", {
            get: ExpressionPropertyInterface(t.r || t.rz),
          }),
          Object.defineProperty(e, "zRotation", {
            get: ExpressionPropertyInterface(t.rz || t.r),
          }),
          Object.defineProperty(e, "xRotation", {
            get: ExpressionPropertyInterface(t.rx),
          }),
          Object.defineProperty(e, "yRotation", {
            get: ExpressionPropertyInterface(t.ry),
          }),
          Object.defineProperty(e, "scale", {
            get: ExpressionPropertyInterface(t.s),
          }),
          t.p)
        )
          var r = ExpressionPropertyInterface(t.p);
        return (
          Object.defineProperty(e, "position", {
            get: function () {
              return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0];
            },
          }),
          Object.defineProperty(e, "xPosition", {
            get: ExpressionPropertyInterface(t.px),
          }),
          Object.defineProperty(e, "yPosition", {
            get: ExpressionPropertyInterface(t.py),
          }),
          Object.defineProperty(e, "zPosition", {
            get: ExpressionPropertyInterface(t.pz),
          }),
          Object.defineProperty(e, "anchorPoint", {
            get: ExpressionPropertyInterface(t.a),
          }),
          Object.defineProperty(e, "opacity", {
            get: ExpressionPropertyInterface(t.o),
          }),
          Object.defineProperty(e, "skew", {
            get: ExpressionPropertyInterface(t.sk),
          }),
          Object.defineProperty(e, "skewAxis", {
            get: ExpressionPropertyInterface(t.sa),
          }),
          Object.defineProperty(e, "orientation", {
            get: ExpressionPropertyInterface(t.or),
          }),
          e
        );
      },
      ProjectInterface = (function () {
        function e(t) {
          this.compositions.push(t);
        }
        return function () {
          function t(t) {
            for (var e = 0, r = this.compositions.length; e < r; ) {
              if (
                this.compositions[e].data &&
                this.compositions[e].data.nm === t
              )
                return (
                  this.compositions[e].prepareFrame &&
                    this.compositions[e].data.xt &&
                    this.compositions[e].prepareFrame(this.currentFrame),
                  this.compositions[e].compInterface
                );
              e += 1;
            }
          }
          return (
            (t.compositions = []),
            (t.currentFrame = 0),
            (t.registerComposition = e),
            t
          );
        };
      })(),
      EffectsExpressionInterface = (function () {
        function p(s, t, e, r) {
          var i,
            a = [],
            n = s.ef.length;
          for (i = 0; i < n; i += 1)
            5 === s.ef[i].ty
              ? a.push(
                  p(
                    s.ef[i],
                    t.effectElements[i],
                    t.effectElements[i].propertyGroup,
                    r
                  )
                )
              : a.push(l(t.effectElements[i], s.ef[i].ty, r, o));
          function o(t) {
            return 1 === t ? h : e(t - 1);
          }
          var h = function (t) {
            for (var e = s.ef, r = 0, i = e.length; r < i; ) {
              if (t === e[r].nm || t === e[r].mn || t === e[r].ix)
                return 5 === e[r].ty ? a[r] : a[r]();
              r += 1;
            }
            return a[0]();
          };
          return (
            (h.propertyGroup = o),
            "ADBE Color Control" === s.mn &&
              Object.defineProperty(h, "color", {
                get: function () {
                  return a[0]();
                },
              }),
            Object.defineProperty(h, "numProperties", {
              get: function () {
                return s.np;
              },
            }),
            (h.active = h.enabled = 0 !== s.en),
            h
          );
        }
        function l(t, e, r, i) {
          var s = ExpressionPropertyInterface(t.p);
          return (
            t.p.setGroupProperty && t.p.setGroupProperty(i),
            function () {
              return 10 === e ? r.comp.compInterface(t.p.v) : s();
            }
          );
        }
        return {
          createEffectsInterface: function (s, t) {
            if (s.effectsManager) {
              var e,
                a = [],
                r = s.data.ef,
                i = s.effectsManager.effectElements.length;
              for (e = 0; e < i; e += 1)
                a.push(p(r[e], s.effectsManager.effectElements[e], t, s));
              return function (t) {
                for (var e = s.data.ef || [], r = 0, i = e.length; r < i; ) {
                  if (t === e[r].nm || t === e[r].mn || t === e[r].ix)
                    return a[r];
                  r += 1;
                }
              };
            }
          },
        };
      })(),
      MaskManagerInterface = (function () {
        function a(t, e) {
          (this._mask = t), (this._data = e);
        }
        Object.defineProperty(a.prototype, "maskPath", {
          get: function () {
            return (
              this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
            );
          },
        }),
          Object.defineProperty(a.prototype, "maskOpacity", {
            get: function () {
              return (
                this._mask.op.k && this._mask.op.getValue(),
                100 * this._mask.op.v
              );
            },
          });
        return function (e, t) {
          var r,
            i = createSizedArray(e.viewData.length),
            s = e.viewData.length;
          for (r = 0; r < s; r += 1)
            i[r] = new a(e.viewData[r], e.masksProperties[r]);
          return function (t) {
            for (r = 0; r < s; ) {
              if (e.masksProperties[r].nm === t) return i[r];
              r += 1;
            }
          };
        };
      })(),
      ExpressionPropertyInterface = (function () {
        var s = { pv: 0, v: 0, mult: 1 },
          n = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
        function o(i, s, a) {
          Object.defineProperty(i, "velocity", {
            get: function () {
              return s.getVelocityAtTime(s.comp.currentFrame);
            },
          }),
            (i.numKeys = s.keyframes ? s.keyframes.length : 0),
            (i.key = function (t) {
              if (i.numKeys) {
                var e = "";
                e =
                  "s" in s.keyframes[t - 1]
                    ? s.keyframes[t - 1].s
                    : "e" in s.keyframes[t - 2]
                    ? s.keyframes[t - 2].e
                    : s.keyframes[t - 2].s;
                var r =
                  "unidimensional" === a ? new Number(e) : Object.assign({}, e);
                return (
                  (r.time =
                    s.keyframes[t - 1].t / s.elem.comp.globalData.frameRate),
                  r
                );
              }
              return 0;
            }),
            (i.valueAtTime = s.getValueAtTime),
            (i.speedAtTime = s.getSpeedAtTime),
            (i.velocityAtTime = s.getVelocityAtTime),
            (i.propertyGroup = s.propertyGroup);
        }
        function e() {
          return s;
        }
        return function (t) {
          return t
            ? "unidimensional" === t.propType
              ? (function (t) {
                  (t && "pv" in t) || (t = s);
                  var e = 1 / t.mult,
                    r = t.pv * e,
                    i = new Number(r);
                  return (
                    (i.value = r),
                    o(i, t, "unidimensional"),
                    function () {
                      return (
                        t.k && t.getValue(),
                        (r = t.v * e),
                        i.value !== r &&
                          (((i = new Number(r)).value = r),
                          o(i, t, "unidimensional")),
                        i
                      );
                    }
                  );
                })(t)
              : (function (e) {
                  (e && "pv" in e) || (e = n);
                  var r = 1 / e.mult,
                    i = e.pv.length,
                    s = createTypedArray("float32", i),
                    a = createTypedArray("float32", i);
                  return (
                    (s.value = a),
                    o(s, e, "multidimensional"),
                    function () {
                      e.k && e.getValue();
                      for (var t = 0; t < i; t += 1) s[t] = a[t] = e.v[t] * r;
                      return s;
                    }
                  );
                })(t)
            : e;
        };
      })(),
      aZ,
      bZ;
    function SliderEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function AngleEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function ColorEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
    }
    function PointEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
    }
    function LayerIndexEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function MaskIndexEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function CheckboxEffect(t, e, r) {
      this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
    }
    function NoValueEffect() {
      this.p = {};
    }
    function EffectsManager() {}
    function EffectsManager(t, e) {
      var r = t.ef || [];
      this.effectElements = [];
      var i,
        s,
        a = r.length;
      for (i = 0; i < a; i++)
        (s = new GroupEffect(r[i], e)), this.effectElements.push(s);
    }
    function GroupEffect(t, e) {
      this.init(t, e);
    }
    (aZ = (function () {
      function r(t, e) {
        return (
          (this.textIndex = t + 1),
          (this.textTotal = e),
          (this.v = this.getValue() * this.mult),
          this.v
        );
      }
      return function (t, e) {
        (this.pv = 1),
          (this.comp = t.comp),
          (this.elem = t),
          (this.mult = 0.01),
          (this.propType = "textSelector"),
          (this.textTotal = e.totalChars),
          (this.selectorValue = 100),
          (this.lastValue = [1, 1, 1]),
          (this.k = !0),
          (this.x = !0),
          (this.getValue = ExpressionManager.initiateExpression.bind(this)(
            t,
            e,
            this
          )),
          (this.getMult = r),
          (this.getVelocityAtTime = expressionHelpers.getVelocityAtTime),
          this.kf
            ? (this.getValueAtTime =
                expressionHelpers.getValueAtTime.bind(this))
            : (this.getValueAtTime =
                expressionHelpers.getStaticValueAtTime.bind(this)),
          (this.setGroupProperty = expressionHelpers.setGroupProperty);
      };
    })()),
      (bZ = TextSelectorProp.getTextSelectorProp),
      (TextSelectorProp.getTextSelectorProp = function (t, e, r) {
        return 1 === e.t ? new aZ(t, e, r) : bZ(t, e, r);
      }),
      extendPrototype([DynamicPropertyContainer], GroupEffect),
      (GroupEffect.prototype.getValue =
        GroupEffect.prototype.iterateDynamicProperties),
      (GroupEffect.prototype.init = function (t, e) {
        (this.data = t),
          (this.effectElements = []),
          this.initDynamicPropertyContainer(e);
        var r,
          i,
          s = this.data.ef.length,
          a = this.data.ef;
        for (r = 0; r < s; r += 1) {
          switch (((i = null), a[r].ty)) {
            case 0:
              i = new SliderEffect(a[r], e, this);
              break;
            case 1:
              i = new AngleEffect(a[r], e, this);
              break;
            case 2:
              i = new ColorEffect(a[r], e, this);
              break;
            case 3:
              i = new PointEffect(a[r], e, this);
              break;
            case 4:
            case 7:
              i = new CheckboxEffect(a[r], e, this);
              break;
            case 10:
              i = new LayerIndexEffect(a[r], e, this);
              break;
            case 11:
              i = new MaskIndexEffect(a[r], e, this);
              break;
            case 5:
              i = new EffectsManager(a[r], e, this);
              break;
            default:
              i = new NoValueEffect(a[r], e, this);
          }
          i && this.effectElements.push(i);
        }
      });
    var lottiejs = {},
      _isFrozen = !1;
    function setLocationHref(t) {
      locationHref = t;
    }
    function searchAnimations() {
      !0 === standalone
        ? animationManager.searchAnimations(animationData, standalone, renderer)
        : animationManager.searchAnimations();
    }
    function setSubframeRendering(t) {
      subframeEnabled = t;
    }
    function loadAnimation(t) {
      return (
        !0 === standalone && (t.animationData = JSON.parse(animationData)),
        animationManager.loadAnimation(t)
      );
    }
    function setQuality(t) {
      if ("string" == typeof t)
        switch (t) {
          case "high":
            defaultCurveSegments = 200;
            break;
          case "medium":
            defaultCurveSegments = 50;
            break;
          case "low":
            defaultCurveSegments = 10;
        }
      else !isNaN(t) && 1 < t && (defaultCurveSegments = t);
      roundValues(!(50 <= defaultCurveSegments));
    }
    function inBrowser() {
      return "undefined" != typeof navigator;
    }
    function installPlugin(t, e) {
      "expressions" === t && (expressionsPlugin = e);
    }
    function getFactory(t) {
      switch (t) {
        case "propertyFactory":
          return PropertyFactory;
        case "shapePropertyFactory":
          return ShapePropertyFactory;
        case "matrix":
          return Matrix;
      }
    }
    function checkReady() {
      "complete" === document.readyState &&
        (clearInterval(readyStateCheckInterval), searchAnimations());
    }
    function getQueryVariable(t) {
      for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
        var i = e[r].split("=");
        if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1]);
      }
    }
    (lottiejs.play = animationManager.play),
      (lottiejs.pause = animationManager.pause),
      (lottiejs.setLocationHref = setLocationHref),
      (lottiejs.togglePause = animationManager.togglePause),
      (lottiejs.setSpeed = animationManager.setSpeed),
      (lottiejs.setDirection = animationManager.setDirection),
      (lottiejs.stop = animationManager.stop),
      (lottiejs.searchAnimations = searchAnimations),
      (lottiejs.registerAnimation = animationManager.registerAnimation),
      (lottiejs.loadAnimation = loadAnimation),
      (lottiejs.setSubframeRendering = setSubframeRendering),
      (lottiejs.resize = animationManager.resize),
      (lottiejs.goToAndStop = animationManager.goToAndStop),
      (lottiejs.destroy = animationManager.destroy),
      (lottiejs.setQuality = setQuality),
      (lottiejs.inBrowser = inBrowser),
      (lottiejs.installPlugin = installPlugin),
      (lottiejs.freeze = animationManager.freeze),
      (lottiejs.unfreeze = animationManager.unfreeze),
      (lottiejs.getRegisteredAnimations =
        animationManager.getRegisteredAnimations),
      (lottiejs.__getFactory = getFactory),
      (lottiejs.version = "5.5.3");
    var standalone = "__[STANDALONE]__",
      animationData = "__[ANIMATIONDATA]__",
      renderer = "";
    if (standalone) {
      var scripts = document.getElementsByTagName("script"),
        index = scripts.length - 1,
        myScript = scripts[index] || { src: "" },
        queryString = myScript.src.replace(/^[^\?]+\??/, "");
      renderer = getQueryVariable("renderer");
    }
    var readyStateCheckInterval = setInterval(checkReady, 100);
    return lottiejs;
  }),
  "function" == typeof define && define.amd
    ? define(function () {
        return b(a);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = b(a))
    : ((a.lottie = b(a)), (a.bodymovin = a.lottie)));
