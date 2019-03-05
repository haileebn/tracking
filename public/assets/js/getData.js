function getData() {
  $.ajax({
    url: `http://api.fairnet.vn/kit/1027/lastdata`,
    type: 'get',
    success(result) {
      let data = conv(result)
      bindData(data)
      // let data = result[0];
      // const aqiPM25 = (data['pm25']);
      // const aqiPM10 = (data['pm10']);
      // const aqiCO = (data['CO']);
      // const aqiNO2 = (data['NO2']);
      // const aqiPM25 = AQIPM25(data['pm25']);
      // const aqiPM10 = AQIPM10(data['pm10']);
      // const aqiCO = AQICO(data['CO']);
      // const aqiNO2 = AQINO2(data['NO2']);

    },
  });
}

function conv(data) {
  let bindingable = {}
  data.forEach(item => {
    switch (item.sensor) {
      case 'PMS5003':
        bindingable.aqiPM1 = item.lastData.value[0]
        bindingable.aqiPM25 = item.lastData.value[1]
        bindingable.aqiPM10 = item.lastData.value[2]
        break
      case 'DHT22':
        bindingable.t = (item.lastData.value[0])
        bindingable.h = (item.lastData.value[1])
        break
      case 'MQ131':
        bindingable.aqiO3 = (item.lastData.value[0])
        break
      case 'MQ136':
        bindingable.aqiSO2 = (item.lastData.value[0])
        break
      case 'MICS4514':
        bindingable.aqiNO2 = (item.lastData.value[0])
        break
      case 'MQ7':
        bindingable.aqiCO = (item.lastData.value[0])
        break
    }
  })
  return bindingable;
}

function bindData(data) {
  const time = moment(data.time).format('HH:mm:ss');
  $('.valueAQIPM25').html(data.aqiPM25);
  $('.valueAQIPM10').html(data.aqiPM10);
  $('.valueAQICO').html(data.aqiCO);
  $('.valueAQINO2').html(data.aqiNO2);
  $('.valueTemp').html(data.t);
  $('.valueHud').html(data.h);
  $('.time-update').find('div').html(time);
  setTimeout(getData, 10000);
}