// dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// contact form
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  const status = document.getElementById("form-status");
  status.textContent = "Message sent successfully!";
  status.style.color = "#00ff9d";

  this.reset();
});
