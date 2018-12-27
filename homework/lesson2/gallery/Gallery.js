class Gallery {
  constructor(galleryContainerEl) {
    this.settings = {
      galleryWrapperClass: 'gallery__wrapper',
      galleryImageClass: 'gallery__image',
      fullSizeImageWindowClass: 'gallery__modal-windows',
      fullSizeImageScreenClass: 'gallery__modal-screen',
      fullSizeImageClass: 'gallery__full-image',
      fullSizeImageCloseButtonClass: 'gallery__close-button',
      fullSizeImageCloseButtonSrc: 'img/gallery/close.png',

    };
    this.images = [];
    this.galleryContainerEl = galleryContainerEl;
    this.galleryWrapperEl = document.createElement('div');
  }

  /**
   * переопределяет настройки по-умолчанию
   * @param {Object} settings - объект с настройками
   */
  init(settings) {
    Object.assign(this.settings, settings);
  }

  render() {
    this.galleryWrapperEl.classList.add(this.settings.galleryWrapperClass);
    this.images.forEach(elem => this._createElement(elem));
    this.galleryContainerEl.appendChild(this.galleryWrapperEl);
  }

  _createElement(elem) {
    const imageWrapEl = document.createElement('div');
    imageWrapEl.appendChild(this._createImageElement(elem));
    this.galleryWrapperEl.appendChild(imageWrapEl);
  }

  _createImageElement(elem) {
    const imageEl = new Image();
    imageEl.src = elem.src;
    imageEl.alt = elem.alt;
    imageEl.dataset.srcMax = elem.srcMax;
    imageEl.classList.add(this.settings.galleryImageClass);
    return imageEl;
  }

  setImages(images) {
    if (!Array.isArray(images)) {
      return;
    }
    this.images = images.slice();
  }

  createGallery(fileName) {
    fetch(fileName)
      .then(response => response.json())
      .then(imagesJson => {
        this.setImages(imagesJson);
        this.render(this.galleryContainerEl);
        this._addEventOpenFullImage(this.galleryContainerEl);
      });
  }

  _addEventOpenFullImage() {
    this.galleryWrapperEl.addEventListener('click', evt => this._onClickImagePreview(evt));
  }

  _onClickImagePreview(evt) {
    const elementClick = evt.target;
    if (elementClick.tagName !== 'IMG') {
      return;
    }
    this._showFullSizeImage(elementClick);
  }

  _onClickCLoseButton() {
    document.querySelector(`.${this.settings.fullSizeImageWindowClass}`).remove();
  }

  _showFullSizeImage(elem) {
    const modalWindowEl = this._createModalWindow();
    const modalScreenEl = this._createModalScreen();
    const closeBtnEl = this._createCloseBtn();
    const fullSizeImageEl = this._createFullSizeImage(elem);

    closeBtnEl.addEventListener('click', () => this._onClickCLoseButton());

    this.galleryContainerEl.appendChild(modalWindowEl);
    modalWindowEl.appendChild(modalScreenEl);
    modalWindowEl.appendChild(closeBtnEl);
    modalWindowEl.appendChild(fullSizeImageEl);
  }

  _createModalWindow() {
    const modalWindowEl = document.createElement('div');
    modalWindowEl.classList.add(this.settings.fullSizeImageWindowClass);
    return modalWindowEl;
  }

  _createModalScreen() {
    const modalWindowEl = document.createElement('div');
    modalWindowEl.classList.add(this.settings.fullSizeImageScreenClass);
    return modalWindowEl;
  }

  _createCloseBtn() {
    const closeBtnEl = new Image();
    closeBtnEl.classList.add(this.settings.fullSizeImageCloseButtonClass);
    closeBtnEl.src = this.settings.fullSizeImageCloseButtonSrc;
    closeBtnEl.alt = 'close button';
    return closeBtnEl;
  }

  _createFullSizeImage(elem) {
    const fullSizeImageEl = new Image();
    fullSizeImageEl.classList.add(this.settings.fullSizeImageClass);
    fullSizeImageEl.src = elem.dataset.srcMax;
    fullSizeImageEl.alt = elem.dataset.alt;
    return fullSizeImageEl;
  }
}