'use strict';

function DomElement(selector, height, width, bg, fontSize) {
   this.selector = selector;
   this.height = height; 
   this.width = width; 
   this.bg = bg;
   this.fontSize = fontSize ;
}

DomElement.prototype.element = function() {
    const  elem = document.createElement(`${(this.selector[0] === '.' && 'div') || 'p'}`);
    elem.classList.add(this.selector.slice(1));
    document.body.appendChild(elem);
    elem.style.cssText = `
      height: ${this.height}px;
      width: ${this.width}px;
      background-color: ${this.bg};
      font-size: ${this.fontSize}px;
    `;
    elem.innerHTML = '10 урок';
  };
const domElement = new DomElement('#hello', 100, 100, 'red', 25);
domElement.element();
