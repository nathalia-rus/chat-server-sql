
function Preview (PreviewText) {
  if (PreviewText.length > 18) {
    $('.preview').text(PreviewText.substr(0, 18) + '...');
  } else {
    $('.preview').text(PreviewText);
  }
}

// `INSERT INTO messages(message_id, user_id, content) VALUE (0, ${message.user_id}, ${message.message})`

function my_method (data) {
  $('#conversation').append('<p class=\"ai\">' + data.quote + '</p>');
  scrollToBottom();
  setHeight();
  Preview(data.quote);
  $.post('http://127.0.0.1:3000/',
    {
      message: data.quote,
      user_id: 1
    });
}

function AI () {
  $('#conversation').find('.ai').last();
  $.get('http://quotes.stormconsultancy.co.uk/random.json',my_method);
}

function setHeight () {
  $('#conversation').height($(window).height() - $('.activechat').height() - $('#inputblock').height() -90);
}

function scrollToBottom () {
  $('#conversation').scrollTop($('#conversation').prop('scrollHeight'));
}

function textPrinter (text) {
  if (text.length > 1) {
    $('#conversation').append('<p class=\"user\">' + text +'</p>');
    $.post('http://127.0.0.1:3000/',
      {
        message: text,
        user_id: 2
      });
    $('#inputform').val('');
    Preview(text);
    scrollToBottom();
    setHeight();
  } else {
    $('#inputform').val('');
  }
}

function manage_data (data) {
  data.forEach(element => {
    if (element.user === 'me') $('#conversation').append('<p class=\"user\">' + element.quote +'</p>');
    if (element.user === 'computer') $('#conversation').append('<p class=\"ai\">' + element.quote + '</p>');
    Preview(element.quote);
  });
  scrollToBottom();
}

jQuery(document).ready(function () {
  setHeight();
  setInterval(function () {
    return AI();
  }, Math.floor(Math.random()*30000));

  $('#inputform').attr('placeholder', 'Write here to send a message to ' + $('.activename').text());

  $('#inputform').on('keyup' , function (event) {
    if (event.which == 13 && !event.shiftKey) {
      let chatText = $(inputform).val();
      newLine = chatText.replace(/\n/g, '');
      textPrinter(newLine);
    }
  });

  $(window).on('resize', function () {
    setHeight();
    scrollToBottom();
  });

  $.get('http://127.0.0.1:3000/message',manage_data);
});