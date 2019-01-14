"use strict";

class AutoCompleteField {
  constructor(inputFieldId, settings) {
    this.inputFieldIdSelector = inputFieldId;
    this.settings = {
      listParentClass: 'list__parent',
      listClass: 'list__wrapper',
      listItem: 'list__item',
      listItemActive: 'list__item_active'
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
    fetch('cities.json')
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
    const listItems = $(`.${this.settings.listItem}`);
    const activeItem = $(`.${this.settings.listItemActive}`);
    let indexSelectedEl = -1;
    if (activeItem.length !== 0) {
      indexSelectedEl = listItems.index(activeItem[0]);
      activeItem.removeClass(this.settings.listItemActive);
    }
    let countElements = listItems.length;

    let nextElement = indexSelectedEl + direction;
    if (nextElement < 0) {
      nextElement = countElements - 1;
    } else if (nextElement >= countElements) {
      nextElement = 0;
    }

    listItems.eq(nextElement).addClass(this.settings.listItemActive);

    this._chooseSelectedItem();
  }

  _chooseSelectedItem() {
    $(this.inputFieldIdSelector).val($(`.${this.settings.listItemActive}`).html());
  }

  _showList(evt) {
    const inputText = $(evt.currentTarget).val();
    if (inputText.length < 3) {
      return;
    }
    const regExp = RegExp(inputText, 'i');
    let htmlText = `<div class="${this.settings.listParentClass}"><div class="${this.settings.listClass}">`;
    const listItems = this._getListItems(regExp);
    if (listItems.length === 0) {
      return;
    }
    htmlText += listItems + '</div></div>';
    $(this.inputFieldIdSelector).after(htmlText);

    this._addListEventHandler();
  }

  _addListEventHandler() {
    $(`.${this.settings.listItem}`)
      .on('click', () => this._onItemClick());
    $('*')
      .not(`.${this.settings.listItem}`, this.inputFieldIdSelector)
      .on('click', () => this._removeList());
  }

  _getListItems(regExp) {
    let result = '';
    for (const city of this.cities) {
      if (!regExp.test(city.value)) {
        continue;
      }
      result += `<p class="${this.settings.listItem}">${city.value}</p>`;
    }
    return result;
  }

  _onItemClick() {
    $(this.inputFieldIdSelector).val($(event.currentTarget).html());
    this._removeList();
  }

  _removeList() {
    $(`.${this.settings.listParentClass}`).remove();
  }
}
