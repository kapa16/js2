class CommentsControl {
  constructor(source, container = '#comments', form = '#comment-form'){
    this.source = source;
    this.container = container;
    this.form = form;
    this.comments = [];

    this._init();

  }
  _init(){
    this._renderForm();
    this._render();
    fetch(this.source)
      .then(result => result.json())
      .then(data => {
        for (const comment of data) {
          this.comments.push(comment);
          this._renderComment()
        }
      })
  }
  _renderForm(){
    const $labelUser = $('<label class="form-elements" for="userId">Введите ID</label>');
    const $userId = $('<input class="form-elements" type="number" name="userId" id="userId">');
    $labelUser.append($userId);

    const $text = $('<textarea class="form-elements" name="comment" cols="30" rows="10" placeholder="Введите отзыв"></textarea>');
    const $btn = $('<button class="form-elements" type="submit">Отправить</button>');

    $(this.form).append($labelUser);
    $(this.form).append($text);
    $(this.form).append($btn);
  }
  _render(){
    $(this.container).append('<h3>Отзывы</h3>');
    $(this.container).append('<div class="comment"></div>');
  }
  _renderComment(){
    
  }
}