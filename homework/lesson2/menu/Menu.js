/**
 * класс меню
 */
class Menu {
  /**
   * Конструктор класса меню
   * @param {String} id - id меню
   * @param {String} className - имя класса меню
   * @param {Array} items - элементы меню
   */
  constructor(id, className, items) {
    this.id = id;
    this.className = className;
    this.items = items;
    this._currentOpenEl = [];
    this._classSubMenuList = 'submenu_list';
    this._classSubMenuShow = 'menu__sub_show';
  }

  /**
   * Формирует HTML размеку меню
   * @returns {String} {string} - строка с HTML разметкой меню
   */
  getMarkupHtml() {
    let result = `<ul class="${this.className}" id="${this.id}">`;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
        result += this.items[i].render();
        console.log(result);
      }
    }
    result += '</ul>';
    return result;
  }

  /**
   * Отображает меню на странице
   * @param {HTMLElement} parentBlock - елемент родительского блока, в который добавляется меню
   */
  render(parentBlock) {
    parentBlock.innerHTML = this.getMarkupHtml();
    this._addEventShowSubMenu();
  }

  /**
   * Добавляет обработчик события клика по документу
   * @private
   */
  _addEventShowSubMenu() {
    document.addEventListener('mousemove', evt => this._showSubMenu(evt))
  }

  /**
   * Показывает подменю
   * @param {Event} evt - событие обработкчика
   * @private
   */
  _showSubMenu(evt) {
    const listEl = evt.target;

    this._hideSubMenu(listEl);

    if (listEl.classList.contains(this._classSubMenuList)) {
      const currentOpenEl = listEl.querySelector('ul');
      if (this._currentOpenEl.indexOf(currentOpenEl) === -1) {
        this._currentOpenEl.push(currentOpenEl);
      }
      listEl.style.position = 'relative';
      currentOpenEl.classList.add(this._classSubMenuShow);
    }
  }
  
  _hideSubMenu(listEl) {
    for (let i = 0; i < this._currentOpenEl.length; i++) {
      if (this._currentOpenEl[i] && (!this._currentOpenEl[i].contains(listEl))) {
        this._currentOpenEl[i].classList.remove(this._classSubMenuShow);
      }
    }
  }

  /**
   * Удаляет меню со страницы
   */
  remove() {
    const menuParent = this._getMenuEl().parentElement;
    menuParent.removeChild(this._getMenuEl());
  }

  /**
   * Показывает / скрывает блок меню
   * @param {Element} parentBlock - сонтейнер для меню
   */
  toggleMenu(parentBlock) {
    if (this._getMenuEl()) {
      this.remove();
    } else {
      this.render(parentBlock);
    }
  }

  /**
   * Провеяет существование элемента меню
   * @returns {Element}
   * @private
   */
  _getMenuEl() {
    return document.querySelector(`#${this.id}`);
  }
}