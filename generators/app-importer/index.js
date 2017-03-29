'use strict';
var Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {required: false});
    this.option('boilerplates', {required: false});
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name || path.win32.basename(process.cwd());
  }

  set boilerplates(value) {
    this._boilerplates = value;
  }

  get boilerplates() {
    return this._boilerplates || true;
  }

  writing() {
    this.name = this.options.name;
    this.boilerplates = this.options.boilerplates;
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
      dest: 'dist/node_modules'
    }];
    currentBacked.server = {demo: 'dist'};
    this.fs.writeJSON(this.destinationPath('backed.json'), currentBacked);

    if (this.boilerplates) {
      let app = this.fs.read(this.destinationPath(`src/${this.name}.js`));
      app = app.replace(`'use strict';`, `'use strict;'\nimport './hello-hello';`);
      this.fs.write(this.destinationPath(`src/${this.name}.js`), app);
    }
  }

  end() {
    this.log('Swiping things up');
    this.spawnCommandSync('rm', ['-rf', 'demo']);
  }
};
