/**
 * класс для создания формы и получения значений полей
 */
class FormHamburger {
  /**
   * Конструктор формы
   * @param {Object} settings - настройки для работы
   */
  constructor(settings) {
    this.settings = settings;
    this.formEl = document.createElement('form');
    // this._formInputElements = {};
  }

  /**
   * Отображает форму на странице
   * @param {HTMLElement} parentEl - элемент, в который будет вставлена форма
   * @param {string} formName - имя формы
   */
  render(parentEl, formName) {

    this.formEl.name = formName;
    this.formEl.action = '#';
    parentEl.appendChild(this.formEl);

    for (const settingsKey in this.settings) {
      this.formEl.appendChild(this._createTitle(this.settings[settingsKey].title));

      const propSettings = this.settings[settingsKey];
      const type = propSettings.multiCheck ? 'checkbox' : 'radio';

      let checked = true;
      for (const key in propSettings) {
        if (key === 'multiCheck' || key === 'title') {
          continue;
        }
        if (type === 'checkbox') {
          checked = false;
        }
        this.formEl.appendChild(this._createLabelInput(type, settingsKey, key, checked, propSettings[key].title));
        checked = false;
      }
    }

    this.formEl.appendChild(document.createElement('br'));

    const buttonEl = document.createElement('button');
    buttonEl.type = 'submit';
    buttonEl.textContent = 'Купить';
    this.formEl.appendChild(buttonEl);

  }

  /**
   * Создает заголовок раздела
   * @param {string} title - название заголовка
   * @returns {HTMLElement} - элемент заголовка
   * @private
   */
  _createTitle(title) {
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    return titleEl;
  }

  /**
   * Создает элемент формы в виде label и input
   * @param {string} type - тип input
   * @param {string} name - имя input
   * @param {string} value - значение input
   * @param {boolean} checked - выбран
   * @param {string} text - название для отображения
   * @returns {HTMLElement} - элемент формы
   * @private
   */
  _createLabelInput(type, name, value, checked, text){
    const labelEl = document.createElement('label');
    labelEl.textContent = text;

    const inputEl = document.createElement('input');
    inputEl.type = type;
    inputEl.name = name;
    inputEl.value = value;
    if (checked) {
      inputEl.checked = checked;
    }

    labelEl.appendChild(inputEl);

    return labelEl;
  }

  /**
   * Получает значения выбранных элементов
   * @param property - название свойства
   * @returns {Array} - массив значений, отмеченных элементов
   */
  _getValueElements(property) {
    const values = [];
    const elements = this.formEl.elements[property];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        values.push(elements[i].value);
      }
    }
    return values;
  }

  /**
   * Получает выбранные значения
   * @param property - название свойства
   * @param multiCheck - флаг множественного выбора
   * @returns {*} возвращает массив для множественного выбора, иначе одно значение
   */
  getValue(property, multiCheck) {
    const values = this._getValueElements(property);
    return multiCheck ? values : values[0];
  }


}