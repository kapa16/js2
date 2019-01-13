"use strict";

class TabsControl {
  constructor(settings) {
    this.settings = {
      tabsClass: 'tabs',
      tabsControlClass: 'tabs__control',
      activeTabClass: 'tabs__active'
    };
    Object.assign(this.settings, settings);
    this._addEventListeners();
  }

  _addEventListeners() {
    $(`.${this.settings.tabsClass} .${this.settings.tabsControlClass}`)
      .on('click', (evt) => this._onControlClick(evt));
  }

  _onControlClick(evt) {
    const currentEl = evt.currentTarget;
    $(`.${this.settings.tabsClass} .${this.settings.activeTabClass}`)
      .removeClass(this.settings.activeTabClass);

    $(currentEl).parent().addClass(this.settings.activeTabClass);
  }
}