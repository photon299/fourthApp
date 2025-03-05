window.addEventListener("DOMContentLoaded", () => {

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

});