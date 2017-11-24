(function(){

/**
 * Checks if jQuery exists, otherwise includes it
 */
if (typeof jQuery == 'undefined') {
    var jQueryScript = document.createElement('script');
    jQueryScript.src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
    jQueryScript.onload = CinsayPlayer;

    document.getElementsByTagName('head')[0].appendChild(jQueryScript);
} else {
    CinsayPlayer();
}


/**
 * Sets html assuming old cinsay iframes have been dealt with
 */
function CinsayPlayer()
{
    (function($){

        // Properties
        var playerElements = [];
        var responseCache = [];
        var isModalOpen = false;
        var isOldHtmlFixed = false;
        var scriptComplete = false;


        // Methods
        var getPlayerUrl = function(playerId){
            return 'http://player.cinsay.com/player.php?playerid=' + playerId + '&rmiurl=services.cinsay.com&cdnurl=prodcdn.cinsay.edgesuite.net&width=704&height=555&autoPlay=false&inmarketplace=false&flavor=expanded&ver=3';
        };

        var getMobilePlayerUrl = function(playerId){
            return 'http://player.cinsay.com/html/devices/handheld/smartphone/?playerid=' + playerId + '&rmiurl=services.cinsay.com&cdnurl=prodcdn.cinsay.edgesuite.net&width=740&height=510&flavor=classic';
        };

        var fixOldHtml = function(){
            $('iframe').each(function(i, el){
                var iframeSrc = $(el).attr('src');

                if (iframeSrc.indexOf('player.cinsay.com') !== -1) {
                    var startIndex = iframeSrc.indexOf('?playerid');
                    var playerId = iframeSrc.substr(startIndex + 10, 36);

                    var wrapHtml = '<div class="cinsay-player" data-player-id="' + playerId + '"></div>';

                    $(el).wrap(wrapHtml);
                }
            });

            isOldHtmlFixed = true;
        };

        var setApiData = function(){
            playerElements = $('.cinsay-player');

            playerElements.each(function(i, el){
                var url = 'http://services.cinsay.com/rest/lsbPlayerService/getPlayerById/' + $(el).attr('data-player-id');

                if (window.XDomainRequest && navigator.appVersion.indexOf('MSIE 9') !== -1) {
                    var request = new XDomainRequest();  

                    request.onload = function(){
                        var data = JSON.parse(request.responseText);

                        responseCache.push({
                            imgSrc: data.responseObject.videos[0].posterImage.url,
                            title: data.responseObject.name,
                            description: data.responseObject.description
                        });
                    };

                    request.open('get', url);
                    request.send();

                } else {
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        async: false,
                        success: function(data){
                            if (data.responseObject != null) {
                                responseCache.push({
                                    imgSrc: data.responseObject.videos[0].posterImage.url,
                                    title: data.responseObject.name,
                                    description: data.responseObject.description
                                });
                            } else {
                                responseCache.push({
                                    imgSrc: '',
                                    title: '',
                                    description: ''
                                });                              
                            }
                        }
                    });                    
                }
            });
        };

        var insertStyles = function(){
            var styleString = '<style>.cinsay-player{line-height:1}.cinsay-player *{box-sizing:border-box;text-decoration:none}.cinsay-link{cursor:pointer}.cinsay-player .cinsay-mobile{display:block;margin:0;border:none;position:relative}.cinsay-player .cinsay-mobile .cinsay-play{position:absolute;top:0;left:0;right:0;bottom:0}.cinsay-player .cinsay-mobile .cinsay-thumb{max-width:100%;display:block}.cinsay-player .cinsay-mobile .cinsay-play .cinsay-inner{position:absolute;top:25%;left:0;right:0;text-align:center}.cinsay-player .cinsay-mobile .cinsay-play .cinsay-circle{display:inline-block;width:25%;padding-bottom:25%;border-radius:50%;background:rgba(255,255,255,.8);box-shadow:0 0 60px 20px rgba(0,0,0,.6)}.cinsay-player .cinsay-mobile .cinsay-play .cinsay-circle:before{content:"";display:block;position:absolute;top:50%;left:50%;border-right:none;border-style:solid;border-style-right:outset;border-color:transparent transparent transparent #999}.cinsay-player .cinsay-text{display:block;padding:20px;background:#000}.cinsay-player .cinsay-text .cinsay-title{color:#fff;font-size:1.25em;font-weight:700;margin:0;line-height:1}.cinsay-player .cinsay-text .cinsay-description{color:#fff;margin:15px 0 0;line-height:1.5;font-size:.875em}.cinsay-player .cinsay-text .cinsay-description:empty{display:none}.cinsay-player iframe,.cinsay-player-modal iframe{width:704px;height:555px;border:none}.cinsay-player-modal{position:fixed;z-index:999999;top:0;left:0;right:0;bottom:0;text-align:center;background:rgba(0,0,0,.8)}.cinsay-player-modal .cinsay-iframe-wrap{position:relative;display:inline-block;line-height:1}.cinsay-player-modal .cinsay-iframe-wrap .cinsay-close{position:absolute;top:-36px;right:-36px;cursor:pointer;display:block;color:#fff;font-size:48px;font-weight:700;text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000}</style>';

            $('body').append(styleString);  
        };

        var generatePlayerHtml = function(i, el){
            if (responseCache[i].imgSrc == '') {
                $(this).hide();

            } else if (!$(el).hasClass('cinsay-link')) {
                var playerId = $(el).attr('data-player-id');
                var playerHtml = '';

                var mobileHtml = '<a class="cinsay-mobile" href="' + getMobilePlayerUrl(playerId) + '" title="' + responseCache[i].description + '">';
                mobileHtml += '<img class="cinsay-thumb" src="' + responseCache[i].imgSrc + '">';
                mobileHtml += '<div class="cinsay-play"><div class="cinsay-inner"><span class="cinsay-circle"></span></div></div></a>';
                mobileHtml += '<a class="cinsay-text" href="' + getMobilePlayerUrl(playerId) + '">';
                mobileHtml += '<div class="cinsay-title">' + responseCache[i].title + '</div>';
                mobileHtml += '<div class="cinsay-description">' + responseCache[i].description + '</div>';
                mobileHtml += '</a>';

                var playerIdSelector = '[data-player-id="' + playerId + '"]';
                var circleWidth = .25 * $(playerIdSelector).outerWidth();

                /**
                 * If container width can not be calculated,
                 * must insert dummy element to determine calculated values
                 */
                if (circleWidth == 0) {
                    var dummy = document.createElement('div');
                    $(dummy).css('visibility', 'hidden');
                    $(dummy).css('width', '10000px');
                    $(dummy).css('max-width', '100%');

                    $(playerIdSelector).html(dummy);

                    circleWidth = .25 * $(dummy).outerWidth();
                }

                // Calc border and margin values
                var triangleSideLength = 40 / 200 * circleWidth + 'px';
                var triangleDiaganolLength = 70 / 200 * circleWidth + 'px';

                var leftMargin = -25 / 200 * circleWidth + 'px';
                var topMargin = -40 / 200 * circleWidth + 'px';

                mobileHtml += '<style>' + playerIdSelector + ' .cinsay-play span:before {';
                mobileHtml += 'border-width:' + triangleSideLength + ' !important;';
                mobileHtml += 'border-left-width:' + triangleDiaganolLength + ' !important;';
                mobileHtml += 'margin-left:' + leftMargin + ' !important;';
                mobileHtml += 'margin-top:' + topMargin + ' !important;';
                mobileHtml += '}</style>';

                if (window.innerWidth >= 704) {
                    if ($(el).width() >= 704) {
                        playerHtml += '<iframe scrolling="no" src="' + getPlayerUrl(playerId) + '"></iframe>';
                    } else {
                        playerHtml += mobileHtml;
                    }
                } else {
                    playerHtml += mobileHtml;
                }

                $(el).html(playerHtml);                 
            }            
        };

        var setPlayers = function(){
            scriptComplete = false;

            if (!isOldHtmlFixed) {
                fixOldHtml();
            }

            if (!responseCache.length) {
                setApiData();
                insertStyles();
            }

            var intervalId = setInterval(function(){
                if (scriptComplete) {
                    clearInterval(intervalId);

                } else if (playerElements.length == responseCache.length) {
                    playerElements.each(generatePlayerHtml);
                    scriptComplete = true;
                }
            }, 100);
        };

        var closeModal = function(){
            if (isModalOpen) {
                $('.cinsay-player-modal').fadeOut(function(){
                    $(this).remove();
                    isModalOpen = false;
                });        
            }
        };

        // Bind methods to events
        $(document).ready(setPlayers);
        $(window).resize(setPlayers);

        $(document).on('click', '.cinsay-player', function(ev){
            var playerId = $(this).attr('data-player-id');

            if (window.innerWidth >= 704 && $(this).outerWidth() < 704) {
                ev.preventDefault();
                closeModal();
                isModalOpen = true;

                var modalHtml = '<div class="cinsay-player-modal"><span class="cinsay-iframe-wrap">';
                modalHtml += '<iframe scrolling="no" src="' + getPlayerUrl(playerId) + '"></iframe>';
                modalHtml += '<span class="cinsay-close">×</span>';
                modalHtml += '</span></div>';

                $('body').append(modalHtml);

                var topPadding = (window.innerHeight - 555) / 3;
                $('.cinsay-player-modal').css('padding-top', topPadding);

            } else if ($(this).hasClass('cinsay-link')) {
                location.href = getMobilePlayerUrl(playerId);
            }
        });

        $(document).on('click', '.cinsay-player-modal .cinsay-close', closeModal);

        $(document).keyup(function(ev) {
            if (ev.keyCode == 27) {
                closeModal();
            }
        });

        $(document).on('click', function(ev){
            var clickedElement = ev.target;
            var playerModalElement = $('.cinsay-player-modal')[0];

            if (clickedElement.isSameNode(playerModalElement)) {
                closeModal();
            }
        });    

    })(jQuery);
}

})();