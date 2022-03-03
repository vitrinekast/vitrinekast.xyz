!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).glitch =
        e());
})(this, function () {
  "use strict";
  var a = { amount: 35, iterations: 20, quality: 30, seed: 25 };
  function p(i) {
    return (
      "object" !=
        typeof (i = (function (t) {
          var e = !1;
          if (void 0 !== t)
            try {
              e = JSON.parse(JSON.stringify(t));
            } catch (t) {}
          return e;
        })(i)) && (i = {}),
      Object.keys(a)
        .filter(function (t) {
          return "iterations" !== t;
        })
        .forEach(function (t) {
          var e, n, r;
          "number" != typeof i[t] || isNaN(i[t])
            ? (i[t] = a[t])
            : (i[t] = ((e = i[t]), (r = 100), e < (n = 0) ? n : r < e ? r : e)),
            (i[t] = Math.round(i[t]));
        }),
      ("number" != typeof i.iterations ||
        isNaN(i.iterations) ||
        i.iterations <= 0) &&
        (i.iterations = a.iterations),
      (i.iterations = Math.round(i.iterations)),
      i
    );
  }
  var u = function (t, e) {
      void 0 === t && (t = 300),
        void 0 === e && (e = 150),
        "undefined" == typeof window
          ? ((this.canvasEl = { width: t, height: e }), (this.ctx = null))
          : ((this.canvasEl = document.createElement("canvas")),
            (this.canvasEl.width = t),
            (this.canvasEl.height = e),
            (this.ctx = this.canvasEl.getContext("2d")));
    },
    t = { width: { configurable: !0 }, height: { configurable: !0 } };
  function g(t) {
    if (t instanceof HTMLImageElement) {
      if (!t.naturalWidth || !t.naturalHeight || !1 === t.complete)
        throw new Error("This this image hasn't finished loading: " + t.src);
      var e = new u(t.naturalWidth, t.naturalHeight),
        n = e.getContext("2d");
      n.drawImage(t, 0, 0, e.width, e.height);
      var r = n.getImageData(0, 0, e.width, e.height);
      return (
        r.data &&
          r.data.length &&
          (void 0 === r.width && (r.width = t.naturalWidth),
          void 0 === r.height && (r.height = t.naturalHeight)),
        r
      );
    }
    throw new Error("This object does not seem to be an image.");
  }
  (u.prototype.getContext = function () {
    return this.ctx;
  }),
    (u.prototype.toDataURL = function (t, e, n) {
      if ("function" != typeof n) return this.canvasEl.toDataURL(t, e);
      n(this.canvasEl.toDataURL(t, e));
    }),
    (t.width.get = function () {
      return this.canvasEl.width;
    }),
    (t.width.set = function (t) {
      this.canvasEl.width = t;
    }),
    (t.height.get = function () {
      return this.canvasEl.height;
    }),
    (t.height.set = function (t) {
      this.canvasEl.height = t;
    }),
    Object.defineProperties(u.prototype, t),
    "undefined" != typeof window && (u.Image = Image);
  var i = u.Image;
  function o(r) {
    return new Promise(function (t, e) {
      var n = new i();
      (n.onload = function () {
        t(n);
      }),
        (n.onerror = e);
      try {
        n.src = r;
      } catch (t) {
        e(t);
      }
    });
  }
  function v(t, e, n, r) {
    o(t).then(n, r);
  }
  function f(t) {
    return {
      width: t.width || t.naturalWidth,
      height: t.height || t.naturalHeight,
    };
  }
  function m(t, e, s, n) {
    o(t).then(function (t) {
      var e,
        n,
        r,
        i,
        a = f(t),
        o =
          ((n = f((e = t))),
          (r = new u(n.width, n.height)),
          (i = r.getContext("2d")).drawImage(e, 0, 0, n.width, n.height),
          { canvas: r, ctx: i }.ctx.getImageData(0, 0, a.width, a.height));
      o.width || (o.width = a.width), o.height || (o.height = a.height), s(o);
    }, n);
  }
  function y(i, a) {
    return new Promise(function (t, e) {
      if (
        (r = i) &&
        "number" == typeof r.width &&
        "number" == typeof r.height &&
        r.data &&
        "number" == typeof r.data.length &&
        "object" == typeof r.data
      ) {
        var n = new u(i.width, i.height);
        n.getContext("2d").putImageData(i, 0, 0),
          t(n.toDataURL("image/jpeg", a / 100));
      } else e(new Error("object is not valid imageData"));
      var r;
    });
  }
  var c = Object.getOwnPropertySymbols,
    h = Object.prototype.hasOwnProperty,
    l = Object.prototype.propertyIsEnumerable;
  var e,
    b = (function () {
      try {
        if (!Object.assign) return;
        var t = new String("abc");
        if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0])) return;
        for (var e = {}, n = 0; n < 10; n++)
          e["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(e)
            .map(function (t) {
              return e[t];
            })
            .join("")
        )
          return;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (t) {
            r[t] = t;
          }),
          "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, r)).join("")
            ? void 0
            : 1
        );
      } catch (t) {
        return;
      }
    })()
      ? Object.assign
      : function (t, e) {
          for (
            var n,
              r,
              i = arguments,
              a = (function (t) {
                if (null == t)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(t);
              })(t),
              o = 1;
            o < arguments.length;
            o++
          ) {
            for (var s in (n = Object(i[o]))) h.call(n, s) && (a[s] = n[s]);
            if (c) {
              r = c(n);
              for (var u = 0; u < r.length; u++)
                l.call(n, r[u]) && (a[r[u]] = n[r[u]]);
            }
          }
          return a;
        },
    rt =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  function it() {
    throw new Error(
      "Dynamic requires are not currently supported by rollup-plugin-commonjs"
    );
  }
  return (
    ((function (t) {
      t.exports = (function () {
        function r(t) {
          var e = typeof t;
          return t !== null && (e === "object" || e === "function");
        }
        function u(t) {
          return typeof t === "function";
        }
        var t = void 0;
        if (Array.isArray) {
          t = Array.isArray;
        } else {
          t = function (t) {
            return Object.prototype.toString.call(t) === "[object Array]";
          };
        }
        var n = t,
          i = 0,
          e = void 0,
          a = void 0,
          o = function t(e, n) {
            w[i] = e;
            w[i + 1] = n;
            i += 2;
            if (i === 2) {
              if (a) {
                a(_);
              } else {
                E();
              }
            }
          };
        function s(t) {
          a = t;
        }
        function f(t) {
          o = t;
        }
        var c = typeof window !== "undefined" ? window : undefined,
          h = c || {},
          l = h.MutationObserver || h.WebKitMutationObserver,
          d =
            typeof self === "undefined" &&
            typeof process !== "undefined" &&
            {}.toString.call(process) === "[object process]",
          p =
            typeof Uint8ClampedArray !== "undefined" &&
            typeof importScripts !== "undefined" &&
            typeof MessageChannel !== "undefined";
        function g() {
          return function () {
            return process.nextTick(_);
          };
        }
        function v() {
          if (typeof e !== "undefined") {
            return function () {
              e(_);
            };
          }
          return b();
        }
        function m() {
          var t = 0;
          var e = new l(_);
          var n = document.createTextNode("");
          e.observe(n, { characterData: true });
          return function () {
            n.data = t = ++t % 2;
          };
        }
        function y() {
          var t = new MessageChannel();
          t.port1.onmessage = _;
          return function () {
            return t.port2.postMessage(0);
          };
        }
        function b() {
          var t = setTimeout;
          return function () {
            return t(_, 1);
          };
        }
        var w = new Array(1e3);
        function _() {
          for (var t = 0; t < i; t += 2) {
            var e = w[t];
            var n = w[t + 1];
            e(n);
            w[t] = undefined;
            w[t + 1] = undefined;
          }
          i = 0;
        }
        function j() {
          try {
            var t = Function("return this")().require("vertx");
            e = t.runOnLoop || t.runOnContext;
            return v();
          } catch (t) {
            return b();
          }
        }
        var E = void 0;
        if (d) {
          E = g();
        } else if (l) {
          E = m();
        } else if (p) {
          E = y();
        } else if (c === undefined && typeof it === "function") {
          E = j();
        } else {
          E = b();
        }
        function M(t, e) {
          var n = this;
          var r = new this.constructor(A);
          if (r[O] === undefined) {
            K(r);
          }
          var i = n._state;
          if (i) {
            var a = arguments[i - 1];
            o(function () {
              return $(i, r, a, n._result);
            });
          } else {
            W(n, r, t, e);
          }
          return r;
        }
        function D(t) {
          var e = this;
          if (t && typeof t === "object" && t.constructor === e) {
            return t;
          }
          var n = new e(A);
          U(n, t);
          return n;
        }
        var O = Math.random().toString(36).substring(2);
        function A() {}
        var P = void 0,
          I = 1,
          T = 2;
        function x() {
          return new TypeError("You cannot resolve a promise with itself");
        }
        function L() {
          return new TypeError(
            "A promises callback cannot return that same promise."
          );
        }
        function S(t, e, n, r) {
          try {
            t.call(e, n, r);
          } catch (t) {
            return t;
          }
        }
        function C(t, r, i) {
          o(function (e) {
            var n = false;
            var t = S(
              i,
              r,
              function (t) {
                if (n) {
                  return;
                }
                n = true;
                if (r !== t) {
                  U(e, t);
                } else {
                  H(e, t);
                }
              },
              function (t) {
                if (n) {
                  return;
                }
                n = true;
                N(e, t);
              },
              "Settle: " + (e._label || " unknown promise")
            );
            if (!n && t) {
              n = true;
              N(e, t);
            }
          }, t);
        }
        function B(e, t) {
          if (t._state === I) {
            H(e, t._result);
          } else if (t._state === T) {
            N(e, t._result);
          } else {
            W(
              t,
              undefined,
              function (t) {
                return U(e, t);
              },
              function (t) {
                return N(e, t);
              }
            );
          }
        }
        function k(t, e, n) {
          if (
            e.constructor === t.constructor &&
            n === M &&
            e.constructor.resolve === D
          ) {
            B(t, e);
          } else {
            if (n === undefined) {
              H(t, e);
            } else if (u(n)) {
              C(t, e, n);
            } else {
              H(t, e);
            }
          }
        }
        function U(e, t) {
          if (e === t) {
            N(e, x());
          } else if (r(t)) {
            var n = void 0;
            try {
              n = t.then;
            } catch (t) {
              N(e, t);
              return;
            }
            k(e, t, n);
          } else {
            H(e, t);
          }
        }
        function R(t) {
          if (t._onerror) {
            t._onerror(t._result);
          }
          q(t);
        }
        function H(t, e) {
          if (t._state !== P) {
            return;
          }
          t._result = e;
          t._state = I;
          if (t._subscribers.length !== 0) {
            o(q, t);
          }
        }
        function N(t, e) {
          if (t._state !== P) {
            return;
          }
          t._state = T;
          t._result = e;
          o(R, t);
        }
        function W(t, e, n, r) {
          var i = t._subscribers;
          var a = i.length;
          t._onerror = null;
          i[a] = e;
          i[a + I] = n;
          i[a + T] = r;
          if (a === 0 && t._state) {
            o(q, t);
          }
        }
        function q(t) {
          var e = t._subscribers;
          var n = t._state;
          if (e.length === 0) {
            return;
          }
          var r = void 0,
            i = void 0,
            a = t._result;
          for (var o = 0; o < e.length; o += 3) {
            r = e[o];
            i = e[o + n];
            if (r) {
              $(n, r, i, a);
            } else {
              i(a);
            }
          }
          t._subscribers.length = 0;
        }
        function $(t, e, n, r) {
          var i = u(n),
            a = void 0,
            o = void 0,
            s = true;
          if (i) {
            try {
              a = n(r);
            } catch (t) {
              s = false;
              o = t;
            }
            if (e === a) {
              N(e, L());
              return;
            }
          } else {
            a = r;
          }
          if (e._state !== P);
          else if (i && s) {
            U(e, a);
          } else if (s === false) {
            N(e, o);
          } else if (t === I) {
            H(e, a);
          } else if (t === T) {
            N(e, a);
          }
        }
        function F(n, t) {
          try {
            t(
              function t(e) {
                U(n, e);
              },
              function t(e) {
                N(n, e);
              }
            );
          } catch (t) {
            N(n, t);
          }
        }
        var Y = 0;
        function J() {
          return Y++;
        }
        function K(t) {
          t[O] = Y++;
          t._state = undefined;
          t._result = undefined;
          t._subscribers = [];
        }
        function z() {
          return new Error("Array Methods must be provided an Array");
        }
        var G = (function () {
          function t(t, e) {
            this._instanceConstructor = t;
            this.promise = new t(A);
            if (!this.promise[O]) {
              K(this.promise);
            }
            if (n(e)) {
              this.length = e.length;
              this._remaining = e.length;
              this._result = new Array(this.length);
              if (this.length === 0) {
                H(this.promise, this._result);
              } else {
                this.length = this.length || 0;
                this._enumerate(e);
                if (this._remaining === 0) {
                  H(this.promise, this._result);
                }
              }
            } else {
              N(this.promise, z());
            }
          }
          t.prototype._enumerate = function t(e) {
            for (var n = 0; this._state === P && n < e.length; n++) {
              this._eachEntry(e[n], n);
            }
          };
          t.prototype._eachEntry = function t(e, n) {
            var r = this._instanceConstructor;
            var i = r.resolve;
            if (i === D) {
              var a = void 0;
              var o = void 0;
              var s = false;
              try {
                a = e.then;
              } catch (t) {
                s = true;
                o = t;
              }
              if (a === M && e._state !== P) {
                this._settledAt(e._state, n, e._result);
              } else if (typeof a !== "function") {
                this._remaining--;
                this._result[n] = e;
              } else if (r === et) {
                var u = new r(A);
                if (s) {
                  N(u, o);
                } else {
                  k(u, e, a);
                }
                this._willSettleAt(u, n);
              } else {
                this._willSettleAt(
                  new r(function (t) {
                    return t(e);
                  }),
                  n
                );
              }
            } else {
              this._willSettleAt(i(e), n);
            }
          };
          t.prototype._settledAt = function t(e, n, r) {
            var i = this.promise;
            if (i._state === P) {
              this._remaining--;
              if (e === T) {
                N(i, r);
              } else {
                this._result[n] = r;
              }
            }
            if (this._remaining === 0) {
              H(i, this._result);
            }
          };
          t.prototype._willSettleAt = function t(e, n) {
            var r = this;
            W(
              e,
              undefined,
              function (t) {
                return r._settledAt(I, n, t);
              },
              function (t) {
                return r._settledAt(T, n, t);
              }
            );
          };
          return t;
        })();
        function Q(t) {
          return new G(this, t).promise;
        }
        function V(i) {
          var a = this;
          if (n(i))
            return new a(function (t, e) {
              for (var n = i.length, r = 0; r < n; r++)
                a.resolve(i[r]).then(t, e);
            });
          else
            return new a(function (t, e) {
              return e(new TypeError("You must pass an array to race."));
            });
        }
        function X(t) {
          var e = new this(A);
          return N(e, t), e;
        }
        function Z() {
          throw new TypeError(
            "You must pass a resolver function as the first argument to the promise constructor"
          );
        }
        function tt() {
          throw new TypeError(
            "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
          );
        }
        var et = (function () {
          function e(t) {
            this[O] = J();
            this._result = this._state = undefined;
            this._subscribers = [];
            if (A !== t) {
              typeof t !== "function" && Z();
              this instanceof e ? F(this, t) : tt();
            }
          }
          e.prototype.catch = function t(e) {
            return this.then(null, e);
          };
          e.prototype.finally = function t(e) {
            var n = this;
            var r = n.constructor;
            if (u(e)) {
              return n.then(
                function (t) {
                  return r.resolve(e()).then(function () {
                    return t;
                  });
                },
                function (t) {
                  return r.resolve(e()).then(function () {
                    throw t;
                  });
                }
              );
            }
            return n.then(e, e);
          };
          return e;
        })();
        function nt() {
          var t = void 0;
          if (void 0 !== rt) t = rt;
          else if ("undefined" != typeof self) t = self;
          else
            try {
              t = Function("return this")();
            } catch (t) {
              throw new Error(
                "polyfill failed because global object is unavailable in this environment"
              );
            }
          var e = t.Promise;
          if (e) {
            var n = null;
            try {
              n = Object.prototype.toString.call(e.resolve());
            } catch (t) {}
            if ("[object Promise]" === n && !e.cast) return;
          }
          t.Promise = et;
        }
        return (
          (et.prototype.then = M),
          (et.all = function (t) {
            return new G(this, t).promise;
          }),
          (et.race = function (i) {
            var a = this;
            return n(i)
              ? new a(function (t, e) {
                  for (var n = i.length, r = 0; r < n; r++)
                    a.resolve(i[r]).then(t, e);
                })
              : new a(function (t, e) {
                  return e(new TypeError("You must pass an array to race."));
                });
          }),
          (et.resolve = D),
          (et.reject = function (t) {
            var e = new this(A);
            return N(e, t), e;
          }),
          (et._setScheduler = function (t) {
            a = t;
          }),
          (et._setAsap = function (t) {
            o = t;
          }),
          (et._asap = o),
          (et.polyfill = function () {
            var t = void 0;
            if (void 0 !== rt) t = rt;
            else if ("undefined" != typeof self) t = self;
            else
              try {
                t = Function("return this")();
              } catch (t) {
                throw new Error(
                  "polyfill failed because global object is unavailable in this environment"
                );
              }
            var e = t.Promise;
            if (e) {
              var n = null;
              try {
                n = Object.prototype.toString.call(e.resolve());
              } catch (t) {}
              if ("[object Promise]" === n && !e.cast) return;
            }
            t.Promise = et;
          }),
          (et.Promise = et)
        );
      })();
    })((e = { exports: {} })),
    e.exports).polyfill(),
    function (r) {
      var a, o;
      r = p(r);
      var s = new Worker(
          URL.createObjectURL(
            new Blob(
              [
                'function isImageData(a){return a&&"number"==typeof a.width&&"number"==typeof a.height&&a.data&&"number"==typeof a.data.length&&"object"==typeof a.data}var base64Chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",base64Map$1=base64Chars.split(""),reversedBase64Map$1={};base64Map$1.forEach(function(a,e){reversedBase64Map$1[a]=e});var maps={base64Map:base64Map$1,reversedBase64Map:reversedBase64Map$1},reversedBase64Map=maps.reversedBase64Map;function base64ToByteArray(a){for(var e,s=[],t=a.replace("data:image/jpeg;base64,",""),r=0,i=t.length;r<i;r++){t[r];var p=reversedBase64Map[t[r]];switch(r%4){case 1:s.push(e<<2|p>>4);break;case 2:s.push((15&e)<<4|p>>2);break;case 3:s.push((3&e)<<6|p)}e=p}return s}function jpgHeaderLength(a){for(var e=417,s=0,t=a.length;s<t;s++)if(255===a[s]&&218===a[s+1]){e=s+2;break}return e}function glitchByteArray(a,e,s,t){for(var r=jpgHeaderLength(a),i=a.length-r-4,p=s/100,n=e/100,h=0;h<t;h++){var g=i/t*h|0,o=g+((i/t*(h+1)|0)-g)*n|0;i<o&&(o=i),a[~~(r+o)]=~~(256*p)}return a}var base64Map=maps.base64Map;function byteArrayToBase64(a){for(var e,s,t=["data:image/jpeg;base64,"],r=0,i=a.length;r<i;r++){var p=a[r];switch(e=r%3){case 0:t.push(base64Map[p>>2]);break;case 1:t.push(base64Map[(3&s)<<4|p>>4]);break;case 2:t.push(base64Map[(15&s)<<2|p>>6]),t.push(base64Map[63&p])}s=p}return 0===e?(t.push(base64Map[(3&s)<<4]),t.push("==")):1===e&&(t.push(base64Map[(15&s)<<2]),t.push("=")),t.join("")}function glitchImageData(a,e,s){if(isImageData(a))return byteArrayToBase64(glitchByteArray(base64ToByteArray(e),s.seed,s.amount,s.iterations));throw new Error("glitchImageData: imageData seems to be corrupt.")}function fail(a){self.postMessage({err:a.message||a})}function success(a){self.postMessage({base64URL:a})}onmessage=function(a){var e=a.data.imageData,s=a.data.params,t=a.data.base64URL;if(e&&t&&s)try{void 0===e.width&&"number"==typeof a.data.imageDataWidth&&(e.width=a.data.imageDataWidth),void 0===e.height&&"number"==typeof a.data.imageDataHeight&&(e.height=a.data.imageDataHeight),success(glitchImageData(e,t,s))}catch(a){fail(a)}else a.data.imageData?fail("Parameters are missing."):fail("ImageData is missing.");self.close()};',
              ],
              { type: "text/javascript" }
            )
          )
        ),
        e = {
          getParams: function () {
            return r;
          },
          getInput: t,
          getOutput: u,
        },
        n = {
          fromImageData: function (t) {
            return c(f, t);
          },
          fromImage: function (t) {
            return c(g, t);
          },
        },
        i = {
          toImage: function (t) {
            return h(v, t, !0);
          },
          toDataURL: function (t) {
            return h(f);
          },
          toImageData: function (t) {
            return h(m, t, !0);
          },
        };
      function t() {
        var t = b({}, e);
        return a || b(t, n), t;
      }
      function u() {
        var t = b({}, e);
        return o || b(t, i), t;
      }
      function f(t) {
        return t;
      }
      function c(n, r, i) {
        return (
          (a = function () {
            return new Promise(function (t, e) {
              if (i) n(r, t, e);
              else if (n === f) t(r);
              else
                try {
                  t(n(r, t, e));
                } catch (t) {
                  e(t);
                }
            });
          }),
          (l() ? d : u)()
        );
      }
      function h(r, i, a) {
        return (
          (o = function (n) {
            return new Promise(function (t, e) {
              a ? r(n, i, t, e) : r === f ? t(n) : r(n, i).then(t, e);
            });
          }),
          (l() ? d : t)()
        );
      }
      function l() {
        return a && o;
      }
      function d() {
        return new Promise(function (e, n) {
          a()
            .then(function (t) {
              return (
                (n = t),
                (o = r),
                new Promise(function (t, e) {
                  y(n, o.quality)
                    .then(function (t) {
                      return (
                        (r = n),
                        (i = t),
                        (a = o),
                        new Promise(function (e, n) {
                          s.addEventListener("message", function (t) {
                            t.data && t.data.base64URL
                              ? e(t.data.base64URL)
                              : t.data && t.data.err
                              ? n(t.data.err)
                              : n(t);
                          }),
                            s.postMessage({
                              params: a,
                              base64URL: i,
                              imageData: r,
                              imageDataWidth: r.width,
                              imageDataHeight: r.height,
                            });
                        })
                      );
                      var r, i, a;
                    }, e)
                    .then(t, e);
                })
              );
              var n, o;
            }, n)
            .then(function (t) {
              o(t).then(e, n);
            }, n);
        });
      }
      return t();
    }
  );
});
