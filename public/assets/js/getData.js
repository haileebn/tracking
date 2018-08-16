function getData() {
  $.ajax({
		url: `/lastdata`,
		type: 'get',
		success(result) {
      let data = result[0];
      const aqiPM25 = (data['pm25']);
      const aqiPM10 = (data['pm10']);
      const aqiCO = (data['CO']);
      const aqiNO2 = (data['NO2']);
      // const aqiPM25 = AQIPM25(data['pm25']);
      // const aqiPM10 = AQIPM10(data['pm10']);
      // const aqiCO = AQICO(data['CO']);
      // const aqiNO2 = AQINO2(data['NO2']);
      const time = moment(data.time).format('HH:mm:ss');
      $('.valueAQIPM25').html(aqiPM25);
      $('.valueAQIPM10').html(aqiPM10);
      $('.valueAQICO').html(aqiCO);
      $('.valueAQINO2').html(aqiNO2);
      $('.valueTemp').html(data.t);
      $('.valueHud').html(data.h);
      $('.time-update').find('div').html(time);
      setTimeout(getData, 10000);
    },
  });
}
