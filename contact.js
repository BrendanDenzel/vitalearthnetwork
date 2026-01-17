const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://script.google.com/macros/s/AKfycbyTJ0cTh1FJLs-7H1NKZpmGlJJ03bkcd40ItFMObHfzgKH3II9KoGB1RnxEgzSUCis/exec", {
    method: "POST",
    body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      status.textContent = "Message sent successfully!";
      form.reset();
    } else {
      status.textContent = "Something went wrong.";
    }
  })
  .catch(error => {
    console.error(error);
    status.textContent = "Error sending message.";
  });
});

