const slides = [...document.querySelectorAll(".slide")];
const who = document.getElementById("who");
const count = document.getElementById("count");
const bar = document.getElementById("progress");
let index = 0;

const labels = {
  awan: "Awan  ·  Feature 1",
  hendrik: "Hendrik  ·  Feature 2",
  both: "Hendrik and Awan",
};

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  const speaker = slides[index].dataset.who;
  who.textContent = labels[speaker];
  who.className = "who-" + speaker;
  count.textContent = index + 1 + " / " + slides.length;
  bar.style.width = ((index + 1) / slides.length) * 100 + "%";
  history.replaceState(null, "", "#" + (index + 1));
}

document.getElementById("next").onclick = () => show(index + 1);
document.getElementById("prev").onclick = () => show(index - 1);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
    event.preventDefault();
    show(index + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") show(index - 1);
  if (event.key === "Home") show(0);
  if (event.key === "End") show(slides.length - 1);
});

let touchX = 0;
document.addEventListener("touchstart", (event) => {
  touchX = event.changedTouches[0].clientX;
});
document.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchX;
  if (Math.abs(delta) < 40) return;
  show(index + (delta < 0 ? 1 : -1));
});

function fromHash() {
  const start = Number(location.hash.replace("#", ""));
  if (Number.isFinite(start) && start > 0) show(start - 1);
  else show(0);
}

window.addEventListener("hashchange", fromHash);
fromHash();
