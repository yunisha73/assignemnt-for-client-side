$(document).ready(function() {
    // 1. NEPAL LIVE TIME
    function updateTime() {
        const options = { 
            timeZone: 'Asia/Kathmandu', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        };
        const nepalTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
        $('#live-time').text("Nepal Local Time: " + nepalTime);
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 2. COOKIE PERSISTENCE (Real-World Logic)
    if (!document.cookie.includes("site_visited=true")) {
        console.log("Welcome to Trekking Nepal - First visit logged.");
        document.cookie = "site_visited=true; max-age=31536000; path=/"; // Remember for 1 year
    }

    // 3. AUTO-UPDATE YEAR
    $('#year').text(new Date().getFullYear());

    // 4. SMOOTH SCROLL (Bonus Realism)
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 800);
    });
});