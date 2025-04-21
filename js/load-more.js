document.addEventListener("DOMContentLoaded", function () {
    const loadMoreButton = document.getElementById("load-more-btn");

    // Collect all speaker groups except the first one (which is already visible)
    const speakerGroups = Array.from(document.querySelectorAll(".speaker-group"))
        .filter((group, index) => index !== 0);

    let currentGroupIndex = 0;

    loadMoreButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (currentGroupIndex < speakerGroups.length) {
            speakerGroups[currentGroupIndex].style.display = "block";
            currentGroupIndex++;

            if (currentGroupIndex === speakerGroups.length) {
                loadMoreButton.style.display = "none";
            }
        }
    });
});
