"use strict";

class AutoCompleteField{
  constructor(dataListId, listClass) {
    this.dataListId = dataListId;
    this.listClass = listClass;
    this.cities = [];
    this._addEventHandler();
    this._getCitiesList();
  }

  _addEventHandler() {
    $(this.dataListId).on('keypress', evt => this._showList($(this).tee()))
  }

  _getCitiesList() {
    this.cities = fetch('cities.json')
      .then(response => response.json())
      .catch(ex => console.error('Error file load', ex));
  }

  _showList(text) {
    if (text.length < 3) {
      return;
    }
    $(this.dataListId).append()
  }
}