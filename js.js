let form = document.querySelector(".form");
let completedDiv = document.querySelector(".completed");
let inputs = document.querySelectorAll("input");
let name = document.querySelector("#name");
let creditCard = document.querySelector("#creditCard");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let keyCode = document.querySelector("#keyCode");
let actualYear = new Date().getFullYear();
let creditCardValue = document.querySelector(".front-card__number .value");
let nameHtmlValue = document.querySelector(".front-card__name .value");
let expDateHtmlValue = document.querySelector(".front-card__exp .value");
let keyHtml = document.querySelector(".back-card__key");

let error = false;

let regexList = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  creditCard:
    /(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)/,
  numbers: /^[0-9]*$/,
};

inputs.forEach((item) => {
  item.addEventListener("keyup", validarFormulario);
  item.addEventListener("blur", validarFormulario);

  /* console.log("eje");
  if (item.value.trim() === "") {
    if (creditCard.value === "")
      creditCard.parentNode.classList.remove("form__wrapper--errorFormat");
    item.parentNode.classList.add("form__wrapper--error");
  } else {
    item.parentNode.classList.remove("form__wrapper--error");
  }
  if (
    item.parentNode.classList.contains("form__wrapper--errorFormat") ||
    item.parentNode.classList.contains("form__wrapper--error")
  ) {
    error = true;
  } */
});

function validarFormulario(e) {
  switch (e.target.name) {
    case "name":
      if (e.target.value.trim() === "") {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
        e.target.parentNode.classList.add("form__wrapper--error");
        return;
      } else {
        e.target.parentNode.classList.remove("form__wrapper--error");
      }
      if (!regexList.name.test(e.target.value)) {
        console.log("funciona");
        e.target.parentNode.classList.add("form__wrapper--errorFormat");
      } else {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
      }
      break;
    case "creditCard":
      if (e.target.value.trim() === "") {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
        e.target.parentNode.classList.add("form__wrapper--error");
        return;
      } else {
        e.target.parentNode.classList.remove("form__wrapper--error");
      }
      if (!regexList.creditCard.test(e.target.value)) {
        console.log("funciona");
        e.target.parentNode.classList.add("form__wrapper--errorFormat");
      } else {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
      }
      break;
    case "month":
    case "year":
    case "key":
      if (e.target.value.trim() === "") {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
        e.target.parentNode.classList.add("form__wrapper--error");
        return;
      } else {
        e.target.parentNode.classList.remove("form__wrapper--error");
      }
      if (!regexList.numbers.test(parseInt(e.target.value))) {
        e.target.parentNode.classList.add("form__wrapper--errorFormat");
      } else {
        e.target.parentNode.classList.remove("form__wrapper--errorFormat");
      }
      break;
  }
}

form.addEventListener("submit", function () {
  event.preventDefault();

  if (error === false) {
    document.querySelectorAll(".block").forEach((item) => {
      item.classList.add("block--active");
    });
    setTimeout(function () {
      creditCardValue.innerHTML = creditCard.value;
      nameHtmlValue.innerHTML = name.value;
      expDateHtmlValue.innerHTML = month.value + "/" + year.value;
      keyHtml.innerHTML = keyCode.value;
    }, 1000);
    form.classList.add("form--hide");
    completedDiv.classList.remove("completed--hide");
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
