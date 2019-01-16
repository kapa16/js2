class CommentsControl {
  constructor(source, container = '#comments', form = '#comment-form') {
    this.source = source;
    this.container = container;
    this.form = form;
    this.comments = [];

    this._init();

  }

  _init() {
    this._renderForm();
    this._render();
    fetch(this.source)
      .then(result => result.json())
      .then(data => {
        for (const comment of data) {
          this.comments.push(comment);
          this._renderComment(comment)
        }
      })
  }

  _renderForm() {
    const $labelUser = $('<label class="form-elements" for="userName">Введите имя</label>');
    const $userId = $('<input class="form-elements" type="text" name="userName" id="userName">');
    $labelUser.append($userId);

    const $text = $('<textarea/>', {
      id: 'commentText',
      class: "form-elements",
      name: "comment",
      cols: "30",
      rows: "10",
      placeholder: "Напишите отзыв"
    });
    const $btn = $('<button class="form-elements" type="submit">Отправить</button>');

    $(this.form)
      .append($labelUser)
      .append($text)
      .append($btn)
      .submit(evt => this._onFormSubmit(evt));
  }

  _render() {
    $(this.container).append('<h3>Отзывы</h3>');
  }

  _renderComment(comment) {
    const $commentWrap = $(`<div class="comment" data-id="${comment.id}"></div>`);
    if (comment.approved) {
      $commentWrap.addClass('approved');
    } else {
      const $approveBtn = $('<button>Одобрить</button>');
      $approveBtn.click(evt => this._onApproveClick(evt));
      $commentWrap.append($approveBtn);
    }
    const $userName = $(`<p class="comment-user">${comment.author}</p>`);
    const $commentText = $(`<p class="comment-text">${comment.text}</p>`);

    $commentWrap
      .append($userName)
      .append($commentText)
      .appendTo($(this.container));
  }

  _onApproveClick(evt) {
    const commentId = $(evt.target)
      .closest('.comment')
      .addClass('approved')
      .data('id');
    for (const comment of this.comments) {
      if (comment.id === commentId) {
        comment.approved = true;
        break;
      }
    }
    $(evt.target).remove();
  }

  _getLastCommentId() {
    const ids = this.comments.map(obj => obj.id);
    return Math.max(...ids) + 1;
  }

  _addComment() {
    const newComment = {
      id: this._getLastCommentId(),
      author: $('#userName').val(),
      text: $('#commentText').val()
    };
    this.comments.push(newComment);
    this._renderComment(newComment);
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    if (!this.validateForm()) {
      alert('Необходимо заполнить форму');
    }
    this._addComment();
    $('#userName').val('');
    $('#commentText').val('');
  }

  validateForm() {
    return this._checkField('#userName') && this._checkField('#commentText');
  }

  _checkField(selector) {
    return $(selector).val().length !== 0;
  }
}