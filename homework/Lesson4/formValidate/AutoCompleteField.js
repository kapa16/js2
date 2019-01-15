"use strict";

class AutoCompleteField {
  constructor(inputFieldId, fileNameList, settings = {}) {
    this.inputFieldIdSelector = inputFieldId;
    this.fileNameList = fileNameList;
    this.settings = {
      listParentClass: 'list__parent',
      listClass: 'list__wrapper',
      listItemClass: 'list__item',
      listItemActiveClass: 'list__item_active',
      listParentSelector: '.list__parent',
      listSelector: '.list__wrapper',
      listItemSelector: '.list__item',
      listItemActiveSelector: '.list__item_active'
    };
    Object.assign(this.settings, settings);
    this.cities = [];
    this._addInputEventHandler();
    this._getCitiesList();
  }

  _addInputEventHandler() {
    $(this.inputFieldIdSelector).on('keyup', () => this._onKeyupInput())
  }

  _getCitiesList() {
    fetch(this.fileNameList)
      .then(response => response.json())
      .then(result => this.cities = result)
      .catch(ex => console.error('Error file load', ex));
  }

  _onKeyupInput() {
    if (event.keyCode === 40) {
      this._moveList(1);
    } else if (event.keyCode === 38) {
      this._moveList(-1);
    } else {
      this._removeList();
      this._showList(event);
    }
  }

  _moveList(direction) {
    const $listItems = $(this.settings.listItemSelector);
    const $activeItem = $(this.settings.listItemActiveSelector);
    const countItemsElements = $listItems.length;

    let indexSelectedEl = -1;
    if ($activeItem.length !== 0) {
      indexSelectedEl = $listItems.index($activeItem[0]);
      $activeItem.removeClass(this.settings.listItemActiveClass);
    }

    let nextElement = indexSelectedEl + direction;
    if (nextElement < 0) {
      nextElement = countItemsElements - 1;
    } else if (nextElement >= countItemsElements) {
      nextElement = 0;
    }

    $listItems.eq(nextElement).addClass(this.settings.listItemActiveClass);

    this._setInputValue($(this.settings.listItemActiveSelector));
  }

  _showList(evt) {
    const inputText = $(evt.currentTarget).val();
    if (inputText.length < 3) {
      return;
    }
    const regExp = RegExp(inputText, 'i');

    let htmlText = `<div class="${this.settings.listParentClass}"><div class="${this.settings.listClass}">`;
    const htmlListItems = this._getListItems(regExp);
    if (htmlListItems.length === 0) {
      return;
    }
    htmlText += htmlListItems + '</div></div>';
    $(this.inputFieldIdSelector).after(htmlText);

    this._addListEventHandler();
  }

  _getListItems(regExp) {
    let result = '';
    for (const city of this.cities) {
      if (!regExp.test(city.value)) {
        continue;
      }
      result += `<p class="${this.settings.listItemClass}">${city.value}</p>`;
    }
    return result;
  }

  _addListEventHandler() {
    $(this.settings.listItemSelector)
      .on('click', () => this._onItemClick());
    $('*')
      .not(this.settings.listItemSelector, this.inputFieldIdSelector)
      .on('click', () => this._removeList());
  }

  _onItemClick() {
    this._setInputValue($(event.currentTarget));
    this._removeList();
  }

  _setInputValue($itemElement) {
    $(this.inputFieldIdSelector).val($itemElement.html());
  }

  _removeList() {
    $(this.settings.listParentSelector).remove();
  }
}