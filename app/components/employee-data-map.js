import Ember from 'ember';

// declare variables
let employeeDataMapArray = {};

export default Ember.Component.extend({
    didInsertElement() {  
        // initilaise map                    
        $('#map').vectorMap({
            map: 'europe_mill',
            series: {
                regions: [{
                    values: employeeDataMapArray,
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'lineal'
                }]
            },
            onRegionTipShow: function(e, el, code) {
                el.html(el.html() + ' (Total Employees - ' + employeeDataMapArray[code] + ')');
            }
        });

        // set mobile navigation menu
        $(".button-collapse").sideNav();
    },
    didRender() {        
        // re-initialise employee array
        employeeDataMapArray = {};

        // update number of employees
        $.each(this.get('data'), function(key, value) {
           employeeDataMapArray[value.countryCode] = value.totalEmployees;            
        });

        // update map with updated number
        $('#map').vectorMap('get', 'mapObject').series.regions[0].setValues(employeeDataMapArray);
    }
});