import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('employee-data-map', 'Integration | Component | employee data map', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{employee-data-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#employee-data-map}}
      template block text
    {{/employee-data-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
