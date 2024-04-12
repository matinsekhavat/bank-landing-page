"use strict";
let $ = document;
const overlay = $.querySelector(".overlay");
const navCancleBtn = $.querySelector(".nav-bar__cancel");
const navBarsBtn = $.querySelector(".nav-bar__icon-bar");
const navBarMobile = $.querySelector(".nav-bar__menus");
const scrollHeaderLink = $.querySelector(".header__link");
const featureSection = $.querySelector(".feature");
const navDegelation = $.querySelectorAll(".test");
const navMenus = $.querySelector(".nav__wrapper");
const operationButton = $.querySelector(".operation__btns");
const operationButtons = $.querySelectorAll(".operation__btn");
const article = $.querySelectorAll(".operation__article");
const nav = $.querySelector(".nav");
const header = $.querySelector(".header");
const allSection = $.querySelectorAll(".section");
// Tabbed component
operationButton.addEventListener("click", (e) => {
  let btn = e.target.closest("button");
  let btnId = btn.dataset.num;
  if (btn.classList.contains("operation__btn")) {
    operationButtons.forEach((el) => {
      el.classList.remove("ladder");
    });

    btn.classList.add("ladder");

    // article handler
    console.log(btnId);
    article.forEach((art) => {
      art.classList.add("hidden");
    });
    let mainArt = $.querySelector(`.art-${btnId}`);
    mainArt.classList.remove("hidden");
  }
});

///////////////////////////////
document.querySelectorAll(".nav__degelation").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    let id = this.getAttribute("href");
    let mainElem = document.querySelector(id);
    mainElem.scrollIntoView({ behavior: "smooth" });
  });
});

///////////////
scrollHeaderLink.addEventListener("click", (e) => {
  e.preventDefault();

  let featureCoordinate = featureSection.getBoundingClientRect();
  console.log(this);
  window.scrollTo({
    left: featureCoordinate.left + scrollX,
    top: featureCoordinate.top + scrollY,
    behavior: "smooth",
  });
  // featureSection.scrollIntoView({ behavior: "smooth" });
});
///////////////
overlay.addEventListener("click", () => {
  navBarMobile.classList.remove("show-nav-bar");
  overlay.classList.remove("show");
});
// ///////////////////
navCancleBtn.addEventListener("click", () => {
  navBarMobile.classList.add("hide-nav-bar");
  navBarMobile.classList.remove("show-nav-bar");
  overlay.classList.remove("show");
});
///////////////
navBarsBtn.addEventListener("click", () => {
  navBarMobile.classList.add("show-nav-bar");
  navBarMobile.classList.remove("hide-nav-bar");
  overlay.classList.add("show");
});

// new IntersectionObserver for NAvigation
const navCoordinateHeight = nav.getBoundingClientRect().height;
const sectionHandler = (entry) => {
  if (!entry[0].isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const sectionObservator = new IntersectionObserver(sectionHandler, {
  root: null,
  threshold: 0,
  rootMargin: `-${navCoordinateHeight}px`,
});

sectionObservator.observe(header);

// revealing Section By Scroll

const revealSectionHandler = (entry, observe) => {
  // const [entrie] = entry[0];
  console.log(entry);
  if (!entry[0].isIntersecting) return;
  console.log("once");
  entry[0].target.classList.remove("aoseffect");
  observe.unobserve(entry[0].target);
};
const sectionIntersection = new IntersectionObserver(revealSectionHandler, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  sectionIntersection.observe(section);
  section.classList.add("aoseffect");
});

// slider
const allSlider = $.querySelectorAll(".finance__slider");
const nextBtn = $.querySelector(".finance__btn-right");
const prevBtn = $.querySelector(".finance__btn-left");
let currIndex = 0;
allSlider.forEach((item, i) => {
  console.log(i);
  item.style.transform = `translateX(${100 * (i - currIndex)}%)`;
});

function sliderHandler() {
  allSlider.forEach((item, i) => {
    console.log(i);
    item.style.transform = `translateX(${100 * (i - currIndex)}%)`;
  });
}

function nextSliderHandler() {
  if (currIndex < allSlider.length - 1) {
    currIndex++;
  } else {
    currIndex = 0;
  }
  sliderHandler();
}

function prevSliderHandler() {
  if (currIndex == 0) {
    currIndex = allSlider.length - 1;
  } else {
    currIndex--;
  }
  sliderHandler();
}

nextBtn.addEventListener("click", nextSliderHandler);
prevBtn.addEventListener("click", prevSliderHandler);
console.log(allSlider);
