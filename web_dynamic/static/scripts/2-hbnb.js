$(function () {
  const amenities = [];
  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenities.push($(this).data('name'));
      } else {
        const index = amenities.indexOf($(this).data('name'));
        if (index > -1) {
          amenities.splice(index, 1);
        }
      }
      if (amenities.length === 0) {
        $('div.amenities h4').html('&nbsp;');
      } else {
        let amenityString = '';
        amenities.forEach(function (item, index) {
          if (index !== 0) {
            amenityString += ', ';
          }
          amenityString += item;
        });
        $('div.amenities h4').text(amenityString);
      }
    });
  const $apiStatus = $.get('http://0.0.0.0:5001/api/v1/status/');
  console.log($apiStatus);
  $apiStatus.done(function (data) {
    console.log(data);
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
