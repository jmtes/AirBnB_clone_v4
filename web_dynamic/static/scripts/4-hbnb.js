$(function () {
  const amenities = [];
  const amenityIds = [];
  $('input:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenities.push($(this).data('name'));
        amenityIds.push($(this).data('id'));
      } else {
        const index = amenities.indexOf($(this).data('name'));
        if (index > -1) {
          amenities.splice(index, 1);
          amenityIds.splice(index, 1);
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
  $('button').click(
    function () {
      const filterPlace = $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify({ amenities: amenityIds }),
        contentType: 'application/json'
      });
      let placeOwner = '';
      filterPlace.done(function (data) {
        $('section.places').html('');
        data.forEach(function (place) {
          const getUser = $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id);
          getUser.done(function (data) {
            placeOwner = data.first_name + ' ' + data.last_name;
            $('section.places').append(`<article>

	    <div class="title">

	      <h2>${place.name}</h2>

	      <div class="price_by_night">

		${place.price_by_night}

	      </div>
	    </div>
	    <div class="information">
	      <div class="max_guest">
		<i class="fa fa-users fa-3x" aria-hidden="true"></i>

		<br />

		${place.max_guest} Guests

	      </div>
	      <div class="number_rooms">
		<i class="fa fa-bed fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_rooms} Bedrooms
	      </div>
	      <div class="number_bathrooms">
		<i class="fa fa-bath fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_bathrooms} Bathroom

	      </div>
	    </div>

	    <!-- **********************
		 USER
		 **********************  -->

	    <div class="user">

	      <strong>Owner: ${placeOwner}</strong>

	    </div>
	    <div class="description">

	      ${place.description}

	    </div>

	  </article>`
            );
          });
        }
        );
      });
    });
  const $apiStatus = $.get('http://0.0.0.0:5001/api/v1/status/');
  $apiStatus.done(function (data) {
  	  if (data.status === 'OK') {
      $('div#api_status').addClass('available');
  	  } else {
      $('div#api_status').removeClass('available');
  	  }
  	});
  const getPlace = $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json'
  });
  let placeOwner = '';
  getPlace.done(function (data) {
    data.forEach(function (place) {
      const getUser = $.get('http://0.0.0.0:5001/api/v1/users/' + place.user_id);
      getUser.done(function (data) {
        placeOwner = data.first_name + ' ' + data.last_name;
        $('section.places').append(`<article>

	    <div class="title">

	      <h2>${place.name}</h2>

	      <div class="price_by_night">

		${place.price_by_night}

	      </div>
	    </div>
	    <div class="information">
	      <div class="max_guest">
		<i class="fa fa-users fa-3x" aria-hidden="true"></i>

		<br />

		${place.max_guest} Guests

	      </div>
	      <div class="number_rooms">
		<i class="fa fa-bed fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_rooms} Bedrooms
	      </div>
	      <div class="number_bathrooms">
		<i class="fa fa-bath fa-3x" aria-hidden="true"></i>

		<br />

		${place.number_bathrooms} Bathroom

	      </div>
	    </div>

	    <!-- **********************
		 USER
		 **********************  -->

	    <div class="user">

	      <strong>Owner: ${placeOwner}</strong>

	    </div>
	    <div class="description">

	      ${place.description}

	    </div>

	  </article>`
        );
      });
    });
  });
});
