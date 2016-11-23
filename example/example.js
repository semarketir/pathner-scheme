$(document).ready(function () {
    $('a').on('click', function () {
        var subject = $(this).data('subject');
        var text = $(this).data('text');

        pathnerScheme({
            subject: subject,
            text: text,
            unsupportedHandler: function () {
                console.log('This browser does not support Path scheme.');
                // window.locations = 'http(s)://...' Redirect to Path Partner's Page ( Post moment via web )
            }
        });
    });
});
