$(document).ready( function(){
    var tweetCompose = $('.tweet-compose');
    var tweetControls = $("#tweet-controls");
    var charCount = $('#char-count');


// Initially the tweet controls are hidden, but when user clicks
// on the input area the area doubles in size and the controls are revealed.
    tweetCompose.on('click', function(){
        $(this).css({height: '5em'});
        tweetControls.css({display: 'block'});
    });
// When the user clicks anywhere else it reverts back... unless there
// is content in the input field.
    tweetCompose.blur('click', function(){
        if (!tweetCompose.val()) {
            tweetCompose.css({height: '2.5em'});
            tweetControls.css({display: 'none'});
        }
    });

    // make each tweet stats only visible when you click on the tweet
    // and disappear again when you click off
    $('.tweet').on('mouseover', function(){
        $('.stats', this).css({display: 'block'});
    });
    $('.tweet').on('mouseout', function(){
        $('.stats', this).css({display: 'none'});
    });

// Character count gets reduced as user types and turns red when the
// input length gets down to 10 characters. Also the button becomes
// inactive or disappears

    var maxLength = 140;
    $('textarea').keyup(function() {
        var length = maxLength - $(this).val().length;
        // var length = maxLength - length;
        charCount.text(length);
        // id char-count should turn red when 10 or less characters
        if (length < 11) {
           charCount.css({color: 'red'});
        }
        else {
           charCount.css({color: '#999'});
        }
        // tweet-submit button should be hidden if length <= 0
        if (length <= 0) {
           $('#tweet-submit').hide();
           charCount.text("max length exceeded");
        }
        else {
           $('#tweet-submit').show();
        }
    });


// clone and grab the new tweet and it's inner items = README line 22
    $('button').on('click', function(){
        var cloneTweet = $('.tweet').clone().eq(0);
        var tweetText = $('.tweet-compose').val();
        var userName = '@McFuddMann';
        var avatar = 'img/alagoon.jpg';
        var fullName = 'Johnny McFuddy';
        // find and replace the selected items for this tweet
        cloneTweet.find('.tweet-text').html(tweetText);
        cloneTweet.find('.avatar').attr('src', 'img/alagoon.jpg');
        cloneTweet.find('.fullname').html(fullName);
        cloneTweet.find('.username').html(userName);
        cloneTweet.find('.num-retweets').html('0');
        cloneTweet.find('.num-favorites').html('0');
        cloneTweet.find('.reply > .tweet-compose').attr('placeholder', 'Reply to @McFuddMann');
        // add the new tweet to the top of the stream
        $('#stream').prepend(cloneTweet);
        // reset the new tweet input box
        $('.tweet-compose').val('');
        if (!tweetCompose.val()) {
            tweetCompose.css({height: '2.5em'});
            tweetControls.css({display: 'none'});
        }

    });

    $(document).on('click', '.tweet', function(){
        $(this).find('.stats').toggle();
    });









});
