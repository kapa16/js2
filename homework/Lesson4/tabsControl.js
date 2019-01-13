class TabsControl {
  constructor(settings) {
    this.settings = {
      tabsWrapperClass: 'tabs__wrapper',
      tabsControlClass: 'tabs__control',
      tabsContentClass: 'tabs__content',
      activeTabClass: 'tabs__active'
    };
    Object.assign(this.settings, settings);
    this._init();
  }

  _init() {
    $(this.settings.tabsControlClass).on('click', () => this._onControlClick());
  }

  _onControlClick() {

  }

}