$('#commands').focus();
$('#commands').on('keypress', ssh.bind(ssh));

//socket on receive data append text to terminal


function appendText(text) {
  var lineOfText = $('<div class="lineOfText"></div>');
  lineOfText.text(text);
  $('.terminal').append(lineOfText);
}


function ssh(event) {
	if(event.keyCode == '13') {
  	//this is enter
    
    var textFromInput = $('#commands').val();
   	appendText(textFromInput); 
    
    //send over websockets
    $('#commands').val('');
    $('#commands').focus();
  }
};


$('.terminal').on('click', function() {
	$('#commands').focus();
})
