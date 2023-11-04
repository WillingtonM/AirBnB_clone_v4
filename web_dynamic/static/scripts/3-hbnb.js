$(document).ready(function () {
  $('input[type=checkbox]').on('click',  function () {
    const checkedName = [];
    const checkedId = [];
    $('input[type=checkbox]:checked').each(function () {
      checkedName.push($(this).attr('data-name'));
      checkedId.push($(this).attr('data-id'));
    });
    if (checkedName.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(checkedName.join(', '));
    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if data.status === "OK" {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    },
    error: function (e, status) {
      console.log("Error", e);
    },
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      $.each(places, function (place) {
        $('.places').append(`<article>
<div class="title_box">
<h2> ${place.name}</h2>
<div class="price_by_night"> ${place.price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${place.max_guest}
${place.max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${place.number_rooms}
${place.number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${place.number_bathrooms}
${place.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
</div>
<div class="description">
${place.description}
</div>
</article>
`);
      });
    },
    error: function (e, status) {
      console.log("Error", e);
    },
  });

});
