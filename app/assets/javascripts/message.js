$(document).on('turbolinks:load',function() {
  function buildHTML(message){
    if (message.image !== "") {
      var addImage = `<img src="${message.image}">`
     }
    var html =`<div class="message" data-id="${message.id}">
                <div class="message__user">
                  ${message.user_name}
                </div>
                <div class="message__date">
                  ${message.created_at}
                </div>
                <div class="message__content">
                  ${addImage} </br>
                  ${message.body}
                </div>
              </div>`
    return html;
  }
  $('#chat_form').on('submit', function(e){
    e.preventDefault();
    var fd = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: fd,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data){
      var html = buildHTML(data);
      var scroll_target = $('.right_contents__messages')

      $('.right_contents__messages').append(html)
      $('.right_contents__input__text').val('');
      $('.right_contents__input__file').val('');
      scroll_target.animate({
      scrollTop: scroll_target[0].scrollHeight
    })
      $('.right_contents__input__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var message_id = $('.message:last').data('id');
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { message: {id: message_id } },
        dataType: 'json'
      })
      .done(function(messages){
        var scroll_target = $('.right_contents__messages')
        if (messages != "") {
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML += buildHTML(message);
          });
          $('.right_contents__messages').append(insertHTML);
          scroll_target.animate({
          scrollTop: scroll_target[0].scrollHeight
        })
        };
      })
      .fail(function(data){
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  },5000);
});
