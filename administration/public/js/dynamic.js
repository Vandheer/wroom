var socket = io.connect('http://localhost:7800');

socket.on('ajouter-sponsor', function (data) {
    if(data.success){
      $("tbody tr:nth-last-child(2)").after('<tr><td>' + data.sponom + '</td><td>'
        + data.sposectactivite + '</td><td>'
        + '<a href="#table-start" class="modifier">'
        + '<img src="image/act_edit.png" alt="modifier" title="Modifier"/> Modifier</a>'
        + '<a href="#table-start" class="supprimer">'
        + '<img src="image/act_delete.png" alt="supprimer" title="Supprimer"/> Supprimer</a>'
        + '<td class="hidden">' + data.sponum + '</td>'
        + '</td></tr>');
      $('input').val('').removeClass('input-error');
    }else{
      $('input').addClass('input-error');
    }

    $('.supprimer').click(function(e){

        var sponum = $(this).parent('td').next().html();

        socket.emit('supprimer-sponsor', {
            num_sponsor: sponum
        });
    });
});

socket.on('supprimer-sponsor', function (data) {
    $("td:contains('"+data.sponum+"')").parent('tr').remove();
});

$(document).ready(function(){

  $('.ajouter').click(function(e){

      var nom_sponsor = $('input#sponom').val();
      var sectacti_sponsor = $('input#sposectactivite').val();

      socket.emit('ajouter-sponsor', {
          sponom: nom_sponsor,
          sposectactivite: sectacti_sponsor
      });
  });

  $('.supprimer').click(function(e){

      var sponum = $(this).parent('td').next().html();

      socket.emit('supprimer-sponsor', {
          num_sponsor: sponum
      });
  });
});
