moment().format();

function newGraph(data, type) {
  data.map(value => {
    return value.time = moment(value.time, 'DD-MM-YYYY');
  })
  let range = data[0].time.to(data[data.length-1].time, true);
  range = range.split(' ');
  range[0] = 'a' ? 1 : range[0];
  range = moment().subtract(range[0], range[1]);
  data = data.filter(value => {
    return value.time > range;
  })
  const dataArr = [];
  const now = moment();
  let i = data.length-1;
  while(data[i]) {
    let j = i;
    let day = [];
    now.subtract(1, 'day')
    while(data[j] && data[j].time > now) {
      day.push(data[j]);
      j--;
    }
    i = j;
    dataArr.push(day);
  };
  return {
    type,
    data: dataArr,
    range
    }
}

function drawGraph(graph, start) {
  const now = moment();
  switch(graph.type) {
    case 'day':

      break;
    case 'week':

      break;
    case 'month':

      break;
    case 'year':

      break;
    case 'decade':

      break;
    default:

      break;
  }
}

/*
  const today = moment().add(start + viewDay, 'timeScale').dayOfYear();
  const endDay = moment(today, 'DDD').endOf('day');
  const startDay = endDay.dayOfYear() - 6;
  let dayData = data.filter(function(value) {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() > startDay && moment(value.time, 'DD-MM-YYYY').dayOfYear() < endDay.dayOfYear();
  });
  let barsTime = []
  barsTime.push(data.filter(value => {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === startDay;
  }));
  barsTime.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 5;
  }));
  barsTime.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 4;
  }));
  barsTime.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 3;
  }));
  barsTime.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 2;
  }));
  barsTime.push(data.filter(value => {
    let day = endDay.dayOfYear();
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === day - 1;
  }));
  barsTime.push(data.filter(value => {
    return moment(value.time, 'DD-MM-YYYY').dayOfYear() === endDay.dayOfYear();
  }));

  const unit = 304 / Math.max(barsTime[0].length,barsTime[1].length,barsTime[2].length,barsTime[3].length,barsTime[4].length,barsTime[5].length,barsTime[6].length);
  const numBars = 7;

  let $graph = document.querySelectorAll('.graph')[0]
  for (let i = 0; i < numBars + numTics; i++) {
    const $graphDiv = document.createElement('div');
    $graph.appendChild($graphDiv);
  }

  const $bar = document.querySelectorAll('.graph div');
  for (let i = 0; i < $bar.length; i++) {
    $bar[i].setAttribute('class')
  }
  for (let i = 0; i < numBars; i++) {
    $bar[i].setAttribute('id', `bar${numBars - 1 - i}`);
    $bar[i].setAttribute('class', 'bar');
    $bar[i].style = `height: ${barsTime[numBars - 1 - i].length * unit}px !important; width: ${(480 - 7 * barsTime.length) / barsTime.length}px !important`
    const $barSpan = document.createElement('span');
    const $barText = document.createTextNode(`${barsTime[numBars - 1 - i].length}`);
    $barSpan.appendChild($barText)
    $bar[i].appendChild($barSpan)
  }

  for (let i = numBars; i < numBars * 2; i++) {
    $bar[i].setAttribute('class', 'tic');
    $bar[i].style = `width: ${(480 - 7 * barsTime.length) / barsTime.length}px !important`
    const $ticSpan = document.createElement('span');
    const $ticText = document.createTextNode(`${endDay.month() + 1}/${endDay.date()}`);
    endDay.subtract(1, 'timeScale');
    $ticSpan.appendChild($ticText)
    $bar[i].appendChild($ticSpan)
  }
  viewDay += start;
}
*/
function drawGraph(graph, start) {
  const now = moment();
  switch(graph.type) {
    case 'day':

      break;
    case 'week':

      break;
    case 'month':

      break;
    case 'year':

      break;
    case 'decade':

      break;
    default:

      break;
  }
}
