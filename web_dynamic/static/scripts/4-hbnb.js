$(document).ready(function () {
  let amenitiesObjct = {};
  $('input:checkbox').change(function () {
    if (this.checked) {
      amenitiesObjct[$(this).data('id')] = ' ' + $(this).data('name');
    } else {
      delete amenitiesObjct[$(this).data('id')];
    }
    $('DIV.amenities h4').text(Object.values(amenitiesObjct));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function placeSearch (postdata) {
    $('.places_articles').remove();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/JSON',
      data: JSON.stringify(postdata),
      success: function (data) {
        $.each(data, function (key, val) {
          $(`<article class='places_articles'>
          <div class="title">
          <h2>${val.name}</h2>
          <div class="price_by_night">
          ${val.price_by_night}
          </div>
          </div>
          <div class="information">
          <div class="max_guest">
          <i class = "fa fa-users fa-3x" aria - hidden = "true"></i>
          <br />
          ${val.max_guest} Guests
          </div>
          <div class="number_rooms">
          <i class="fa fa-bed fa-3x" aria - hidden = "true" > </i>
          <br />
          ${val.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
          <i class="fa fa-bath fa-3x" aria - hidden = "true"></i>
          <br />
          ${val.number_bathrooms} Bathroom
          </div>
          </div>
          <div class="user">
          <strong> Owner: ${val.user.first_name} ${val.user.last_name}</strong>
          </div>
          <div class="description">
          ${val.description}
          </div>
          </article>`).appendTo('.places');
        });
      }
    });
  }

  placeSearch({});

  $('#search_btn').click((el) => {
    let srchRes = [];
    $('.amenities li input').each((indx, elemnt) => {
      if (elemnt.checked) {
        srchRes.push(elemnt.dataset.id);
      }
    });
    if (srchRes.length) {
      placeSearch({
        amenities: srchRes
      });
    }
  });
});
