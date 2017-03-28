'use strict';
import './hello-output';
import './hello-input';
/**
 * A trying to be useful element!
 * @extends HTMLElement
 */
export default Backed(class HelloHello extends HTMLElement {
  constructor() {
    // Only super is called here
    // avoid using a constructor
    // more info @ https://github.com/VandeurenGlenn/backed/issues/4
    super();
  }
  created() {
    this.root = this.attachShadow({mode: 'open'});

    let style = `<style>
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      box-sizing: border-box;
      padding: 64px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #eee;
    }
    hello-output {
      padding-bottom: 32px;
    }
    </style>`;

    this.root.innerHTML = `${style}<hello-output></hello-output>
    <hello-input></hello-input>`;
  }
  /**
   * Called when Backed is finished setting up,
   * https://github.com/VandeurenGlenn/backed/wiki/Lifecycle-callback-methods
   */
  ready() {
    // This is where your code should go
  }
});
