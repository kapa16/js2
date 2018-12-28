/**
 * Класс подкменю
 */
class SubMenu extends Menu {
  constructor(href, title, id, className, parentBlock, items) {
    super(id, className, parentBlock, items);
    this.href = href;
    this.title = title;
  }

  render() {
    let result = `<li class="${this._classSubMenuList}">${this.title}${this.getMarkupHtml()}</li>`;
    console.log(result);
    return result;
  }
}