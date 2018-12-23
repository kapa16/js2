/**
 * Класс для гамбургера
 */
class Hamburger {
  constructor(settings) {
    this.settings = settings;
    this.parameters = {};
  }

  setValue(parameter, value) {
    this.parameters[parameter] = value;
  }

  /**
   * рассчитывает значение
   * @param {string} value - название рассчитываемого значения
   * @returns {number} - числовое значение
   * @private
   */
  _calculate(value) {
    let sum = 0;
    for (const settingName in this.parameters) {
      const parameter = this.parameters[settingName];
      const setting = this.settings[settingName];
      if (Array.isArray(parameter)) {
        parameter.forEach(prop => {
          sum += setting[prop][value];
        });
      } else {
        sum += setting[parameter][value];
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

  getParameter(settingName) {
    const parameter = this.parameters[settingName];
    if (Array.isArray(parameter)) {
      parameter.forEach(prop => {
        return this.getSetting(settingName, prop)[value];
      });
    } else {
      return this.getSetting(settingName, parameter)[value];
    }
  }

  toString() {
    let hamburgerString = '';
    for (const parametersKey in this.parameters) {
      const property = this.settings[parametersKey];
      const value = property[this.parameters[parametersKey]];
      hamburgerString += `${property.title}: ${value.title}`;
    }
    return hamburgerString;
  }

}