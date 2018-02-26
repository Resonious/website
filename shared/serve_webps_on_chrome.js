if (window.chrome) {
    document.addEventListener("DOMContentLoaded", function(event) {
        var previews = document.getElementsByClassName("project");

        for (var i = 0; i < previews.length; ++i) {
            var preview = previews[i];
            var style = preview.getAttribute("style");

            if (style.includes(".apng")) {
                preview.setAttribute("style", style.replace(".apng", ".webp"));
            }
        }
    });
}
