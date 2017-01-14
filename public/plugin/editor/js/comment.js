$(document).ready(function(){
    // Full featured editor
    $('#editor').each( function(index, element)
    {
        var img_csrf=$("#_csrf").attr("value");
        $(element).wysiwyg({
                    classes: 'some-more-classes',
                    // 'selection'|'top'|'top-selection'|'bottom'|'bottom-selection'
                    toolbar: index == 0 ? 'top-selection' : (index == 1 ? 'bottom' : 'selection'),
                    buttons: {
                        // Dummy-HTML-Plugin
                        dummybutton1: index != 1 ? false : {
                            html: $('<input id="submit" type="button" value="bold" />').click(function(){
                                // We simply make 'bold'
                                if( $(element).wysiwyg('shell').getSelectedHTML() )
                                    $(element).wysiwyg('shell').bold();
                                else
                                    alert( 'Please selection some text' );
                            }),
                            //showstatic: true,    // wanted on the toolbar
                            showselection: false    // wanted on selection
                        },
                        // Dummy-Button-Plugin
                        dummybutton2: index != 1 ? false : {
                            title: 'Dummy',
                            image: '\uf1e7',
                            click: function( $button ) {
                                alert('Do something');
                            },
                            //showstatic: true,    // wanted on the toolbar
                            showselection: false    // wanted on selection
                        },
                        // Smiley plugin
                        smilies: {
                            title: 'Smilies',
                            image: '\uf118', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            popup: function( $popup, $button ) {
                                var list_smilies = [
                                    '<img src="/plugin/editor/smiley/1.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/2.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/3.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/4.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/5.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/6.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/7.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/8.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/9.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/10.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/11.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/12.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/13.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/14.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/15.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/16.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/17.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/18.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/19.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/20.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/21.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/22.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/23.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/24.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/25.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/26.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/27.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/28.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/29.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/30.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/31.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/32.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/33.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/34.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/35.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/36.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/37.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/38.gif" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/afraid.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/amorous.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/angel.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/angry.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/bored.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/cold.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/confused.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/cross.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/crying.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/devil.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/disappointed.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/dont-know.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/drool.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/embarrassed.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/excited.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/excruciating.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/eyeroll.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/happy.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/hot.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/hug-left.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/hug-right.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/hungry.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/invincible.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/kiss.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/lying.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/meeting.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/nerdy.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/neutral.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/party.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/pirate.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/pissed-off.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/question.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/sad.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/shame.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/shocked.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/shut-mouth.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/sick.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/silent.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/sleeping.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/sleepy.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/stressed.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/thinking.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/tongue.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/uhm-yeah.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/wink.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/working.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/bathing.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/beer.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/boy.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/camera.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/chilli.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/cigarette.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/cinema.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/coffee.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/girl.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/console.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/grumpy.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/in_love.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/internet.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/lamp.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/mobile.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/mrgreen.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/musical-note.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/music.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/phone.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/plate.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/restroom.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/rose.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/search.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/shopping.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/star.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/studying.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/suit.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/surfing.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/thunder.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/tv.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/typing.png" width="16" height="16" alt="" />',
                                    '<img src="/plugin/editor/smiley/writing.png" width="16" height="16" alt="" />'
                                ];
                                var $smilies = $('<div/>').addClass('wysiwyg-toolbar-smilies')
                                        .attr('unselectable','on');
                                $.each( list_smilies, function(index,smiley){
                                    if( index != 0 )
                                        $smilies.append(' ');
                                    var $image = $(smiley).attr('unselectable','on');
                                    // Append smiley
                                    var imagehtml = ' '+$('<div/>').append($image.clone()).html()+' ';
                                    $image
                                            .css({ cursor: 'pointer' })
                                            .click(function(event){
                                                $(element).wysiwyg('shell').insertHTML(imagehtml); // .closePopup(); - do not close the popup
                                            })
                                            .appendTo( $smilies );
                                });
                                var $container = $(element).wysiwyg('container');
                                $smilies.css({ maxWidth: parseInt($container.width()*0.95)+'px' });
                                $popup.append( $smilies );
                                // Smilies do not close on click, so force the popup-position to cover the toolbar
                                var $toolbar = $button.parents( '.wysiwyg-toolbar' );
                                if( ! $toolbar.length ) // selection toolbar?
                                    return ;
                                var left = 0,
                                        top = 0,
                                        node = $toolbar.get(0);
                                while( node )
                                {
                                    left += node.offsetLeft;
                                    top += node.offsetTop;
                                    node = node.offsetParent;
                                }
                                left += parseInt( ($toolbar.outerWidth() - $popup.outerWidth()) / 2 );
                                if( $toolbar.hasClass('wysiwyg-toolbar-top') )
                                    top -= $popup.height() - parseInt($button.outerHeight() * 1/4);
                                else
                                    top += parseInt($button.outerHeight() * 3/4);
                                $popup.css({ left: left + 'px',
                                    top: top + 'px'
                                });
                                // prevent applying position
                                return false;
                            },
                            //showstatic: true,    // wanted on the toolbar
                            showselection: index == 2 ? true : false    // wanted on selection
                        },
                        insertimage: {
                            title: 'Insert image',
                            image: '\uf030', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            //showstatic: true,    // wanted on the toolbar
                            showselection: false    // wanted on selection
                        },
                        // insertlink: {
                        //     title: 'Insert link',
                        //     image: '\uf08e' // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        // },
                        // Fontname plugin
                        // fontname: index == 1 ? false : {
                        //     title: 'Font',
                        //     image: '\uf031', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     popup: function( $popup, $button ) {
                        //         var list_fontnames = {
                        //             // Name : Font
                        //             'Arial, Helvetica' : 'Arial,Helvetica',
                        //             'Verdana'          : 'Verdana,Geneva',
                        //             'Georgia'          : 'Georgia',
                        //             'Courier New'      : 'Courier New,Courier',
                        //             'Times New Roman'  : 'Times New Roman,Times'
                        //         };
                        //         var $list = $('<div/>').addClass('wysiwyg-toolbar-list')
                        //                 .attr('unselectable','on');
                        //         $.each( list_fontnames, function( name, font ){
                        //             var $link = $('<a/>').attr('href','#')
                        //                     .css( 'font-family', font )
                        //                     .html( name )
                        //                     .click(function(event){
                        //                         $(element).wysiwyg('shell').fontName(font).closePopup();
                        //                         // prevent link-href-#
                        //                         event.stopPropagation();
                        //                         event.preventDefault();
                        //                         return false;
                        //                     });
                        //             $list.append( $link );
                        //         });
                        //         $popup.append( $list );
                        //     },
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: index == 0 ? true : false    // wanted on selection
                        // },
                        // // Fontsize plugin
                        // fontsize: index == 1 ? false : {
                        //     title: 'Size',
                        //     image: '\uf034', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     popup: function( $popup, $button ) {
                        //         var list_fontsizes = {
                        //             // Name : Size
                        //             'Huge'    : 7,
                        //             'Larger'  : 6,
                        //             'Large'   : 5,
                        //             'Normal'  : 4,
                        //             'Small'   : 3,
                        //             'Smaller' : 2,
                        //             'Tiny'    : 1
                        //         };
                        //         var $list = $('<div/>').addClass('wysiwyg-toolbar-list')
                        //                 .attr('unselectable','on');
                        //         $.each( list_fontsizes, function( name, size ){
                        //             var $link = $('<a/>').attr('href','#')
                        //                     .css( 'font-size', (8 + (size * 3)) + 'px' )
                        //                     .html( name )
                        //                     .click(function(event){
                        //                         $(element).wysiwyg('shell').fontSize(size).closePopup();
                        //                         // prevent link-href-#
                        //                         event.stopPropagation();
                        //                         event.preventDefault();
                        //                         return false;
                        //                     });
                        //             $list.append( $link );
                        //         });
                        //         $popup.append( $list );
                        //     }
                        //     //showstatic: true,    // wanted on the toolbar
                        //     //showselection: true    // wanted on selection
                        // },
                        // // Header plugin
                        // header: index != 1 ? false : {
                        //     title: 'Header',
                        //     image: '\uf1dc', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     popup: function( $popup, $button ) {
                        //         var list_headers = {
                        //             // Name : Font
                        //             'Header 1'     : '<h1>',
                        //             'Header 2'     : '<h2>',
                        //             'Header 3'     : '<h3>',
                        //             'Header 4'     : '<h4>',
                        //             'Header 5'     : '<h5>',
                        //             'Header 6'     : '<h6>',
                        //             'Preformatted' : '<pre>'
                        //         };
                        //         var $list = $('<div/>').addClass('wysiwyg-toolbar-list')
                        //                 .attr('unselectable','on');
                        //         $.each( list_headers, function( name, format ){
                        //             var $link = $('<a/>').attr('href','#')
                        //                     .css( 'font-family', format )
                        //                     .html( name )
                        //                     .click(function(event){
                        //                         $(element).wysiwyg('shell').format(format).closePopup();
                        //                         // prevent link-href-#
                        //                         event.stopPropagation();
                        //                         event.preventDefault();
                        //                         return false;
                        //                     });
                        //             $list.append( $link );
                        //         });
                        //         $popup.append( $list );
                        //     }
                        //     //showstatic: true,    // wanted on the toolbar
                        //     //showselection: false    // wanted on selection
                        // },
                        bold: {
                            title: 'Bold (Ctrl+B)',
                            image: '\uf032', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            hotkey: 'b'
                        },
                        italic: {
                            title: 'Italic (Ctrl+I)',
                            image: '\uf033', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            hotkey: 'i'
                        },
                        underline: {
                            title: 'Underline (Ctrl+U)',
                            image: '\uf0cd', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            hotkey: 'u'
                        },
                        strikethrough: {
                            title: 'Strikethrough (Ctrl+S)',
                            image: '\uf0cc', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                            hotkey: 's'
                        },
                        // forecolor: {
                        //     title: 'Text color',
                        //     image: '\uf1fc' // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        // },
                        // highlight: {
                        //     title: 'Background color',
                        //     image: '\uf043' // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        // },
                        // alignleft: index != 0 ? false : {
                        //     title: 'Left',
                        //     image: '\uf036', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // aligncenter: index != 0 ? false : {
                        //     title: 'Center',
                        //     image: '\uf037', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // alignright: index != 0 ? false : {
                        //     title: 'Right',
                        //     image: '\uf038', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // alignjustify: index != 0 ? false : {
                        //     title: 'Justify',
                        //     image: '\uf039', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // subscript: index == 1 ? false : {
                        //     title: 'Subscript',
                        //     image: '\uf12c', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: true    // wanted on selection
                        // },
                        // superscript: index == 1 ? false : {
                        //     title: 'Superscript',
                        //     image: '\uf12b', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: true    // wanted on selection
                        // },
                        // indent: index != 0 ? false : {
                        //     title: 'Indent',
                        //     image: '\uf03c', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // outdent: index != 0 ? false : {
                        //     title: 'Outdent',
                        //     image: '\uf03b', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // orderedList: index != 0 ? false : {
                        //     title: 'Ordered list',
                        //     image: '\uf0cb', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        // unorderedList: index != 0 ? false : {
                        //     title: 'Unordered list',
                        //     image: '\uf0ca', // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        //     //showstatic: true,    // wanted on the toolbar
                        //     showselection: false    // wanted on selection
                        // },
                        removeformat: {
                            title: 'Remove format',
                            image: '\uf12d' // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                        }
                    },
                    // Submit-Button
                    submit: {
                        title: 'Submit',
                        image: '\uf00c' // <img src="/plugin/editor/path/to/image.png" width="16" height="16" alt="" />
                    },
                    // Other properties
                    dropfileclick: '点击或拖拽图片到此处',
                    placeholderUrl: 'www.example.com',
                    maxImageSize: [400,400],
                    onImageUpload: function( insert_image ) {
                        $(this).parents('form').append('<input type="hidden" name="_csrf" value='+img_csrf+'>');
                        $(this).parents('form')
                                .attr('action','/comment/pic')
                                .attr('method','POST')
                                .attr('enctype','multipart/form-data')
                                .ajaxSubmit({
                                    success: function(xhrdata,textStatus,jqXHR){
                                        var image_url = xhrdata.url;
                                        console.log( 'URL: ' + image_url );
                                        insert_image( image_url );
                                    },
                                    error:function (e) {
                                        console.log(e);
                                    }
                                });
                    }
                    // onKeyEnter: function() {
                    //                 return false; // swallow enter
                    //             }

                })
                // .change(function(){
                //     numItem.text(max - $(this).val().length);
                //     if( typeof console != 'undefined' )
                //         console.log( 'change' );
                // })
                // .focus(function(){
                //     if( typeof console != 'undefined' )
                //         console.log( 'focus' );
                // })
                // .blur(function(){
                //     if( typeof console != 'undefined' )
                //         console.log( 'blur' );
                // });
    });

    // Raw editor
    var option = {
        element: $('#editor0').get(0),
        onkeypress: function( code, character, shiftKey, altKey, ctrlKey, metaKey ) {
            if( typeof console != 'undefined' )
                console.log( 'RAW: '+character+' key pressed' );
        },
        onselection: function( collapsed, rect, nodes, rightclick ) {
            if( typeof console != 'undefined' && rect )
                console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
        },
        onplaceholder: function( visible ) {
            if( typeof console != 'undefined' )
                console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
        }
    };
    var wysiwygeditor = wysiwyg( option );
    //wysiwygeditor.setHTML( '<html>' );
});
