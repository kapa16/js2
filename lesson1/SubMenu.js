/**
 * Класс подкменю
 */
class SubMenu extends Menu {
  constructor(id, className, parentBlock, items) {
    super(id, className, parentBlock, items);
  }

  render() {
    return this.getMarkupHtml();
  }
}