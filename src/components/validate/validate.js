import { $ } from "../../modules/jquery/jquery.js";
import { errorMap } from "../../modules/validate/validate.js";

if (errorMap) {
  const validate = document.querySelector(".validate");
  if (validate) validate.remove();

  $(".validate .formValidate").html(
    `<strong>{{msg}}</strong><strong>{{value}}</strong><br>`,
    {data:errorMap}
  );

}
