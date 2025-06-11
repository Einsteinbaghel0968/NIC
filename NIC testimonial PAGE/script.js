document.getElementById("examFilter").addEventListener("change", function () {
  const selected = this.value;
  const testimonials = document.querySelectorAll(".testimonial-card");

  testimonials.forEach(card => {
    if (selected === "all" || card.dataset.exam === selected) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
