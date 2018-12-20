"use strict";

let urlBasket = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json";
let fileUrl = 'test';

const basketRequest = new AjaxRequest(urlBasket);

basketRequest.setCallback(function (error, result) {
  if (error) {
    console.log(result);
    return;
  }
  console.log(result);
})
;
basketRequest.sendGetRequest();

console.log(fileUrl);
