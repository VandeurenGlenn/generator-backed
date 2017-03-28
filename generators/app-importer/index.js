'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
const path = require('path');
const {merge} = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {required: false});
    this.name = this.options.name || path.win32.basename(process.cwd());
  }

  writing() {
      // Re-read the content at this point because a composed generator might modify it.
    const currentBacked = this.fs.readJSON(this.destinationPath('backed.json'), {});
    currentBacked.sources = [{
      src: 'src/*.html',
      dest: 'dist'
    }, {
      src: [
        'node_modules/backed/backed.html',
        'node_modules/backed/dist/backed.js'
      ],
      dest: 'dist'
    }];
    currentBacked.server = {demo: 'dist'};
    this.fs.writeJSON(this.destinationPath('backed.json'), currentBacked);
    let app = this.fs.read(this.destinationPath(`src/${this.name}.js`));
    app = app.replace(`'use strict';`, `'use strict;'\nimport './hello-hello';\nimport './hello-input';`);
    this.fs.write(this.destinationPath(`src/${this.name}.js`), app);
  }

  end() {
    this.log('Swiping things up');
    this.spawnCommandSync('rm', ['-rf', 'demo']);
  }
};
