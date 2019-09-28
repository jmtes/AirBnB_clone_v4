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
		$('div.amenities h4').text('\xA0');
		let amenityString = '';
		amenities.forEach(function(item, index) {
			console.log(item);
			if (index !== 0) {
				amenityString += ', ';
			}
			amenityString += item;
		});
		$('div.amenities h4').text(amenityString);
		//console.log(amenityString);
	});
});
