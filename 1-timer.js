import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as y,i as p}from"./assets/vendor-BbSUbo7J.js";const s=document.querySelector("#datetime-picker"),t=document.querySelector("button[data-start]"),v=document.querySelector(".value[data-days]"),b=document.querySelector(".value[data-hours]"),g=document.querySelector(".value[data-minutes]"),S=document.querySelector(".value[data-seconds]");d({days:0,hours:0,minutes:0,seconds:0});s.value="";t.disabled=!0;let u=null,o=null;const q={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(u=e[0].getTime(),u<=Date.now()){p.error({message:"Please choose a date in the future",position:"topRight"}),t.disabled=!0;return}else t.disabled=!1}};y(s,q);t.addEventListener("click",()=>{o&&clearInterval(o),t.disabled=!0,s.disabled=!0,o=setInterval(()=>{const e=Date.now(),n=u-e;if(n<=0){clearInterval(o),o=null,u=null,s.value="",d({days:0,hours:0,minutes:0,seconds:0}),s.disabled=!1,t.disabled=!0;return}const r=c(n);d(r)},1e3)});function d({days:e,hours:n,minutes:r,seconds:l}){v.textContent=a(e),b.textContent=a(n),g.textContent=a(r),S.textContent=a(l)}function a(e){return String(e).padStart(2,"0")}function c(e){const i=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:i,hours:m,minutes:h,seconds:f}}console.log(c(2e3));console.log(c(14e4));console.log(c(2414e4));
//# sourceMappingURL=1-timer.js.map