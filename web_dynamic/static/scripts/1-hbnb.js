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
