/**
 * Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
 *
 * Copyright 2020 WebAR.rocks ( https://webar.rocks )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const JEELIZFACEFILTER = function () {
  console.log("jeelizfacefilter launched");
  window.JEELIZFACEFILTERGEN = function () {
    function Jb(a) {
      var c = null,
        d = null,
        f = null,
        m = 0,
        l = this;
      this.v = function (q) {
        this.Tf(q.zb);
        f.Ge({ yc: q.yc, Pd: q.Pd || !1, uc: q.uc });
      };
      this.ef = function (q) {
        return c[q];
      };
      this.Tf = function (q) {
        var k = null;
        m = q.length;
        c = q.map(function (n, r) {
          n = Object.assign({}, n, { index: r, parent: l, Fb: k, vf: r === m - 1 });
          return (k = r = 0 === r ? Kb.instance(n) : Lb.instance(n));
        });
        d = c[0];
        f = c[m - 1];
        c.forEach(function (n, r) {
          0 !== r && n.Jf();
        });
      };
      this.R = function (q) {
        q.g(0);
        var k = q;
        c.forEach(function (n) {
          k = n.R(k, !1);
        });
        return k;
      };
      this.df = function () {
        return d.cf();
      };
      this.Ua = function () {
        return f.gf();
      };
      this.rd = function () {
        return f.rd();
      };
      this.m = function () {
        c &&
          (c.forEach(function (q) {
            q.m();
          }),
          (f = d = c = null),
          (m = 0));
      };
      "undefined" !== typeof a && this.v(a);
    }
    function fb(a, c) {
      var d = c % 8;
      return (a[(c - d) / 8] >> (7 - d)) & 1;
    }
    function tb(a, c, d) {
      var f = 1,
        m = 0;
      for (d = c + d - 1; d >= c; --d) (m += f * fb(a, d)), (f *= 2);
      return m;
    }
    function ub(a) {
      a = a.data;
      a = "undefined" === typeof btoa ? Buffer.from(a, "base64").toString("latin1") : atob(a);
      for (var c = a.length, d = new Uint8Array(c), f = 0; f < c; ++f) d[f] = a.charCodeAt(f);
      return d;
    }
    function gb(a) {
      return "string" === typeof a ? JSON.parse(a) : a;
    }
    function Mb(a) {
      if ("undefined" === typeof gb(a).nb) {
        var c = gb(a);
        a = c.ne;
        var d = c.nf,
          f = c.n;
        c = ub(c);
        for (var m = new Float32Array(f), l = new Float32Array(d), q = a + d + 1, k = 0; k < f; ++k) {
          var n = q * k,
            r = 0 === fb(c, n) ? 1 : -1,
            y = tb(c, n + 1, a);
          n = n + 1 + a;
          for (var D = l.length, z = 0, I = n; I < n + D; ++I) (l[z] = fb(c, I, !0)), ++z;
          for (D = n = 0; D < d; ++D) n += l[D] * Math.pow(2, -D - 1);
          m[k] = 0 === n && 0 === y ? 0 : r * (1 + n) * Math.pow(2, 1 + y - Math.pow(2, a - 1));
        }
        a = m;
      } else if (((f = gb(a)), (a = f.nb), 0 === a)) a = new Uint8Array(f.nb);
      else {
        d = f.n;
        f = ub(f);
        c = new Uint32Array(d);
        for (m = 0; m < d; ++m) c[m] = tb(f, m * a, a);
        a = c;
      }
      return a;
    }
    function Za() {
      return -1 !== [ia.ready, ia.play, ia.pause].indexOf(na);
    }
    function hb() {
      if (na === ia.play) return !1;
      na = ia.play;
      Na.stop();
      vb(0);
    }
    function wb() {
      if (na !== ia.play) return !1;
      qa.stop();
      Na.stop();
      na = ia.pause;
      return !0;
    }
    function Fa(a, c, d, f, m) {
      a = 4 * (3 * c + a) + d;
      return f + (U.buffer[a] / 255 + U.buffer[a + 12] / 65025) * (m - f);
    }
    function ib() {
      b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
      Ha.lf();
    }
    function Nb() {
      var a = da.ra();
      va.N();
      b.viewport(0, 0, 3, 2 * a);
      H.set("s58");
      U.xa.g(0);
      P.l(!1, !1);
      return ba.enableAsyncReadPixels ? Z.Hb(0, 0, 3, 2 * a, U.buffer, xb, 1) : Z.Wd(0, 0, 3, 2 * a, U.buffer);
    }
    function vb() {
      na !== ia.pause &&
        (ba.isCleanGLStateAtEachIteration &&
          (H.fd(), P.reset(), P.za(), b.disable(b.DEPTH_TEST), b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1), H.Ha()),
        qa.Ac(Ob, Nb, Pb, xb, Qb, ba.animateProcessOrder));
    }
    function Ob() {
      va.da();
      if (!L.vb)
        if (L.ub)
          L.element.needsUpdate &&
            (L.J.ce(L.element.videoWidth, L.element.videoHeight),
            L.J.Nb(L.element.arrayBuffer),
            (L.element.needsUpdate = !1));
        else {
          var a = L.element.currentTime,
            c = a - L.Gb;
          0 > c && ((L.Gb = a), (c = 0));
          1e3 * c < ea.lg || ((L.Gb += c), L.J.refresh());
        }
      a = qa.ff();
      da.update(a, Ba);
      for (c = 0; c < a; ++c) {
        da.Lb(c);
        H.set("s60");
        var d = Ba[da.sd()];
        H.F("u43", 1 + Oa.Bc * (Math.cos(d.ry) - 1));
        R.Aa && H.F("u42", d.rz);
        da.ie("u41");
        aa.Va.S();
        L.J.g(0);
        U.xa.g(1);
        P.l(!1, !1);
        Pa.R(aa.Va);
      }
      qa.Lb();
    }
    function xb() {
      va.ig();
      ba.isCleanGLStateAtEachIteration && (va.reset(), X.reset(), b.enable(b.DEPTH_TEST));
      R.Qb && R.Qb(da.Hd() ? Ba : Ba[0]);
      ba.isCleanGLStateAtEachIteration && (b.disable(b.BLEND), P.reset(), P.za());
    }
    function Pb() {
      for (var a = 0; a < da.ra(); ++a)
        if (da.zf(a)) {
          var c = a,
            d = Sa[c],
            f = [c],
            m = Ba[c],
            l = jb[c],
            q = 2 * c;
          d.hb = Fa(1, q, 3, 0, 1);
          m.detected = wa.Z(m.detected, d.hb, ea.pe);
          d.x = Fa(0, q, 1, -1, 1);
          d.y = Fa(0, q, 2, -1, 1);
          d.aa = Fa(0, q, 3, 0, 1);
          if (d.hb < ba.multiDetectionThresholdFactors[0] * ba.threshold)
            (d.ua = Math.floor(d.ua / 2)), R.Aa && ((m.rz = 0), (m.ry = 0));
          else {
            var k = U.Ya;
            d.rx = Fa(1, q, 0, -k[0], k[0]);
            d.ry = Fa(1, q, 1, -k[1], k[1]);
            d.wa = Fa(1, q, 2, -k[2], k[2]);
            for (k = 0; k < U.$; ++k) d.nd[k] = U.Ta[k](Fa(2, q, k, 0, 1));
            q = d.aa * U.Zd;
            f.dx = d.x - m.xRaw;
            f.dy = d.y - m.yRaw;
            f.Zb = q - m.sRaw;
            f.Wb = d.rx - m.rx;
            f.Xb = d.ry - m.ry;
            f.Yb = R.Aa ? d.wa : d.wa - m.rz;
            k = qa.Xe();
            f =
              (1 -
                $a.Bb(
                  ra.translationFactorRange[0],
                  ra.translationFactorRange[1],
                  Math.sqrt(f.dx * f.dx + f.dy * f.dy + f.Zb * f.Zb) / k
                )) *
              (1 -
                $a.Bb(
                  ra.rotationFactorRange[0],
                  ra.rotationFactorRange[1],
                  Math.sqrt(f.Wb * f.Wb + f.Xb * f.Xb + f.Yb * f.Yb) / k
                )) *
              $a.Bb(ra.qualityFactorRange[0], ra.qualityFactorRange[1], d.hb);
            c = l[++kb[c] % l.length] = f;
            for (k = 0; k < l.length; ++k) c = Math.min(c, l[k]);
            c = Math.max(0.5, c);
            f = Math.min(c, f);
            l = wa.Z(ra.alphaRange[1], ra.alphaRange[0], Math.pow(f, ea.re));
            m.xRaw = wa.Z(m.xRaw, d.x, l);
            m.yRaw = wa.Z(m.yRaw, d.y, l);
            m.sRaw = wa.Z(m.sRaw, q, l);
            m.rx = wa.Z(m.rx, d.rx, l);
            m.ry = wa.Z(m.ry, d.ry, l);
            m.rz = R.Aa ? m.rz + ra.followZRotAlphaFactor * l * d.wa : wa.Z(m.rz, d.wa, l);
            c = m.sRaw * Oa.Vb * Math.sin(m.ry);
            q = (Math.sin(m.rz) * c) / Qa;
            m.x = m.xRaw + Math.cos(m.rz) * c;
            m.y = m.yRaw + q;
            m.s = m.sRaw;
            l = Math.max(l, ea.qe);
            for (c = 0; c < U.$; ++c) m.expressions[c] = wa.Z(m.expressions[c], d.nd[c], l);
            ++d.ua;
          }
        }
    }
    function Qb() {
      na === ia.play && Na.Ac(vb);
    }
    function yb() {
      aa.Va = X.instance({ isPot: !0, isFloat: !1, width: Pa.df() });
      var a = {
        width: ea.fe,
        height: da.ra(),
        isFloat: !0,
        isPot: !1,
        array: da.Le(new Float32Array([0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
      };
      U.xa = Rb.instance(a);
    }
    function lb() {
      H.U("s60", [
        { type: "1i", name: "u1", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        { type: "2f", name: "u40", value: aa.D },
        { type: "1f", name: "u41", value: 0.5 },
        { type: "1f", name: "u42", value: 0 },
      ]);
      H.U("s61", [
        { type: "1i", name: "u44", value: 0 },
        { type: "1i", name: "u39", value: 1 },
        { type: "1f", name: "u47", value: ea.gg },
        { type: "1f", name: "u48", value: ba.threshold },
        { type: "3f", name: "u46", value: [U.M[0] * aa.D[0], U.M[1] * aa.D[1], U.M[2]] },
        { type: "1f", name: "u41", value: 0.5 },
        { type: "1f", name: "u49", value: 1 },
        { type: "1f", name: "u42", value: 0 },
      ]);
      var a = [{ type: "1i", name: "u44", value: 0 }];
      H.U("s62", a);
      H.U("s63", a);
      H.U("s58", [
        { type: "1i", name: "u39", value: 0 },
        { type: "1f", name: "u52", value: aa.D[0] },
        { type: "2f", name: "u51", value: [0, 0.5 / da.ra()] },
      ]);
    }
    function mb() {
      aa.D[0] = 1;
      aa.D[1] = aa.u / aa.K;
      Ta.v({
        Eb: ba.overlapFactors,
        Od: ba.nScaleLevels,
        u: aa.u,
        K: aa.K,
        Yd: ba.scale0Factor,
        M: U.M,
        Cc: ba.scanCenterFirst,
      });
    }
    function Sb(a) {
      if (R.Ka) zb("string" === typeof R.Ka ? JSON.parse(R.Ka) : R.Ka, a);
      else {
        var c = R.Sc;
        "JSON" !== c.toUpperCase().split(".").pop() && (c += ea.neuralNetworkPath);
        ab.get(c, function (d) {
          d = JSON.parse(d);
          zb(d, a);
        });
      }
    }
    function zb(a, c) {
      if (a.exportData) {
        var d = a.exportData;
        d.rotationEulerAnglesFactors && (U.Ya = d.rotationEulerAnglesFactors);
        if (d.translationScalingFactors) {
          var f = d.translationScalingFactors,
            m = ba.translationScalingFactors;
          U.M[0] = f[0] * m[0];
          U.M[1] = f[1] * m[1];
          U.M[2] = f[2] * m[2];
        }
        "undefined" !== typeof d.nExpressions && (U.$ = d.nExpressions);
        U.Zd = d.dsMean ? 1 + d.dsMean : 1;
        Oa.Bc = 0.4;
        Oa.Vb = 0.7;
        "undefined" !== typeof d.fgScaleXFactor && (Oa.Bc = d.fgScaleXFactor);
        "undefined" !== typeof d.fgDisplaceXFactor && (Oa.Vb = d.fgDisplaceXFactor);
      }
      U.$ || (U.$ = ea.Nd);
      if (!U.Ta) for (U.Ta = [], d = 0; d < U.$; ++d) U.Ta.push(ea.Qe);
      c(a);
    }
    function Tb() {
      if (
        Ha.v({
          gb: R.fa,
          width: aa.u,
          height: aa.K,
          debug: !1,
          tc: function () {
            Ia("GLCONTEXT_LOST");
          },
          antialias: R.antialias,
          premultipliedAlpha: !0,
        })
      )
        return !0;
      Ia("GL_INCOMPATIBLE");
      return !1;
    }
    function Ub() {
      var a = da.sd(),
        c = Ba[a];
      U.xa.Rf(1);
      b.viewport(0, a, 1, 1);
      H.set("s61");
      R.Aa && H.F("u42", c.rz);
      da.ie("u41");
      var d = 1,
        f = da.bg(Sa, Ba, aa.u / aa.K);
      da.Hd() && (f && ((d = 0), (Sa[a].ua = 0), (c.isDetected = !1), (c.detected = 0)), H.F("u49", d));
      H.Yf("u45", Ta.get(a));
      P.l(!1, !1);
      if (da.Gd() || f) b.viewport(1, a, 1, 1), H.set("s62"), H.F("u49", d), P.l(!1, !1);
      da.Gd() && (b.viewport(2, a, 1, 1), H.set("s63"), P.l(!1, !1));
      U.xa.sync();
    }
    function Ab() {
      L.J && L.J.remove();
      L.ub = L.element.isFakeVideo ? !0 : !1;
      if (L.ub) {
        var a = Bb();
        a = { isFlipY: !1, array: L.element.arrayBuffer, width: a.w, height: a.Ca, isKeepArray: !0 };
      } else a = { G: L.element };
      L.Hc = X.instance(Object.assign({ isPot: !1, isLinear: !0, isFloat: !1 }, a));
      L.J = L.Hc;
    }
    function Ja() {
      var a = [{ type: "mat2", name: "u38", value: L.A }];
      H.U("s59", [{ type: "1i", name: "u1", value: 0 }].concat(a));
      H.U("s60", a);
    }
    function Ka() {
      var a = [0.5, 0.5],
        c = L.D[1] / L.D[0];
      Qa = Ha.V() / Ha.I();
      90 === Math.abs(pa.rotate) && (c = 1 / c);
      c > Qa ? (a[1] *= Qa / c) : (a[0] *= c / Qa);
      H.U("s61", [{ name: "u50", type: "1f", value: Qa }]);
      L.A[0] = 0;
      L.A[1] = 0;
      L.A[2] = 0;
      L.A[3] = 0;
      switch (pa.rotate) {
        case 0:
          L.A[0] = a[0];
          L.A[3] = a[1];
          break;
        case 180:
          L.A[0] = -a[0];
          L.A[3] = -a[1];
          break;
        case 90:
          L.A[1] = a[0];
          L.A[2] = -a[1];
          break;
        case -90:
          (L.A[1] = -a[0]), (L.A[2] = a[1]);
      }
      pa.flipX && ((L.A[0] *= -1), (L.A[2] *= -1));
      L.vb || ((L.A[1] *= -1), (L.A[3] *= -1));
    }
    function Bb() {
      var a = { w: L.element.videoWidth || L.element.width, Ca: L.element.videoHeight || L.element.height };
      if (!a.w || !a.Ca || 4 > a.w || 4 > a.Ca)
        throw Error("INVALID VIDEO DIMENSIONS - width = " + a.w + " height = " + a.Ca);
      return a;
    }
    function nb() {
      var a = Bb(),
        c = L.D[0] !== a.w || L.D[1] !== a.Ca;
      c && ((L.D[0] = a.w), (L.D[1] = a.Ca));
      return c;
    }
    function bb(a, c) {
      if (na === ia.error) return !1;
      L.element = a;
      nb();
      c && c();
      return !0;
    }
    function Cb(a, c, d) {
      a && a();
      L.Pa = {
        video: {
          facingMode: { exact: pa.facingMode },
          width: { min: pa.minWidth, max: pa.maxWidth, ideal: pa.idealWidth },
          height: { min: pa.minHeight, max: pa.maxHeight, ideal: pa.idealHeight },
        },
        audio: !1,
      };
      V.Uc(L.Pa, pa.deviceId);
      V.get(
        L.element ? L.element : V.vd(),
        function (f) {
          c && c(f);
          d(f);
        },
        function () {
          Ia("WEBCAM_UNAVAILABLE");
        },
        L.Pa
      );
    }
    function Ia(a) {
      na !== ia.error && ((na = ia.error), R.Oa && R.Oa(a));
    }
    var wa = {
        nh: function (a) {
          return Math.ceil(Math.log2(a));
        },
        Jh: function (a) {
          return Math.log2(a);
        },
        Fh: function (a) {
          return 0 === Math.log2(a) % 1;
        },
        wg: function (a) {
          var c = [0, 0, 0, 0];
          a.forEach(function (d) {
            c[0] += d[0];
            c[1] += d[1];
            c[2] += d[2];
            c[3] += d[3];
          });
          return c;
        },
        xg: function (a, c, d) {
          return Math.min(Math.max(a, c), d);
        },
        Ag: function (a) {
          return (a * Math.PI) / 180;
        },
        Qh: function (a, c) {
          c = Math.pow(10, c);
          return Math.round(a * c) / c;
        },
        Rh: function (a) {
          return Math.round(1e6 * a) / 1e6;
        },
        oh: function (a, c) {
          return ((100 * a) / c).toFixed(3);
        },
        Z: function (a, c, d) {
          return a * (1 - d) + c * d;
        },
        Kh: function (a, c) {
          return a[0] * (1 - c) + a[1] * c;
        },
        Ke: function (a, c) {
          return wa.Ce(a - c);
        },
        Ce: function (a) {
          for (; a > Math.PI; ) a -= 2 * Math.PI;
          for (; a <= -Math.PI; ) a += 2 * Math.PI;
          return a;
        },
        Fg: function (a, c) {
          return Math.abs(wa.Ke(a, c));
        },
        mg: function (a, c) {
          return Math.atan2(Math.sin(a) + Math.sin(c), Math.cos(a) + Math.cos(c));
        },
      },
      ab = {
        get: function (a, c, d) {
          var f = new XMLHttpRequest();
          f.open("GET", a, !0);
          f.withCredentials = !1;
          f.onreadystatechange = function () {
            4 === f.readyState &&
              (200 === f.status || 0 === f.status ? c(f.responseText) : "undefined" !== typeof d && d(f.status));
          };
          f.send();
        },
        hf: function (a) {
          return new Promise(function (c, d) {
            ab.get(a, c, d);
          });
        },
        kh: function (a, c, d) {
          a += d ? "?" + ab.Oe(d) : "";
          ab.get(a, function (f) {
            c(JSON.parse(f));
          });
        },
        Mh: function (a, c, d) {
          var f = new XMLHttpRequest();
          f.open("POST", a, !0);
          f.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          f.onreadystatechange = function () {
            4 !== f.readyState || (200 !== f.status && 0 !== f.status) || d(f.responseText);
          };
          f.send(c);
        },
        Oe: function (a) {
          return "string" === typeof a
            ? a
            : Object.keys(a)
                .map(function (c) {
                  return encodeURIComponent(c) + "=" + encodeURIComponent(a[c]);
                })
                .join("&");
        },
        Yg: function (a, c) {
          var d = new XMLHttpRequest();
          d.open("POST", a, !0);
          d.responseType = "arraybuffer";
          d.onload = function () {
            c(d.response);
          };
          d.send();
        },
      },
      Vb = {
        create: function (a, c) {
          for (var d = Array(c), f = 0; f < c; ++f) d[f] = a;
          return d;
        },
        Bg: function (a, c) {
          for (var d = 0; d < a.length; ++d) c[d] = a[d];
        },
        clone: function (a) {
          for (var c = Array(a.length), d = 0; d < a.length; ++d) c[d] = a[d];
          return c;
        },
        Uh: function (a, c, d) {
          a.forEach(function (f, m) {
            c[m] = f * d;
          });
        },
        bi: function (a) {
          for (var c = a.length - 1; 0 < c; --c) {
            var d = Math.floor(Math.random() * (c + 1)),
              f = a[c];
            a[c] = a[d];
            a[d] = f;
          }
        },
        di: function (a) {
          return a.sort(function (c, d) {
            return c - d;
          });
        },
        fg: function (a) {
          return Array.isArray(a) || a.constructor === Float32Array || a.constructor === Uint8Array;
        },
      },
      ob = {
        Tb: function (a, c) {
          if (0 === c || "object" !== typeof a) return a;
          a = Object.assign({}, a);
          c = void 0 === c || -1 === c ? -1 : c - 1;
          for (var d in a) a[d] = ob.Tb(a[d], c);
          return a;
        },
        Eg: function (a) {
          return JSON.parse(JSON.stringify(a));
        },
      },
      $a = {
        ci: function (a, c, d) {
          a = Math.min(Math.max((d - a) / (c - a), 0), 1);
          return a * a * (3 - 2 * a);
        },
        Bb: function (a, c, d) {
          return Math.min(Math.max((d - a) / (c - a), 0), 1);
        },
        Qg: function (a, c, d, f) {
          return Math.pow(Math.min(Math.max((f - a) / (c - a), 0), 1), d);
        },
        ii: function () {
          return 0;
        },
        Lh: function () {
          return 1;
        },
        Ih: function (a) {
          return a;
        },
        Ng: function (a) {
          return a * a;
        },
        Sg: function (a) {
          return a * (2 - a);
        },
        Kg: function (a) {
          return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a;
        },
        Ig: function (a) {
          return a * a * a;
        },
        Rg: function (a) {
          return --a * a * a + 1;
        },
        Jg: function (a) {
          return 0.5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
        },
        Og: function (a) {
          return a * a * a * a;
        },
        Tg: function (a) {
          return 1 - --a * a * a * a;
        },
        Lg: function (a) {
          return 0.5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a;
        },
        Pg: function (a) {
          return a * a * a * a * a;
        },
        Ug: function (a) {
          return 1 + --a * a * a * a * a;
        },
        Mg: function (a) {
          return 0.5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a;
        },
      },
      Wb = {
        Te: function (a, c, d) {
          switch (a) {
            case "relu":
              return d + "=max(vec4(0.,0.,0.,0.)," + c + ");";
            case "elu":
              return d + "=mix(exp(-abs(" + c + "))-vec4(1.,1.,1.,1.)," + c + ",step(0.," + c + "));";
            case "elu01":
              return d + "=mix(0.1*exp(-abs(" + c + "))-vec4(0.1,0.1,0.1,0.1)," + c + ",step(0.," + c + "));";
            case "arctan":
              return d + "=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
            case "copy":
              return "";
            default:
              return !1;
          }
        },
      },
      H = (function () {
        function a(t, p, h) {
          p = t.createShader(p);
          t.shaderSource(p, h);
          t.compileShader(p);
          return t.getShaderParameter(p, t.COMPILE_STATUS) ? p : null;
        }
        function c(t, p, h) {
          p = a(t, t.VERTEX_SHADER, p);
          h = a(t, t.FRAGMENT_SHADER, h);
          t === b && k.push(p, h);
          var J = t.createProgram();
          t.attachShader(J, p);
          t.attachShader(J, h);
          t.linkProgram(J);
          return J;
        }
        function d(t) {
          return ["float", "sampler2D", "int"]
            .map(function (p) {
              return "precision " + t + " " + p + ";\n";
            })
            .join("");
        }
        function f(t, p) {
          p.C = p.C ? !0 : !1;
          if (!p.C) {
            p.ya =
              p.ya ||
              "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5);}";
            p.eb = p.eb || ["a0"];
            p.Ma = p.Ma || [2];
            p.precision = p.precision || z;
            p.id = y++;
            void 0 !== p.ae &&
              (p.ae.forEach(function (N, O) {
                p.h = p.h.replace(N, p.Ib[O]);
              }),
              p.ae.splice(0));
            p.Oc = 0;
            p.Ma.forEach(function (N) {
              p.Oc += 4 * N;
            });
            var h = d(p.precision);
            p.va = c(t, h + p.ya, h + p.h);
            p.B = {};
            p.i.forEach(function (N) {
              p.B[N] = t.getUniformLocation(p.va, N);
            });
            p.attributes = {};
            p.Na = [];
            p.eb.forEach(function (N) {
              var O = t.getAttribLocation(p.va, N);
              p.attributes[N] = O;
              p.Na.push(O);
            });
            if (p.j) {
              t.useProgram(p.va);
              r = p;
              n = p.id;
              for (var J in p.j) t.uniform1i(p.B[J], p.j[J]);
            }
            p.ta = !0;
          }
        }
        function m(t) {
          xa.Wf(w);
          n !== t.id &&
            (w.O(),
            (n = t.id),
            (r = t),
            b.useProgram(t.va),
            t.Na.forEach(function (p) {
              0 !== p && b.enableVertexAttribArray(p);
            }));
        }
        function l(t, p, h) {
          f(t, p, h);
          t.useProgram(p.va);
          t.enableVertexAttribArray(p.attributes.a0);
          n = -1;
          return (r = p);
        }
        function q() {
          return {
            h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
            i: ["u1"],
            j: { u1: 0 },
          };
        }
        var k = [],
          n = -1,
          r = null,
          y = 0,
          D = !1,
          z = "highp",
          I = ["u1"],
          x = ["u0"],
          G = { u1: 0 },
          e = { u0: 0 },
          A = { u1: 0, u2: 1 },
          B = { u1: 0, u3: 1 },
          g = ["u1", "u3", "u4"],
          F = { u5: 0 },
          u = {
            s0: q(),
            s1: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
              i: I,
              j: G,
              precision: "lowp",
            },
            s2: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
              i: ["u1", "u2"],
              j: A,
            },
            s3: {
              h: "uniform sampler2D u1;uniform vec2 u6,u7;varying vec2 vv0;void main(){vec2 a=vv0*u6+u7;gl_FragColor=texture2D(u1,a);}",
              i: ["u1", "u6", "u7"],
              j: G,
              C: !0,
            },
            s4: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
              i: I,
              j: G,
            },
            s5: {
              h: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
              i: ["u1", "u2"],
              j: A,
            },
            s6: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
              i: I,
              j: G,
            },
            s7: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
              i: I,
              j: G,
            },
            s8: {
              h: "uniform sampler2D u0;uniform float u6;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u6;}",
              i: ["u0", "u6"],
              j: e,
            },
            s9: {
              h: "uniform sampler2D u0;uniform float u6;varying vec2 vv0;const vec4 f=vec4(.25,.25,.25,.25),g=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u6,f);gl_FragColor=b*g;}",
              i: ["u0", "u6"],
              j: e,
            },
            s10: {
              h: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
              i: I,
              j: G,
            },
            s11: {
              h: "uniform sampler2D u1,u8;uniform float u9;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u8,vv0);gl_FragColor=mix(b,a,u9*f);}",
              i: ["u1", "u8", "u9"],
              j: { u1: 0, u8: 1 },
            },
            s12: {
              h: "uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u10)+texture2D(u1,vv0+u10*vec2(1.,-1.))+texture2D(u1,vv0+u10*vec2(-1.,-1.))+texture2D(u1,vv0+u10*vec2(-1.,1.)));}",
              i: ["u1", "u10"],
              j: G,
            },
            s13: {
              h: "uniform sampler2D u1;uniform vec4 u11;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u11);gl_FragColor=j(a);}",
              i: ["u1", "u11"],
              j: G,
            },
            s14: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
              i: x,
              j: e,
              C: !0,
            },
            s15: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
              i: x,
              j: e,
            },
            s16: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
              i: x,
              j: e,
            },
            s17: {
              h: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
              i: x,
              j: e,
            },
            s18: {
              h: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
              i: x,
              j: e,
            },
            s19: {
              h: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=2.*atan(e*texture2D(u0,vv0))/e;}",
              i: x,
              j: e,
              C: !0,
            },
            s20: {
              h: "uniform sampler2D u0,u12;uniform float u13;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u12,e);float b=u13*u13;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
              i: ["u0", "u12", "u13"],
              j: { u0: 0, u12: 1 },
              C: !0,
            },
            s21: {
              h: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){float a=u14.x*u14.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u14.y),f=floor(u14.x*fract(b*u14.y)),g=(f*u14.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
              i: ["u1", "u14"],
              j: G,
            },
            s22: {
              h: "uniform sampler2D u15,u16,u17;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u15,b),f=texture2D(u16,c);gl_FragColor=d*f;}",
              i: ["u15", "u16", "u17"],
              j: { u16: 0, u15: 1, u17: 2 },
              C: !0,
            },
            s23: {
              h: "uniform float u18,u19;uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec2 c=fract(vv0*u18),a=vv0;float b=u18*u19;a=(.5+floor(b*vv0))/b;vec4 d=texture2D(u15,a),f=texture2D(u16,c);gl_FragColor=d*f;}",
              i: ["u16", "u15", "u18", "u19"],
              j: { u16: 0, u15: 1 },
            },
            s24: {
              h: "uniform float u18,u19;uniform sampler2D u15,u16,u20,u21,u22,u23;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 c=fract(vv0*u18),d=vv0;float h=u18*u19;d=(.5+floor(h*vv0))/h;vec4 l=texture2D(u15,d),m=texture2D(u16,c),a=texture2D(u23,d);a=floor(.5+a*255.);vec4 n=texture2D(u20,c),o=texture2D(u21,c),p=texture2D(u22,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b,r=i*m+j*n+k*o+q*p;gl_FragColor=l*r;}",
              i: "u15 u16 u18 u19 u23 u20 u21 u22".split(" "),
              j: { u16: 0, u15: 1, u23: 3, u20: 4, u21: 5, u22: 6 },
              C: !0,
            },
            s25: {
              h: "uniform sampler2D u15,u16,u3;uniform float u18,u24,u25,u19;uniform vec2 u26;varying vec2 vv0;const vec2 f=vec2(1.),l=vec2(0.);void main(){vec2 c=floor(u24*vv0),d=u24*vv0-c;float g=u18/u24;vec2 h=floor(d*g),i=d*g-h,j=(c+i)/u24;float m=u24*u19/u18;vec2 b=m*h;b=floor(u26*b+.5*(u19-1.)*(f-u26));vec2 a=(b+i*u25)/u19;a+=.25/u19;vec2 k=step(a,f)*step(l,a);vec4 n=texture2D(u15,j),o=texture2D(u16,a),p=n*o,q=texture2D(u3,j);gl_FragColor=(p*u25*u25+q)*k.x*k.y;}",
              i: "u15 u16 u18 u24 u25 u19 u3 u26".split(" "),
              j: { u16: 0, u15: 1, u3: 2 },
            },
            s26: {
              h: "uniform sampler2D u15,u16;varying vec2 vv0;void main(){vec4 a=texture2D(u15,vv0),b=texture2D(u16,vv0);gl_FragColor=a*b;}",
              i: ["u15", "u16"],
              j: { u16: 0, u15: 1 },
              C: !0,
            },
            s27: {
              h: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0)+u4*texture2D(u1,vv0);}",
              i: g,
              j: B,
            },
            s28: {
              h: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
              i: g,
              j: B,
              C: !0,
            },
            s29: {
              h: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 h=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 b=floor(gl_FragCoord.xy);vec3 d=b.x*vec3(1.)+vec3(0.,1.,2.);float c=mod(b.y,2.);vec4 f=vec4(c,(1.-c)*step(mod(d,vec3(3.)),vec3(.5)));mat4 g=mat4(a.rgba,a.gbar,a.barg,a.argb);gl_FragColor=g*f;}",
              i: g,
              j: B,
              C: !0,
            },
            s30: {
              h: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
              i: I,
              j: G,
              precision: "lowp",
            },
            s31: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
              i: ["u1", "u27"],
              j: G,
              precision: "lowp",
            },
            s32: {
              h: "varying vec2 vv0;uniform sampler2D u1;uniform float u27;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u27)).rgb,c=texture2D(u1,vv0+vec2(u27,u27)).rgb,d=texture2D(u1,vv0+vec2(u27,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
              i: ["u1", "u27"],
              j: G,
              precision: "lowp",
            },
            s33: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u28,vv0.y-u28))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u28))*2.,b-=texture2D(u1,vec2(vv0.x+u28,vv0.y-u28))*1.,b+=texture2D(u1,vec2(vv0.x-u28,vv0.y+u28))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u28))*2.,b+=texture2D(u1,vec2(vv0.x+u28,vv0.y+u28))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
              i: ["u1", "u2", "u28"],
              j: A,
              C: !0,
            },
            s34: {
              h: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u28;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u28,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
              i: ["u1", "u2", "u28"],
              j: A,
              C: !0,
            },
            s35: {
              h: "uniform sampler2D u5;uniform vec2 u10;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u10*g;vec4 b=texture2D(u5,a),c=texture2D(u5,a+u10*h),d=texture2D(u5,a+u10*i),j=texture2D(u5,a+u10),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
              i: ["u5", "u10"],
              j: F,
            },
            s36: {
              h: "uniform sampler2D u5;uniform vec2 u10;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u5,a),c=texture2D(u5,a+u10*k),d=texture2D(u5,a+u10*l),g=texture2D(u5,a+u10),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u10*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u10*m),d=f(a+u10*2.),g=f(a+u10*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}",
              i: ["u5", "u10"],
              j: F,
              C: !0,
            },
            s37: {
              h: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
              i: ["u1"],
              j: G,
              precision: "lowp",
              C: !0,
            },
            s38: {
              h: "uniform sampler2D u1;uniform vec2 u10;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u10)+2002./e*texture2D(u1,vv0-2.*u10)+3003./e*texture2D(u1,vv0-u10)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u10)+2002./e*texture2D(u1,vv0+2.*u10)+1001./e*texture2D(u1,vv0+3.*u10);gl_FragColor=a;}",
              i: ["u10", "u1"],
              j: G,
              precision: "lowp",
              C: !0,
            },
            s39: {
              h: "uniform sampler2D u1,u12,u29;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u12,vv0),b=texture2D(u29,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
              i: ["u1", "u12", "u29"],
              j: { u1: 0, u12: 1, u29: 2 },
              C: !0,
            },
          },
          v = {
            s40: {
              h: "uniform float u18,u30;uniform sampler2D u15,u16,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u3,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u18,xyTo=floor(vv0*u18+eps2);float weightSize=toSparsity*u18;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u30*(xyPatch-halfFromSparsity))/u18,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: ["u18", "u15", "u16", "u3", "u30"],
              Ib: ["1.1111", "gl_FragColor\\*=2.2222;"],
            },
            s41: {
              h: "uniform float u18,u30,u19;uniform sampler2D u15,u16,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u3,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u19,xyTo=floor(vv0*u18+eps2);float weightSize=fromSparsity*u19;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u18;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u30*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u19,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u15,uvWeight)*texture2D(u16,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
              i: "u18 u19 u15 u16 u3 u30".split(" "),
              Ib: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"],
            },
          },
          C = null,
          M = null,
          w = {
            xb: function () {
              return D;
            },
            v: function () {
              if (!D) {
                C = ob.Tb(u, 2);
                M = ob.Tb(v, 2);
                z = "highp";
                b.getShaderPrecisionFormat &&
                  (b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT),
                  b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT));
                for (var t in C) f(b, C[t], t);
                H.set("s0");
                b.enableVertexAttribArray(0);
                D = !0;
              }
            },
            ab: function (t) {
              t.forEach(function (p) {
                w.Vc(p);
              });
            },
            Vc: function (t) {
              C[t.id] = t;
              f(b, t, t.id);
            },
            pf: function (t, p, h) {
              p || (p = t);
              C[p] = Object.create(M[t]);
              C[p].uf = !0;
              M[t].Ib &&
                M[t].Ib.forEach(function (J, N) {
                  C[p].h = C[p].h.replace(new RegExp(J, "g"), h[N]);
                });
              f(b, C[p], p);
            },
            set: function (t) {
              var p = C[t];
              p.C && ((p.C = !1), f(b, p, t));
              m(p);
            },
            Za: function (t) {
              return l(t, q(), "s42");
            },
            Fc: function (t) {
              return l(t, { h: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}", i: [], precision: z }, "s43");
            },
            Pe: function (t) {
              return "undefined" === typeof C[t] ? !1 : C[t].ta;
            },
            O: function () {
              -1 !== n &&
                ((n = -1),
                r.Na.forEach(function (t) {
                  0 !== t && b.disableVertexAttribArray(t);
                }));
            },
            Gc: function () {
              var t = 0;
              r.Na.forEach(function (p, h) {
                h = r.Ma[h];
                b.vertexAttribPointer(p, h, b.FLOAT, !1, r.Oc, t);
                t += 4 * h;
              });
            },
            fd: function () {
              b.enableVertexAttribArray(0);
            },
            Ha: function () {
              w.Jb(b);
            },
            Jb: function (t) {
              t.vertexAttribPointer(r.Na[0], 2, t.FLOAT, !1, 8, 0);
            },
            Xh: function (t, p) {
              b.uniform1i(r.B[t], p);
            },
            F: function (t, p) {
              b.uniform1f(r.B[t], p);
            },
            T: function (t, p, h) {
              b.uniform2f(r.B[t], p, h);
            },
            Xf: function (t, p) {
              b.uniform2fv(r.B[t], p);
            },
            Yf: function (t, p) {
              b.uniform3fv(r.B[t], p);
            },
            Yh: function (t, p, h, J) {
              b.uniform3f(r.B[t], p, h, J);
            },
            Zf: function (t, p, h, J, N) {
              b.uniform4f(r.B[t], p, h, J, N);
            },
            de: function (t, p) {
              b.uniform4fv(r.B[t], p);
            },
            Zh: function (t, p) {
              b.uniformMatrix2fv(r.B[t], !1, p);
            },
            $h: function (t, p) {
              b.uniformMatrix3fv(r.B[t], !1, p);
            },
            ai: function (t, p) {
              b.uniformMatrix4fv(r.B[t], !1, p);
            },
            U: function (t, p) {
              w.set(t);
              p.forEach(function (h) {
                switch (h.type) {
                  case "4f":
                    b.uniform4fv(r.B[h.name], h.value);
                    break;
                  case "3f":
                    b.uniform3fv(r.B[h.name], h.value);
                    break;
                  case "2f":
                    b.uniform2fv(r.B[h.name], h.value);
                    break;
                  case "1f":
                    b.uniform1f(r.B[h.name], h.value);
                    break;
                  case "1i":
                    b.uniform1i(r.B[h.name], h.value);
                    break;
                  case "mat2":
                    b.uniformMatrix2fv(r.B[h.name], !1, h.value);
                    break;
                  case "mat3":
                    b.uniformMatrix3fv(r.B[h.name], !1, h.value);
                    break;
                  case "mat4":
                    b.uniformMatrix4fv(r.B[h.name], !1, h.value);
                }
              });
            },
            mh: function () {
              return "lowp";
            },
            m: function () {
              w.O();
              b.disableVertexAttribArray(0);
              for (var t in C) {
                var p = C[t];
                p.ta && ((p.ta = !1), b.deleteProgram(p.va));
                p.uf && delete C[t];
              }
              k.forEach(function (h) {
                b.deleteShader(h);
              });
              k.splice(0);
              y = 0;
              D = !1;
              r = null;
              n = -1;
            },
          };
        return w;
      })(),
      b = null,
      Ha = (function () {
        function a(x) {
          console.log("ERROR in ContextFF: ", x);
          return !1;
        }
        function c() {
          return navigator.userAgent && -1 !== navigator.userAgent.indexOf("forceWebGL1");
        }
        function d(x, G, e) {
          x.setAttribute("width", G);
          x.setAttribute("height", e);
        }
        function f(x) {
          function G() {
            Ca.m();
            Z.reset();
            A.getExtension("WEBGL_lose_context").loseContext();
          }
          if (c()) return !1;
          var e = document.createElement("canvas");
          d(e, 5, 5);
          var A = null;
          try {
            A = e.getContext("webgl2", x);
          } catch (B) {
            return !1;
          }
          if (!A) return !1;
          m(A);
          Z.gd(A);
          x = Z.Ub(A);
          if (!x.ia && !x.ka) return G(), !1;
          x = Ca.Wc(A, x);
          G();
          return x ? !0 : !1;
        }
        function m(x) {
          x.clearColor(0, 0, 0, 0);
          x.disable(x.DEPTH_TEST);
          x.disable(x.BLEND);
          x.disable(x.DITHER);
          x.disable(x.STENCIL_TEST);
          x.disable(x.CULL_FACE);
          x.GENERATE_MIPMAP_HINT && x.FASTEST && x.hint(x.GENERATE_MIPMAP_HINT, x.FASTEST);
          x.disable(x.SAMPLE_ALPHA_TO_COVERAGE);
          x.disable(x.SAMPLE_COVERAGE);
          x.depthFunc(x.LEQUAL);
          x.clearDepth(1);
        }
        var l = null,
          q = null,
          k = null,
          n = null,
          r = !0,
          y = null,
          D = null,
          z = [],
          I = {
            I: function () {
              return l.width;
            },
            V: function () {
              return l.height;
            },
            dh: function () {
              return l;
            },
            ah: function () {
              return b;
            },
            la: function () {
              return r;
            },
            flush: function () {
              b.flush();
            },
            lf: function () {
              va.da();
              I.Pf();
            },
            Pf: function () {
              X.reset();
              P.reset();
              H.O();
              H.fd();
              b.disable(b.DEPTH_TEST);
              b.disable(b.BLEND);
              P.za();
              H.Ha();
            },
            We: function () {
              y || (y = new Uint8Array(l.width * l.height * 4));
              b.readPixels(0, 0, l.width, l.height, b.RGBA, b.UNSIGNED_BYTE, y);
              return y;
            },
            fh: function () {
              return l.toDataURL("image/jpeg");
            },
            gh: function () {
              va.N();
              q || ((q = document.createElement("canvas")), (k = q.getContext("2d")));
              d(q, l.width, l.height);
              for (
                var x = I.We(), G = k.createImageData(q.width, q.height), e = q.width, A = q.height, B = G.data, g = 0;
                g < A;
                ++g
              )
                for (var F = A - g - 1, u = 0; u < e; ++u) {
                  var v = 4 * (g * e + u),
                    C = 4 * (F * e + u);
                  B[v] = x[C];
                  B[v + 1] = x[C + 1];
                  B[v + 2] = x[C + 2];
                  B[v + 3] = x[C + 3];
                }
              k.putImageData(G, 0, 0);
              return q.toDataURL("image/png");
            },
            eh: function (x) {
              !q && x && ((q = document.createElement("canvas")), (k = q.getContext("2d")));
              var G = x ? q : document.createElement("canvas");
              d(G, l.width, l.height);
              (x ? k : G.getContext("2d")).drawImage(l, 0, 0);
              return G;
            },
            v: function (x) {
              x = Object.assign(
                {
                  ja: null,
                  tc: null,
                  gb: null,
                  bd: null,
                  width: 512,
                  height: 512,
                  premultipliedAlpha: !1,
                  sf: !0,
                  antialias: !1,
                  debug: !1,
                  Dg: !1,
                },
                x
              );
              x.ja
                ? ((b = x.ja), (l = x.ja.canvas))
                : x.bd && !x.gb
                ? (l = document.getElementById(x.bd))
                : x.gb && (l = x.gb);
              l || (l = document.createElement("canvas"));
              l.width = x.width;
              l.height = x.height;
              if (b) r = b instanceof WebGL2RenderingContext;
              else {
                r = !0;
                var G = {
                  antialias: x.antialias,
                  alpha: !0,
                  preserveDrawingBuffer: !0,
                  premultipliedAlpha: x.premultipliedAlpha,
                  stencil: !1,
                  depth: x.sf,
                  failIfMajorPerformanceCaveat: !0,
                  powerPreference: "high-performance",
                };
                navigator &&
                  navigator.userAgent &&
                  -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                  (G.antialias = !1);
                var e = f(G);
                e || !G.antialias || c() || ((G.antialias = !1), (e = f(G)));
                e && (b = l.getContext("webgl2", G));
                b
                  ? (r = !0)
                  : ((b = l.getContext("webgl", G)) || (b = l.getContext("experimental-webgl", G)), (r = !1));
              }
              if (!b) return a("WebGL1 and 2 are not enabled");
              x.tc &&
                l.addEventListener &&
                (n = b.getExtension("WEBGL_lose_context")) &&
                ((D = x.tc), l.addEventListener("webglcontextlost", D, !1));
              if (!Z.v()) return a("Not enough GL capabilities");
              m(b);
              H.v();
              P.v();
              Ca.Wc(b, Z.Ve());
              z.forEach(function (A) {
                A(b);
              });
              z.splice(0);
              return !0;
            },
            sg: function () {
              return new Promise(function (x) {
                b ? x(b) : z.push(x);
              });
            },
            m: function () {
              b && (Z.m(), H.m(), Ca.m());
              n && D && (l.removeEventListener("webglcontextlost", D, !1), (n = D = null));
              b = y = k = q = l = null;
              z.splice(0);
            },
          };
        return I;
      })(),
      xa = (function () {
        function a() {
          null === c && ("undefined" !== typeof H ? (c = H) : "undefined" !== typeof JEShaders && (c = JEShaders));
        }
        var c = null;
        return {
          reset: function () {
            c = null;
          },
          Wf: function (d) {
            c !== d && (c && c.O(), (c = d));
          },
          xb: function () {
            return c.xb();
          },
          Ha: function () {
            return c.Ha();
          },
          Jb: function (d) {
            return c.Jb(d);
          },
          Gc: function () {
            return c.Gc();
          },
          O: function () {
            return c.O();
          },
          set: function (d) {
            a();
            return c.set(d);
          },
          Za: function (d) {
            a();
            return c.Za(d);
          },
          Fc: function (d) {
            a();
            return c.Fc(d);
          },
        };
      })(),
      Aa = (function () {
        function a(h) {
          b.bindTexture(b.TEXTURE_2D, h);
        }
        function c(h) {
          M[0] = h;
          h = w[0];
          var J = (h >> 16) & 32768,
            N = (h >> 12) & 2047,
            O = (h >> 23) & 255;
          return 103 > O
            ? J
            : 142 < O
            ? J | 31744 | ((255 == O ? 0 : 1) && h & 8388607)
            : 113 > O
            ? ((N |= 2048), J | ((N >> (114 - O)) + ((N >> (113 - O)) & 1)))
            : (J = (J | ((O - 112) << 10) | (N >> 1)) + (N & 1));
        }
        function d(h) {
          var J = new Uint16Array(h.length);
          h.forEach(function (N, O) {
            J[O] = c(N);
          });
          return J;
        }
        function f() {
          if (null !== t.fc) return t.fc;
          var h = l(d([0.5, 0.5, 0.5, 0.5]), !0);
          return null === h ? !0 : (t.fc = h);
        }
        function m() {
          if (null !== t.hc) return t.hc;
          var h = l(new Uint8Array([127, 127, 127, 127]), !1);
          return null === h ? !0 : (t.hc = h);
        }
        function l(h, J) {
          if (!xa.xb() || !G) return null;
          var N = null,
            O = Math.sqrt(h.length / 4);
          try {
            var Y = b.getError();
            if ("FUCKING_BIG_ERROR" === Y) return !1;
            N = p.instance({ isFloat: !1, P: J, array: h, width: O });
            Y = b.getError();
            if (Y !== b.NO_ERROR) return !1;
          } catch (oa) {
            return !1;
          }
          la.N();
          b.viewport(0, 0, O, O);
          b.clearColor(0, 0, 0, 0);
          b.clear(b.COLOR_BUFFER_BIT);
          xa.set("s0");
          N.fb(0);
          ma.l(!0, !0);
          h = 4 * O * O;
          J = new Uint8Array(h);
          b.readPixels(0, 0, O, O, b.RGBA, b.UNSIGNED_BYTE, J);
          O = !0;
          for (Y = 0; Y < h; ++Y) O = O && 3 > Math.abs(J[Y] - 127);
          N.remove();
          la.da();
          return O;
        }
        var q = 0,
          k = null,
          n = 0,
          r = null,
          y = null,
          D = null,
          z = null,
          I = null,
          x = null,
          G = !1,
          e = [],
          A = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            G: null,
            ec: null,
            tf: !1,
            P: !1,
            qa: null,
            Db: 4,
            oc: 0,
          },
          B = !1,
          g = null,
          F = null,
          u = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
          ],
          v = !1,
          C = !1,
          M = new Float32Array(1),
          w = new Int32Array(M.buffer),
          t = { fc: null, hc: null },
          p = {
            v: function () {
              G ||
                ((I = [b.RGBA, null, b.RGBA, b.RGBA]),
                (x = [b.RGBA, null, b.RGBA, b.RGBA]),
                (k = [b.TEXTURE0, b.TEXTURE1, b.TEXTURE2, b.TEXTURE3, b.TEXTURE4, b.TEXTURE5, b.TEXTURE6, b.TEXTURE7]),
                (v = "undefined" !== typeof JEContext),
                (C = "undefined" !== typeof Z),
                v && JEContext.Gh() && k.push(b.TEXTURE8, b.TEXTURE9),
                (r = [-1, -1, -1, -1, -1, -1, -1, -1]),
                (z = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT]),
                (G = !0));
            },
            mf: function () {
              if (!y) {
                for (var h = new Float32Array(16384), J = 0; 16384 > J; ++J) h[J] = 2 * Math.random() - 1;
                y = {
                  random: p.instance({ isFloat: !0, isPot: !0, array: h, width: 64 }),
                  le: p.instance({ isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]) }),
                };
              }
              p.kg();
            },
            vh: function () {
              return y.le;
            },
            kg: function () {
              z[1] = Z.cc(b);
            },
            Uf: function () {
              x = I = [b.RGBA, b.RGBA, b.RGBA, b.RGBA];
            },
            Xd: function (h) {
              H.set("s1");
              la.N();
              var J = h.I(),
                N = h.V();
              b.viewport(0, 0, J, N);
              h.g(0);
              ma.l(!1, !1);
            },
            Oh: function (h, J) {
              p.Xd(h);
              b.readPixels(0, 0, h.I(), h.V(), b.RGBA, b.UNSIGNED_BYTE, J);
            },
            Ph: function (h, J) {
              p.Xd(h);
              return Z.Hb(0, 0, h.I(), h.V(), J);
            },
            pd: function (h, J, N, O, Y, oa, sa) {
              h.activeTexture(h.TEXTURE0);
              var Da = h.createTexture();
              h.bindTexture(h.TEXTURE_2D, Da);
              Y = Y instanceof Float32Array ? Y : new Float32Array(Y);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, h.CLAMP_TO_EDGE);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.NEAREST);
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, h.NEAREST);
              h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, oa);
              h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, N, O, 0, h.RGBA, h.FLOAT, Y);
              h.bindTexture(h.TEXTURE_2D, null);
              h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, !1);
              sa && (la.da(), H.Za(h));
              h.viewport(0, 0, N, O);
              h.framebufferTexture2D(h.FRAMEBUFFER, h.COLOR_ATTACHMENT0, h.TEXTURE_2D, J, 0);
              h.bindTexture(h.TEXTURE_2D, Da);
              sa ? ma.l(!0, !0) : P.mb(h);
              h.deleteTexture(Da);
              G && ((r[0] = -1), (D = null), (q = 0));
            },
            Pb: function (h) {
              h !== q && (b.activeTexture(k[h]), (q = h));
            },
            instance: function (h) {
              var J;
              function N() {
                S = void 0 !== E.G.videoWidth ? E.G.videoWidth : E.G.width;
                T = void 0 !== E.G.videoHeight ? E.G.videoHeight : E.G.height;
              }
              function O(K) {
                var Q = b.getError();
                if ("FUCKING_BIG_ERROR" === Q) return !1;
                b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, K);
                Q = b.getError();
                Q !== b.NO_ERROR && fa !== b.RGBA && ((fa = b.RGBA), b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, K));
                return !0;
              }
              function Y() {
                if (!Db) {
                  a(ta);
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, za);
                  E.isPot
                    ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, E.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT),
                      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, E.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT))
                    : (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE),
                      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE));
                  E.isAnisotropicFiltering &&
                    "undefined" !== typeof JESETTINGS &&
                    b.texParameterf(b.TEXTURE_2D, JEContext.hh().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.og);
                  b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, E.isLinear ? b.LINEAR : b.NEAREST);
                  E.isLinear
                    ? b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        E.isMipmap && !La ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR
                      )
                    : b.texParameteri(
                        b.TEXTURE_2D,
                        b.TEXTURE_MIN_FILTER,
                        E.isMipmap && !La ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST
                      );
                  fa = I[E.Db - 1];
                  ja = x[E.Db - 1];
                  ha = z[pb];
                  if (Z.la()) {
                    var K = Z.Ye();
                    fa === b.RGBA && ha === b.FLOAT
                      ? E.isMipmap || E.isLinear
                        ? (ja = Ca.$e(b))
                        : Z.Xc()
                        ? K && (ja = K)
                        : (ja = b.RGBA16F || b.RGBA)
                      : fa === b.RGB && ha === b.FLOAT && K && ((ja = K), (fa = b.RGBA));
                  }
                  if ((E.P && !E.isFloat) || (E.isFloat && E.isMipmap && Ca.yf())) (ja = Z.Ze()), (ha = Z.cc(b));
                  E.oc && (cb = E.oc);
                  E.isSrgb && 4 === E.Db && (fa = JEContext.th());
                  if (E.G) O(E.G);
                  else if (E.url) O(Ga);
                  else if (ua) {
                    K = ua;
                    try {
                      "FUCKING_BIG_ERROR" !== b.getError() &&
                        (b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, K),
                        b.getError() !== b.NO_ERROR &&
                          (b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, null),
                          b.getError() !== b.NO_ERROR &&
                            b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, S, T, 0, b.RGBA, b.UNSIGNED_BYTE, null)));
                    } catch (jc) {
                      b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, null);
                    }
                    E.isKeepArray || (ua = null);
                  } else
                    (K = b.getError()),
                      "FUCKING_BIG_ERROR" !== K &&
                        (b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, null),
                        (K = b.getError()),
                        K !== b.NO_ERROR &&
                          ((fa = b.RGBA),
                          E.P &&
                            ha !== b.FLOAT &&
                            ((ha = b.FLOAT), b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, null))));
                  if (E.isMipmap)
                    if (!La && ca) ca.bc(), (db = !0);
                    else if (La) {
                      K = Math.log2(Math.min(S, T));
                      Ra = Array(1 + K);
                      Ra[0] = ta;
                      for (var Q = 1; Q <= K; ++Q) {
                        var ka = Math.pow(2, Q),
                          W = S / ka;
                        ka = T / ka;
                        var Ma = b.createTexture();
                        a(Ma);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
                        b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
                        b.texImage2D(b.TEXTURE_2D, 0, ja, W, ka, 0, fa, ha, null);
                        a(null);
                        Ra[Q] = Ma;
                      }
                      db = !0;
                    }
                  a(null);
                  r[q] = -1;
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                  Ua = !0;
                  E.qa && ca && (E.qa(ca), (E.qa = null));
                }
              }
              function oa() {
                for (var K = S * T, Q = 2 * K, ka = 3 * K, W = 0; W < K; ++W)
                  (ya[0][W] = Va[W]), (ya[1][W] = Va[W + K]), (ya[2][W] = Va[W + Q]), (ya[3][W] = Va[W + ka]);
              }
              function sa() {
                var K = S * T * 4;
                Ea = [new Uint8Array(K), new Uint8Array(K), new Uint8Array(K), new Uint8Array(K)];
                ya = [
                  new Float32Array(Ea[0].buffer),
                  new Float32Array(Ea[1].buffer),
                  new Float32Array(Ea[2].buffer),
                  new Float32Array(Ea[3].buffer),
                ];
                eb = new Uint8Array(4 * K);
                Va = new Float32Array(eb.buffer);
                Wa = !0;
              }
              function Da() {
                J = new Uint8Array(S * T * 4);
                Eb = new Float32Array(J.buffer);
                qb = !0;
              }
              var E = Object.assign({}, A, h),
                Xa = n++;
              null === E.isFlipY && (E.isFlipY = E.url ? !0 : !1);
              E.data &&
                ((E.array =
                  "string" === typeof E.data
                    ? Mb(E.data)
                    : E.isFloat
                    ? new Float32Array(E.data)
                    : new Uint8Array(E.data)),
                (E.isFlipY = !1));
              var pb = 0,
                Fb = E.G ? !0 : !1,
                Ya = null,
                rb = null,
                Gb = !1;
              E.P = E.P || E.isFloat;
              E.P && (pb = 1);
              !E.tf && E.isFloat && C && !Z.Xc() && (E.isFloat = !1);
              E.isFloat && (pb = 2);
              E.isAnisotropicFiltering && v && !JEContext.zh() && (E.isAnisotropicFiltering = !1);
              var ta = E.ec || b.createTexture(),
                Ga = null,
                ua = !1,
                S = 0,
                T = 0,
                Ua = !1,
                Db = !1,
                Wa = !1,
                ya = null,
                Ea = null,
                eb = null,
                Va = null,
                ja = null,
                fa = null,
                ha = null,
                za = E.isFlipY,
                Xb = (h = E.P && E.isMipmap) && Ca.xe(),
                La = h && !Xb ? !0 : !1,
                Ra = null,
                cb = -1,
                Hb = -1,
                db = !1;
              var qb = !1;
              var Eb = (J = null);
              E.width && ((S = E.width), (T = E.height ? E.height : S));
              var ca = {
                get: function () {
                  return ta;
                },
                I: function () {
                  return S;
                },
                V: function () {
                  return T;
                },
                wh: function () {
                  return E.url;
                },
                Ah: function () {
                  return E.isFloat;
                },
                Ch: function () {
                  return E.P;
                },
                Dh: function () {
                  return E.isLinear;
                },
                bc: function () {
                  b.generateMipmap(b.TEXTURE_2D);
                },
                ve: function (K, Q) {
                  La ? (K || (K = ca.td()), p.Pb(Q), a(Ra[K]), (r[Q] = -1)) : ca.g(Q);
                },
                td: function () {
                  -1 === cb && (cb = Math.log(S) / Math.log(2));
                  return cb;
                },
                Se: function (K) {
                  K || (K = ca.td());
                  if (La) {
                    H.set("s12");
                    p.Pb(0);
                    for (var Q = S, ka = T, W = 1; W <= K; ++W)
                      (Q /= 2),
                        (ka /= 2),
                        H.T("u10", 0.25 / Q, 0.25 / ka),
                        b.viewport(0, 0, Q, ka),
                        a(Ra[W - 1]),
                        b.framebufferTexture2D(la.qb(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, Ra[W], 0),
                        ma.l(!1, 1 === W);
                    r[0] = -1;
                  } else
                    K !== Hb &&
                      ((Hb = K), b.TEXTURE_MAX_LEVEL && b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAX_LEVEL, K)),
                      ca.bc();
                },
                Wh: function (K) {
                  (Fb = !Vb.fg(K)) ? ((ua = null), (E.G = K), N()) : (ua = K);
                },
                g: function (K) {
                  if (!Ua) return !1;
                  p.Pb(K);
                  if (r[K] === Xa) return !1;
                  a(ta);
                  r[K] = Xa;
                  return !0;
                },
                fb: function (K) {
                  b.activeTexture(k[K]);
                  q = K;
                  a(ta);
                  r[K] = Xa;
                },
                o: function () {
                  D = ca;
                  b.framebufferTexture2D(la.qb(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ta, 0);
                },
                S: function () {
                  D = ca;
                  b.viewport(0, 0, S, T);
                  b.framebufferTexture2D(la.qb(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, ta, 0);
                },
                Mc: p.Mc,
                ce: function (K, Q) {
                  S = K;
                  T = Q;
                },
                resize: function (K, Q) {
                  ca.ce(K, Q);
                  Y();
                },
                clone: function (K) {
                  K = p.instance({
                    width: S,
                    height: T,
                    P: E.P,
                    isFloat: E.isFloat,
                    isLinear: E.isLinear,
                    isMirrorY: E.isMirrorY,
                    isFlipY: K ? !za : za,
                    isPot: E.isPot,
                  });
                  xa.set("s0");
                  la.da();
                  K.o();
                  b.viewport(0, 0, S, T);
                  ca.g(0);
                  ma.l(!0, !0);
                  return K;
                },
                $f: function () {
                  b.viewport(0, 0, S, T);
                },
                remove: function () {
                  b.deleteTexture(ta);
                  Db = !0;
                  e.splice(e.indexOf(ca), 1);
                  ca = null;
                },
                refresh: function () {
                  ca.fb(0);
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  Fb
                    ? b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, E.G)
                    : b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, ua);
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Vd: function () {
                  Wa || sa();
                  b.readPixels(0, 0, S, 4 * T, b.RGBA, b.UNSIGNED_BYTE, eb);
                  oa();
                  return ya;
                },
                Mf: function () {
                  Wa || sa();
                  return Z.Hb(0, 0, S, 4 * T, eb).then(function () {
                    oa();
                    return ya;
                  });
                },
                Of: function () {
                  qb || Da();
                  b.readPixels(0, 0, S, T, b.RGBA, b.UNSIGNED_BYTE, J);
                  return Eb;
                },
                Nf: function () {
                  qb || Da();
                  return Z.Hb(0, 0, S, T, J);
                },
                cd: function (K) {
                  la.N();
                  H.set("s13");
                  ca.g(0);
                  if (K) b.viewport(0, 0, S, T), H.Zf("u11", 0.25, 0.25, 0.25, 0.25), ma.l(!1, !0);
                  else for (K = 0; 4 > K; ++K) b.viewport(0, T * K, S, T), H.de("u11", u[K]), ma.l(!1, 0 === K);
                },
                Nb: function (K) {
                  var Q = ha === z[0] && !m();
                  a(ta);
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  Q
                    ? (Gb ||
                        ((Ya = document.createElement("canvas")),
                        (Ya.width = S),
                        (Ya.height = T),
                        (rb = Ya.getContext("2d")),
                        rb.createImageData(S, T),
                        (Gb = !0)),
                      null.data.set(K),
                      rb.putImageData(null, 0, 0),
                      b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, Ya))
                    : b.texImage2D(b.TEXTURE_2D, 0, ja, S, T, 0, fa, ha, K);
                  r[q] = Xa;
                  za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                hi: function (K, Q) {
                  a(ta);
                  Q && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0);
                  b.texImage2D(b.TEXTURE_2D, 0, ja, fa, ha, K);
                  r[q] = Xa;
                  Q && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1);
                },
                Vh: function (K, Q) {
                  var ka = S * T,
                    W = 4 * ka;
                  K = E.P ? (K ? "RGBE" : "JSON") : "RGBA";
                  Q && (K = Q);
                  Q = Z.la() && !1;
                  var Ma = null;
                  switch (K) {
                    case "RGBE":
                      Ma = "s44";
                      break;
                    case "JSON":
                      Ma = Q ? "s0" : "s13";
                      break;
                    case "RGBA":
                    case "RGBAARRAY":
                      Ma = "s7";
                  }
                  Wa ||
                    ("RGBA" === K || "RGBE" === K || "RGBAARRAY" === K
                      ? ((Ea = new Uint8Array(W)), (Wa = !0))
                      : "JSON" !== K || Q || sa());
                  la.N();
                  H.set(Ma);
                  ca.g(0);
                  W = null;
                  if ("RGBA" === K || "RGBE" === K || "RGBAARRAY" === K) {
                    b.viewport(0, 0, S, T);
                    ma.l(!0, !0);
                    b.readPixels(0, 0, S, T, b.RGBA, b.UNSIGNED_BYTE, Ea);
                    if ("RGBAARRAY" === K) return { data: Ea };
                    B || ((g = document.createElement("canvas")), (F = g.getContext("2d")), (B = !0));
                    g.width = S;
                    g.height = T;
                    ka = F.createImageData(S, T);
                    ka.data.set(Ea);
                    F.putImageData(ka, 0, 0);
                    W = g.toDataURL("image/png");
                  } else if ("JSON" === K)
                    if (Q)
                      (W = new Float32Array(ka)),
                        b.viewport(0, 0, S, T),
                        ma.l(!0, !0),
                        b.readPixels(0, 0, S, T, b.RGBA, b.FLOAT, W);
                    else {
                      for (W = 0; 4 > W; ++W) b.viewport(0, T * W, S, T), H.de("u11", u[W]), ma.l(!W, !W);
                      ca.Vd();
                      W = Array(ka);
                      for (Q = 0; Q < ka; ++Q)
                        (W[4 * Q] = ya[0][Q]),
                          (W[4 * Q + 1] = ya[1][Q]),
                          (W[4 * Q + 2] = ya[2][Q]),
                          (W[4 * Q + 3] = ya[3][Q]);
                    }
                  return {
                    format: K,
                    data: W,
                    width: S,
                    height: T,
                    isMirrorY: E.isMirrorY,
                    isFlipY: "RGBA" === K ? E.isFlipY : !E.isFlipY,
                  };
                },
              };
              E.isMipmap && !La && Ua && !db && (ca.bc(), (db = !0));
              if (E.url)
                a(ta),
                  b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null),
                  (Ga = new Image()),
                  (Ga.Cg = "Anonymous"),
                  (Ga.crossOrigin = "Anonymous"),
                  (Ga.src = E.url),
                  (Ga.onload = function () {
                    S = Ga.width;
                    T = Ga.height;
                    Y();
                  });
              else if (E.G) {
                var Ib = function () {
                  N();
                  S ? Y() : setTimeout(Ib, 1);
                };
                Ib();
              } else
                E.array
                  ? (E.P && !E.isFloat
                      ? E.array instanceof Uint16Array
                        ? ((ua = E.array), Y())
                        : f()
                        ? ((ua = d(E.array)), Y())
                        : (Y(), p.pd(b, ta, ca.I(), ca.V(), E.array, za, !0))
                      : ((ua = E.isFloat
                          ? E.array instanceof Float32Array
                            ? E.array
                            : new Float32Array(E.array)
                          : E.array instanceof Uint8Array
                          ? E.array
                          : new Uint8Array(E.array)),
                        Y()),
                    E.isKeepArray || (ua && ua !== E.array && (ua = null), delete E.array))
                  : E.ec
                  ? (Ua = !0)
                  : Y();
              ca.rh = ca.I;
              E.qa && Ua && (E.qa(ca), (E.qa = null));
              e.push(ca);
              return ca;
            },
            N: function (h) {
              h !== q && (b.activeTexture(k[h]), (q = h));
              r[h] = -1;
              a(null);
            },
            rg: function (h) {
              y.random.g(h);
            },
            Mc: function () {
              D = null;
              b.framebufferTexture2D(la.qb(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0);
            },
            reset: function () {
              0 !== q && b.activeTexture(k[0]);
              for (var h = 0; h < k.length; ++h) r[h] = -1;
              q = -1;
            },
            Sh: function () {
              q = -1;
            },
            hg: function () {
              for (var h = 0; h < k.length; ++h) p.N(h);
            },
            qd: function () {
              y && (y.random.remove(), y.le.remove());
            },
            gi: function (h, J) {
              if ("RGBA" === h.format || "RGBE" === h.format) {
                var N = new Image();
                N.src = h.data;
                N.onload = function () {
                  p.instance({
                    isMirrorY: h.isMirrorY,
                    isFlipY: h.isFlipY,
                    isFloat: !1,
                    G: N,
                    qa: function (O) {
                      if ("RGBA" === h.format) J(O);
                      else {
                        var Y = h.width,
                          oa = h.height,
                          sa = p.instance({
                            isMirrorY: h.isMirrorY,
                            isFloat: !0,
                            width: Y,
                            height: oa,
                            isFlipY: h.isFlipY,
                          });
                        la.da();
                        b.viewport(0, 0, Y, oa);
                        H.set("s45");
                        sa.o();
                        O.g(0);
                        ma.l(!0, !0);
                        p.N(0);
                        J(sa);
                        Z.flush();
                        setTimeout(O.remove, 50);
                      }
                    },
                  });
                };
              } else
                "JSON" === h.format
                  ? J(
                      p.instance({
                        isFloat: !0,
                        isFlipY: h.isFlipY,
                        width: h.width,
                        height: h.height,
                        array: new Float32Array(h.data),
                      })
                    )
                  : J(!1);
            },
            De: d,
            m: function () {
              D && (va.da(), p.Mc(), va.N());
              p.hg();
              e.slice(0).forEach(function (h) {
                h.remove();
              });
              e.splice(0);
              G = !1;
              n = 0;
              "undefined" !== typeof Ca && Ca.m();
              y = null;
            },
          };
        return p;
      })(),
      Rb = (function () {
        return {
          instance: function (a) {
            var c = [Aa.instance(a), Aa.instance(a)],
              d = [c[1], c[0]],
              f = d,
              m = {
                Rf: function (l) {
                  f[1].o();
                  f[0].g(l);
                  m.ge();
                },
                Sf: function (l) {
                  f[1].S();
                  f[0].g(l);
                  m.ge();
                },
                ge: function () {
                  f = f === c ? d : c;
                },
                refresh: function () {
                  f[0].refresh();
                  f[1].refresh();
                },
                g: function (l) {
                  f[0].g(l);
                },
                fb: function (l) {
                  f[0].fb(l);
                },
                qg: function (l) {
                  f[1].g(l);
                },
                lh: function () {
                  return f[0];
                },
                ph: function () {
                  return f[1];
                },
                Nb: function (l) {
                  f[0].Nb(l);
                  f[1].Nb(l);
                },
                remove: function () {
                  f[0].remove();
                  f[1].remove();
                  f = null;
                },
                sync: function () {
                  m.Sf(0);
                  H.set("s0");
                  P.l(!1, !1);
                },
              };
            return m;
          },
        };
      })(),
      ma = (function () {
        function a(n) {
          var r = { ba: null, indices: null };
          r.ba = n.createBuffer();
          n.bindBuffer(n.ARRAY_BUFFER, r.ba);
          n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), n.STATIC_DRAW);
          r.indices = n.createBuffer();
          n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, r.indices);
          n.bufferData(n.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), n.STATIC_DRAW);
          return r;
        }
        var c = null,
          d = 0,
          f = !1,
          m = [],
          l = -2,
          q = -2,
          k = {
            reset: function () {
              q = l = -2;
            },
            v: function () {
              f || ((c = a(b)), k.za(), (f = !0));
            },
            instance: function (n) {
              var r = d++,
                y = n.indices ? n.indices.length : 0,
                D = "undefined" === typeof n.mode ? b.STATIC_DRAW : n.mode,
                z = b.createBuffer();
              b.bindBuffer(b.ARRAY_BUFFER, z);
              b.bufferData(b.ARRAY_BUFFER, n.ba instanceof Float32Array ? n.ba : new Float32Array(n.ba), D);
              l = r;
              var I = null,
                x = null,
                G = null;
              if (n.indices) {
                I = b.createBuffer();
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, I);
                var e = null;
                65536 > n.indices.length
                  ? ((e = Uint16Array), (x = b.UNSIGNED_SHORT), (G = 2))
                  : ((e = Uint32Array), (x = b.UNSIGNED_INT), (G = 4));
                e = n.indices instanceof e ? n.indices : new e(n.indices);
                b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, D);
                q = r;
              }
              var A = {
                we: function (B) {
                  l !== r && (b.bindBuffer(b.ARRAY_BUFFER, z), (l = r));
                  B && xa.Gc();
                },
                te: function () {
                  q !== r && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, I), (q = r));
                },
                bind: function (B) {
                  A.we(B);
                  A.te();
                },
                Gg: function () {
                  b.drawElements(b.TRIANGLES, y, x, 0);
                },
                Hg: function (B, g) {
                  b.drawElements(b.TRIANGLES, B, x, g * G);
                },
                remove: function () {
                  b.deleteBuffer(z);
                  n.indices && b.deleteBuffer(I);
                  A = null;
                },
              };
              m.push(A);
              return A;
            },
            za: function () {
              -1 !== l && (b.bindBuffer(b.ARRAY_BUFFER, c.ba), (l = -1));
              -1 !== q && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.indices), (q = -1));
            },
            l: function (n, r) {
              n && ma.za();
              r && xa.Ha();
              b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0);
            },
            mb: function (n) {
              n = n || b;
              var r = a(n);
              n.bindBuffer(n.ARRAY_BUFFER, r.ba);
              n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, r.indices);
              xa.Jb(n);
              n.clear(n.COLOR_BUFFER_BIT);
              n.drawElements(n.TRIANGLES, 3, n.UNSIGNED_SHORT, 0);
              n.flush();
              n.bindBuffer(n.ARRAY_BUFFER, null);
              n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, null);
              n.deleteBuffer(r.ba);
              n.deleteBuffer(r.indices);
              k.reset();
              f && (k.za(), xa.Ha());
            },
            qd: function () {
              var n = b,
                r = c;
              n.deleteBuffer(r.ba);
              n.deleteBuffer(r.indices);
            },
            m: function () {
              k.qd();
              m.forEach(function (n) {
                n.remove();
              });
              b.bindBuffer(b.ARRAY_BUFFER, null);
              b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null);
              k.reset();
              f = !1;
              m.splice(0);
              d = 0;
            },
          };
        return k;
      })(),
      la = (function () {
        var a = null,
          c = null,
          d = null,
          f = !1,
          m = [],
          l = { H: -2, od: 1 },
          q = {
            xb: function () {
              return f;
            },
            v: function () {
              if (!f) {
                a = b.createFramebuffer();
                var k = Z.la();
                c = k && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER;
                d = k && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER;
                f = !0;
              }
            },
            ih: function () {
              return c;
            },
            af: function () {
              return d;
            },
            qb: function () {
              return b.FRAMEBUFFER;
            },
            qh: function () {
              return l;
            },
            $g: function () {
              return a;
            },
            instance: function (k) {
              void 0 === k.zd && (k.zd = !1);
              var n = k.J ? k.J : null,
                r = k.width,
                y = void 0 !== k.height ? k.height : k.width,
                D = a,
                z = null,
                I = !1,
                x = !1,
                G = 0;
              n && ((r = r ? r : n.I()), (y = y ? y : n.V()));
              var e = {
                be: function () {
                  I || ((D = b.createFramebuffer()), (I = !0), (G = l.od++));
                },
                oe: function () {
                  e.be();
                  e.o();
                  z = b.createRenderbuffer();
                  b.bindRenderbuffer(b.RENDERBUFFER, z);
                  b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, r, y);
                  b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, z);
                  b.clearDepth(1);
                },
                bind: function (A, B) {
                  G !== l.H && (b.bindFramebuffer(c, D), (l.H = G));
                  n && n.o();
                  B && b.viewport(0, 0, r, y);
                  A && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                pg: function () {
                  G !== l.H && (b.bindFramebuffer(c, D), (l.H = G));
                },
                clear: function () {
                  b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
                },
                yg: function () {
                  b.clear(b.COLOR_BUFFER_BIT);
                },
                zg: function () {
                  b.clear(b.DEPTH_BUFFER_BIT);
                },
                $f: function () {
                  b.viewport(0, 0, r, y);
                },
                o: function () {
                  G !== l.H && (b.bindFramebuffer(c, D), (l.H = G));
                },
                rtt: function (A) {
                  n = A;
                  l.H !== G && (b.bindFramebuffer(b.FRAMEBUFFER, D), (l.H = G));
                  A.o();
                },
                N: function () {
                  b.bindFramebuffer(c, null);
                  l.H = -1;
                },
                resize: function (A, B) {
                  r = A;
                  y = B;
                  z &&
                    (b.bindRenderbuffer(b.RENDERBUFFER, z),
                    b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, r, y));
                },
                remove: function () {
                  D === a ||
                    x ||
                    (b.bindFramebuffer(c, D),
                    b.framebufferTexture2D(c, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0),
                    z && b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, null),
                    b.bindFramebuffer(c, null),
                    b.deleteFramebuffer(D),
                    z && b.deleteRenderbuffer(z));
                  x = !0;
                },
              };
              k.zd && e.oe();
              m.push(e);
              return e;
            },
            N: function () {
              b.bindFramebuffer(c, null);
              l.H = -1;
            },
            ig: function () {
              b.bindFramebuffer(c, null);
              b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
              Z.ee();
              l.H = -1;
            },
            reset: function () {
              l.H = -2;
            },
            da: function () {
              0 !== l.H && (b.bindFramebuffer(c, a), (l.H = 0));
            },
            clear: function () {
              Z.ee();
              b.clear(b.COLOR_BUFFER_BIT);
            },
            m: function () {
              q.N();
              m.forEach(function (k) {
                k.remove();
              });
              null !== a && (b.deleteFramebuffer(a), (a = null));
              q.reset();
              f = !1;
              m.splice(0);
              l.od = 1;
            },
          };
        return q;
      })(),
      Z = (function () {
        function a() {
          k = "undefined" === typeof Ha ? JEContext : Ha;
          n = !0;
        }
        function c(g, F) {
          for (var u = 0; u < g.length; ++u) {
            var v = F.getExtension(g[u]);
            if (v) return v;
          }
          return null;
        }
        function d() {
          null !== e.Mb && (clearTimeout(e.Mb), (e.Mb = null));
          e.Da = !1;
        }
        function f(g) {
          if (0 === e.sa.length) {
            e.W = b.PIXEL_PACK_BUFFER;
            e.sa.splice(0);
            e.rb.splice(0);
            for (var F = 0; F < e.Qa; ++F) e.sa.push(b.createBuffer()), e.rb.push(-1);
            e.ha = 0;
            e.rc = 0;
          }
          b.bindBuffer(e.W, e.sa[e.ha]);
          g.byteLength !== e.rb[e.ha] && (b.bufferData(e.W, g.byteLength, b.STREAM_READ), (e.rb[e.ha] = g.byteLength));
          e.xh = !0;
        }
        function m() {
          b.bindBuffer(e.W, null);
        }
        function l() {
          e.Ba.forEach(function (g) {
            b.deleteSync(g);
          });
          e.Ba.splice(0);
        }
        function q() {
          e.ha = (e.ha + 1) % e.Qa;
          ++e.rc;
        }
        var k = null,
          n = !1,
          r = {
            Bd: !1,
            Ic: null,
            Jc: null,
            Ed: !1,
            xf: !1,
            Kc: null,
            Fd: !1,
            Lc: null,
            Cd: !1,
            Rb: null,
            qf: !1,
            Sb: null,
            rf: !1,
          },
          y = null,
          D = { ia: !0, ka: !0, ac: !0, Ud: !1 },
          z = null,
          I = !0,
          x = null,
          G = null,
          e = { Ee: 1, Qa: -1, ha: 0, rc: 0, Da: !1, sa: [], Ba: [], rb: [], W: null, Mb: null },
          A = "undefined" === typeof window ? {} : window,
          B = {
            v: function () {
              if (n) return !0;
              B.reset();
              n || a();
              var g = b;
              if (!y.Bd) {
                y.Ic = B.kd(g);
                A.GL_EXT_FLOAT = y.Ic;
                y.Ed = y.Ic ? !0 : !1;
                if (y.Ed || B.la()) (y.Jc = B.ld(g)), (y.xf = y.Jc ? !0 : !1), (A.GL_EXT_FLOATLINEAR = y.Jc);
                y.Bd = !0;
              }
              if (!y.Cd) {
                y.Kc = B.kb(g);
                y.Kc && ((y.Fd = !0), (A.GL_EXT_HALFFLOAT = y.Kc));
                if (y.Fd || B.la()) (y.Lc = B.md(g)), (A.GL_EXT_HALFFLOATLINEAR = y.Lc);
                y.yh = y.Lc ? !0 : !1;
                y.Cd = !0;
              }
              y.Rb = B.hd(g);
              y.qf = y.Rb ? !0 : !1;
              A.GL_EXT_COLORBUFFERFLOAT = y.Rb;
              y.Sb = B.jd(g);
              y.rf = y.Sb ? !0 : !1;
              A.GL_EXT_COLORBUFFERHALFFLOAT = y.Sb;
              la.v();
              Aa.v();
              if (!B.He()) return !1;
              ma.v();
              Aa.mf();
              return !0;
            },
            reset: function () {
              y = Object.assign({}, r);
              z = Object.assign({}, D);
            },
            I: function () {
              n || a();
              return k.I();
            },
            V: function () {
              n || a();
              return k.V();
            },
            la: function () {
              n || a();
              return k.la();
            },
            gd: function (g) {
              B.hd(g);
              B.jd(g);
              B.kd(g);
              B.ld(g);
              B.kb(g);
              B.md(g);
            },
            hd: c.bind(null, ["EXT_color_buffer_float", "WEBGL_color_buffer_float", "OES_color_buffer_float"]),
            jd: c.bind(null, [
              "EXT_color_buffer_half_float",
              "WEBGL_color_buffer_half_float",
              "OES_color_buffer_half_float",
            ]),
            kd: c.bind(null, ["OES_texture_float", "MOZ_OES_texture_float", "WEBKIT_OES_texture_float"]),
            ld: c.bind(null, [
              "OES_texture_float_linear",
              "MOZ_OES_texture_float_linear",
              "WEBKIT_OES_texture_float_linear",
            ]),
            kb: c.bind(null, ["OES_texture_half_float", "MOZ_OES_texture_half_float", "WEBKIT_OES_texture_half_float"]),
            md: c.bind(null, [
              "OES_texture_half_float_linear",
              "MOZ_OES_texture_half_float_linear",
              "WEBKIT_OES_texture_half_float_linear",
            ]),
            cc: function (g) {
              var F = B.kb(g);
              return F && F.HALF_FLOAT_OES ? F.HALF_FLOAT_OES : g.HALF_FLOAT || g.FLOAT;
            },
            Ye: function () {
              return G || b.RGBA32F || b.RGBA;
            },
            Ze: function () {
              return x || b.RGBA16F || b.RGBA;
            },
            Ve: function () {
              return z;
            },
            Xc: function () {
              return z.ia;
            },
            ug: function () {
              return z.ka;
            },
            tg: function () {
              return z.ac;
            },
            ye: function () {
              return z.Ud && I;
            },
            je: function (g) {
              I = g;
              !g && e.Da && (l(), b.bindBuffer(e.W, null), (e.Da = !1));
            },
            Eh: function () {
              return e.Da;
            },
            Kb: function (g, F, u) {
              function v() {
                g.bindTexture(g.TEXTURE_2D, null);
                g.bindFramebuffer(C, null);
                g.deleteTexture(t);
                g.deleteFramebuffer(w);
              }
              var C = g.FRAMEBUFFER,
                M = g.NEAREST,
                w = g.createFramebuffer();
              g.bindFramebuffer(C, w);
              var t = g.createTexture();
              g.activeTexture(g.TEXTURE0);
              g.bindTexture(g.TEXTURE_2D, t);
              g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, !1);
              g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
              g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
              g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, M);
              g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, M);
              g.texImage2D(g.TEXTURE_2D, 0, F, 3, 3, 0, g.RGBA, u, null);
              g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t, 0);
              if (g.checkFramebufferStatus(g.READ_FRAMEBUFFER || g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE)
                return v(), !1;
              xa.Fc(g);
              g.clearColor(0, 0, 0, 0);
              g.viewport(0, 0, 3, 3);
              g.disable(g.DEPTH_TEST);
              g.clear(g.COLOR_BUFFER_BIT);
              ma.mb(g);
              g.bindFramebuffer(C, null);
              xa.Za(g);
              g.activeTexture(g.TEXTURE0);
              g.bindTexture(g.TEXTURE_2D, t);
              ma.mb(g);
              F = new Uint8Array(36);
              g.readPixels(0, 0, 3, 3, g.RGBA, g.UNSIGNED_BYTE, F);
              v();
              for (u = 0; 36 > u; ++u) if (3 !== u % 4 && 3 < Math.abs(F[u] - 127)) return !1;
              return !0;
            },
            Ub: function (g) {
              var F = { ia: !1, ka: !1 };
              g.disable(g.BLEND);
              g.clearColor(0, 0, 0, 0);
              g.clear(g.COLOR_BUFFER_BIT);
              g.RGBA32F && B.Kb(g, g.RGBA32F, g.FLOAT) && ((F.ia = !0), (G = g.RGBA32F));
              !F.ia && B.Kb(g, g.RGBA, g.FLOAT) && ((F.ia = !0), (G = g.RGBA));
              var u = B.cc(g);
              x = null;
              g.RGBA16F && B.Kb(g, g.RGBA16F, u) && ((F.ka = !0), (x = g.RGBA16F));
              !F.ka && B.Kb(g, g.RGBA, u) && ((F.ka = !0), (x = g.RGBA));
              return F;
            },
            Ie: function () {
              var g = la.instance({ width: 2 });
              g.be();
              var F = Aa.instance({ width: 2, isFloat: !0, Db: 3 });
              g.o();
              F.o();
              B.flush();
              b.checkFramebufferStatus(la.af()) !== b.FRAMEBUFFER_COMPLETE ? (Aa.Uf(), (z.ac = !1)) : (z.ac = !0);
              g.remove();
              F.remove();
            },
            Je: function () {
              var g = !1;
              B.la() &&
                (g =
                  "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer"
                    .split(" ")
                    .every(function (F) {
                      return "undefined" !== typeof b[F];
                    }));
              z.Ud = g;
            },
            He: function () {
              var g = B.Ub(b);
              Object.assign(z, g);
              if (!z.ia && !z.ka) return !1;
              B.Ie();
              B.Je();
              return !0;
            },
            Wd: function (g, F, u, v, C) {
              b.readPixels(g, F, u, v, b.RGBA, b.UNSIGNED_BYTE, C);
              return Promise.resolve(C, !1);
            },
            Hb: function (g, F, u, v, C, M, w) {
              if (!B.ye()) return B.Wd(g, F, u, v, C);
              e.Qa = w || e.Ee;
              f(C);
              b.readPixels(g, F, u, v, b.RGBA, b.UNSIGNED_BYTE, 0);
              e.Ba[e.ha] = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0);
              B.flush();
              var t = !1;
              return new Promise(function (p, h) {
                function J() {
                  if (!e.Da) return d(), m(), q(), h(), !1;
                  var N = (e.ha + 1) % e.Qa;
                  switch (b.clientWaitSync(e.Ba[N], 0, 0)) {
                    case b.TIMEOUT_EXPIRED:
                    case b.WAIT_FAILED:
                      break;
                    default:
                      return (
                        d(),
                        b.deleteSync(e.Ba[N]),
                        (e.Ba[N] = null),
                        b.bindBuffer(e.W, e.sa[N]),
                        b.getBufferSubData(e.W, 0, C),
                        m(),
                        q(),
                        p(C, t),
                        !0
                      );
                  }
                  e.Mb = setTimeout(J, 0);
                  return !1;
                }
                d();
                e.rc + 1 < e.Qa ? (m(), q(), p(C, !1)) : ((e.Da = !0), J() || !M || t || ((t = !0), M()));
              });
            },
            ee: function () {
              b.viewport(0, 0, B.I(), B.V());
            },
            flush: function () {
              b.flush();
            },
            m: function () {
              d();
              l();
              Aa.m();
              la.m();
              ma.m();
              e.sa.forEach(function (g) {
                b.deleteBuffer(g);
              });
              e.sa.splice(0);
              xa.reset();
              n = !1;
            },
          };
        return B;
      })(),
      P = ma,
      va = la,
      X = Aa,
      Ca = (function () {
        function a(u, v, C, M) {
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, M ? e.NEAREST_MIPMAP_NEAREST : e.LINEAR);
          var w = null;
          if (null !== C)
            try {
              w = e.getError();
              if ("FUCKING_BIG_ERROR" === w) return !1;
              e.texImage2D(e.TEXTURE_2D, 0, u, 4, 4, 0, e.RGBA, v, C);
              w = e.getError();
              if (w !== e.NO_ERROR) return !1;
            } catch (t) {
              return !1;
            }
          M && e.generateMipmap(e.TEXTURE_2D);
          e.clear(e.COLOR_BUFFER_BIT);
          P.mb(e);
          w = e.getError();
          if ("FUCKING_BIG_ERROR" === w) return !1;
          e.readPixels(0, 0, 2, 2, e.RGBA, e.UNSIGNED_BYTE, y);
          w = e.getError();
          w === e.INVALID_OPERATION &&
            "undefined" !== typeof e.PIXEL_PACK_BUFFER &&
            (e.bindBuffer(e.PIXEL_PACK_BUFFER, null),
            e.readPixels(0, 0, 2, 2, e.RGBA, e.UNSIGNED_BYTE, y),
            (w = e.getError()));
          if (w !== e.NO_ERROR) return !1;
          C = !0;
          for (M = 0; 16 > M; ++M) C = C && 4 > Math.abs(y[M] - 127);
          C && ((n.Rd = v), (n.yd = u));
          return C;
        }
        function c(u, v) {
          return A.ia && a(u, e.FLOAT, new Float32Array(D), v) ? ((k = q.Tc), !0) : !1;
        }
        function d(u, v, C) {
          if (!A.ka) return !1;
          var M = Aa.De(D),
            w = Z.kb(e);
          if ((w && w.HALF_FLOAT_OES && a(u, w.HALF_FLOAT_OES, M, v)) || (e.HALF_FLOAT && a(u, e.HALF_FLOAT, M, v)))
            return (k = q.La), !0;
          M = new Float32Array(D);
          if (a(u, e.FLOAT, M, v)) return (k = q.La), !0;
          e.bindTexture(e.TEXTURE_2D, C);
          e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, e.UNSIGNED_BYTE, null);
          e.bindFramebuffer(n.ib, F);
          Aa.pd(e, C, 2, 2, M, !1, !1);
          e.bindFramebuffer(n.ib, null);
          e.bindTexture(e.TEXTURE_2D, C);
          return a(u, null, null, v) ? ((k = q.La), !0) : !1;
        }
        function f(u, v, C) {
          r = !0;
          if (d(u, !0, C) || c(v, !0)) return !0;
          r = !1;
          return d(u, !1, C) || c(v, !1) ? !0 : !1;
        }
        function m(u) {
          if (k === q.O) {
            e = u || b;
            k = q.RGBA8;
            r = !0;
            Z.gd(e);
            A || (A = Z.Ub(e));
            va.reset();
            F = e.createFramebuffer();
            n.ib = e.DRAW_FRAMEBUFFER || e.FRAMEBUFFER;
            e.bindFramebuffer(n.ib, null);
            e.clearColor(0, 0, 0, 0);
            e.viewport(0, 0, 2, 2);
            H.O();
            B = H.Za(e);
            u = e.createTexture();
            e.activeTexture(e.TEXTURE0);
            e.bindTexture(e.TEXTURE_2D, u);
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT);
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT);
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST);
            g = u;
            var v = (u = e.RGBA),
              C = e.RGBA16F,
              M = e.RGBA32F;
            M && (u = M);
            C && (v = C);
            if ((C || M) && f(v, u, g)) return l(), !0;
            u = v = e.RGBA;
            if (f(v, u, g)) return l(), !0;
            k = q.RGBA8;
            l();
            return !1;
          }
        }
        function l() {
          e.deleteProgram(B.va);
          e.deleteTexture(g);
          g = B = null;
        }
        for (
          var q = { O: -1, Tc: 3, La: 2, RGBA8: 0 },
            k = q.O,
            n = { Rd: null, yd: null, ib: null },
            r = !0,
            y = new Uint8Array(16),
            D = Array(64),
            z = 0;
          4 > z;
          ++z
        )
          for (var I = 0; 4 > I; ++I) {
            var x = 0 === (I + z) % 2 ? 1 : 0,
              G = 4 * z + I;
            D[4 * G] = x;
            D[4 * G + 1] = x;
            D[4 * G + 2] = x;
            D[4 * G + 3] = x;
          }
        var e = null,
          A = null,
          B = null,
          g = null,
          F = null;
        return {
          xe: function (u) {
            m(u);
            return r;
          },
          Wc: function (u, v) {
            k === q.O && (typeof ("undefined" !== v) && (A = v), m(u));
            return k !== q.RGBA8;
          },
          Bh: function (u) {
            m(u);
            return k === q.Tc;
          },
          yf: function (u) {
            m(u);
            return k === q.La;
          },
          jh: function (u) {
            m(u);
            return n.Rd;
          },
          $e: function (u) {
            m(u);
            return n.yd;
          },
          m: function () {
            e = null;
            r = !0;
            k = q.O;
            A = null;
          },
        };
      })(),
      Kb = (function () {
        return {
          instance: function (a) {
            var c = null,
              d = !1,
              f = !1,
              m = null,
              l = !1,
              q = !1,
              k = null,
              n = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing,
              r = "undefined" === typeof a.preprocessingSize ? a.size : a.preprocessingSize;
            a.mask &&
              ((d = !0),
              ea && void 0 !== ea.se && (a.mask = ea.se + a.mask),
              (c = X.instance({ isFloat: !1, url: a.mask })));
            var y = !1;
            a.customInputShader &&
              ((y = "s46"),
              H.Vc({ name: "_", id: y, h: a.customInputShader, fi: ["uSource"], precision: "lowp" }),
              H.U(y, [{ type: "1i", name: "_", value: 0 }]));
            switch (n) {
              case "sobel":
                k = "s33";
                l = !0;
                break;
              case "meanNormalization":
                k = "s34";
                l = !0;
                break;
              case "grayScale":
                k = "s30";
                l = !1;
                break;
              case "grayScaleTilt":
                k = "s31";
                q = !0;
                l = !1;
                break;
              case "rgbGrayTilt":
                k = "s32";
                q = !0;
                l = !1;
                break;
              case "copy":
                k = y ? y : "s0";
                break;
              case "inputLightRegulation":
                k = y ? y : "s30";
                m = Yb.instance({ xd: r, Qd: a.size, Md: a.nBlurPass, X: !1 });
                f = !0;
                break;
              case "inputMix0":
                k = "none";
                m = Zb.instance({ u: r, na: a.varianceMin, ea: a.blurKernelSizePx, gain: a.gain || 1, X: !1 });
                f = !0;
                break;
              case "inputMix1":
                k = "none";
                m = $b.instance({ u: r, na: a.varianceMin, ea: a.blurKernelSizePx, gain: a.gain || 1, X: !1 });
                f = !0;
                break;
              case "inputCut4":
                k = "none";
                m = ac.instance({
                  u: r,
                  na: a.varianceMin,
                  ea: a.blurKernelSizePx,
                  gain: a.gain || 1,
                  Wa: a.isNormalized || !1,
                  zc: a.overlap || 0,
                  X: !1,
                });
                r *= m.bf();
                f = !0;
                break;
              case "direct":
              case "none":
                k = "abort";
                break;
              default:
                k = "s4";
            }
            r = Math.ceil(r);
            q && H.U(k, [{ name: "u27", type: "1f", value: a.tilt }]);
            d && (k += "Mask");
            var D = X.instance({ isFloat: !1, isPot: !1, width: a.size }),
              z = {
                I: function () {
                  return a.size;
                },
                cf: function () {
                  return r;
                },
                dc: function () {
                  return z.I();
                },
                gf: function () {
                  return f ? m.Ua() : D;
                },
                R: function (I) {
                  va.da();
                  "abort" !== k &&
                    ("none" !== k &&
                      (H.set(k), l && H.F("u28", 1 / a.size), D.S(), d && c.g(1), P.l(!1, !1), D.g(0), (I = D)),
                    f && m.process(I));
                },
                m: function () {
                  D.remove();
                  d && c.remove();
                },
              };
            return z;
          },
        };
      })(),
      Lb = (function () {
        return {
          instance: function (a) {
            function c(v) {
              m.forEach(function (C, M) {
                l[M][0] = v[0][C];
                l[M][1] = v[1][C];
                l[M][2] = v[2][C];
                l[M][3] = v[3][C];
              });
              return l;
            }
            a.normalize = a.normalize || !1;
            var d = { input: null, bias: null, ic: null, Ga: null, xc: null, vc: null, wc: null },
              f = null,
              m = [],
              l = [],
              q = !1,
              k = null,
              n = !0,
              r = -1,
              y = a.isReorganize ? a.isReorganize : !1,
              D = a.kernelsCount ? !0 : !1,
              z = ["s27", "s28", "s29"][a.shiftRGBAMode || 0],
              I = { isEnabled: !1 };
            a.vf
              ? ((a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.Fb.dc()), (n = !1))
              : "full" === a.connectivityUp && (a.sparsity = a.Fb.dc());
            var x = {
                elu: "s16",
                elu01: "s17",
                relu: "s15",
                arctan: "s18",
                arctan2: "s19",
                sigmoid: "s14",
                copy: "s0",
              }[a.activation],
              G = a.sparsity * a.sparsity,
              e = !1,
              A = a.size,
              B = "";
            if (a.maxPooling) {
              switch (a.maxPooling.size) {
                case 2:
                  B = "s35";
                  break;
                case 4:
                  B = "s36";
              }
              e = !0;
              A /= a.maxPooling.size;
              d.vc = X.instance({ isFloat: !0, isPot: !1, width: A });
            }
            var g = -1,
              F = null;
            n && (d.Ga = X.instance({ isFloat: !0, isPot: !1, width: a.size }));
            d.bias = X.instance(a.bias);
            var u = {
              I: function () {
                return a.size;
              },
              dc: function () {
                return A;
              },
              rd: function () {
                return a.classesCount;
              },
              ue: function (v) {
                f.g(v);
              },
              Jf: function () {
                a.remap &&
                  a.remap.isEnabled &&
                  (I = {
                    isEnabled: !0,
                    Bf: X.instance(a.remap.maskTexture),
                    zb: a.remap.layers.map(function (v) {
                      return a.parent.ef(v);
                    }),
                    depth: a.remap.depth,
                  });
              },
              Vf: function () {
                switch (a.connectivityUp) {
                  case "direct":
                    F = bc.instance(a.connectivity);
                    break;
                  case "square":
                    F = cc.instance(a.connectivity);
                    break;
                  case "squareFast":
                    F = dc.instance(a.connectivity, a.activation);
                    break;
                  case "full":
                    F = ec.instance(a.connectivity);
                    break;
                  case "conv":
                    (r = a.kernelsCount),
                      (F = fc.instance(a.connectivity)),
                      y && (d.xc = X.instance({ width: A, isFloat: !0, isFlipY: !1, isPot: !1 }));
                }
                if (F.Ia) {
                  var v = a.size * a.sparsity;
                  g = Math.log(v / a.size) / Math.log(2);
                  d.input = X.instance({ isMipmap: !0, isFloat: !0, isPot: !0, width: v, oc: g });
                  d.ic = X.instance({ isFloat: !0, isPot: !0, width: a.size });
                }
              },
              R: function (v, C) {
                f = v;
                F.Ia
                  ? (d.input.S(),
                    D && d.bias.g(2),
                    F.R(I),
                    d.input.g(0),
                    d.input.Se(g),
                    d.ic.S(),
                    D ? H.set("s0") : (H.set(z), H.F("u4", G), d.bias.g(1)),
                    d.input.ve(g, 0),
                    P.l(!1, !1),
                    H.set(x),
                    d.Ga.o(),
                    d.ic.g(0),
                    P.l(!1, !1))
                  : (d.Ga.S(), d.bias.g(1), F.R());
                if (n)
                  return (
                    (C = d.Ga),
                    e && (d.vc.S(), C.g(0), H.set(B), H.T("u10", 1 / a.size, 1 / a.size), P.l(!1, !1), (C = d.vc)),
                    y && (d.xc.o(), H.set("s21"), H.T("u14", r, A / r), C.g(0), P.l(!1, !1), (C = d.xc)),
                    C.g(0),
                    C
                  );
                var M = d.Ga;
                a.normalize &&
                  ((v = M),
                  H.set("gpuRawAvg" === q ? "s9" : "s8"),
                  H.F("u6", 1 / a.size),
                  d.wc.S(),
                  v.g(0),
                  P.l(!1, !1),
                  (M = d.wc));
                v = null;
                switch (q) {
                  case "cpuRGBA2Float":
                    M.cd(!1);
                    C ? (v = u.Kf(M).then(k)) : ((M = u.Lf(M)), k(M));
                    break;
                  case "cpuMeanFloat":
                    M.cd(!0);
                    if (C) v = M.Nf().then(k);
                    else {
                      M = M.Of();
                      for (var w = 0; w < M.length; ++w);
                      k(M);
                    }
                    break;
                  case "gpuRawAvg":
                  case "gpuRaw":
                    M.g(0);
                  case "none":
                    null !== k && k(M);
                }
                C && null === v && (v = Promise.resolve());
                return v;
              },
              Ge: function (v) {
                var C = !1;
                v && ((q = v.yc || "none"), (k = v.uc || null), (C = v.Pd ? !0 : !1));
                d.Ga = X.instance({ isFloat: !0, isPot: !0, isLinear: C, isMipmap: !1, width: a.size });
                v = "undefined" !== typeof a.classesCount && a.classesCount ? a.classesCount : a.size * a.size;
                for (var M = (C = 0), w = 0; C < v; ++C)
                  m.push(M + (a.size - 1 - w) * a.size), l.push([-1, -1, -1, -1]), ++M, M === a.size && ((M = 0), ++w);
                a.normalize && (d.wc = X.instance({ isFloat: !0, isPot: !0, width: a.size }));
              },
              Kf: function (v) {
                return v.Mf().then(c);
              },
              Lf: function (v) {
                v = v.Vd();
                c(v);
                return l;
              },
              m: function () {
                for (var v in d) {
                  var C = d[v];
                  C && C.remove();
                }
                F && (F.m(), (F = null));
              },
            };
            a.Fb && u.Vf(a.Fb);
            return u;
          },
        };
      })(),
      bc = (function () {
        return {
          instance: function (a) {
            var c = X.instance(a.weights);
            return {
              Ia: !0,
              pb: function () {
                return 1;
              },
              m: function () {
                c.remove();
              },
              kf: function () {
                return c;
              },
              R: function () {
                H.set("s26");
                c.g(1);
                P.l(!1, !1);
              },
            };
          },
        };
      })(),
      ec = (function () {
        return {
          instance: function (a) {
            var c = a.fromLayerSize,
              d = X.instance(a.weights);
            return {
              Ia: !0,
              pb: function () {
                return c;
              },
              m: function () {
                d.remove();
              },
              R: function (f) {
                if (f.isEnabled) {
                  H.set("s24");
                  f.Bf.g(3);
                  for (var m = Math.min(f.zb.length, f.depth), l = 0; l < m; ++l) f.zb[l].ue(4 + l);
                } else H.set("s23");
                H.F("u18", a.toLayerSize);
                H.F("u19", a.fromLayerSize);
                d.g(1);
                P.l(!1, !1);
              },
            };
          },
        };
      })(),
      cc = (function () {
        return {
          instance: function (a) {
            for (
              var c = a.fromLayerSize,
                d = a.toLayerSize,
                f = a.toSparsity,
                m = f * d,
                l = m / c,
                q = c / d,
                k = 0,
                n = 0,
                r = 0,
                y = Array(f * d * f * d * 4),
                D = Array(f * d * f * d * 4),
                z = Array(c * c),
                I = 0;
              I < z.length;
              ++I
            )
              z[I] = 0;
            I = Math.floor(f / 2);
            for (var x = 0.5 / d, G = 0.5 / c, e = 0.5 / m, A = 0; A < d; ++A)
              for (var B = Math.round(A * q), g = 0; g < d; ++g) {
                var F = Math.round(g * q),
                  u = A / d,
                  v = g / d;
                u += x;
                v += x;
                for (var C = 0; C < f; ++C) {
                  var M = B + C - I;
                  0 > M && (M += c);
                  M >= c && (M -= c);
                  for (var w = 0; w < f; ++w) {
                    var t = k / m,
                      p = n / m,
                      h = F + w - I;
                    0 > h && (h += c);
                    h >= c && (h -= c);
                    var J = M / c,
                      N = h / c;
                    p = 1 - p - 1 / m;
                    J += G;
                    N += G;
                    t += e;
                    p += e;
                    var O = A * f + C,
                      Y = g * f + w;
                    Y = d * f - Y - 1;
                    O = Y * d * f + O;
                    y[4 * O] = t;
                    y[4 * O + 1] = p;
                    y[4 * O + 2] = J;
                    y[4 * O + 3] = N;
                    N = z[h * c + M]++;
                    O = N % l;
                    J = M * l + O;
                    h = h * l + (N - O) / l;
                    h = c * l - 1 - h;
                    h = h * c * l + J;
                    D[4 * h] = t;
                    D[4 * h + 1] = p;
                    D[4 * h + 2] = u;
                    D[4 * h + 3] = v;
                    ++k >= m && ((k = 0), ++n);
                    ++r;
                  }
                }
              }
            z = null;
            var oa = X.instance(a.weights);
            delete a.weights.data;
            var sa = X.instance({ width: m, isFloat: !0, array: new Float32Array(D), isPot: !0 });
            D = null;
            var Da = X.instance({ width: m, isFloat: !0, array: new Float32Array(y), isPot: !0 });
            y = null;
            return {
              Ia: !0,
              pb: function () {
                return l;
              },
              m: function () {
                sa.remove();
                Da.remove();
                oa.remove();
              },
              R: function () {
                H.set("s22");
                oa.g(1);
                Da.g(2);
                P.l(!1, !1);
              },
            };
          },
        };
      })(),
      fc = (function () {
        return {
          instance: function (a) {
            var c = a.kernelsCount,
              d = a.toSparsity,
              f = (d * a.toLayerSize) / a.fromLayerSize,
              m = a.inputScale || [1, 1],
              l = X.instance(a.weights);
            return {
              Ia: !0,
              pb: function () {
                return f;
              },
              uh: function () {
                return d;
              },
              kf: function () {
                return l;
              },
              m: function () {
                l.remove();
              },
              R: function () {
                H.set("s25");
                H.Xf("u26", m);
                H.F("u24", c);
                H.F("u25", d);
                H.F("u18", a.toLayerSize);
                H.F("u19", a.fromLayerSize);
                l.g(1);
                P.l(!1, !1);
              },
            };
          },
        };
      })(),
      dc = (function () {
        return {
          instance: function (a, c) {
            var d = a.fromLayerSize,
              f = a.toLayerSize,
              m = a.toSparsity,
              l = a.stride ? a.stride : 1,
              q = (m * f) / d,
              k = f < d,
              n = d / f,
              r = X.instance(a.weights),
              y = "s47" + [d.toString(), f.toString(), m.toString(), l.toString(), c].join("_");
            H.Pe(y) ||
              ((a = Wb.Te(c, "gl_FragColor", "gl_FragColor")),
              (f = [
                { type: "1f", name: "u18", value: f },
                { type: "1f", name: "u30", value: l },
              ]),
              k && f.push({ type: "1f", name: "u19", value: d }),
              (d = [(k ? q : m).toFixed(1), a]),
              k && d.push(n.toFixed(1)),
              H.pf(k ? "s41" : "s40", y, d),
              H.U(
                y,
                f.concat([
                  { type: "1i", name: "u16", value: 0 },
                  { type: "1i", name: "u3", value: 1 },
                  { type: "1i", name: "u15", value: 3 },
                ])
              ));
            return {
              Ia: !1,
              pb: function () {
                return q;
              },
              m: function () {
                r.remove();
              },
              R: function () {
                H.set(y);
                r.g(3);
                P.l(!1, !1);
              },
            };
          },
        };
      })(),
      Yb = (function () {
        return {
          instance: function (a) {
            var c = a.Md ? a.Md : 3,
              d = a.xd ? a.xd : 64,
              f = a.Qd ? a.Qd : 64,
              m = a.X ? !0 : !1;
            a = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 };
            var l = X.instance(a),
              q = X.instance(a),
              k = X.instance(a),
              n = X.instance(a),
              r = X.instance({ isFloat: !0, width: f, isPot: !1, isFlipY: !1 }),
              y = 1 / d;
            return {
              process: function (D) {
                H.set("s37");
                n.o();
                P.l(m, !1);
                H.set("s38");
                for (var z = 0; z < c; ++z)
                  l.o(),
                    H.T("u10", y, 0),
                    P.l(m, !1),
                    k.o(),
                    n.g(0),
                    P.l(m, !1),
                    q.o(),
                    l.g(0),
                    H.T("u10", 0, y),
                    P.l(m, !1),
                    n.o(),
                    k.g(0),
                    P.l(m, !1),
                    z !== c - 1 && q.g(0);
                H.set("s39");
                r.o();
                D.g(0);
                q.g(1);
                n.g(2);
                P.l(m, !1);
                r.g(0);
              },
              Ua: function () {
                return r;
              },
            };
          },
        };
      })(),
      Zb = (function () {
        return {
          instance: function (a) {
            function c(y) {
              return X.instance({ isFloat: y, width: d.u, isPot: !1, isFlipY: !1 });
            }
            var d = Object.assign({ na: 0.1, ea: 9, u: 128, gain: 1, X: !1 }, a),
              f = c(!1),
              m = [c(!1), c(!1), c(!1)],
              l = [c(!1), c(!1), c(!1)],
              q = c(!0),
              k = [f, l[0], l[1]];
            a =
              "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}"
                .replace("1.1111", Math.round((d.ea - 1) / 2).toFixed(2))
                .replace("2.2222", (1 / d.u).toFixed(6));
            var n =
                "uniform sampler2D u32,u33,u34,u35;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec3 a=texture2D(u32,vv0).rgb;float c=texture2D(u33,vv0).r,d=texture2D(u34,vv0).r,i=texture2D(u35,vv0).r,j=a.r*a.r;vec3 b=vec3(c,d,i),k=max(g*f,abs(vec3(j)-b*b)),l=sqrt(k);gl_FragColor=vec4(a.r,h*(a-b)/l);}"
                  .replace("1.1111", d.na.toFixed(4))
                  .replace("2.2222", d.gain.toFixed(4)),
              r = { u1: 0 };
            H.ab([
              {
                id: "s49",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}",
                j: r,
                i: ["u1"],
                precision: "lowp",
              },
              { id: "s50", name: "_", h: a, j: r, i: ["u1", "u31"], precision: "lowp" },
              {
                id: "s51",
                name: "_",
                h: n,
                j: { u32: 0, u33: 1, u34: 2, u35: 3 },
                i: ["u32", "u33", "u34", "u35"],
                precision: "highp",
              },
            ]);
            return {
              process: function () {
                H.set("s49");
                f.S();
                P.l(d.X, !1);
                H.set("s50");
                for (var y = 0; 3 > y; ++y)
                  H.T("u31", 1, 0),
                    m[y].o(),
                    k[y].g(0),
                    P.l(!1, !1),
                    H.T("u31", 0, 1),
                    l[y].o(),
                    m[y].g(0),
                    P.l(!1, !1);
                H.set("s51");
                q.o();
                f.g(0);
                l[0].g(1);
                l[1].g(2);
                l[2].g(3);
                P.l(!1, !1);
                q.g(0);
              },
              Ua: function () {
                return q;
              },
            };
          },
        };
      })(),
      $b = (function () {
        return {
          instance: function (a) {
            function c(r) {
              return X.instance({ isFloat: r, width: d.u, isPot: !1, isFlipY: !1 });
            }
            var d = Object.assign({ na: 0.1, ea: 9, u: 128, gain: 1, X: !1 }, a),
              f = c(!1),
              m = c(!1),
              l = c(!1),
              q = c(!0);
            a =
              "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){vec3 b=vec3(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).rgb,c+=f;}b/=c,gl_FragColor=vec4(b,1.);}"
                .replace("1.1111", Math.round((d.ea - 1) / 2).toFixed(2))
                .replace("2.2222", (1 / d.u).toFixed(6));
            var k =
                "uniform sampler2D u0,u36;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);vec3 c=texture2D(u36,vv0).rgb;float d=a.a*a.a;vec3 b=c.rgb,i=max(g*f,abs(vec3(d)-b*b)),j=sqrt(i);gl_FragColor=vec4(a.a,h*(a.rgb-b)/j);}"
                  .replace("1.1111", d.na.toFixed(4))
                  .replace("2.2222", d.gain.toFixed(4)),
              n = { u1: 0 };
            H.ab([
              {
                id: "s52",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(a.rgb,b);}",
                j: n,
                i: ["u1"],
                precision: "lowp",
              },
              { id: "s53", name: "_", h: a, j: n, i: ["u1", "u31"], precision: "lowp" },
              { id: "s54", name: "_", h: k, j: { u0: 0, u36: 1 }, i: ["u0", "u36"], precision: "highp" },
            ]);
            return {
              process: function () {
                H.set("s52");
                f.S();
                P.l(d.X, !1);
                H.set("s53");
                H.T("u31", 1, 0);
                m.o();
                f.g(0);
                P.l(!1, !1);
                H.T("u31", 0, 1);
                l.o();
                m.g(0);
                P.l(!1, !1);
                H.set("s54");
                q.o();
                f.g(0);
                l.g(1);
                P.l(!1, !1);
                q.g(0);
              },
              Ua: function () {
                return q;
              },
            };
          },
        };
      })(),
      ac = (function () {
        return {
          instance: function (a) {
            function c(y) {
              return X.instance({ isFloat: y, width: d.u, isPot: !1, isFlipY: !1 });
            }
            var d = Object.assign({ na: 0.1, ea: 9, u: 128, gain: 1, zc: 0, Wa: !1, X: !1 }, a),
              f = c(!1),
              m = null,
              l = null,
              q = null;
            d.Wa && ((m = c(!1)), (l = c(!1)), (q = c(!0)));
            a = { u1: 0 };
            var k = [
              {
                id: "s55",
                name: "_",
                h: "uniform sampler2D u1;const float f=1.1111;varying vec2 vv0;const vec3 e=vec3(.2126,.7152,.0722);void main(){vec2 a=vv0*.5*(f+1.);float b=.5*(1.-f),c=dot(texture2D(u1,a).rgb,e),d=dot(texture2D(u1,a+vec2(0.,b)).rgb,e),h=dot(texture2D(u1,a+vec2(b,0.)).rgb,e),i=dot(texture2D(u1,a+vec2(b,b)).rgb,e);gl_FragColor=vec4(c,d,h,i);}".replace(
                  "1.1111",
                  d.zc.toFixed(4)
                ),
                j: a,
                i: ["u1"],
                precision: "lowp",
              },
            ];
            if (d.Wa) {
              var n =
                  "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u31;varying vec2 vv0;void main(){vec4 b=vec4(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u31*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j),c+=f;}gl_FragColor=b/c;}"
                    .replace("1.1111", Math.round((d.ea - 1) / 2).toFixed(2))
                    .replace("2.2222", (1 / d.u).toFixed(6)),
                r =
                  "uniform sampler2D u0,u36;const float f=1.1111;const vec4 g=vec4(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u36,vv0),d=a*a,b=c,i=max(g*f,abs(d-b*b)),j=sqrt(i);gl_FragColor=h*(a-b)/j;}"
                    .replace("1.1111", d.na.toFixed(4))
                    .replace("2.2222", d.gain.toFixed(4));
              k.push(
                { id: "s56", name: "_", h: n, j: a, i: ["u1", "u31"], precision: "lowp" },
                { id: "s57", name: "_", h: r, j: { u0: 0, u36: 1 }, i: ["u0", "u36"], precision: "highp" }
              );
            }
            H.ab(k);
            return {
              process: function () {
                H.set("s55");
                f.S();
                P.l(d.X, !1);
                d.Wa
                  ? (H.set("s56"),
                    H.T("u31", 1, 0),
                    m.o(),
                    f.g(0),
                    P.l(!1, !1),
                    H.T("u31", 0, 1),
                    l.o(),
                    m.g(0),
                    P.l(!1, !1),
                    H.set("s57"),
                    q.o(),
                    f.g(0),
                    l.g(1),
                    P.l(!1, !1),
                    q.g(0))
                  : f.g(0);
              },
              bf: function () {
                return 2 - d.zc;
              },
              Ua: function () {
                return d.Wa ? q : f;
              },
            };
          },
        };
      })(),
      V = {
        vd: function () {
          return V.ad() ? document.createElement("video") : !1;
        },
        Sa: function (a, c) {
          a[c] = !0;
          a.setAttribute(c, "true");
        },
        Be: function () {
          var a = !1,
            c = navigator.userAgent || navigator.vendor || window.opera;
          if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              c
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              c.substr(0, 4)
            )
          )
            a = !0;
          return a;
        },
        Yc: function () {
          return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        },
        Ue: function () {
          var a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          return a && a.length && 2 < a.length
            ? [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || 0, 10)]
            : [0, 0, 0];
        },
        Id: function () {
          try {
            return window.matchMedia("(orientation: portrait)").matches ? !0 : !1;
          } catch (a) {
            return window.innerHeight > window.innerWidth;
          }
        },
        Ae: function () {
          return V.Zc() || V.Yc();
        },
        Zc: function () {
          var a = navigator.userAgent.toLowerCase();
          return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1;
        },
        Wg: function () {
          return V.Be() ? (V.Id() ? (window.innerHeight / window.innerWidth) * 45 : 45) : 45;
        },
        ad: function () {
          return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1;
        },
        pause: function (a) {
          a.pause();
        },
        Th: function (a) {
          a.play();
        },
        release: function (a) {
          a.pause();
          a.videoStream && a.videoStream.stop();
          a.videoStream = null;
        },
        $c: function (a) {
          if (!a) return a;
          var c = null;
          if (a.video) {
            var d = function (f) {
              return f && "object" === typeof f ? Object.assign({}, f) : f;
            };
            c = {};
            "undefined" !== typeof a.video.width && (c.width = d(a.video.width));
            "undefined" !== typeof a.video.height && (c.height = d(a.video.height));
            "undefined" !== typeof a.video.facingMode && (c.facingMode = d(a.video.facingMode));
          }
          c = { audio: a.audio, video: c };
          "undefined" !== typeof a.deviceId && V.Uc(c, a.deviceId);
          return c;
        },
        Uc: function (a, c) {
          c &&
            ((a.video = a.video || {}),
            (a.video.deviceId = { exact: c }),
            a.video.facingMode && delete a.video.facingMode);
        },
        he: function (a) {
          var c = a.video.width;
          a.video.width = a.video.height;
          a.video.height = c;
          return a;
        },
        Fe: function (a) {
          function c(z) {
            return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (I, x) {
              return Math.abs(I - z) - Math.abs(x - z);
            });
          }
          function d(z) {
            var I = V.$c(a);
            z = z(I);
            m.push(z);
            f(z);
          }
          function f(z) {
            if (z.video && z.video.facingMode && z.video.facingMode.exact) {
              var I = z.video.facingMode.exact;
              z = V.$c(z);
              delete z.video.facingMode.exact;
              z.video.facingMode.ideal = I;
              m.push(z);
            }
          }
          var m = [];
          if (!a || !a.video) return m;
          f(a);
          if (a.video.width && a.video.height) {
            if (a.video.width.ideal && a.video.height.ideal) {
              var l = c(a.video.width.ideal).slice(0, 3),
                q = c(a.video.height.ideal).slice(0, 3),
                k = {},
                n = 0;
              for (k.pa = void 0; n < l.length; k = { pa: k.pa }, ++n) {
                k.pa = l[n];
                var r = {},
                  y = 0;
                for (r.oa = void 0; y < q.length; r = { oa: r.oa }, ++y)
                  if (((r.oa = q[y]), k.pa !== a.video.width.ideal || r.oa !== a.video.height.ideal)) {
                    var D = Math.max(k.pa, r.oa) / Math.min(k.pa, r.oa);
                    D < 4 / 3 - 0.1 ||
                      D > 16 / 9 + 0.1 ||
                      d(
                        (function (z, I) {
                          return function (x) {
                            x.video.width.ideal = z.pa;
                            x.video.height.ideal = I.oa;
                            return x;
                          };
                        })(k, r)
                      );
                  }
              }
            }
            d(function (z) {
              return V.he(z);
            });
          }
          a.video.width &&
            a.video.height &&
            (a.video.width.ideal &&
              a.video.height.ideal &&
              d(function (z) {
                delete z.video.width.ideal;
                delete z.video.height.ideal;
                return z;
              }),
            d(function (z) {
              delete z.video.width;
              delete z.video.height;
              return z;
            }));
          a.video.facingMode &&
            (d(function (z) {
              delete z.video.facingMode;
              return z;
            }),
            a.video.width &&
              a.video.height &&
              d(function (z) {
                V.he(z);
                delete z.video.facingMode;
                return z;
              }));
          m.push({ audio: a.audio, video: !0 });
          return m;
        },
        eg: function (a) {
          if (V.Id()) {
            if (!a || !a.video) return !1;
            var c = a.video.width,
              d = a.video.height;
            if (!c || !d) return !1;
            if (c.ideal && d.ideal && c.ideal > d.ideal) return (a.video.height = c), (a.video.width = d), !0;
          }
          return !1;
        },
        Cb: function (a) {
          a.volume = 0;
          V.Sa(a, "muted");
          if (V.Zc()) {
            if (1 === a.volume) {
              var c = function () {
                a.volume = 0;
                window.removeEventListener("mousemove", c, !1);
                window.removeEventListener("touchstart", c, !1);
              };
              window.addEventListener("mousemove", c, !1);
              window.addEventListener("touchstart", c, !1);
            }
            setTimeout(function () {
              a.volume = 0;
              V.Sa(a, "muted");
            }, 5);
          }
        },
        ke: function (a, c, d) {
          return null === a
            ? Promise.resolve()
            : new Promise(function (f, m) {
                if (a.srcObject && a.srcObject.getVideoTracks) {
                  var l = a.srcObject.getVideoTracks();
                  1 !== l.length ? m("INVALID_TRACKNUMBER") : ((l = l[0]), c ? V.get(a, f, m, d) : (l.stop(), f()));
                } else m("BAD_IMPLEMENTATION");
              });
        },
        ud: function (a, c, d, f) {
          function m(q) {
            l || ((l = !0), d(q));
          }
          var l = !1;
          return navigator.mediaDevices
            .getUserMedia(f)
            .then(function (q) {
              function k() {
                setTimeout(function () {
                  if (a.currentTime) {
                    var r = a.videoHeight;
                    if (0 === a.videoWidth || 0 === r) m("VIDEO_NULLSIZE");
                    else {
                      var y = { ze: null, ag: null, Cf: null };
                      try {
                        var D = q.getVideoTracks()[0];
                        D && ((y.Cf = D), (y.ze = D.getCapabilities()), (y.ag = D.getSettings()));
                      } catch (z) {}
                      V.Ae()
                        ? a.parentNode && null !== a.parentNode
                          ? (l || c(a, q, y),
                            setTimeout(function () {
                              a.play();
                            }, 100))
                          : (document.body.appendChild(a),
                            V.Cb(a),
                            setTimeout(function () {
                              a.style.transform = "scale(0.0001,0.0001)";
                              a.style.position = "fixed";
                              a.style.bottom = "0px";
                              a.style.right = "0px";
                              V.Cb(a);
                              setTimeout(function () {
                                a.play();
                                l || c(a, q, y);
                              }, 100);
                            }, 80))
                        : l || c(a, q, y);
                    }
                  } else m("VIDEO_NOTSTARTED");
                }, 700);
              }
              function n() {
                a.removeEventListener("loadeddata", n, !1);
                var r = a.play();
                V.Cb(a);
                "undefined" === typeof r
                  ? k()
                  : r
                      .then(function () {
                        k();
                      })
                      .catch(function () {
                        m("VIDEO_PLAYPROMISEREJECTED");
                      });
              }
              "undefined" !== typeof a.srcObject
                ? (a.srcObject = q)
                : ((a.src = window.URL.createObjectURL(q)), (a.videoStream = q));
              V.Cb(a);
              a.addEventListener("loadeddata", n, !1);
            })
            .catch(function (q) {
              m(q);
            });
        },
        hf: function (a, c) {
          var d = c || V.vd();
          return new Promise(function (f, m) {
            V.get(d, f, m, a);
          });
        },
        get: function (a, c, d, f) {
          if (!a) return d && d("VIDEO_NOTPROVIDED"), !1;
          if (!V.ad()) return d && d("MEDIASTREAMAPI_NOTFOUND"), !1;
          if (f && f.video && V.Yc()) {
            var m = V.Ue();
            0 !== m[0] && (12 > m[0] || (12 === m[0] && 2 > m[1])) && V.eg(f);
          }
          V.Sa(a, "autoplay");
          V.Sa(a, "playsinline");
          f && f.audio ? (a.volume = 0) : V.Sa(a, "muted");
          V.ud(
            a,
            c,
            function () {
              function l(k) {
                if (0 === k.length) d("INVALID_FALLBACKCONSTRAINTS");
                else {
                  var n = k.shift();
                  V.ud(
                    a,
                    c,
                    function () {
                      l(k);
                    },
                    n
                  );
                }
              }
              var q = V.Fe(f);
              l(q);
            },
            f
          );
        },
        jf: function (a) {
          if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return a(!1, "NOTSUPPORTED"), !1;
          navigator.mediaDevices
            .enumerateDevices()
            .then(function (c) {
              (c = c.filter(function (d) {
                return d.kind && -1 !== d.kind.toLowerCase().indexOf("video") && d.label && d.deviceId;
              })) &&
              c.length &&
              0 < c.length
                ? a(c, !1)
                : a(!1, "NODEVICESFOUND");
            })
            .catch(function () {
              a(!1, "PROMISEREJECTED");
            });
        },
        vg: function (a, c, d) {
          var f = {};
          f[c] = d;
          c = [];
          c.push(f);
          a.applyConstraints({ advanced: c }).catch(function () {});
        },
      },
      qa = (function () {
        function a(G, e, A, B, g, F, u) {
          if (!I)
            if (u === F.length) g();
            else {
              switch (F[u]) {
                case "A":
                  A();
                  break;
                case "D":
                  G();
                  break;
                case "S":
                  e()
                    .then(function (v, C) {
                      x.Lb();
                      a(G, e, A, C ? null : B, g, F, ++u);
                    })
                    .catch(function (v) {
                      console.log("An error occurred in the WebAR loop: ", v);
                      g();
                    });
                  return;
                case "R":
                  B && B();
              }
              a(G, e, A, B, g, F, ++u);
            }
        }
        var c = { n: 5, qc: 1, Kd: 0, ob: [35, 49], jb: [2, 200], k: 0.7, jg: 200, If: 0.05 },
          d = -1,
          f = null,
          m = -1,
          l = -1,
          q = 0,
          k = -1,
          n = -1,
          r = 0,
          y = 0,
          D = c.jb[1],
          z = Math.log(2),
          I = !0,
          x = {
            ff: function () {
              switch (d) {
                case -1:
                  return -1;
                case 0:
                  return n + f.Kd;
                case 1:
                  return r;
              }
            },
            bh: function (G) {
              return Math.pow(Math.min(Math.max(k, 0), f.n - 1) / (f.n - 1), G || 1);
            },
            v: function (G) {
              f = Object.assign({}, c, G);
              k = n = f.qc;
              d = 0;
              x.reset();
            },
            Lb: function (G) {
              G = ("undefined" === typeof G ? Date.now() : G) || 0;
              var e = Math.min(Math.max(G - y, f.jb[0]), f.jb[1]);
              D = e;
              y = G;
              var A = -1 === m ? 0 : f.k;
              m = Math.min(Math.max(1e3 / e, 5), 120) * (1 - A) + m * A;
              G - l > f.jg &&
                5 < ++q &&
                ((e = f.k),
                (k = k * (1 - e) + (m < f.ob[0] ? n - 1 : m > f.ob[1] ? n + 1 : n) * e),
                Math.abs(k - n) > 1 - f.If &&
                  ((e = Math.min(Math.max(Math.round(k), 0), f.n - 1)),
                  e !== n && ((k = n = e), (m = (f.ob[1] - f.ob[0]) / 2))),
                (l = G));
            },
            Ac: function (G, e, A, B, g, F) {
              I = !1;
              a(G, e, A, B, g, F, 0);
            },
            stop: function () {
              I = !0;
            },
            Dc: function (G) {
              r = G;
              d = 1;
            },
            Nc: function () {
              d = 0;
              x.reset();
            },
            reset: function () {
              D = c.jb[1];
              l = m = -1;
              q = 0;
            },
            ei: function (G, e, A) {
              A = Math.exp((-z * D) / A);
              return (1 - A) * G + A * e;
            },
            Xe: function () {
              return D;
            },
          };
        return x;
      })(),
      Na = (function () {
        function a() {
          d(G + I.pc);
          e.port.postMessage("DONE");
        }
        function c() {
          F.cb = 0 === I.bb ? B(d) : B(f);
        }
        function d(w) {
          g.Ea &&
            null !== x &&
            ((w -= G),
            (w = Math.min(Math.max(w, I.dd[0]), I.dd[1])),
            (G += w),
            l(),
            u.isEnabled && u.Xa && g.Y && G - u.mc > I.Rc && (r(), (u.mc = G)),
            x(G));
        }
        function f(w) {
          g.Ea && (F.timeout = setTimeout(d.bind(null, w), I.bb));
        }
        function m() {
          x = null;
          g.Ea = !1;
          l();
        }
        function l() {
          F.cb && (window.cancelAnimationFrame(F.cb), (F.cb = null));
          F.timeout && (window.clearTimeout(F.timeout), (F.timeout = null));
        }
        function q(w) {
          w && !g.Y
            ? ((g.Y = !0), A && qa.Nc(), e.port.postMessage("STOP"), Z.je(!0), c())
            : !w && g.Y && ((g.Y = !1), A && qa.Dc(1), Z.je(!1), e.port.postMessage("START"));
        }
        function k(w) {
          w.target.hidden ? C() : v();
        }
        function n(w, t, p) {
          t = w.createShader(t);
          w.shaderSource(t, p);
          w.compileShader(t);
          return t;
        }
        function r() {
          u.Xa = !1;
          var w = u.ja,
            t = u.sb,
            p = u.tb,
            h = u.W;
          w.uniform1f(u.wd, Math.random());
          u.Fa ? t.beginQueryEXT(h, p) : w.beginQuery(h, p);
          w.drawElements(w.POINTS, 1, w.UNSIGNED_SHORT, 0);
          u.Fa ? t.endQueryEXT(h) : w.endQuery(h);
          Z.flush();
          D()
            .then(function (J) {
              0 === J || isNaN(J)
                ? ((u.isEnabled = !1),
                  console.log(
                    "WARNING in benchmark_GPUClock: WebGL timer queries is not working properly. timeElapsedNs =",
                    J
                  ))
                : ((J = (I.me * I.Qc * 1e3) / J),
                  (u.Ob = (u.Ob + 1) % I.Ja),
                  (u.nc[u.Ob] = J),
                  ++u.Jd > I.Ja &&
                    (u.yb.set(u.nc),
                    u.yb.sort(function (N, O) {
                      return N - O;
                    }),
                    (J = u.yb[Math.floor(I.Ja / 2)]),
                    (u.lb = Math.max(u.lb, J)),
                    I.Pc(J / u.lb)),
                  (u.Xa = !0));
            })
            .catch(function () {
              u.Xa = !0;
            });
        }
        function y(w) {
          var t = u.ja,
            p = u.sb,
            h = u.tb;
          h = u.Fa ? p.Zg(h, p.QUERY_RESULT_AVAILABLE_EXT) : t.getQueryParameter(h, t.QUERY_RESULT_AVAILABLE);
          t = t.getParameter(p.GPU_DISJOINT_EXT);
          h ? w(!t) : setTimeout(y.bind(null, w), 0.1);
        }
        function D() {
          return new Promise(function (w, t) {
            y(function (p) {
              if (p) {
                p = u.ja;
                var h = u.sb,
                  J = u.tb;
                p = u.Fa ? h.getQueryObjectEXT(J, h.QUERY_RESULT_EXT) : p.getQueryParameter(J, p.QUERY_RESULT);
                w(p);
              } else t();
            });
          });
        }
        var z = { Dd: !0, dd: [1, 200], pc: 20, bb: 0, Qc: 50, me: 240, Rc: 3e3, Ja: 3, Pc: null },
          I = null,
          x = null,
          G = 0,
          e = null,
          A = !1,
          B = null,
          g = { ta: !1, Y: !0, lc: !1, kc: !1, jc: !1, Ea: !1 },
          F = { cb: null, timeout: null },
          u = {
            isEnabled: !1,
            Xa: !1,
            ja: null,
            sb: null,
            tb: null,
            W: null,
            wd: null,
            Fa: !0,
            mc: 0,
            Jd: 0,
            nc: null,
            yb: null,
            Ob: 0,
            lb: 0,
          },
          v = q.bind(null, !0),
          C = q.bind(null, !1),
          M = {
            v: function (w) {
              I = Object.assign(z, w);
              Object.assign(g, { Y: !0, ta: !0, Ea: !1 });
              B = window.requestPostAnimationFrame || window.requestAnimationFrame;
              if (null !== I.Pc) {
                w = document.createElement("canvas");
                w.setAttribute("width", "1");
                w.setAttribute("height", "1");
                var t = { antialias: !1 };
                w = w.getContext("webgl2", t) || w.getContext("webgl", t);
                if (
                  (t = w.getExtension("EXT_disjoint_timer_query") || w.getExtension("EXT_disjoint_timer_query_webgl2"))
                ) {
                  u.ja = w;
                  u.sb = t;
                  u.isEnabled = !0;
                  u.Fa = t.beginQueryEXT ? !0 : !1;
                  var p = n(w, w.VERTEX_SHADER, "attribute vec4 a0;void main(){gl_Position=a0;}"),
                    h = n(
                      w,
                      w.FRAGMENT_SHADER,
                      "precision lowp float;uniform float u37;void main(){vec4 a=u37*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace(
                        "666",
                        I.Qc.toString()
                      )
                    ),
                    J = w.createProgram();
                  w.attachShader(J, p);
                  w.attachShader(J, h);
                  w.linkProgram(J);
                  p = w.getAttribLocation(J, "a0");
                  u.wd = w.getUniformLocation(J, "u37");
                  w.useProgram(J);
                  w.enableVertexAttribArray(p);
                  J = w.createBuffer();
                  w.bindBuffer(w.ARRAY_BUFFER, J);
                  w.bufferData(w.ARRAY_BUFFER, new Float32Array([0.5, 0.5, 0, 1]), w.STATIC_DRAW);
                  w.vertexAttribPointer(p, 4, w.FLOAT, !1, 16, 0);
                  J = w.createBuffer();
                  w.bindBuffer(w.ELEMENT_ARRAY_BUFFER, J);
                  w.bufferData(w.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), w.STATIC_DRAW);
                  w.disable(w.DEPTH_TEST);
                  w.disable(w.DITHER);
                  w.disable(w.STENCIL_TEST);
                  w.viewport(0, 0, 1, 1);
                  J = u.Fa ? t.createQueryEXT() : w.createQuery();
                  u.tb = J;
                  u.W = t.TIME_ELAPSED_EXT || w.TIME_ELAPSED;
                  u.mc = -I.Rc;
                  u.nc = new Float32Array(I.Ja);
                  u.yb = new Float32Array(I.Ja);
                  u.lb = 0;
                  u.Ob = 0;
                  u.Jd = 0;
                  u.Xa = !0;
                }
              }
              if (I.Dd) {
                w = !1;
                try {
                  if ("undefined" === typeof SharedWorker) {
                    var N = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                              I.pc.toString() +
                              ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      O = new Worker(N);
                    O.addEventListener("message", a);
                    e = { Td: O, port: O };
                    g.lc = !0;
                  } else {
                    var Y = URL.createObjectURL(
                        new Blob(
                          [
                            "let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                              I.pc.toString() +
                              ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()",
                          ],
                          { type: "text/javascript" }
                        )
                      ),
                      oa = new SharedWorker(Y);
                    oa.port.start();
                    oa.port.addEventListener("message", a);
                    e = { Td: oa, port: oa.port };
                    g.kc = !0;
                  }
                  w = !0;
                } catch (sa) {}
                w &&
                  ("onvisibilitychange" in document
                    ? document.addEventListener("visibilitychange", k)
                    : (window.addEventListener("blur", C), window.addEventListener("focus", v)),
                  window.addEventListener("pagehide", C),
                  window.addEventListener("pageshow", v),
                  (g.jc = !0));
              }
              A = "undefined" !== typeof qa;
            },
            m: function () {
              m();
              g.jc &&
                ("onvisibilitychange" in document
                  ? document.removeEventListener("visibilitychange", k)
                  : (window.removeEventListener("blur", C), window.removeEventListener("focus", v)),
                window.removeEventListener("pagehide", C),
                window.removeEventListener("pageshow", v),
                (g.jc = !1));
              g.kc ? (e.port.close(), (g.kc = !1)) : g.lc && (e.Td.terminate(), (g.lc = !1));
              Object.assign(g, { Y: !0, ta: !1, Ea: !1 });
              x = null;
            },
            Hh: function () {
              return g.Y;
            },
            update: function (w) {
              Object.assign(I, w);
            },
            Ac: function (w) {
              g.ta || M.v({});
              l();
              g.Ea = !0;
              x = w;
              g.Y && c();
            },
            stop: m,
          };
        return M;
      })(),
      Ta = (function () {
        function a(D, z) {
          var I = D[0] - 0.5;
          D = D[1] - 0.5;
          var x = z[0] - 0.5;
          z = z[1] - 0.5;
          return I * I + D * D - (x * x + z * z);
        }
        var c = { Od: 4, Eb: [1.5, 1.5, 2], M: [0.1, 0.1, 0.1], Yd: 1, u: -1, K: -1, dg: 2, Hf: 1, Cc: !0, Me: 0.8 },
          d = null,
          f = [],
          m = [],
          l = [],
          q = [0],
          k = [0.5, 0.5, 1],
          n = null,
          r = 0,
          y = [0, 0, 0];
        return {
          v: function (D) {
            d = Object.assign({}, c, D);
            f.splice(0);
            m.splice(0);
            l.splice(0);
            r = 0;
            D = d.Eb[0] * d.M[0];
            var z = d.Eb[1] * d.M[1],
              I = 1 / (1 + d.Eb[2] * d.M[2]),
              x = d.Yd * Math.min(d.u, d.K),
              G = x / d.u;
            x /= d.K;
            var e = 0.5 * d.Me;
            e *= e;
            for (var A = 0; A < d.Od; ++A) {
              var B = [];
              m.push(B);
              var g = Math.pow(I, A),
                F = G * g,
                u = x * g;
              g = F * d.Hf;
              l.push(g);
              var v = F * D,
                C = u * z;
              F /= 2;
              u /= 2;
              for (var M = 1 + (1 - F - F) / v, w = 1 + (1 - u - u) / C, t = 0; t < w; ++t)
                for (var p = u + t * C, h = p - 0.5, J = 0; J < M; ++J) {
                  var N = F + J * v,
                    O = N - 0.5;
                  O * O + h * h > e || ((N = [N, p, g]), f.push(N), B.push(N));
                }
              d.Cc && B.sort(a);
              n = f;
            }
            d.Cc && f.sort(a);
          },
          get: function (D) {
            var z = n.length;
            if (0 === z) return k;
            for (; D >= q.length; ) q.push(0);
            q[D] >= z && (q[D] = 0);
            var I = n[Math.floor(q[D]) % z];
            q[D] = (q[D] + 1 / d.dg) % z;
            if (0 === r) return I;
            y[0] = I[0];
            y[1] = I[1];
            y[2] = r;
            return y;
          },
          Nh: function (D) {
            D >= q.length || (q[D] = Math.floor(Math.random() * n.length));
          },
          Ec: function (D) {
            r = D;
            if (0 === r) n = f;
            else {
              for (var z = l.length, I = z - 1, x = 0; x < z; ++x)
                if (l[x] <= D) {
                  I = x;
                  break;
                }
              n = m[I];
            }
          },
          reset: function () {
            for (var D = f.length / q.length, z = 0; z < q.length; ++z) q[z] = Math.floor(z * D);
            r = 0;
            n = f;
          },
        };
      })(),
      da = (function () {
        function a(e, A, B, g) {
          return Math.max(0, B > e ? e + A / 2 - (B - g / 2) : B + g / 2 - (e - A / 2));
        }
        function c(e) {
          return !k.Ad(e);
        }
        function d(e, A, B) {
          for (var g = e.length; x.length < g; )
            x.push({ ma: [0, 0], Ab: [0, 0], ga: [0, 0], wa: 0, scale: 0, Ra: 0, $a: 0 });
          g = e.length;
          for (var F = 0; F < g; ++F) {
            var u = e[F],
              v = x[F],
              C = A[F].rz,
              M = Math.cos(C),
              w = Math.sin(C);
            v.wa = C;
            v.Ra = M;
            v.$a = w;
            v.ga[0] = u.x;
            v.ga[1] = u.y / B;
            v.scale = u.aa;
            v.ma[0] = u.aa * k.ed[0];
            v.ma[1] = u.aa * k.ed[1];
            v.Ab[0] = v.ma[0] * v.ma[0];
            v.Ab[1] = v.ma[1] * v.ma[1];
          }
        }
        function f(e, A, B) {
          var g = Math.abs(-e.$a * (B - e.ga[1]) - e.Ra * (A - e.ga[0]));
          A = Math.abs(e.Ra * (B - e.ga[1]) - e.$a * (A - e.ga[0]));
          return 1 >= (g * g) / e.Ab[0] + (A * A) / e.Ab[1];
        }
        function m(e, A, B, g) {
          var F = e[B];
          d(e, A, g);
          var u = x[B];
          return e.some(function (v, C) {
            if (
              !(v =
                C === B ||
                F.ua > v.ua ||
                3 > v.ua ||
                !(0 < a(F.x, F.aa * I, v.x, v.aa * I)) ||
                !(0 < a(F.y, F.aa * g * I, v.y, v.aa * g * I)))
            ) {
              v = x[C];
              u.scale > v.scale ? (C = u) : ((C = v), (v = u));
              for (var M = 0, w = 0, t = k.Ne, p = 0; p < t; ++p)
                for (var h = (((p + 0.5) / t) * 2 - 1) * v.ma[1], J = 0; J < t; ++J) {
                  var N = (((J + 0.5) / t) * 2 - 1) * v.ma[0],
                    O = v.ga[0] + (-h * v.$a + N * v.Ra);
                  N = v.ga[1] + (h * v.Ra + N * v.$a);
                  f(v, O, N) && (++M, f(C, O, N) && ++w);
                }
              v = w / M < k.Ld;
            }
            return v ? !1 : !0;
          });
        }
        function l(e) {
          return e.isDetected;
        }
        var q = { L: 1, Ld: 0.3, ed: [1, 1], Ne: 6, $d: 0.3, Ad: null, wf: !0 },
          k = null,
          n = 0,
          r = null,
          y = !1,
          D = 0,
          z = 0,
          I = Math.sqrt(2),
          x = [],
          G = {
            v: function (e) {
              k = Object.assign({}, q, e);
              r = [0];
            },
            Hd: function () {
              return 1 !== k.L;
            },
            sd: function () {
              return n;
            },
            Gd: function () {
              return y;
            },
            ra: function () {
              return k.L;
            },
            sh: function () {
              return r;
            },
            zf: function (e) {
              return r.includes(e);
            },
            update: function (e, A) {
              var B = r;
              if (B.length > e) B.splice(0, B.length - e);
              else for (; B.length < e; ) B.push(0);
              if (1 !== k.L)
                if (A.every(c)) {
                  A = D;
                  for (var g = 0; g < e; ++g) (B[g] = A), (A = (A + 1) % k.L);
                  D = A;
                } else {
                  g = Math.round(k.$d * e);
                  g = Math.max(1, g);
                  for (var F = D, u = 0, v = 0; u < e; ++u) {
                    if (c(A[F]) && ++v > g) {
                      do ++F === k.L && (F = 0);
                      while (c(A[F]));
                    }
                    B[u] = F;
                    F = (F + 1) % k.L;
                  }
                  D = F;
                }
            },
            Lb: function (e) {
              n = r[e];
              z = (0.5 + n) / k.L;
              y = r.lastIndexOf(n) === e;
              return n;
            },
            bg: function (e, A, B) {
              return 1 === k.L ? !1 : m(e, A, n, B);
            },
            ie: function (e) {
              (k.wf && 1 === k.L) || H.F(e, z);
            },
            Re: function (e) {
              return e.find(l);
            },
            Xg: function (e) {
              return e.findIndex(l);
            },
            Vg: function (e) {
              var A = G.Re(e);
              if (!A || e.every(l)) return Ta.Ec(0), !1;
              Ta.Ec(A.s);
              return !0;
            },
            Le: function (e) {
              for (var A = new Float32Array(e.length * k.L), B = 0, g; B < k.L; ++B)
                for (g = 0; g < e.length; ++g) A[B * e.length + g] = e[g];
              return A;
            },
            $b: function (e) {
              for (var A = [], B = 0; B < k.L; ++B) {
                var g = A,
                  F = g.push,
                  u = void 0,
                  v = e,
                  C = {};
                for (u in v) {
                  var M = u;
                  var w = v[u];
                  var t = typeof w;
                  w = ["string", "boolean", "number"].includes(t)
                    ? w
                    : "object" !== t
                    ? null
                    : ArrayBuffer.isView(w)
                    ? w.slice()
                    : JSON.parse(JSON.stringify(w));
                  C[M] = w;
                }
                F.call(g, C);
              }
              return A;
            },
          };
        return G;
      })(),
      ea = {
        neuralNetworkPath: "NN_DEFAULT.json",
        ca: 0,
        Qf: {
          threshold: 1.2,
          nScaleLevels: 2,
          scale0Factor: 0.8,
          nDetectsPerLoopRange: [2, 6],
          overlapFactors: [2, 2, 3],
          scanCenterFirst: !0,
          nDetectsPerLoop: -1,
          multiDetectionThresholdFactors: [0.5, 0.6],
          translationScalingFactors: [0.3, 0.3, 1],
          isCleanGLStateAtEachIteration: !0,
          enableAsyncReadPixels: !1,
          animateProcessOrder: "DSAR",
        },
        gg: 50,
        Ef: 0.4,
        Df: 8,
        Ff: 0.3,
        cg: {
          translationFactorRange: [0.002, 0.005],
          rotationFactorRange: [0.015, 0.1],
          qualityFactorRange: [0.9, 0.98],
          alphaRange: [0.05, 1],
          followZRotAlphaFactor: 0.8,
        },
        Ya: [0.65, 1, 0.262],
        pe: 0.2,
        re: 2,
        qe: 0.1,
        Gf: 8,
        Nd: 1,
        Qe: $a.Bb.bind(null, 0.3, 0.7),
        lg: 20,
        fe: 3,
      },
      pa = {
        facingMode: "user",
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1920,
        minHeight: 480,
        maxHeight: 1920,
        rotate: 0,
        flipX: !1,
      },
      ia = { sc: -3, Af: -1, error: -2, ready: 1, play: 2, pause: 3 },
      na = ia.sc,
      L = null,
      gc = { vb: !1, Hc: null, element: null, J: null, D: [0, 0], A: [0.5, 0, 0, 0.5], Gb: 0, Pa: null, ub: !1 },
      R = null,
      hc = { Oa: null, Qb: null, antialias: !0, Sc: "./", Ka: null, fa: null, ca: ea.ca, Sd: ea.ca, wb: !1, Aa: !0 },
      Pa = null,
      ba = null,
      ra = null,
      Qa = 1,
      Oa = { Bc: -1, Vb: -1 },
      aa = null,
      ic = { u: 0, K: 0, D: [0, 0], Va: null },
      U = { xa: null, buffer: null, M: null, Ya: null, $: ea.Nd, Zd: 1, Ta: null },
      Sa = null,
      Ba = null,
      jb = [],
      kb = [],
      sb = {
        VERSION: "3.2.1",
        init: function (a) {
          function c() {
            na !== ia.error &&
              2 === ++f &&
              (Ka(),
              Ab(),
              Ja(),
              R.Oa &&
                ((na = ia.ready),
                R.Oa(!1, {
                  GL: b,
                  canvasElement: R.fa,
                  videoTexture: L.J.get(),
                  videoTransformMat2: L.A,
                  maxFacesDetected: da.ra(),
                  videoElement: L.element,
                }),
                ib()),
              hb());
          }
          if (na !== ia.sc) return a.callbackReady && a.callbackReady("ALREADY_INITIALIZED"), !1;
          na = ia.Af;
          L = Object.assign({}, gc);
          R = Object.assign({}, hc);
          aa = Object.assign({}, ic);
          U.Ya = ea.Ya.slice(0);
          "undefined" !== typeof a.antialias && (R.antialias = a.antialias);
          a.callbackReady && (R.Oa = a.callbackReady);
          a.callbackTrack && (R.Qb = a.callbackTrack);
          a.nExpressions && (U.$ = a.nExpressions);
          a.expressionsEasings && (U.Ta = a.expressionsEasings);
          "undefined" !== typeof a.animateDelay && (R.ca = a.animateDelay);
          "undefined" !== typeof a.NNCPath && (R.Sc = a.NNCPath);
          "undefined" !== typeof a.NNC && (R.Ka = a.NNC);
          "undefined" !== typeof a.followZRot && (R.Aa = a.followZRot ? !0 : !1);
          if (!a.canvasId && !a.canvas) return Ia("NO_CANVASID"), !1;
          R.fa = a.canvas ? a.canvas : document.getElementById(a.canvasId);
          if (!R.fa) return Ia("INVALID_CANVASID"), !1;
          aa.u = R.fa.width;
          aa.K = R.fa.height;
          if (!aa.u || !aa.K) return Ia("INVALID_CANVASDIMENSIONS"), !1;
          ba = Object.create(ea.Qf);
          a.scanSettings && Object.assign(ba, a.scanSettings);
          var d = 1;
          "undefined" !== typeof a.maxFacesDetected && (d = Math.max(1, a.maxFacesDetected));
          if (d > ea.Df) return Ia("MAXFACES_TOOHIGH"), !1;
          da.v({
            L: d,
            Ld: ea.Ef,
            $d: ea.Ff,
            Ad: function (m) {
              return m.detected > ba.multiDetectionThresholdFactors[1] * ba.threshold;
            },
          });
          for (d = 0; d < da.ra(); ++d) jb.push(new Float32Array(ea.Gf)), kb.push(0);
          Na.v({ Dd: a.isKeepRunningOnWinFocusLost || !1, bb: R.ca });
          qa.v({
            qc: 0,
            n: ba.nDetectsPerLoopRange[1] - ba.nDetectsPerLoopRange[0] + 1,
            Kd: ba.nDetectsPerLoopRange[0],
          });
          -1 !== ba.nDetectsPerLoop ? qa.Dc(ba.nDetectsPerLoop) : qa.Nc();
          U.M = ba.translationScalingFactors.slice(0);
          ra = Object.create(ea.cg);
          a.stabilizationSettings && Object.assign(ra, a.stabilizationSettings);
          var f = 0;
          a.videoSettings && a.videoSettings.videoElement
            ? bb(a.videoSettings.videoElement, c)
            : (a.videoSettings && Object.assign(pa, a.videoSettings),
              Cb(a.onWebcamAsk, a.onWebcamGet, function (m) {
                bb(m, c);
              }));
          Sb(function (m) {
            if (!Tb()) return !1;
            Pa = new Jb({ zb: m.layers, yc: "gpuRawAvg", uc: Ub });
            H.ab([
              {
                id: "s59",
                name: "_",
                ya: "attribute vec2 a0;uniform mat2 u38;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5)+u38*a0;}",
                eb: ["a0"],
                Ma: [2],
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1", "u38"],
                precision: "lowp",
              },
              {
                id: "s60",
                name: "_",
                h: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                ya: "attribute vec2 a0;uniform sampler2D u39;uniform mat2 u38;uniform vec2 u40;uniform float u41,u42,u43;varying vec2 vv0;void main(){vec4 a=texture2D(u39,vec2(.17,u41));vec2 f=a.gb,g=a.a*u40,b=a0;b.x*=u43;float c=cos(u42),d=sin(u42);vec2 h=mat2(c,d,-d,c)*b,i=f+h*.5*g,j=i-.5;vv0=vec2(.5)+2.*u38*j,gl_Position=vec4(a0,0.,1.);}",
                eb: ["a0"],
                Ma: [2],
                i: "u1 u39 u40 u41 u42 u43 u38".split(" "),
                precision: "lowp",
              },
              {
                id: "s61",
                name: "_",
                h: "uniform sampler2D u44,u39;uniform vec3 u45,u46;uniform float u47,u48,u41,u49,u42,u50;const vec4 e=vec4(.25);void main(){vec4 d=texture2D(u44,vec2(.625,.625)),f=texture2D(u44,vec2(.875,.625)),a=texture2D(u39,vec2(.17,u41));float g=dot(d-f,e);bool h=g>u48;a.r<-.5?a.r+=1.:h?a.r=2.:a.r>u47?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r=mix(-2.,a.r,u49);if(a.r<.9)a=vec4(1.,u45);else{a.r*=step(1.9,a.r);float i=dot(e,texture2D(u44,vec2(.875,.875))),j=dot(e,texture2D(u44,vec2(.125,.625))),k=dot(e,texture2D(u44,vec2(.375,.625))),b=cos(u42),c=sin(u42);vec2 l=mat2(b,c*u50,-c/u50,b)*vec2(i,j);a.gba+=vec3(l,k)*u46*a.a;}gl_FragColor=a;}",
                ya: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                i: "u44 u39 u45 u47 u46 u49 u42 u50 u48 u41".split(" "),
              },
              {
                id: "s62",
                name: "_",
                ya: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u44;uniform float u49;const vec4 e=vec4(.25);const vec3 f=vec3(.5);void main(){float a=dot(e,texture2D(u44,vec2(.125,.875))),b=dot(e,texture2D(u44,vec2(.375,.875))),c=dot(e,texture2D(u44,vec2(.625,.875))),d=dot(e,texture2D(u44,vec2(.625,.625)));vec3 g=vec3(a,b,c)*.5+f;gl_FragColor=vec4(g,d*u49);}",
                i: ["u44", "u49"],
              },
              {
                id: "s63",
                name: "_",
                ya: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                h: "uniform sampler2D u44;const vec4 e=vec4(.25);void main(){float a=dot(e,texture2D(u44,vec2(.375,.375))),b=dot(e,texture2D(u44,vec2(.625,.375))),c=dot(e,texture2D(u44,vec2(.875,.375))),d=dot(e,texture2D(u44,vec2(.125,.125)));gl_FragColor=vec4(a,b,c,d);}",
                i: ["u44"],
              },
              {
                id: "s58",
                name: "_",
                h: "uniform sampler2D u39;uniform vec2 u51;uniform float u52;varying vec2 vv0;void main(){float f=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u39,vv0+u51);a.a=mix(a.a*u52,a.a,c);vec4 d=floor(255.*a),g=255.*(255.*a-d),b=mix(d,g,f)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                i: ["u39", "u52", "u51"],
              },
            ]);
            yb();
            U.buffer = new Uint8Array(8 * ea.fe * da.ra());
            Sa = da.$b({ hb: 0, x: 0, y: 0, aa: 1, rx: 0, ry: 0, wa: 0, nd: new Float32Array(U.$), ua: 0 });
            Ba = da.$b({
              detected: 0,
              x: 0,
              y: 0,
              s: 1,
              xRaw: 0,
              yRaw: 0,
              sRaw: 1,
              rx: 0,
              ry: 0,
              rz: 0,
              expressions: new Float32Array(U.$),
            });
            da.$b({ dx: 0, dy: 0, Zb: 0, Wb: 0, Xb: 0, Yb: 0 });
            mb();
            lb();
            c();
          });
          return !0;
        },
        destroy: function () {
          Na.m();
          return new Promise(function (a) {
            sb.toggle_pause(!0, !0)
              .finally(function () {
                Pa && Pa.m();
                Ha.m();
                Pa = Ba = Sa = null;
                jb.splice(0);
                kb.splice(0);
                aa.Va = null;
                U.xa = null;
                L.J = null;
                na = ia.sc;
                a();
              })
              .catch(function () {});
          });
        },
        toggle_videoStream: function (a) {
          return L.ub || !L.element ? Promise.resolve() : V.ke(L.element, a, L.Pa);
        },
        toggle_pause: function (a, c) {
          if (!Za()) return Promise.reject("NOT_READY");
          c = c ? sb.toggle_videoStream(!a) : Promise.resolve();
          a
            ? wb()
            : c.then(function () {
                hb();
              });
          return c;
        },
        update_videoSettings: function (a) {
          wb();
          return new Promise(function (c, d) {
            V.ke(L.element, !1, L.Pa)
              .then(function () {
                Object.assign(pa, a);
                Cb(null, null, function (f) {
                  bb(f, function () {
                    Ka();
                    Ja();
                    hb();
                    c();
                  });
                });
              })
              .catch(d);
          });
        },
        toggle_slow: function (a) {
          Za() &&
            na === ia.play &&
            (a && !R.wb
              ? ((R.Sd = R.ca), (ba.nDetectsPerLoop = 1), this.set_animateDelay(ea.ng), (R.wb = !0))
              : !a && R.wb && ((ba.nDetectsPerLoop = -1), this.set_animateDelay(R.Sd), (R.wb = !1)));
        },
        set_animateDelay: function (a) {
          R.ca = a;
          Na.update({ bb: R.ca });
        },
        resize: function () {
          if (!Za()) return !1;
          var a = R.fa.width,
            c = R.fa.height;
          if (!nb() && a === aa.u && c === aa.K) return !1;
          aa.u = a;
          aa.K = c;
          H.O();
          mb();
          lb();
          Ka();
          Ja();
          return !0;
        },
        set_inputTexture: function (a, c, d) {
          L.D[0] = c;
          L.D[1] = d;
          L.J = X.instance({ width: c, height: d, ec: a });
          L.vb = !0;
          Ka();
          ib();
          Ja();
        },
        reset_GLState: function () {
          ib();
          aa.Va.remove();
          U.xa.remove();
          yb();
        },
        render_video: function () {
          va.N();
          H.set("s59");
          b.viewport(0, 0, aa.u, aa.K);
          L.J.g(0);
          P.l(!0, !0);
        },
        reset_inputTexture: function () {
          L.vb = !1;
          L.J = L.Hc;
          nb();
          Ka();
          Ja();
        },
        get_videoDevices: function (a) {
          return V.jf(a);
        },
        set_scanSettings: function (a) {
          Object.assign(ba, a);
          -1 !== ba.nDetectsPerLoop ? qa.Dc(ba.nDetectsPerLoop) : qa.Nc();
          mb();
          lb();
        },
        set_stabilizationSettings: function (a) {
          Object.assign(ra, a);
        },
        set_videoOrientation: function (a, c) {
          Za() && ((pa.flipX = c), (pa.rotate = a), Ka(), Ja());
        },
        update_videoElement: function (a, c) {
          bb(a ? a : L.element, function () {
            Ab();
            Ka();
            Ja();
            c && c();
          });
        },
        create_new: function () {
          return window.JEELIZFACEFILTERGEN();
        },
      };
    return sb;
  };
  window.JEELIZFACEFILTER = window.JEELIZFACEFILTERGEN();
  return JEELIZFACEFILTER || window.JEELIZFACEFILTER;
};
