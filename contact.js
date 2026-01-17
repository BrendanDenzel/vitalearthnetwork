const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://script.google.com/macros/s/AKfycbwWvbUuRGHufhpOgD5Lm59kuaBduSp7YG07XTPB2fFWm0Y08rWTCEQfafnI3Xw1reA/exec", {
    method: "POST",
    body: new FormData(form)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      status.textContent = "Message sent successfully!";
      form.reset();
    } else {
      status.textContent = "Server error.";
    }
  })
  .catch(err => {
    console.error(err);
    status.textContent = "Failed to send message.";
  });
});

