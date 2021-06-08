function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tab

  const tabs = document.querySelectorAll(tabsSelector),
    tabContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show', 'fade');
    tabs[i].classList.add(activeClass);
  }

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, idx) => {
        if (item == target) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }

  });
  hideTabContent();
  showTabContent();
}

export default tabs;