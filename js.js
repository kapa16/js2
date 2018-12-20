"use strict";

let urlBasket = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json";


ajaxRequest(urlBasket)
  .then(
    response => console.dir(response),
    error => alert(`Rejected: ${error}`)
  );

