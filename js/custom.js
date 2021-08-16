(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelector('.skip-button').addEventListener('click', (e)=>{
  const skipMenu = document.querySelector('.skipMenu-menu');
  skipMenu.classList.toggle('open');
  const allLinks = skipMenu.querySelectorAll('a');
  e.target.blur();

  allLinks.forEach((item)=>{
    if(skipMenu.classList.contains('open')) {
      item.tabIndex = 0;
    } else {
      item.tabIndex = -1;
    }
  })
});


document.querySelector('.skipMenu-menu').addEventListener('click', (e)=>{
  e.currentTarget.classList.toggle('open');
});



(function () {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]')
  const delay = 200;

  const keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  };

  const direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', clickEventListener);
    tab.addEventListener('keydown', keydownEventListener);
    tab.addEventListener('keyup', keyupEventListener);

    tab.index = index;
  })

  function clickEventListener (event) {
    const tab = event.currentTarget;
    activateTab(tab, false);
  }

  function keydownEventListener (event) {
    const key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        activateTab(tabs[0]);
        break;
    }
  }

  function keyupEventListener (event) {
    const key = event.keyCode;

    if (key === keys.left || key === keys.right) {
      switchTabOnArrowPress(event);
    }
  }

  function switchTabOnArrowPress (event) {
    const pressed = event.keyCode;

    tabs.forEach(tab => {
      tab.addEventListener('focus', focusEventHandler);
    })

    if (direction[pressed]) {
      const target = event.currentTarget;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab();
        }
        else if (pressed === keys.right || pressed === keys.down) {
          focusFirstTab();
        }
      }
    }
  }

  function activateTab (tab, setFocus) {
    setFocus = setFocus || true;
    deactivateTabs();

    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('is-active');

    const controls = tab.getAttribute('aria-controls');
    document.getElementById(controls).classList.add('is-active');
    if (setFocus) {
      tab.focus();
    }
  }

  function deactivateTabs () {
    tabs.forEach(tab => {
      tab.setAttribute('tabindex', '-1');
      tab.setAttribute('aria-selected', 'false');
      tab.removeEventListener('focus', focusEventHandler);
      tab.classList.remove('is-active');
    })

    panels.forEach((panel)=> panel.classList.remove('is-active'));
  }

  function focusFirstTab () {
    tabs[0].focus();
  }

  function focusLastTab () {
    tabs[tabs.length - 1].focus();
  }

  function focusEventHandler (event) {
    const target = event.target;

    setTimeout(checkTabFocus, delay, target);
  }

  function checkTabFocus (target) {
    let focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    }
  }
}());

document.querySelectorAll('.modal-button').forEach(button => {
   button.addEventListener('click', ({currentTarget})=> {
     const modal = document.querySelector(`#${currentTarget.dataset.target} `);
     modal.tabIndex = 0;
     modal.focus();
   })
})

document.querySelectorAll('.modal').forEach(card => {
  card.addEventListener('keydown', ({currentTarget, key, target})=> {
    if(key === 'Escape') {
      const button = document.querySelector(`button[data-target="${currentTarget.id}"]`);
      button.focus();
    }
  })

  card.addEventListener('click', ({currentTarget, target})=> {
    if(target.classList.contains('modal-close')) {
      const button = document.querySelector(`button[data-target="${currentTarget.id}"]`);
      button.focus();
    }
  })
})
