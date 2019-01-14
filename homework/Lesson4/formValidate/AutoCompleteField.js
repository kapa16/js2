"use strict";

class AutoCompleteField{
  constructor(inputFieldId, settings) {
    this.inputFieldId = inputFieldId;
    this.settings = {
      listParentClass: 'list__parent',
      listClass: 'list__wrapper',
      listItem: 'list__item'
    };
    Object.assign(this.settings, settings);
    this.cities = [];
    this._addEventHandler();
    this._getCitiesList();
  }

  _addEventHandler() {
    $(this.inputFieldId).on('keyup', evt => this._showList(evt))
  }

  _getCitiesList() {
    fetch('cities.json')
      .then(response => response.json())
      .then(result => this.cities = result)
      .catch(ex => console.error('Error file load', ex));
  }

  _showList(evt) {
    this._removeList();

    const inputText = $(evt.currentTarget).val();
    if (inputText.length < 3) {
      return;
    }
    const regExp = RegExp(inputText, 'i');
    let htmlText = `<div class="${this.settings.listParentClass}"><div class="${this.settings.listClass}">`;
    const listItems = this._getListItems();
    if (listItems.length === 0) {
      return;
    }
    htmlText += listItems + '</div></div>';
    $(this.inputFieldId).after(htmlText);

    $(`.${this.settings.listItem}`)
      .on('click', () => this._chooseItem());
    $('*').not(`.${this.settings.listItem}`)
      .on('click', () => this._removeList());
  }

  _getListItems() {
    let result = '';
    for (const city of this.cities) {
      if (!regExp.test(city.value)) {
        continue;
      }
      result +=`<p class="${this.settings.listItem}">${city.value}</p>`;
    }
    return result;
  }

  _chooseItem() {
    $(this.inputFieldId).val($(event.currentTarget).html());
    this._removeList();
  }

  _removeList() {
    $(`.${this.settings.listParentClass}`).remove();
  }
}
