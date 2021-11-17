import '../public/style.css';

const headerHandler = () => {
  const header = document.querySelector('.header');

  window.onscroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-active');
    } else {
      header.classList.remove('header-active');
    }
  };
};

const burgerHandler = () => {
  const burgerItem = document.querySelector('.burger');
  const menu = document.querySelector('.header-nav');
  const menuCloseItem = document.querySelector('.header-nav-close');
  const menuLinks = document.querySelectorAll('.header-link');

  burgerItem.addEventListener('click', () => {
    menu.classList.add('header-nav-active');
  });

  menuCloseItem.addEventListener('click', () => {
    menu.classList.remove('header-nav-active');
  });

  menuLinks.forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('header-nav-active');
  }));
};

const scrollHandler = () => {
  const smoothScroll = (targetEl, duration) => {
    const headerElHeight = document.querySelector('.header').clientHeight;
    const target = document.querySelector(targetEl);
    const targetPosition = target.getBoundingClientRect().top - headerElHeight;
    const startPosition = window.pageYOffset;
    let startTime = null;

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }

      t -= 1;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollTo = () => {
    const links = document.querySelectorAll('.js-scroll');

    links.forEach((link) => {
      link.addEventListener('click', () => {
        const currentTarget = link.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };

  scrollTo();
};

headerHandler();
burgerHandler();
scrollHandler();
