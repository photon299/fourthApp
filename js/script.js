window.addEventListener("DOMContentLoaded", () => {
    //? Tabs
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = tabsParent.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent");

    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach(item => item.classList.remove("tabheader__item_active"));
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //* My version
    // const hideInactiveTabs = (contentItems) => contentItems.forEach(item => item.hidden = true);
    // hideInactiveTabs(tabsContent);
    // tabsContent[0].hidden = false;
    // const changeTabsClass = (e, itemsWrap) => {
    //     const className = "tabheader__item_active";
    //     if (e.target.classList.contains("tabheader__item") && !e.target.classList.contains(className)) {
    //         Array.from(itemsWrap.children).forEach(tab => {
    //             if (tab.classList.contains(className)) tab.classList.remove(className);
    //         });
    //         e.target.classList.add(className);
    //     }
    // };
    // const changeTabContent = (itemsWrap, contentItems) => {
    //     hideInactiveTabs(contentItems);
    //     [...itemsWrap.children].forEach((tab, i) => {
    //         if (tab.classList.contains("tabheader__item_active")) contentItems[i].hidden = false;
    //     });
    // }
    // tabsParent.addEventListener("click", (event) => {
    //     changeTabsClass(event, tabsParent);
    //     setTimeout(changeTabContent, 150, tabsParent, tabsContent);
    // });
    //?

    const deadline = "2025-05-20";  //? Timer

    const getRemainingTime = (endTime) => {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60 ),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const getZero = (num) => num >= 0 && num < 10 ? `0${num}` : num;

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getRemainingTime(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) clearInterval(timeInterval);
        };
    };

    setClock(".timer", deadline);

    //? My version
    // const getTimerBlocks = () => document.querySelectorAll(".timer__block span");

    // const setDeadlineTime = (ddDate) => new Date(ddDate) - new Date();

    // const timerUpdate = (ddDate) => {
    //     const calculateTimeLeft = () => {
    //         const mlsLeft = setDeadlineTime(ddDate) / 86400000;
    //         const days = Math.floor(mlsLeft),
    //               hours = Math.floor((mlsLeft % 1) * 24),
    //               minutes = Math.floor(((mlsLeft % 1) * 24 % 1) * 60),
    //               seconds = Math.floor((((mlsLeft % 1) * 24 % 1) * 60 % 1) * 60);
    //         return [days, hours, minutes, seconds];
    //     };
    //     setInterval(() => {
    //         calculateTimeLeft().forEach((time, i) => {
    //             getTimerBlocks()[i].innerText = time
    //         });
    //     }, 1000);
    // };
    // timerUpdate("March 20, 2025 00:00:00"); //2025-06-20T00:00:00

    const modalOpenBtns = document.querySelectorAll("[data-modal]"), //* Modal
        modal = document.querySelector(".modal"),
        modalCloseBtn = modal.querySelector("[data-close]");

    const openModal = () => {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    };
    const openModalBtns = (btns) => btns.forEach(btn => btn.addEventListener("click", openModal));
    const closeModal = () => {
        const removeClass = () => {
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
        modalCloseBtn.addEventListener("click", () => removeClass());
        modal.addEventListener("click", (event) => { if (event.target.matches(".modal")) removeClass() });
        document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.matches(".show")) removeClass() });
    };

    const modalTimerId = setTimeout(openModal, 10000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    };

    window.addEventListener("scroll", showModalByScroll);

    openModalBtns(modalOpenBtns);
    closeModal();

    //? Classes

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title,
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 41;
            this.changeToUAN()
        }

        changeToUAN() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}"></img>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:<div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день<div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнесс"',
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container",
        "menu__item",
        "big"
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container",
        "menu__item"
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        ".menu .container",
        "menu__item"
    ).render();

    //* My version
    // const container = document.querySelector(".menu__field .container");
    // container.innerHTML = "";

    // class MenuCard {
    //     constructor (src, type, name, descr, price) {
    //         this.src = src;
    //         this.type = type
    //         this.name = name,
    //         this.descr = descr;
    //         this.price = price;
    //         this.transfer = 41;
    //         // this.changeToUAN()
    //     }

    //     changeToUAN() {
    //         this.price *= this.transfer;
    //     }

    //     buildCard() {
    //         return `
    //         <div class="menu__item">
    //             <img src="${this.src}" alt="${this.type}"></img>
    //             <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
    //             <div class="menu__item-descr">
    //                 ${this.descr}
    //             </div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:<div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день<div>
    //             </div>
    //         </div>`;
    //     }
    // }

    // const vegyCard = new MenuCard("img/tabs/vegy.jpg", "vegy", "Фитнесс", "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!", 229),
    //     eliteCard = new MenuCard("img/tabs/elite.jpg", "elite", "Премиум", 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550),
    //     postCard = new MenuCard("img/tabs/post.jpg", "post", "Постное", 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430);

    // container.innerHTML += vegyCard.buildCard();
    // container.innerHTML += eliteCard.buildCard();
    // container.innerHTML += postCard.buildCard();

});