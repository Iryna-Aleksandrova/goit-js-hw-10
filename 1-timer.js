import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as u,f as h}from"./assets/vendor-BbSUbo7J.js";const a=document.querySelector("#datetime-picker"),o=document.querySelector("button[data-start]"),S=document.querySelector("span[data-days]"),f=document.querySelector("span[data-hours]"),y=document.querySelector("span[data-minutes]"),b=document.querySelector("span[data-seconds]");o.disabled=!0;let e="";u.settings({timeout:4e3,position:"topRight"});const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]>Date.now()?(o.disabled=!1,e=t[0]-Date.now()):(o.disabled=!0,u.error({message:"Please choose a date in the future"}))}};h(a,g);const q=()=>{a.disabled=!0;const t=setInterval(()=>{if(e>1e3){e-=1e3;const{days:s,hours:r,minutes:c,seconds:d}=n(e);S.textContent=`${s}`.padStart(2,"0"),f.textContent=`${r}`.padStart(2,"0"),y.textContent=`${c}`.padStart(2,"0"),b.textContent=`${d}`.padStart(2,"0"),o.disabled=!0}e<=1e3&&(clearInterval(t),a.disabled=!1)},1e3)};o.addEventListener("click",q);function n(t){const i=Math.floor(t/864e5),l=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),p=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:l,minutes:m,seconds:p}}console.log(n(2e3));console.log(n(14e4));console.log(n(2414e4));
//# sourceMappingURL=1-timer.js.map