function e(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},l={},o=a.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in l){var a=l[e];delete l[e];var o={id:e,exports:{}};return t[e]=o,a.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,a){l[e]=a},a.parcelRequired7c6=o);var r=o("8zd4h");const n=document.querySelector(".feedback-form"),{email:s,message:i}=n.elements;let u=JSON.parse(localStorage.getItem("feedback-form-state"))||{};u&&(s.value=u.email||"",i.value=u.message||""),window.addEventListener("load",(()=>{const e=JSON.parse(localStorage.getItem("feedback-form-state"))||{};e.email&&(s.value=e.email),e.message&&(i.value=e.message)})),n.addEventListener("input",e(r)((function(){(s.value||i.value)&&(u={email:s.value,message:i.value},localStorage.setItem("feedback-form-state",JSON.stringify(u)))}),500)),n.addEventListener("submit",(function(e){e.preventDefault(),console.log(u),s.value&&i.value?(localStorage.removeItem("feedback-form-state"),s.value="",i.value="",u={}):alert("Будь ласка 🙂, заповніть 🔤 всі поля форми ")}));//!ТЕОРІЯ
//# sourceMappingURL=03-feedback.3594522d.js.map
