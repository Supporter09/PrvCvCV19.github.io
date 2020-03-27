jQuery(document).ready(function () {

    jQuery("body").queryLoader2({
        barColor: '#b1b1b1',
        backgroundColor: '#fff',
        percentage: false,
        barHeight: 10,
        minimumTime: 200,
        fadeOutTime: 500,
        onComplete: function () {
            jQuery('.doc-loader').fadeOut('fast');
        }
    });

    //Disable niceScroll for Safari on Win
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1) || is_touch_device())
    {
        jQuery("html").css('overflow', 'auto');

        jQuery(".scroll-top").click(function () {
            jQuery('html, body').animate({scrollTop: 0}, 2000);
            return false;
        });

    } else
    {
        jQuery("html, #header-main-menu").niceScroll({cursorcolor: "#CDC8C1", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});

        //Scroll Top animation
        jQuery(".scroll-top").click(function () {
            jQuery("html").getNiceScroll(0).doScrollTop(0);
        });


        jQuery(".big-menu").mouseover(function () {
            jQuery("#header-main-menu").getNiceScroll().resize();
        });
    }


    //Placeholder show/hide
    jQuery('input, textarea').focus(function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').blur(function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });

});

jQuery(window).load(function () {

    if (jQuery(document).width() <= 755)
    {
        jQuery('#header-main-menu').removeClass('big-menu').addClass('small-menu');
    }


    jQuery(".image-slider").each(function () {

        var id = jQuery(this).attr('id');

        if (window[id + '_pagination'] == 'true')
        {
            var pagination_value = '.' + id + '_pagination';
        } else
        {
            var pagination_value = false;
        }

        var auto_value = window[id + '_auto'];
        if (auto_value == 'false')
        {
            auto_value = false;
        } else {
            auto_value = true;
        }

        var hover_pause = window[id + '_hover'];
        if (hover_pause == 'true')
        {
            hover_pause = 'resume';
        } else {
            hover_pause = false;
        }

        var speed_value = window[id + '_speed'];

        jQuery('#' + id).carouFredSel({
            responsive: true,
            width: 'variable',
            auto: {
                play: auto_value,
                pauseOnHover: hover_pause
            },
            pagination: pagination_value,
            scroll: {
                fx: 'crossfade',
                duration: parseFloat(speed_value)
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            items: {
                height: 'variable'
            }
        });
    });



    //Fix for post title position
    jQuery('.blog-holder').find('article').each(function () {
        if (jQuery(this).find('.post-thumb').length)
        {
            jQuery(this).find('.entry-title').css('margin-top', (jQuery(this).height() - jQuery(this).find('.entry-title').height()) / 2 - 20);
        }
    });

    //Fix for page header title position
    jQuery('.page .header-image h1.entry-title').css('left', (jQuery('.page .header-image').width() - jQuery(".page .header-image h1.entry-title").width()) / 2);

    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });


    jQuery('#toggle, #header-main-menu').on('click', multiClickFunctionStop);
    jQuery('.main-menu').click(function (e) {
        e.stopPropagation();
    });


    contactFormWidthFix();

    //Team member hover
    jQuery('.team-holder .member').hover(function () {
        jQuery(this).find('.member-info').fadeIn();
    }, function () {
        jQuery(this).find('.member-info').fadeOut();
    });

});


jQuery(window).resize(function () {

    contactFormWidthFix();

    if (jQuery(document).width() <= 755)
    {
        jQuery('#header-main-menu').removeClass('big-menu').addClass('small-menu');
    } else
    {
        jQuery('#header-main-menu').addClass('big-menu').removeClass('small-menu');
    }

//Fix for post title position
    jQuery('.blog-holder').find('article').each(function () {
        if (jQuery(this).find('.post-thumb').length)
        {
            jQuery(this).find('.entry-title').css('margin-top', (jQuery(this).height() - jQuery(this).find('.entry-title').height()) / 2 - 20);
        }
    });

    //Fix for page header title position
    jQuery('.page .header-image h1.entry-title').css('left', (jQuery('.page .header-image').width() - jQuery(".page .header-image h1.entry-title").width()) / 2);

});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var contactFormWidthFix = function () {
    jQuery('.contact-form input[type=text], .contact-form input[type=email], .contact-form textarea').outerWidth(jQuery('.contact-form').width());
};

var multiClickFunctionStop = function (e) {
    if (jQuery(e.target).is('.big-menu') || jQuery(e.target).is('#toggle') || jQuery(e.target).is('#toggle div'))
    {
        jQuery('#toggle, .big-menu').off("click");
        jQuery('#toggle').toggleClass("on");
        if (jQuery('#toggle').hasClass("on"))
        {
            jQuery('#header-main-menu').fadeIn(function () {
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").getNiceScroll().remove();
                        jQuery("html").css("cssText", "overflow: hidden !important");
                    }
                }
                jQuery('#toggle, .big-menu').on("click", multiClickFunctionStop);
            });
        } else
        {
            jQuery('#header-main-menu').fadeOut(function () {
                jQuery('#toggle, .big-menu').on("click", multiClickFunctionStop);
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").niceScroll({cursorcolor: "#CDC8C1", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});
                    }
                }
            });
        }
    }
};

jQuery(window).bind("scroll", function () {
    if (jQuery(this).scrollTop() > 700) {
        jQuery('.scroll-top').fadeIn(500);
    } else
    {
        jQuery('.scroll-top').fadeOut(500);
    }
});

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}


var SendMail = function () {

    var emailVal = jQuery('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
        jQuery.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = jQuery.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}