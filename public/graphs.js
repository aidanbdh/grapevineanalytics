function graph(xLabel, yLabel, data, type) {
  let ms = Date.now();
  //Add multiple while loops to improve preformance or Math.floor()
  while(ms % 86400000 !== 0) {
    ms--;
  }
  this.data = data.filter(function(value) {
    return value.time < ms && value.time > ms - 604800000;
  });
  const scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
  const $home = d3.select('#container-home');
  const $graph = $home.append('div')
    .attr('class', 'graph')
    .data(data)
    .enter()
    .append('div')
    .style('height', function(d) { return scale(d) + 'px' })
    .text(function(d) { return d });
}
