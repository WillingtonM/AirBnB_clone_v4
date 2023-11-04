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
});
