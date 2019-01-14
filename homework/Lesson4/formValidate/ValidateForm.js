"use strict";

class ValidateForm {
  constructor(formName) {
    this.formEl = document.forms[formName];
  }

  /**
   * Обработчик проверки формы
   * @param evt
   */
  validateFormData(evt) {
    let result = this._isPhoneCorrect();
    result = this._isEmailCorrect() && result;
    result = this._isNameCorrect() && result;
    if (!result) {
      evt.preventDefault();
    }
  }

  /**
   * добавляет удаляет классы, проверяемому элементу
   * @param {HTMLElement} formEl - проверяемый элемент
   * @param {string} classAdd - название добавляемого класса
   * @param {string} classRemove - название удаляемого класса
   * @private
   */
  _showValidInfo(formEl, classAdd, classRemove) {
    formEl.classList.add(classAdd);
    formEl.classList.remove(classRemove);
  }

  /**
   * Проверяет элемент по регулярному выражению
   * @param {string} id - id проверяемого элемента
   * @param {regExp} pattern - регулярное выражение для проверки
   * @returns {boolean}
   * @private
   */
  _isElementCorrect(id, pattern) {
    const formEl = this.formEl.querySelector(`#${id}`);
    const strValue = formEl.value;
    let elementCorrect = strValue.length !== 0;
    elementCorrect = elementCorrect && pattern.test(strValue);
    if (!elementCorrect) {
      this._showValidInfo(formEl, 'is-invalid', 'is-valid');
    } else {
      this._showValidInfo(formEl,'is-valid', 'is-invalid');
    }
    return elementCorrect;
  }

  /**
   * Проверка телефона
   * @returns {boolean}
   * @private
   */
  _isPhoneCorrect() {
    return this._isElementCorrect('phone', /^\+7\(\d{3}\)\d{3}-\d{4}$/);
  }

  /**
   * Проверка адреса E-mail
   * @returns {boolean}
   * @private
   */
  _isEmailCorrect() {
    return this._isElementCorrect('email', /^[a-z]*(\.|.-)*[a-z]+@[a-z]+\.(ru|com|org)$/i);
  }

  /**
   * Проверка имени
   * @returns {boolean}
   * @private
   */
  _isNameCorrect() {
    return this._isElementCorrect('name', /^[a-zA-Zа-яА-ЯёЁ]+$/);
  }
}