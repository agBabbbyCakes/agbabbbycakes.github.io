const color = `255 255 255`;

const splitText = () => {
  const split = document.querySelector(".split");
  const textContainer = split.querySelector("h2");
  const text = textContainer.innerHTML;

  textContainer.innerHTML = "";

  const lines = text.split(/<br\s*\/?>/i);

  lines.forEach((line) => {
    const lineDiv = document.createElement("div");
    split.querySelector("h2").appendChild(lineDiv);

    [...line].forEach((char) => {
      const span = document.createElement("span");
      span.dataset.char=char;
      span.textContent = char === "" ? "&nbsp;" : char;
      lineDiv.appendChild(span);
    });
  });
};

const addHoverEvent = () => {
  const h2 = document.querySelector(".split h2");
  const spans = h2.querySelectorAll("span");
  
  const max = 1000;
  spans.forEach((span, index) => {
    span.addEventListener("mouseover", function () {
      this.style.fontWeight = max;
      this.style.textShadow = `0 0 0 rgb(${color} / 1)`
      setFontWeight(spans, index, -1, max * 0.8);
      setFontWeight(spans, index, -2, max * 0.6);
      setFontWeight(spans, index, 1, max * 0.8);
      setFontWeight(spans, index, 2, max * 0.6);
    });
    span.addEventListener("mouseout", function () {
      this.style.backgroundColor = "";
      this.style.fontSize = "";
      this.style.textShadow = ``
      resetFontWeight(spans, index, -1);
      resetFontWeight(spans, index, -2);
      resetFontWeight(spans, index, 1);
      resetFontWeight(spans, index, 2);
    });
  });
  h2.addEventListener("mouseout", function () {
    spans.forEach((span, index) => {
      resetFontWeight(spans, index, -1);
      resetFontWeight(spans, index, -2);
      resetFontWeight(spans, index, 1);
      resetFontWeight(spans, index, 2);
    });
  });
};

const setFontWeight = (spans, index, offset, weight) => {
  if (spans[index + offset]) {
    console.log(index)
    spans[index + offset].style.fontWeight = weight + "";
    spans[index + offset].style.textShadow = `0 0 0 rgb(${color} / ${1 * (weight/10)/1.2}%)`
    
  }
};

const resetFontWeight = (spans, index, offset) => {
  if (spans[index + offset]) {
    spans[index + offset].style.fontWeight = "";
    spans[index + offset].style.textShadow = "";
  }
};

const init = () => {
  splitText();
  addHoverEvent();
};

window.addEventListener("DOMContentLoaded", init());