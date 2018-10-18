/**
 * jQuery pagination plugin
 * https://github.com/iTechCydia/twbs-pagination
 * 
 * Copyright 2018, Vincent Bathelier
 * Released under MIT Licence
 * https://github.com/iTechCydia/twbs-pagination/blob/master/LICENSE
 */
(function ($) {
    $.fn.paginate = function (settings) {
        var config = {
                perPage: 9,
                prevText: '&laquo;',
                nextText: '&raquo;',
                align: 'center',
                current: 1
            },
            template = {
                nav: $(document.createElement('nav')),
                list: $(document.createElement('ul')).addClass('pagination'),
                item: $(document.createElement('li')).addClass('page-item'),
                link: $(document.createElement('a')).addClass('page-link').attr('href', '#'),
                sr: $(document.createElement('span')).addClass('sr-only'),
                textContainer: $(document.createElement('span')).attr('aria-hidden', true)
            };

        function isset(object) {
            return (typeof object !== 'undefined');
        }

        this.each(function (index, elem) {
            function goto(number) {
                if (!$.isNumeric(number)) {
                    if (number === 'prev') {
                        parseInt(config.current) --;
                    } else if (number === 'next') {
                        parseInt(config.current) ++;
                    }
                } else {
                    if (number > 0 || number <= pageNumber()) {
                        config.current = parseInt(number);
                    }
                }

                config.target.find('.active').removeClass('active');
                config.target.find('li:nth-child(' + (parseInt(config.current) + 1) + ')').addClass('active');
                
                update();
            }

            function update() {
                config.elem.children().each(function (index) {
                    if (index < (config.perPage * config.current) && index > (config.perPage * config.current) - config.perPage) {
                        config.elem.find(':nth-child(' + (index + 1) + ')').addClass('d-none');
                    } else {
                        config.elem.find(':nth-child(' + (index + 1) + ')').removeClass('d-none');
                    }
                });
            }

            function pageNumber() {
                return Math.ceil(children / config.perPage);
            }

            config.elem = $(elem);

            if (isset(settings)) {
                if (jQuery.type(settings) === 'string') {
                    config.target = $(settings);
                } else if (jQuery.type(settings) === 'object') {
                    $.extends(config, settings);
                }
            }

            if (isset(config.target)) {
                var nav = template.nav.clone(),
                    list = template.list.clone(),
                    i = 0;

                // Create prev and next buttons
                var prevSr = template.sr.clone().text('Previous'),
                    prevText = template.textContainer.clone().html(config.prevText),
                    prevItem = template.item.clone().prepend(template.link.clone().prepend(prevText).append(prevSr));

                var nextSr = template.sr.clone().text('Previous'),
                    nextText = template.textContainer.clone().html(config.nextText),
                    nextItem = template.item.clone().prepend(template.link.clone().prepend(nextText).append(nextSr));

                // Count child nodes
                var children = $(this).children().length;

                // Determine number of item
                var items = pageNumber();

                // Display the pagination navbar
                list.prepend(prevItem);

                for (i = 1; i <= items; i++) {
                    var link = template.link.clone().text(i).attr('data-goto', i),
                        item = template.item.clone().prepend(link);
                    list.append(item);

                    link.on('click', function (e) {
                        e.preventDefault();
                        goto($(this).attr('data-goto'));
                    });

                    if (i == config.current) {
                        item.addClass('active');
                    }

                    update(this);
                }

                list.append(nextItem);
                nav.prepend(list);
                list.addClass('justify-content-' + config.align);

                config.target.empty().prepend(nav);

            } else {
                throw new Error('No target specified');
            }
        });

        return this;
    }
})(jQuery);
