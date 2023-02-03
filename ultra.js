const body = document.querySelector("body");

body.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  translate(x, y);
});

body.addEventListener("touchmove", (e) => {
  const x = e.targetTouches[0].clientX;
  const y = e.targetTouches[0].clientY;
  translate(x, y);
});

function translate(x, y) {
  const xTranslate = (window.innerWidth / 2 - x) / 20;
  const yTranslate = (window.innerHeight / 2 - y) / 20;
  gsap.to("h1", {
    fontVariationSettings: `'wght' ${(x / window.innerWidth) * 700}`,
    "--x-translate": window.innerWidth / 2 - x,
    "--y-translate": window.innerHeight / 2 - y,
    ease: "expo.out"
  });
}

