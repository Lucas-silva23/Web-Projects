'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////
// Modal window ///
///////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener
  ('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////
// Button Scrolling ///
///////////////////////

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log('height/widht viewport', 
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, 
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  }); 

  section1.scrollIntoView({behavior: 'smooth'});
});

///////////////////////
// Page Navigation ///
//////////////////////

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  // Matching Strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

//////////////////////
// Tab Component /////
//////////////////////

tabsContainer.addEventListener('click', function(e){
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add("operations__content--active");
});

//////////////////////////
// Menu Fade Animation ///
//////////////////////////

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
}

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////
// Sticky Navigation API ///
////////////////////////////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//////////////////////
// Reveal Sections ///
//////////////////////

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
  
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  })
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////////////
// Lazy Loading Images ///
//////////////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////
// Slider ///
/////////////

const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function(){
    slides.forEach(function(_, i){
      dotContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  const goToSlide = function(slide){
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i-slide)}%)`);
  };

  //Next Slide
  const nextSlide = function(){
    if(currentSlide === maxSlide -1){
      currentSlide = 0;
    } else{
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  //Previous Slide
  const prevSlide = function(){
    if(currentSlide === 0){
      currentSlide = maxSlide - 1;
    } else{
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  }

  const init = function(){
    createDots();
    goToSlide(0);
    activateDot(currentSlide);
  }

  init();

  // Events Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      currentSlide = Number(e.target.dataset.slide);

      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
}

slider();