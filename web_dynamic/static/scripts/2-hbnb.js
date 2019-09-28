const $apiStatus = $.get('http://0.0.0.0:5001/api/v1/status/');
$apitStatus.done(function(data){
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

$(function() {
	let amenities = [];
	$('input:checkbox').change(
	function(){
		if ($(this).is(':checked')) {
			amenities.push($(this).data('name'));
		} else {
			let index = amenities.indexOf($(this).data('name'));
			if (index > -1) {
				amenities.splice(index, 1);
			}
		}
		console.log(amenities);
		if (amenities.length === 0) {
			$('div.amenities h4').html('&nbsp;');
		} else {
			let amenityString = '';
			amenities.forEach(function(item, index) {
				if (index !== 0) {
					amenityString += ', ';
				}
				amenityString += item;
			});
			$('div.amenities h4').text(amenityString);
		}
	});
});
