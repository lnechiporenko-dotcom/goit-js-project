/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const l="https://your-energy.b.goit.study/api";async function u(n="Muscles",r=1){const i=document.getElementById("exercises-container");if(i)try{const e=await(await fetch(`${l}/filters?filter=${n}&page=${r}&limit=12`)).json();if(!e.results)return;const t=e.results.map(s=>{let c="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg";return s.imgUrl&&(c=s.imgUrl.replace("http://","https://")),`
        <li class="exercise-category-card" 
            style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${c}'); 
                   background-size: cover; background-position: center;">
          <div class="category-card-content">
            <p class="category-name">${s.name}</p>
            <p class="category-filter">${s.filter}</p>
          </div>
        </li>`}).join("");i.innerHTML=t,d(e.totalPages,r)}catch(o){console.error(o)}}function d(n,r){const i=document.getElementById("pagination");if(!i)return;let o="";for(let e=1;e<=n&&!(e>5);e++)o+=`
      <button class="pg-btn ${e===r?"active":""}" data-page="${e}">${e}</button>
    `;i.innerHTML=o}const a=document.querySelector(".exercises-filter-list");a&&a.addEventListener("click",n=>{if(n.target.tagName!=="BUTTON")return;document.querySelectorAll(".filter-btn").forEach(i=>i.classList.remove("active")),n.target.classList.add("active");const r=n.target.dataset.filter;u(r)});
//# sourceMappingURL=index.js.map
