const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://script.google.com/macros/s/AKfycbxmKOnq3TDS2PjxGnpl4ryi8c18f1cvKTR4xs8jtJ3X7pTPqEHKp4yNtWlAIJm1PRM/exec", {
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

