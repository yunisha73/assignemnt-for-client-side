$(document).ready(function() {

    // 1. NEPAL CLOCK
    setInterval(() => {
        const time = new Date().toLocaleTimeString("en-US", {timeZone: "Asia/Kathmandu"});
        $("#time").text("Nepal Time: " + time);
    }, 1000);

    // 2. JQUERY SHOW/HIDE EXTRA DETAILS
    $(".toggle-btn").click(function() {
        const panel = $(this).closest(".res-content").find(".details-panel");
        panel.slideToggle(400);

        // Update button text
        $(this).text(function(i, text) {
            return text === "View Details" ? "Close Details" : "View Details";
        });
    });

    // 3. JAVASCRIPT ALERT LOGIC
    $(".alert-btn").click(function() {
        const info = $(this).attr("data-info");
        alert("📊 IMPORTANT LOGISTICS:\n" + info);
    });

    // 4. COOKIE LOGIC
    if (localStorage.getItem("res_accepted")) {
        $("#cookie").hide();
    }

    $("#accept").click(function() {
        localStorage.setItem("res_accepted", "true");
        $("#cookie").fadeOut();
        alert("Cookie preference has been successfully saved!");
    });

    // 5. AUTO YEAR
    $("#year").text(new Date().getFullYear());
});