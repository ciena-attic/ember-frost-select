module.exports = {
  description: '',
  normalizeEntityName: function () {},

  /**
    Installs specified packages at the root level of the application.
    Triggered by 'ember install <addon name>'.

    @returns {Promise} package names and versions
  */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-theme', target: '^1.4.1'},
        {name: 'ember-frost-checkbox', target: '^1.2.0'}
      ]
    })
  }
}
