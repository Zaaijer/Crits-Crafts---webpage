/*
  site-gate.js — a lightweight "coming soon" password gate.

  IMPORTANT — read before using:
  This is NOT real security. The password lives in plain text in this file,
  visible to anyone who views page source or opens browser dev tools. It only
  stops casual visitors and search engines from seeing an unfinished site —
  it will not stop anyone who actually wants to bypass it. Never use this to
  protect anything sensitive, and never reuse a real account password here.

  HOW TO USE:
  1. Change PASSWORD below to whatever you want.
  2. Add this ONE line as the very first thing inside <body>, before any
     other content, on every page you want gated (index.html, adventure.html):
       <script src="js/site-gate.js"></script>
  3. That's it — no other HTML or CSS needed, this file builds its own overlay.

  HOW IT WORKS:
  - Runs immediately when the page starts loading (because it's placed first).
  - Checks sessionStorage for an "unlocked" flag. If present, does nothing —
    visitor already entered the password once this browser session.
  - If not unlocked, it builds a full-screen overlay covering the entire page
    and injects it before anything else can be seen. Entering the correct
    password removes the overlay and sets the sessionStorage flag so it
    won't ask again until the browser tab/session closes.
*/

(function () {
  var PASSWORD = "Hira"; // <-- change this

  if (sessionStorage.getItem("site-unlocked") === "true") {
    return; // already unlocked this session, show the real site normally
  }

  // Hide the page instantly so there's no flash of real content before
  // the overlay is ready.
  document.documentElement.style.visibility = "hidden";

  function buildOverlay() {
    var overlay = document.createElement("div");
    overlay.id = "site-gate-overlay";
    overlay.innerHTML =
      '<style>' +
      '#site-gate-overlay{position:fixed;inset:0;z-index:99999;background:#0C0C0D;' +
      'display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;}' +
      '#site-gate-overlay .box{text-align:center;max-width:340px;padding:0 24px;}' +
      '#site-gate-overlay h1{font-family:"Bebas Neue",sans-serif;font-size:26px;' +
      'letter-spacing:0.03em;color:#F2EFE9;margin:0 0 10px;}' +
      '#site-gate-overlay p{color:rgba(242,239,233,0.65);font-size:14px;' +
      'line-height:1.6;margin:0 0 24px;}' +
      '#site-gate-overlay input{width:100%;box-sizing:border-box;padding:12px 14px;' +
      'border-radius:5px;border:1px solid rgba(255,255,255,0.15);background:#16161A;' +
      'color:#F2EFE9;font-size:14px;margin-bottom:12px;}' +
      '#site-gate-overlay input:focus{outline:2px solid #D9A441;border-color:transparent;}' +
      '#site-gate-overlay button{width:100%;padding:12px;border-radius:5px;border:none;' +
      'background:#D9A441;color:#0C0C0D;font-weight:600;font-size:14px;cursor:pointer;}' +
      '#site-gate-overlay button:hover{background:#E8B75A;}' +
      '#site-gate-overlay .error{color:#E8875A;font-size:12.5px;margin-top:10px;' +
      'visibility:hidden;}' +
      '#site-gate-overlay .error.show{visibility:visible;}' +
      '</style>' +
      '<div class="box">' +
      '<h1>Coming Soon</h1>' +
      '<p>This site is still under construction. If you have the password, enter it below.</p>' +
      '<form id="site-gate-form">' +
      '<input type="password" id="site-gate-input" placeholder="Password" autocomplete="off">' +
      '<button type="submit">Enter</button>' +
      '<div class="error" id="site-gate-error">That password isn\'t right — try again.</div>' +
      '</form>' +
      '</div>';

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = "visible";

    var form = document.getElementById("site-gate-form");
    var input = document.getElementById("site-gate-input");
    var error = document.getElementById("site-gate-error");

    input.focus();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === PASSWORD) {
        sessionStorage.setItem("site-unlocked", "true");
        overlay.remove();
      } else {
        error.classList.add("show");
        input.value = "";
        input.focus();
      }
    });
  }

  // document.body already exists at this point as long as this script tag
  // is placed as the very first thing inside <body>.
  buildOverlay();
})();
