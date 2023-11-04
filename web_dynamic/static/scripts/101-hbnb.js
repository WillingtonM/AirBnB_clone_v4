$(document).ready(function () {
  let statesObjct = {};
  let amenitiesObjct = {};

  function handleStateCheck() {
    if (this.checked) {
      statesObjct[$(this).data('id')] = ' ' + $(this).data('name');
      let cities = $(this).parent().next('ul').find('.cities_li input:checkbox');
      cities.each((indx, elemnt) => {
        elemnt.checked = true;
        if (statesObjct[$(elemnt).data('id')]) {
          delete statesObjct[$(elemnt).data('id')];
        }
      });
    } else {
      let cities = $(this).parent().next('ul').find('.cities_li input:checkbox');
      cities.each((indx, elemnt) => {
        if (elemnt.checked) {
          statesObjct[$(elemnt).data('id')] = ' ' + $(elemnt).data('name');
        }
      });
      delete statesObjct[$(this).data('id')];
    }
    $('DIV.locations h4').text(Object.values(statesObjct));
  }

  function handleCityCheck() {
    if (this.checked) {
      let chckBox = $(this).parent().parent().find('.cities_li input:checkbox').length;
      let checked = $(this).parent().parent().find('.cities_li input:checked').length;
      if (chckBox === checked) {
        let stateCheck = $(this).parent().parent().parent().find('.states_h2 input:checkbox')[0];
        stateCheck.checked = true;
        $(stateCheck).trigger('change');
      } else {
        statesObjct[$(this).data('id')] = ' ' + $(this).data('name');
      }
    } else {
      let stateCheck = $(this).parent().parent().parent().find('.states_h2 input:checkbox')[0];
      if (stateCheck.checked) {
        stateCheck.checked = false;
        $(stateCheck).trigger('change');
      }
      delete statesObjct[$(this).data('id')];
    }
    $('DIV.locations h4').text(Object.values(statesObjct));
  }

  function handleAmenitiesCheck() {
    if (this.checked) {
      amenitiesObjct[$(this).data('id')] = ' ' + $(this).data('name');
    } else {
      delete amenitiesObjct[$(this).data('id')];
    }
    $('DIV.amenities h4').text(Object.values(amenitiesObjct));
  }

  function placeSearch(postdata) {
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
          <div class="reviews">
            <h2 class=review_heading>Reviews</h2>
        <span class="review_toggle" data-id = "${val.id}">
        SHOW </span>
            <ul id="${val.id}">
            <li>
                <h3></h3>
                <p></p>
            </li>
            </ul>
          </div>
          </article>`).appendTo('.places');
        });
        $('.review_toggle').click(function () {
          // console.log(this);
          let ulid = this.dataset.id;
          let url = 'http://0.0.0.0:5001/api/v1/places/' + ulid + '/reviews';
          $.get(url, function (data) {
            console.log(data);
            data.forEach(function (review) {
              // console.log(item);
              /* TODO: 
               * Need to get users.first_name and users.last_name
               * and place it under reviews in flask
               */
              $(`
                <li>
                <h3>${review.user.first_name} ${review.user.last_name}</h3>
                <p>${review.text}</p> 
                </li> `).appendTo('#' + ulid);
              // console.log($(this).find('.reviews'));
            });
          });
        });
      }
    });
  }

  function handleSearchClick(el) {
    let srchRes = {};
    let amenities = [];
    let cities = [];
    $('.amenities li input').each((indx, elemnt) => {
      if (elemnt.checked) {
        amenities.push(elemnt.dataset.id);
      }
      srchRes['amenities'] = amenities;
      if (amenities.length) {}
    });

    $('.cities_li input').each((indx, elemnt) => {
      if (elemnt.checked) {
        cities.push(elemnt.dataset.id);
      }
      srchRes['cities'] = cities;
    });
    placeSearch(srchRes);
  }

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  placeSearch({});
  $('.states_h2 input:checkbox').change(handleStateCheck);
  $('.cities_li input:checkbox').change(handleCityCheck);
  $('.amenities input:checkbox').change(handleAmenitiesCheck);
  $('#search_btn').click(handleSearchClick);
});