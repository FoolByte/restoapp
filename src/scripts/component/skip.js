class SkipToContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
		
	  `;
  }
}

customElements.define('skip-to-content', SkipToContent);
