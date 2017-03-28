'use strict';
/**
 * A trying to be useful element!
 * @extends HTMLElement
 */
export default Backed(class HelloOutput extends HTMLElement {

  static get properties() {
    return {
      value: {
        observer: 'valueChange',
        global: true
      }
    };
  }
  constructor() {
    // Only super is called here
    // avoid using a constructor
    // more info @ https://github.com/VandeurenGlenn/backed/issues/4
    super();
  }
  /**
   * Called when Backed is finished setting up,
   * https://github.com/VandeurenGlenn/backed/wiki/Lifecycle-callback-methods
   */
  ready() {
    // This is where your code should go
  }

  valueChange(data) {
    this.innerHTML = data.value;
  }
});
