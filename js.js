let form = document.querySelector(".form");
let inputs = document.querySelectorAll("input");
let name = document.querySelector("#name");
let creditCard = document.querySelector("#creditCard");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let keyCode = document.querySelector("#keyCode");
let actualYear = new Date().getFullYear();
let creditCardHtml = document.querySelector(".front-card__number");
let nameHtml = document.querySelector(".front-card__name");
let expDateHtml = document.querySelector(".front-card__exp");
let keyHtml = document.querySelector(".back-card__key");
let error = false;

form.addEventListener("submit", function () {
  event.preventDefault();
  inputs.forEach((item) => {
    if (item.value.trim() === "") {
      item.parentNode.classList.add("form__wrapper--error");
      item.classList.add("form__input--error");
      error = true;
    } else {
      item.parentNode.classList.remove("form__wrapper--error");
      item.classList.remove("form__input--error");
      error = false;
    }
  });
  if (
    /(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/.test(
      creditCard.value
    )
  ) {
    creditCard.parentNode.classList.remove("form__wrapper--errorCredit");
  } else {
    if (creditCard.parentNode.classList.contains("form__wrapper--error"))
      return;
    creditCard.parentNode.classList.add("form__wrapper--errorCredit");
  }
  if (error === false) {
    creditCardHtml.innerHTML = creditCard.value;
    nameHtml.innerHTML = name.value;
    expDateHtml.innerHTML = month.value + "/" + year.value;
    keyHtml.innerHTML = keyCode.value;
  }
});
let counter = 0;
creditCard.addEventListener("keyup", function () {
  let input = creditCard.value;
  let val = "";
  input = input.replace(/\s/g, "");
  for (let i = 0; i < input.length; i++) {
    if (i % 4 === 0 && i > 0) val = val.concat(" ");
    val = val.concat(input[i]);
  }
  console.log(val);
  creditCard.value = val;
});

month.addEventListener("change", function () {
  console.log("test");
  if (month.value > 12) {
    month.value = 12;
  }
  if (month.value < 01) {
    month.value = "0" + 1;
  }
  if (String(month.value).indexOf("0") > -1) {
    return;
  }
  if (month.value < 10) {
    console.log(month.value);
    month.value = "0" + month.value;
  }
});

year.addEventListener("focusout", function () {
  if (year.value < Number(String(actualYear).slice(-2))) {
    year.value = Number(String(actualYear).slice(-2));
  }
});
