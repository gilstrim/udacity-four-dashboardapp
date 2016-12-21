import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reported-issues-chart', 'Integration | Component | reported issues chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reported-issues-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reported-issues-chart}}
      template block text
    {{/reported-issues-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
