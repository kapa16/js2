
class AjaxRequest {
  constructor(blockMessage) {
    this.blockMessage = blockMessage;
  }

  _getResult(fileName) {
    fetch(fileName)
      .then(resolve => resolve.json())
      .then(answer => this._showMessage(answer.result));
  }

  _showMessage(msg) {
    this.blockMessage.textContent = msg.toUpperCase();
  }

  onClickButton(evt) {
    const targetEl = evt.target;
    if (targetEl.classList.contains('btn')) {
      this._getResult(`${targetEl.id}.json`);
    }
  }
}