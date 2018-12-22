const settingsHamburger = {
  size: {
    small: {
      price: 50,
      calories: 20
    },
    large: {
      price: 100,
      calories: 40
    }
  },
  stuffing: {
    cheese: {
      price: 10,
      calories: 20
    },
    salad: {
      price: 20,
      calories: 5
    },
    potato: {
      price: 15,
      calories: 10
    }
  },
  topping: {
    mayo: {
      price: 20,
      calories: 5
    },
    spice: {
      price: 15,
      calories: 0
    }
  },
};

class Hamburger {
  constructor(size, stuffing) {
    this.settings = settingsHamburger;
    this.size = size;
    this.stuffing = stuffing;
    this._toppings = [];
  }

  addTopping(topping) {
    if (!this._toppings.find(topping)) {
      this._toppings.push(topping);
    }
  }

  removeTopping() {
    const index = this._toppings.indexOf(topping);
    if (!index < 0) {
      this._toppings.splice(index, 1);
    }
  }

  calculatePrice() {

  }

  calculateCalorific() {

  }
}