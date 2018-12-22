const settingsHamburger = {
  size: {
    small: {price: 50, calories: 20},
    large: {price: 100, calories: 40}
  },
  stuffing: {
    cheese: {price: 10, calories: 20},
    salad: {price: 20, calories: 5},
    potato: {price: 15, calories: 10}
  },
  topping: {
    mayo: {price: 20, calories: 5},
    spice: {price: 15, calories: 0}
  },
};

class Hamburger {
  constructor(size, stuffing) {
    this.settings = settingsHamburger;
    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
  }

  addTopping(topping) {
    if (!this.topping.find(topping)) {
      this.topping.push(topping);
    }
  }

  removeTopping(topping) {
    const index = this.topping.indexOf(topping);
    if (!index < 0) {
      this.topping.splice(index, 1);
    }
  }

  _calculate(value) {
    let sum = 0;
    for (const setting in this.settings) {
      const currentSetting = settingsHamburger[setting];
      const property = this[setting];
      if (Array.isArray(property)) {
        property.forEach(prop => {
          sum += currentSetting[prop][value];
        });
      } else {
        sum += currentSetting[property][value];
      }
    }
    return sum;
  }

  calculatePrice() {
    return this._calculate('price');
  }

  calculatecalories() {
    return this._calculate('calories');
  }
}