
let imagesRef = $('#trier img').map(function () { 
  return $(this).attr('src'); }).get();

console.log(imagesRef);


// drag images désactivé

$(function() {
  $('#trier').sortable('disable');
});


//melange images et active le drag

const melangeImages = () => {

  let images = $('#trier img').toArray();
  images.sort(() => Math.random() - 0.5);
  $('#trier').append(images);
  $('#trier').sortable('enable');
};

// vérifie win

const verifierOrdre = () => {
  let verif = $('#trier img').map(function () { 
    return $(this).attr('src'); }).get();
  
  if (verif.toString() === imagesRef.toString()) {
    $('#message').text('Vous avez gagné!').css('color', 'green');
    $('#trier').sortable('disable');
  } else {
    $('#message').text('Vous y etes presque...').css('color', 'red');
  }
};

$('#melanger').click(melangeImages);

$('#trier').sortable({
  update: verifierOrdre
}).disableSelection();
