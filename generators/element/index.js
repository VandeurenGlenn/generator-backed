'use strict';
var Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('default');
  }

  configuring() {
    this.composeWith(require.resolve('generator-backed-element/app'), {default: this.options.default});
  }

  install() {
    this.installDependencies();
  }
};
