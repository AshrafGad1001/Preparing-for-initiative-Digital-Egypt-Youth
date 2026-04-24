// -------------------------------------------------------
// Dashboard Sidebar — open/close + submenu toggle
// -------------------------------------------------------
$(document).ready(function () {

    // --- Backdrop element for mobile ---
    var $backdrop = $('<div id="sidebarBackdrop" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.55); z-index:799;"></div>');
    $('body').append($backdrop);

    function openSidebar() {
        $('.side-bar').removeClass('hidden');
        $('.open-btn').css('visibility', 'hidden');
        $('.main .content').removeClass('Expand').addClass('Collapse');
        if ($(window).width() <= 768) { $backdrop.show(); }
    }

    function closeSidebar() {
        $('.side-bar').addClass('hidden');
        $('.open-btn').css('visibility', 'visible');
        $('.main .content').addClass('Expand').removeClass('Collapse');
        $backdrop.hide();
    }

    // Open sidebar
    $('.open-btn').on('click', openSidebar);

    // Close via X button inside sidebar
    $('.close-btn').on('click', closeSidebar);

    // ✅ FIX: Close sidebar when backdrop is clicked (mobile)
    $backdrop.on('click', closeSidebar);

    // Submenu accordion toggle
    $('.sub-btn').on('click', function (e) {
        e.preventDefault();
        $(this).next('.sub-menu').toggleClass('view-sub-menu');
        $(this).find('.dropdown').toggleClass('fa-rotate-90');
    });

    // ✅ FIX: Close sidebar on sub-item click, then navigate
    $(document).on('click', '.sub-item', function (e) {
        var href = $(this).attr('href');
        if (href && href !== '#') {
            e.preventDefault();
            closeSidebar();
            setTimeout(function () { window.location.href = href; }, 300);
        }
    });
});
