<template>
    <strong>Right Now:</strong> {{weather_now.weather.description}}
    <div class="pull-down" id="chart"></div>
</template>


<script>
    import Chartist from 'chartist'

    export default {
        data: function () {
            return {
                weather_now : {}
            };
        },
        ready: function() {
            this.fetchWeather()
        },
        methods: {
            fetchWeather: function () {
                this.$http.get('http://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        'q': "Stockholm,se",
                        'APPID': "4f3770bc297cf16d10b60f3cefc75098"
                    }
                }).then((response) => {
                    console.log(response)
                    this.renderChart(response.body);
                    this.weather_now = response.body.list[0];
                }, (response) => {
                    console.log(response);
                });

            },
            renderChart: function (data) {
                var temp = [];
                var labels = [];

                for(var i in data.list) {
                    temp.push(data.list[i].main.temp - 273.15);
                    labels.push(data.list[i].dt_txt);
                }

                var data = {
                    // Our series array that contains series objects or in this case series data arrays
                    //labels: labels,
                    series: [
                        temp
                    ]
                };

                // Create a new line chart object where as first parameter we pass in a selector
                // that is resolving to our chart container element. The Second parameter
                // is the actual data object.
                var chart = new Chartist.Line('#chart', data, {
                    low: 0,
                    showArea: false,
                    showPoint: false,
                    fullWidth: true
                });

                chart.on('draw', function(data) {
                    if(data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                            d: {
                                begin: 2000 * data.index,
                                dur: 2000,
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    }
                });
            }
        }
    }
</script>