/**
 * Класс для гамбургера
 */
class Hamburger {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * рассчитывает значение
   * @param {string} value - название рассчитываемого значения
   * @returns {number} - числовое значение
   * @private
   */
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

  /**
   * Расчитывает цену
   * @returns {number}
   */
  calculatePrice() {
    return this._calculate('price');
  }

  /**
   * Рассчитывает калорийность
   * @returns {number}
   */
  calculateCalories() {
    return this._calculate('calories');
  }
}