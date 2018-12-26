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
    return `<li><a href="${this.href}">${this.title}${this.getMarkupHtml()}</a></li>`;
  }
}