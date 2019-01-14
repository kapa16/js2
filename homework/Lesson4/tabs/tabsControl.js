"use strict";

class TabsControl {
  constructor(parentBlock, settings) {
    this.parentBlock = parentBlock;
    this.settings = {
      tabsControlClass: 'tabs__control',
      tabsContentClass: 'tabs__content',
      activeTabClass: 'tabs__active'
    };
    Object.assign(this.settings, settings);
    this._showContent(0);
    this._addEventListeners();
  }

  /**
   * Устанвливает обработчики собыйти на переключатели закладок
   * @private
   */
  _addEventListeners() {
    $(this.parentBlock).find(`.${this.settings.tabsControlClass}`)
      .on('click', (evt) => this._onControlClick(evt));
  }

  /**
   * Обработчик события нажатия на переключатьль закладки
   * @param {Event} evt - событие клика на переключатель
   * @private
   */
  _onControlClick(evt) {
    const currentEl = evt.currentTarget;
    $(this.parentBlock).find(`.${this.settings.activeTabClass}`)
      .removeClass(this.settings.activeTabClass);

    $(currentEl).addClass(this.settings.activeTabClass);
    const tabNumber = $(this.parentBlock).find(`.${this.settings.tabsControlClass}`).index(currentEl);

    this._showContent(tabNumber);
  }

  /**
   * Отображение открытой закладки
   * @param {int} tabNumber - номер открытой вкладки
   * @private
   */
  _showContent(tabNumber) {
    $(this.parentBlock).find(`.${this.settings.tabsContentClass}`)
      .hide().eq(tabNumber).show();
  }
}