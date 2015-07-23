(function ($) {
    "use strict";
    $(document).ready(function () {
        jQuery('#countdown_dashboard').countDown({
            targetDate: {
                'day': 22,
                'month': 8,
                'year': 2015,
                'hour': 16,
                'min': 0,
                'sec': 0
            }
        });
        var windowHeight = $(window).height();
        $('.hero').height(windowHeight);
        $(window).resize(function () {
            var windowHeight = $(window).height();
            $('.hero').height(windowHeight);
        });
        $('#menuToggle, .menu-close').on('click', function () {
            $('#menuToggle').toggleClass('active');
            $('body').toggleClass('body-push-toleft');
            $('#theMenu').toggleClass('menu-open');
        });
        new Photostack(document.getElementById('photostack'), {
            callback: function (item) {}
        });
        $('.photostack').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title');
                }
            },
        });
        jQuery.supersized({
            slide_interval: 3000,
            transition: 1,
            transition_speed: 700,
            slide_links: 'blank',
            slides: [{
                image: 'images/slider-1.JPG'
            }, {
                image: 'images/slider-2.JPG'
            }, {
                image: 'images/slider-3.JPG'
            }]
        });

        $('#submit_btn').click(function(){
            var nameField = $('#name'),
                guestsField = $('#guests'),
                descField = $('#input-message'),
                alertField = $('#alert'),
                salertField = $('#sAlert'),
                nVal = nameField.val(),
                gVal = guestsField.val(),
                dVal = descField.val();

            if (!nVal || !gVal || !dVal){
                alertField.show();
                $(this).prop('disabled', false);
                return;
            }

            $.ajax({
                type: 'POST',
                url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                data: {
                    key: 'JRXcOjTGJHW5ZI54MYEOgw',
                    message: {
                        from_email: 'agabidullin@gmail.com',
                        to: [
                          {
                            email: 'agabidullin@gmail.com',
                            name: 'СВАДЬБА',
                            type: 'to'
                          }
                          ,
                          {
                            email: 'standpoint10@gmail.com',
                            name: 'СВАДЬБА',
                            type: 'to'
                          }
                        ],
                      autotext: true,
                      subject: 'Сообщение со свадебного сайта!',
                      html: 'Гость под именем ' + nVal + ' сказал, что будет на свадьбе! Их будет ' + gVal 
                            + ' человек! Еще он оставил пожелание: ' + dVal + '. Конец сообщения!'
                    }
                }
                }).done(function(response) {
                    nameField.val('');
                    guestsField.val('');
                    descField.val('');
                    alertField.hide();
                    salertField.show();
                    $(this).prop('disabled', false);
                    console.log(response); // if you're into that sorta thing
                });
            })
    });
})(jQuery);
