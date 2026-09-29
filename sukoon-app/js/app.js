/* Tiny router + state. No framework, works on file://. */
const TABS = {
  seeker:[["s-discover","Discover","M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],
          ["s-learn","Learn","M4 5h16v14H4z M8 3v4 M16 3v4"],
          ["s-journey","Journey","M12 21C7 17 4 13 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4-3 8-8 12z"],
          ["s-rewards","Rewards","M5 12l-2 9 9-5 9 5-2-9M12 2l3 6 6 .5-4.5 4"],
          ["s-bookings","Bookings","M5 12l5 5 9-11"]],
  healer:[["h-dash","Dash","M3 13h8V3H3zM13 21h8V3h-8zM3 21h8v-6H3z"],
          ["h-cal","Calendar","M4 5h16v16H4z M8 3v4 M16 3v4 M4 9h16"],
          ["h-clients","Clients","M12 8a4 4 0 1 0 0-8 M4 21c0-4 4-6 8-6s8 2 8 6"],
          ["h-earn","Earnings","M12 1v22 M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7"],
          ["h-profile","Profile","M12 8a4 4 0 1 0 0-8 M4 21c0-4 4-6 8-6s8 2 8 6"]],
  admin:[["a-verify","Verify","M9 12l2 2 4-4 M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z"],
         ["a-reviews","Reviews","M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
         ["a-analytics","Analytics","M4 20V10 M10 20V4 M16 20v-7 M22 20H2"]],
  b2b:[["b-corporate","Corporate","M3 21h18M6 21V7l6-4 6 4v14M10 12h4"]]
};
let MODE = "seeker";

function render(id, arg){
  const fn = SCREENS[id]; if(!fn) return;
  const el = document.getElementById("screen");
  el.innerHTML = fn(arg); el.classList.remove("fade"); void el.offsetWidth; el.classList.add("fade"); el.scrollTop = 0;
}
function nav(id, arg){
  render(id, arg);
  document.querySelectorAll("#tabbar button").forEach(b=>b.classList.toggle("active", b.dataset.screen===id));
}
function buildTabs(){
  const bar = document.getElementById("tabbar");
  bar.innerHTML = TABS[MODE].map((t,i)=>`
    <button data-screen="${t[0]}" class="${i===0?'active':''}" onclick="nav('${t[0]}')">
      <svg class="ic" viewBox="0 0 24 24">${t[1]!==undefined?'':''}<path d="${t[2]}"/></svg>${t[1]}
    </button>`).join('');
}
function setMode(m){
  MODE = m;
  document.querySelectorAll(".toggle button").forEach(b=>b.classList.toggle("active", b.dataset.mode===m));
  buildTabs();
  nav(TABS[m][0][0]);
}
/* interaction helpers used inside screens */
function selOpt(e){ e.parentNode.querySelectorAll(".opt").forEach(o=>o.classList.remove("active")); e.classList.add("active"); }
function selSlot(e){ e.parentNode.querySelectorAll(".slot").forEach(o=>o.classList.remove("active")); e.classList.add("active"); }
function pick(e){ e.parentNode.querySelectorAll(".chip").forEach(o=>o.classList.remove("active")); e.classList.add("active"); }
function toast(msg){
  let t=document.getElementById("toast");
  if(!t){t=document.createElement("div");t.id="toast";
    t.style.cssText="position:absolute;bottom:80px;left:50%;transform:translateX(-50%);background:#241f36;color:#fff;padding:9px 16px;border-radius:999px;font-size:12px;z-index:60;box-shadow:0 8px 20px rgba(0,0,0,.25)";
    document.querySelector(".screenwrap").appendChild(t);}
  t.textContent=msg; t.style.opacity="1";
  clearTimeout(window._tt); window._tt=setTimeout(()=>t.style.opacity="0",1400);
}
window.addEventListener("DOMContentLoaded", ()=>{ buildTabs(); nav("s-discover"); });
