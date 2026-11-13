/* LCARS-inspired interface effects. Everything here is decorative:
   the site works fully without JavaScript. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- stardate (a playful, made-up formula) ---- */
  function stardate(d) {
    var epoch = Date.UTC(1987, 8, 28); // TNG premiere, as a nod
    var years = (d.getTime() - epoch) / (365.2425 * 864e5);
    return (41000 + years * 1000).toFixed(1);
  }
  var sd = document.getElementById("stardate");
  if (sd) {
    var now = new Date();
    var day;
    try {
      // always the calendar date in Rio de Janeiro, as DD/MM/YYYY
      day = new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit", month: "2-digit", year: "numeric"
      }).format(now);
    } catch (e) {
      // no Intl time-zone support: Rio is UTC-3 (no DST since 2019)
      var rio = new Date(now.getTime() - 3 * 36e5);
      var p = function (n) { return (n < 10 ? "0" : "") + n; };
      day = p(rio.getUTCDate()) + "/" + p(rio.getUTCMonth() + 1) + "/" + rio.getUTCFullYear();
    }
    sd.textContent = "Stardate " + stardate(now) + " · " + day;
  }

  /* ---- number cascade ---- */
  var box = document.querySelector(".data-cascade");
  if (box) {
    var COLS = 7, ROWS = 6, cells = [];
    var tones = ["d1", "d1", "d2", "d3", "d4", "d5"];
    var rnd = function (n) { return Math.floor(Math.random() * n); };
    var num = function () {
      var digits = 2 + rnd(5);
      var s = String(rnd(Math.pow(10, digits)));
      while (s.length < digits) s = "0" + s;
      return rnd(5) === 0 ? s.slice(0, 2) + "-" + s.slice(2) : s;
    };
    for (var i = 0; i < COLS * ROWS; i++) {
      var span = document.createElement("span");
      span.textContent = num();
      span.className = tones[rnd(tones.length)];
      box.appendChild(span);
      cells.push(span);
    }
    if (!reduceMotion) {
      setInterval(function () {
        for (var k = 0; k < 3; k++) {
          var c = cells[rnd(cells.length)];
          c.textContent = num();
          c.className = tones[rnd(tones.length)];
        }
      }, 160);
    }
  }

  /* ---- email: assembled only on request, never written in the HTML ---- */
  var em = document.querySelector(".email[data-a]");
  if (em) {
    var rev = function (s) { return s.split("").reverse().join(""); };
    var show = em.querySelector(".email-show");
    var addr = em.querySelector(".email-addr");
    var copy = em.querySelector(".email-copy");
    var msg = em.querySelector(".email-msg");
    var say = function (t) {
      msg.textContent = t;
      setTimeout(function () { msg.textContent = ""; }, 2500);
    };
    show.addEventListener("click", function () {
      addr.textContent = rev(em.getAttribute("data-a")) + "@" + rev(em.getAttribute("data-b"));
      addr.hidden = false;
      copy.hidden = false;
      show.hidden = true;
    });
    copy.addEventListener("click", function () {
      var fallback = function () {
        var r = document.createRange();
        r.selectNodeContents(addr);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { /* unsupported */ }
        say(ok ? "Copied!" : "Selected — press Ctrl+C to copy");
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addr.textContent).then(function () { say("Copied!"); }, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---- video previews: swap in the YouTube player on click ----
     Opened from disk (file://) YouTube refuses to embed, so the link
     just opens the video on YouTube; online it plays in place. */
  if (location.protocol !== "file:") {
    var previews = document.querySelectorAll("a.yt[data-yt]");
    Array.prototype.forEach.call(previews, function (a) {
      a.addEventListener("click", function (ev) {
        if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
        ev.preventDefault();
        var f = document.createElement("iframe");
        f.src = "https://www.youtube-nocookie.com/embed/" + a.getAttribute("data-yt") +
          "?autoplay=1&start=" + (a.getAttribute("data-start") || 0);
        f.title = a.getAttribute("aria-label") || "YouTube video";
        f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        f.setAttribute("allowfullscreen", "");
        f.referrerPolicy = "strict-origin-when-cross-origin";
        var box = document.createElement("div");
        box.className = "video";
        box.setAttribute("style", a.getAttribute("style") || "");
        box.appendChild(f);
        a.parentNode.replaceChild(box, a);
      });
    });
  }
})();
