"use strict";

/**
 * Конструктор объекта для работы с запросами к серверу
 * @param {string} url - строка адреса для запроса
 * @constructor
 */
function AjaxRequest(url) {
  this.fileUrl = url;
  this.request = new XMLHttpRequest();
  this.callback = null;

  /**
   * Проверяет статус запроса к сверверу и вызывет функцию callback
   */
  this.checkRequestStatus = function () {
    if (this.request.readyState !== 4) {
      return;
    }

    if (this.request.status !== 200) {
      this.callback(true, 'Не удалось загрузить данные');
    }

    this.callback(false, this.request.responseText);
  }.bind(this);
}

/**
 * Отправляет GET запрос на сервер
 */
AjaxRequest.prototype.sendGetRequest = function() {
  this.request.addEventListener('load', this.checkRequestStatus);
  this.request.open('GET', this.fileUrl, true);
  this.request.send();
};

/**
 * Устанавливает функцию для вызова callback
 * @param {function} callbackUserFunction - функция для возврата данных
 */
AjaxRequest.prototype.setCallback = function(callbackUserFunction) {
  this.callback = callbackUserFunction;
};