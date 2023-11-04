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
    success: function (data) {
      if data.status === "OK" {
        $('div#api_status').addClass('available');
        console.log("done");
      } else {
        $('div#api_status').removeClass('available');
        console.log("nothing")
      }
    },
    error: function (e, status) {
      console.log("problem", e);
    },
  });
});
