"use strict";

class AutoCompleteField{
  constructor(dropListId) {
    this.dropListId = dropListId;
    this.cities = [];
    this._getCitiesList();
  }

  _getCitiesList() {
    fetch('cities.json')
      .then(response => response.json())
      .then(cities => this._fillDropList(cities))
      .catch(ex => console.error('Error file load', ex));
  }

  _fillDropList(cities) {
    this.cities = cities;
    $(this.dropListId).append('<option disabled selected>Выберите город</option>');
    for (const city of cities) {
      $(this.dropListId).append(`<option value=${city.name}>${city.name}</option>`);
    }
  }
}