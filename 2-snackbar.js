import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r}from"./assets/vendor-BbbuE1sJ.js";document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".form");s.addEventListener("submit",e=>{e.preventDefault();const o=Number(s.elements.delay.value),i=s.elements.state.value;n(o,i).then(t=>{r.success({title:"✅ Success",message:`Fulfilled promise in ${t}ms`,position:"topRight"})}).catch(t=>{r.error({title:"❌ Error",message:`Rejected promise in ${t}ms`,position:"topRight"})}),s.reset()});function n(e,o){return new Promise((i,t)=>{setTimeout(()=>{o==="fulfilled"?i(e):t(e)},e)})}});
//# sourceMappingURL=2-snackbar.js.map
