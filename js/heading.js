function showLoginMessage(event) {
    event.preventDefault(); // stop the link action
    document.getElementById("loginModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("loginModal").style.display = "none";
  }