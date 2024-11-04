class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const footerDiv = document.createElement('footer');
    footerDiv.innerHTML = `
      <div class="roboto-bold">Copyright © 2024 - by khairul</div>
    `;
    this.appendChild(footerDiv);
  }
}

customElements.define('footer-bar', FooterBar);
