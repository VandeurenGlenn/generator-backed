'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This method adds support for a `--coffee` flag
    this.option('default');
    this.argument('name', {required: false});

    this.name = this.options.name || path.win32.basename(process.cwd());
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the great ' + chalk.red('generator-backed') + ' generator!'
    ));

    if (this.options.default) {
      return;
    }

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Whats the name for your app?',
      default: this.name,
      when: !this.options.name
    }, {
      type: 'input',
      name: 'boilerplates',
      message: 'Include element boilerplates?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.name = props.name || this.name;
      this.props = props;
    });
  }

  configuring() {
    this.composeWith(require.resolve('generator-backed-element/element'), {
      default: this.options.default,
      name: this.props.name
    });

    this.composeWith(require.resolve('./../app-importer'), {
      default: this.options.default,
      boilerplates: this.props.boilerplates,
      name: this.props.name
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      {name: this.props.name}
    );

    if (this.props.boilerplates) {
      this.fs.copy(
        this.templatePath('*.js'),
        this.destinationPath('src/')
      );
    }
  }
};
