var chartId = 1
var createComponent = function(Vue, tagName, chartType) {
  var chartProps = [
    "colors", "curve", "discrete", "donut", "download", "label",
    "legend", "library", "max", "min", "points", "refresh",
    "stacked", "title", "xtitle", "xtype", "ytitle"
  ]
  Vue.component(tagName, {
    props: ["data", "id", "width", "height"].concat(chartProps),
    template: '<div v-bind:id="chartId" v-bind:style="chartStyle"></div>',
    data: function() {
      return {
        chartId: null
      }
    },
    computed: {
      chartStyle: function() {
  
        this.data
        this.chartOptions

        return {
          height: this.height || "300px",
          lineHeight: this.height || "300px",
          width: this.width || "100%",
        }
      },
      chartOptions: function() {
        var options = {}
        var props = chartProps
        for (var i = 0; i < props.length; i++) {
          var prop = props[i]
          if (this[prop] !== undefined) {
            options[prop] = this[prop]
          }
        }
        return options
      }
    },
    created: function() {
      this.chartId = this.chartId || this.id || ("chart-" + chartId++)
    },
    mounted: function() {
      this.chart = new chartType(this.chartId, this.data, this.chartOptions)
    },
    updated: function() {
      this.chart.updateData(this.data, this.chartOptions)
    }
  })
}

var VueChart = {
  install: function(Vue, options) {
    var Chartkick = options.Chartkick
    createComponent(Vue, "pie-chart", Chartkick.PieChart)
    createComponent(Vue, "bar-chart", Chartkick.BarChart)
     }
}
if (typeof window !== "undefined" && window.Vue && window.Chartkick) {
  window.Vue.use(VueChart, {Chartkick: window.Chartkick})
}

