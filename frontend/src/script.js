function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}



document.getElementById("forgotForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("resetEmail").value;
    alert(`A password reset link has been sent to ${email}`);
});
