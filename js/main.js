$(document).ready(function() {

  var _url = "https://my-json-server.typicode.com/MHendriF/pwaapi/plants"

  var dataResults = ''
  var famResults = ''
  var families = []

  $.get(_url, function (data) {

    $.each(data, function(key, items){

      _fam = items.family

      dataResults += "<div>"
                  + "<h3>" + items.name + "</h3>"
                  + "<p>" + _fam + "</p>"
                  "<div>";

          if($.inArray(_fam, families) == -1){
            families.push(_fam)
            famResults += "<option value'"+ _fam +"'>" + _fam + "</option>"
          }
    })

    $('#plants').html(dataResults)
    $('#fam_select').html("<option value='all'>semua</option>" +famResults)

  })

  //Filter
  $("#fam_select").on('change', function(){
    updatePlants($(this).val())
  })

  function updatePlants(fam) {

    var dataResults = ''
    var _newUrl = _url

    if(fam != 'all')
      _newUrl = _url + "?family=" + fam

    $.get(_newUrl, function (data) {

      $.each(data, function(key, items){
        _fam = items.family

        dataResults += "<div>"
                    + "<h3>" + items.name + "</h3>"
                    + "<p>" + _fam + "</p>"
                    "<div>";
      })

      $('#plants').html(dataResults)

    })
  }
})


//PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
