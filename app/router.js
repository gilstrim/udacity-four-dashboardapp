import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('geospatial-view');
  this.route('key-metrics-view');
  this.route('data-view');
  this.route('dashboard-main');
  this.route('data-view-test');
});

export default Router;
