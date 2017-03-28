'use strict';
/**
 * A trying to be useful element!
 * @extends HTMLElement
 */
export default Backed(class HelloInput extends HTMLElement {

  static get properties() {
    return {
      value: {
        value: 'Hello, Hello!',
        observer: 'valueChange',
        global: true
      }
    };
  }
  // constructor() {
  //   // Only super is called here
  //   // avoid using a constructor
  //   // more info @ https://github.com/VandeurenGlenn/backed/issues/4
  //   super();
  // }
  /**
   *
   */
  created() {
    this.root = this.attachShadow({mode: 'open'});
    this.root.innerHTML = '<input type="text" name="greeting">';
  }
  /**
   * Called when Backed is finished setting up,
   * https://github.com/VandeurenGlenn/backed/wiki/Lifecycle-callback-methods
   */
  ready() {
    // This is where your code should go
    this.input.addEventListener('input', () => {
      this.value = this.input.value;
    });
  }

  get input() {
    return this.root.querySelector('input');
  }

  valueChange(data) {
    this.input.value = data.value;
  }
});
