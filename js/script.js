window.addEventListener("DOMContentLoaded", () => {

    const tabsParent = document.querySelector(".tabheader__items"),  //*Tabs
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

    //? My version
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

    const deadline = "2025-03-10";  //*Timer

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

});