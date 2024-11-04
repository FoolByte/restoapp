class Utils {
  static showElement(element) {
    element.style.display = 'block';
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }

  static showLoading() {
    const loadingElement = document.querySelector('#loading');
    if (loadingElement) {
      Utils.showElement(loadingElement);
    }
  }

  static hideLoading() {
    const loadingElement = document.querySelector('#loading');
    if (loadingElement) {
      Utils.hideElement(loadingElement);
    }
  }

  static navigateToDetail(id) {
    window.location.href = `#/detail/${id}`;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  static clearInputFields(...inputs) {
    inputs.forEach((input) => {
      if (input) {
        input.value = '';
      }
    });
  }
}

export default Utils;
