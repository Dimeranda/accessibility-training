(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

const message = document.querySelector('#title-message');
let i = 1;
const timerId = setInterval(function() {
  message.textContent =
    "You receive " + i +" message on forum";
  i++;
}, 4000);


setTimeout(() =>{
  clearInterval(timerId);
}, 10000);

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
        tabs[tabs.length - 1].focus();
        break;
      case keys.home:
        event.preventDefault();
        tabs[0].focus()
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
    event.target.focus();
  }
}());

document.querySelectorAll('.modal-button').forEach(button => {
   button.addEventListener('click', ({currentTarget})=> {
     const modal = document.querySelector(`#${currentTarget.dataset.target} `);
     modal.tabIndex = 0;
     modal.focus();
   })
});

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
});




(function() {
  const navElement = document.querySelector('.with-navigation');
  const menubutton = document.querySelector('#menubutton');
  const menuList = document.querySelector('#menu2');
  const listMenuItems = Array.from(menuList.querySelectorAll('a'));
  const nextNavigationButton = menubutton.parentElement.nextElementSibling.querySelector('button');
  menubutton.addEventListener('click', openMenu);
  document.addEventListener('click', handleOutSideClick)

  function handleKeyboardNavigation (event) {
    switch (event.key) {
      case 'Home':
        event.preventDefault();
        listMenuItems[0].focus();
        break;
      case 'End':
        event.preventDefault();
        listMenuItems[listMenuItems.length - 1].focus();
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu();
        menubutton.focus();
        break;
      case 'Tab':
        event.preventDefault();
        closeMenu();
        nextNavigationButton.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const indexUp = listMenuItems.indexOf(document.activeElement);
        (indexUp === 0) ? listMenuItems[listMenuItems.length - 1].focus() : listMenuItems[indexUp - 1].focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        const indexDown = listMenuItems.indexOf(document.activeElement);
        (indexDown + 1 === listMenuItems.length) ? listMenuItems[0].focus() : listMenuItems[indexDown + 1].focus();
        break;
    }

    if(event.keyCode === 32) {
      event.preventDefault();
      window.location.href = document.activeElement.href;
    }

  }

  function handleOutSideClick ({target}) {
    if(!navElement.contains(target)) {
      closeMenu();
    }
  }

  function closeMenu() {
    menubutton.setAttribute('aria-expanded', 'false');
    menubutton.classList.remove('is-open');
  }

  function openMenu () {
    menubutton.classList.toggle('is-open');

    if (menubutton.classList.contains('is-open')) {
      menubutton.setAttribute('aria-expanded', 'true');

      listMenuItems[0].focus();
      listMenuItems.forEach(item => {
        item.addEventListener('keydown', handleKeyboardNavigation);
      })

    } else {
      closeMenu();
    }
  }

})();
