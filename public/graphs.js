moment().format();

function graph(data, type) {
  const today = moment().dayOfYear();
  const endDay = moment(today - 1, 'DDD').endOf('day');
  const startDay = endDay.dayOfYear() - 6;
  let dayData = data.filter(function(value) {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() > startDay && moment(value.time, 'DD-MM-YYYY').dayOfYear() < endDay.dayOfYear();
  });
  let days = []
  days.push(data.filter(value => {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === startDay;
  }));
  days.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 5;
  }));
  days.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 4;
  }));
  days.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 3;
  }));
  days.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 2;
  }));
  days.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 1;
  }));
  days.push(data.filter(value => {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === endDay.dayOfYear();
  }));

  const unit = 304 / Math.max(days[0].length,days[1].length,days[2].length,days[3].length,days[4].length,days[5].length,days[6].length);
  const numBars = 7;
  const numTics = 7;

  const $charts = document.getElementById('charts');
  const $chartsDiv = document.createElement('div');
  $charts.appendChild($chartsDiv);
  $chartsDiv.setAttribute('class', 'graph')
  let $graph = document.querySelectorAll('.graph')[0]
  for (let i = 0; i < numBars + numTics; i++) {
    const $graphDiv = document.createElement('div');
    $graph.appendChild($graphDiv);
  }
  const $bar = document.querySelectorAll('.graph div');
  for (let i = 0; i < numBars; i++) {
    $bar[i].setAttribute('id', `bar${numBars - 1 - i}`);
    $bar[i].setAttribute('class', 'bar');
    $bar[i].style = `height: ${days[numBars - 1 - i].length * unit}px !important; width: ${(480 - 7 * days.length) / days.length}px !important`
    const $barSpan = document.createElement('span');
    const $barText = document.createTextNode(`${days[numBars - 1 - i].length}`);
    $barSpan.appendChild($barText)
    $bar[i].appendChild($barSpan)
  }
  for (let i = numBars; i < numBars + numTics; i++) {
    $bar[i].setAttribute('class', 'tic');
    $bar[i].style = `width: ${(480 - 7 * days.length) / days.length}px !important`
    endDay.subtract(1, 'days')
    const $ticSpan = document.createElement('span');
    const $ticText = document.createTextNode(`${endDay.month() + 1}/${endDay.date()}`);
    $ticSpan.appendChild($ticText)
    $bar[i].appendChild($ticSpan)
  }
}
