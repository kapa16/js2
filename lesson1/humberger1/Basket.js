class Basket {
  constructor() {
    this.products = [];
  }

  render(parentEl) {
    this.products.forEach(product => {
      parentEl.appendChild(this.createElement(product));
    })
  }

  createElement(product) {
    const basketEl = document.createElement('div');
    basketEl.textContent = product;
    return basketEl;
  }

  addProduct(product) {
    this.products.push(product);
  }
}