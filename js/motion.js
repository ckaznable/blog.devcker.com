NexT.motion={},NexT.motion.integrator={queue:[],init(){return this.queue=[],this},add(e){e=e();return this.queue.push(e),this},bootstrap(){CONFIG.motion.async||(this.queue=[this.queue.flat()]),this.queue.forEach(e=>{const t=window.anime.timeline({duration:CONFIG.motion?.duration??200,easing:"linear"});e.forEach(e=>{e.deltaT?t.add(e,e.deltaT):t.add(e)})})}},NexT.motion.middleWares={header(){const o=[];function e(e,t=!1){o.push({targets:e,opacity:1,top:0,deltaT:t?"-=200":"-=0"})}e(".column"),"Mist"===CONFIG.scheme&&o.push({targets:".logo-line",scaleX:[0,1],duration:500,deltaT:"-=200"}),"Muse"===CONFIG.scheme&&e(".custom-logo-image"),e(".site-title"),e(".site-brand-container .toggle",!0),e(".site-subtitle"),"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||e(".custom-logo-image");const t=CONFIG.motion.transition.menu_item;return t&&document.querySelectorAll(".menu-item").forEach(e=>{o.push({targets:e,complete:()=>e.classList.add("animated",t),deltaT:"-=200"})}),o},subMenu(){var e=document.querySelectorAll(".sub-menu .menu-item");return 0<e.length&&e.forEach(e=>{e.classList.add("animated")}),[]},postList(){const o=[],{post_block:t,post_header:s,post_body:a,coll_header:i}=CONFIG.motion.transition;function n(t,e){t&&e.forEach(e=>{o.push({targets:e,complete:()=>e.classList.add("animated",t),deltaT:"-=100"})})}return document.querySelectorAll(".post-block").forEach(e=>{o.push({targets:e,complete:()=>e.classList.add("animated",t),deltaT:"-=100"}),n(i,e.querySelectorAll(".collection-header")),n(s,e.querySelectorAll(".post-header")),n(a,e.querySelectorAll(".post-body"))}),n(t,document.querySelectorAll(".pagination, .comments")),o},sidebar(){const t=[];var e=document.querySelectorAll(".sidebar-inner");const o=CONFIG.motion.transition.sidebar;return o&&("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)&&992<=window.innerWidth&&e.forEach(e=>{t.push({targets:e,complete:()=>e.classList.add("animated",o),deltaT:"-=100"})}),t},footer(){return[{targets:document.querySelector(".footer"),opacity:1}]}};