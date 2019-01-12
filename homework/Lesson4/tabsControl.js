class TabsControl {
  constructor(settings) {
    this.settings = {
      tabsWrapperClass: 'tabs__wrapper',
      tabsControlClass: 'tabs__control',
      tabsContentClass: 'tabs__content'
    }
    Object.assign(this.settings, settings);
  }

}