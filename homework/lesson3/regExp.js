"use strict";

class RegExp {
  constructor(inputEl, classFirst, classSecond, classThird) {
    this.inputEl = inputEl;
    this.reader = null;
    this.classFirst = classFirst;
    this.classSecond = classSecond;
    this.classThird = classThird;
  }

  formDataProcessing() {
    const selectedFile = this.inputEl.files[0];
    this.readFile(selectedFile);
  }

  readFile(selectedFile) {
    this.reader = new FileReader();
    this.reader.addEventListener('load', () => this.processText());
    this.reader.readAsText(selectedFile);
  }

  processText() {
    const text = this.reader.result;
    document.querySelector(`.${this.classFirst}`)
      .textContent = text;
    document.querySelector(`.${this.classSecond}`)
      .textContent = text.replace(/'/g, '"');
    document.querySelector(`.${this.classThird}`)
      .textContent = text.replace(/('(?=\s)|(?<=\s)'|'(?=$))/g, '"');
  }
}