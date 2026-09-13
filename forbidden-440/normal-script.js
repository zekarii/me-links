(function () {
  var BAN_KEY = 'gate-banned';

  var overlay = document.getElementById('overlay');
  var modalBox = document.getElementById('modalBox');
  var mainPage = document.getElementById('mainPage');
  var mainTitle = document.getElementById('mainTitle');
  var bannedScreen = document.getElementById('bannedScreen');
  var btnYes = document.getElementById('btnYes');
  var btnNo = document.getElementById('btnNo');

  function showBanned() {
    overlay.style.display = 'none';
    mainPage.style.display = 'none';
    bannedScreen.hidden = false;
  }

  function isAlreadyBanned() {
    try {
      return localStorage.getItem(BAN_KEY) === 'true';
    } catch (e) {
      // storage blocked (private browsing, sandboxed preview, etc.) - treat as a first visit
      return false;
    }
  }

  function setBanned() {
    try {
      localStorage.setItem(BAN_KEY, 'true');
    } catch (e) {
    }
  }

  // Returning visitor who already said "No" on this browser - skip straight to the ban.
  if (isAlreadyBanned()) {
    showBanned();
    return;
  }

  function revealMain() {
    overlay.classList.add('hide');
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 650);

    mainPage.style.display = 'flex';
    document.body.classList.add('unlocked');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        mainPage.classList.add('show');
        mainTitle.classList.add('flicker');
      });
    });
  }

  btnYes.addEventListener('click', revealMain);

  btnNo.addEventListener('click', function () {
    setBanned();
    modalBox.classList.add('shake');
    modalBox.addEventListener('animationend', function handler() {
      modalBox.removeEventListener('animationend', handler);
      window.close();
      showBanned();
    });
  });
})();