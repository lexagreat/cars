(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
document.addEventListener("DOMContentLoaded", () => {
   burgerWork();
   initHeroSwiper();
   selection();
   productsSliders();
   hotSliders();
});
const body = document.body;

function burgerWork() {
   const burger = document.querySelector(".header__burger");
   const menu = document.querySelector(".header__menu");
   if (!burger) return;
   burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      body.classList.toggle("lock");
      menu.classList.toggle("active");
   });
}

function initHeroSwiper() {
   if (!document.querySelectorAll(".hero__slider .swiper")) return;
   const swiper = new Swiper(".hero__slider .swiper", {
      speed: 1000,
      spaceBetween: 16,
      slidesPerView: "auto",
      autoplay: {
         enabled: true,
         delay: 1500,
      },
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
      loop: true,
   });
}
function selection() {
   const markaSelect = new Select("#markaSelect", {
      placeholder: "Марка",
      // selectedId: "volg",
      data: [
         {
            id: "toyota",
            value: "Toyota",
         },
         {
            id: "kia",
            value: "Kia",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const modelSelect = new Select("#modelSelect", {
      placeholder: "Модель",
      // selectedId: "volg",
      data: [
         {
            id: "camry",
            value: "camry",
         },
         {
            id: "rio",
            value: "rio",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const pokolenieSelect = new Select("#pokolenieSelect", {
      placeholder: "Поколение",
      // selectedId: "volg",
      data: [
         {
            id: "pokolenie1",
            value: "1",
         },
         {
            id: "pokolenie2",
            value: "2",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const kppSelect = new Select("#kppSelect", {
      placeholder: "КПП",
      // selectedId: "volg",
      data: [
         {
            id: "Механика",
            value: "Механика",
         },
         {
            id: "Автомат",
            value: "Автомат",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const dvigatelSelect = new Select("#dvigatelSelect", {
      placeholder: "Тип двигателя",
      // selectedId: "volg",
      data: [
         {
            id: "Шеснарь",
            value: "Шеснарь",
         },
         {
            id: "в8турбо",
            value: "в8 турбо",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const kuzovSelect = new Select("#kuzovSelect", {
      placeholder: "Тип кузова",
      // selectedId: "volg",
      data: [
         {
            id: "красивый",
            value: "красивый",
         },
         {
            id: "оченькрасивый",
            value: "очень красивый",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });
   const privodSelect = new Select("#privodSelect", {
      placeholder: "Привод",
      // selectedId: "volg",
      data: [
         {
            id: "передний",
            value: "передний",
         },
         {
            id: "задний",
            value: "задний",
         },
      ],
      onSelect(item, select) {
         select.classList.add("filled");
      },
   });

   const modalWork = () => {
      const openBtn = document.querySelector(".filters-modal__show");
      const modal = document.querySelector(".filters-modal");
      const results = document.querySelectorAll(".filters-modal__result");
      const closeBtn = document.querySelector(".filters-modal__close");
      const resetbtn = document.querySelector(".filters-modal__reset");
      const closeSteps = () => {
         document.querySelectorAll(".filters-modal__step").forEach((item) => {
            item.classList.remove("active");
         });
      };
      const open = () => {
         modal.classList.add("open");
         body.classList.add("lock");
      };
      const close = () => {
         modal.classList.remove("open");
         body.classList.remove("lock");
         closeSteps();
      };
      resetbtn.addEventListener("click", closeSteps);
      openBtn.addEventListener("click", open);
      closeBtn.addEventListener("click", close);
      results.forEach((item) => {
         item.addEventListener("click", close);
      });

      const marka = document.querySelector("#markabtn");
      const steps = marka
         .closest(".filters-modal__block")
         .querySelectorAll(".filters-modal__step");
      marka.addEventListener("click", () => {
         steps[0].classList.add("active");
         steps[0].querySelectorAll("li").forEach((item) => {
            item.addEventListener("click", () =>
               steps[1].classList.add("active")
            );
         });
      });
   };
   modalWork();
}
function productsSliders() {
   const products = document.querySelectorAll(".selection-item");
   if (!products.length) return;
   products.forEach((item, index) => {
      const swiper = new Swiper(`#product${index} .swiper`, {
         speed: 300,
         spaceBetween: 16,
         slidesPerView: "auto",
         mousewheel: {
            enabled: true,
            forceToAxis: true,
         },
         breakpoints: {
            992: {
               slidesPerView: 1,
            },
         },
      });
   });
}
function hotSliders() {
   let swiper = new Swiper(".hot__swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
      mousewheel: {
         enabled: true,
         forceToAxis: true,
      },
   });
}

class Select {
   constructor(selector, options) {
      this.$el = document.querySelector(selector);
      this.options = options;
      this.selectedId = options.selectedId;

      this.#render();
      this.#setup();
   }
   #render() {
      this.$el.classList.add("select");
      const { placeholder, data, selectedId } = this.options;
      this.$el.innerHTML = this.getTemplate(data, placeholder, selectedId);
      if (placeholder) {
         this.$el
            .querySelector(`[data-type="input"]`)
            .classList.add("placeholder");
      }
   }
   #setup() {
      this.clickHandler = this.clickHandler.bind(this);
      this.$el.addEventListener("click", this.clickHandler);
      this.$value = this.$el.querySelector(`[data-type="input"] span`);
   }
   clickHandler(event) {
      const { type } = event.target.dataset;
      if (type === "input") {
         this.toggle();
      } else if (type === "item") {
         const { id } = event.target.dataset;
         this.select(id);
      } else if (type === "back") {
         this.toggle();
      } else if (type === "header") {
         this.toggle();
      } else if (event.target.closest(".select__header")) [this.toggle()];
   }
   get current() {
      return this.options.data.find((item) => item.id === this.selectedId);
   }
   select(id) {
      this.$el
         .querySelector(`[data-type="input"]`)
         .classList.remove("placeholder");
      this.selectedId = id;
      this.$value.innerHTML = this.current.value;
      this.$el.querySelectorAll(`[data-type="item"]`).forEach((item) => {
         item.classList.remove("selected");
      });
      this.$el
         .querySelector(`[data-id =${this.current.id}]`)
         .classList.add("selected");
      this.close();

      if (this.options.onSelect) {
         this.options.onSelect(this.current, this.$el);
      }
   }
   open() {
      this.$el.classList.add("open");
   }
   close() {
      this.$el.classList.remove("open");
   }
   toggle() {
      if (this.$el.classList.contains("open")) {
         this.close();
      } else {
         this.open();
      }
   }
   getTemplate(data, placeholder = `<span></span>`, selectedId) {
      const items = data.map((item) => {
         let cls = "";
         if (item.id === selectedId) {
            placeholder = item.value;
            cls = "selected";
         }
         return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
      });
      return `
      <div class="select__header" data-type="header">
      <div class="select__back" data-type="back"></div>
      <div class="select__title" data-type="input">
         <span>${placeholder}</span>
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#0E0E0E" stroke-linecap="round"/>
         </svg>
    </div>
      </div>
      <div class="select__content">
         <ul class="select__list">
            ${items.join("")}
         </ul>
      </div>
      `;
   }
}
