class Gallery {
  constructor() {
    this.settings = {
      galleryWrapperClass: 'gallery__wrapper',
      galleryImageClass: 'gallery__image',
    };
    this.images = [];
    this.galleryWrapperEl = document.createElement('div');
  }

  /**
   * переопределяет настройки по-умолчанию
   * @param {Object} settings - объект с настройками
   */
  init(settings) {
    Object.assign(this.settings, settings);
  }

  render(parentEl) {
    this.galleryWrapperEl.classList.add(this.settings.galleryWrapperClass);

    this.images.forEach(elem => this._createElement(elem));
    parentEl.appendChild(this.galleryWrapperEl);
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
    if (!Array.isArray(images)){
      return;
    }
    this.images = images.slice();
  }

  createGallery(fileName, parentEl) {
    fetch(fileName)
      .then(response => response.json())
      .then(imagesJson => {
        this.setImages(imagesJson);
        this.render(parentEl);
        this._addEvent(parentEl);
      });
  }

  _addEvent(parentEl) {
    parentEl.addEventListener('click', evt => this._onClickImagePreview(evt));
  }

  _onClickImagePreview(evt) {
    const elementClick = evt.target;
    if (elementClick.tagName !== 'img') {
      return;
    }
    this._showBigImage(elementClick);
  }

  _showBigImage(elem) {
    const modelEl = this._createModalWondow();
    const closeBtn = this._createCloseBtn();

  }
}