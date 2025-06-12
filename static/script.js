// === NAVBAR TOGGLE ===
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

// === GLOBAL SLIDESHOW VARIABLES ===
let slideIndex = 0;
let slideInterval;

document.addEventListener("DOMContentLoaded", function () {
  // === LOAD NAVBAR ===
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
    });

  // === LOAD FOOTER ===
  fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // === START MAIN IMAGE SLIDESHOW ===
  startSlideshow();

  // === TESTIMONIAL SLIDER ===
  const experienceSlides = document.querySelectorAll(
    ".experience-container .experience"
  );
  let experienceIndex = 0;

  const showExperience = (index) => {
    experienceSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  if (experienceSlides.length > 0) {
    showExperience(experienceIndex);
    setInterval(() => {
      experienceIndex = (experienceIndex + 1) % experienceSlides.length;
      showExperience(experienceIndex);
    }, 3000);
  }

  // === MULTI SLIDER HANDLING (.slider, .slide, .dot) ===
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".dot");
    let currentIndex = 0;
    let intervalId;

    if (slides.length === 0) {
      console.log("No slides found for slider:", slider.id);
      return;
    }

    // Show first slide
    slides[currentIndex].classList.add("active");
    if (dots.length > 0) dots[currentIndex].classList.add("active");

    function autoSlide() {
      try {
        slides[currentIndex].classList.remove("active");
        if (dots.length > 0) dots[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
        if (dots.length > 0) dots[currentIndex].classList.add("active");
      } catch (error) {
        console.error("Error in autoSlide for slider", slider.id, error);
        clearInterval(intervalId);
      }
    }

    intervalId = setInterval(autoSlide, 3000);

    // Manual dot control
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        try {
          clearInterval(intervalId);
          slides[currentIndex].classList.remove("active");
          dots[currentIndex].classList.remove("active");
          currentIndex = index;
          slides[currentIndex].classList.add("active");
          dots[currentIndex].classList.add("active");
          intervalId = setInterval(autoSlide, 3000);
        } catch (error) {
          console.error("Error in dot navigation for slider", slider.id, error);
        }
      });
    });

    // Attach manual control to DOM
    slider.currentSlide = (index) => {
      try {
        clearInterval(intervalId);
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");
        currentIndex = index;
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
        intervalId = setInterval(autoSlide, 3000);
      } catch (error) {
        console.error("Error in currentSlide for slider", slider.id, error);
      }
    };
  });
});

// === MAIN IMAGE SLIDESHOW ===
function startSlideshow() {
  showSlides();
  slideInterval = setInterval(showSlides, 4000);
}

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  if (slides.length > 0) {
    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) {
      dots[slideIndex - 1].classList.add("active");
    }
  }
}

// === MANUAL IMAGE SLIDESHOW CONTROL ===
function plusSlides(n) {
  clearInterval(slideInterval);
  slideIndex += n - 1;
  showSlides();
  slideInterval = setInterval(showSlides, 4000);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  slideIndex = n - 1;
  showSlides();
  slideInterval = setInterval(showSlides, 4000);
}

// === GLOBAL MULTI-SLIDER MANUAL FUNCTION ===
function currentSlide(sliderId, index) {
  const slider = document.getElementById(sliderId);
  if (slider && slider.currentSlide) {
    slider.currentSlide(index);
  } else {
    console.error("Slider not found or currentSlide not defined:", sliderId);
  }
}

// Syllabus data
const syllabi = {
  "iit-jee": {
    title: "IIT-JEE Syllabus",
    content: `Physics:<br> 
          - Mechanics: Kinematics, Newton's Laws, Work-Power-Energy, Rotational Motion, Gravitation<br> 
          - Electrodynamics: Electrostatics, Current Electricity, Magnetism, Electromagnetic Induction, AC<br> 
          - Optics: Ray Optics, Wave Optics<br> 
          - Thermodynamics: Laws of Thermodynamics, Kinetic Theory of Gases, Thermal Properties<br> 
          - Modern Physics: Atomic Structure, Nuclear Physics, Dual Nature of Matter<br><br>

          Chemistry:<br> 
          - Physical Chemistry: Mole Concept, Thermodynamics, Chemical Kinetics, Equilibrium, Electrochemistry<br> 
          - Organic Chemistry: Hydrocarbons, Alcohols, Aldehydes, Ketones, Amines, Polymers<br> 
          - Inorganic Chemistry: Periodic Table, Chemical Bonding, Coordination Compounds, Metallurgy<br><br>

          Mathematics:<br> 
          - Algebra: Complex Numbers, Quadratic Equations, Sequences, Binomial Theorem<br> 
          - Calculus: Limits, Derivatives, Integrals, Differential Equations<br> 
          - Coordinate Geometry: Straight Lines, Circles, Parabola, Ellipse, Hyperbola<br> 
          - Trigonometry: Trigonometric Identities, Equations, Inverse Trigonometry`,
  },
  neet: {
    title: "NEET Syllabus",
    content: `Biology:<br> 
          - Diversity in Living World<br> 
          - Cell Structure and Function<br> 
          - Genetics and Evolution<br> 
          - Human Physiology<br> 
          - Plant Physiology<br> 
          - Ecology and Environment<br><br>

          Physics:<br> 
          - Mechanics<br> 
          - Thermodynamics<br> 
          - Oscillations and Waves<br> 
          - Electrodynamics<br> 
          - Optics<br> 
          - Modern Physics<br><br>

          Chemistry:<br> 
          - Physical Chemistry: Thermodynamics, Equilibrium, States of Matter<br> 
          - Organic Chemistry: Hydrocarbons, Biomolecules, Environmental Chemistry<br> 
          - Inorganic Chemistry: Periodic Table, p-block, d-block, Coordination Compounds`,
  },
  "llb-judiciary": {
    title: "LLB & Judiciary Syllabus",
    content: `Legal Aptitude:<br> 
          - Indian Constitution<br> 
          - Law of Torts<br> 
          - Law of Contracts<br> 
          - Indian Penal Code<br><br>

          General Knowledge:<br> 
          - Indian History and Culture<br> 
          - Geography and Environment<br> 
          - Political Science<br> 
          - Current Affairs<br><br>

          English:<br> 
          - Reading Comprehension<br> 
          - Grammar & Vocabulary<br> 
          - Sentence Correction<br><br>

          Logical Reasoning:<br> 
          - Analytical Reasoning<br> 
          - Puzzles<br> 
          - Series and Analogies`,
  },
  polytechnic: {
    title: "Polytechnic Entrance Syllabus",
    content: `Mathematics:<br> 
          - Arithmetic (Percentages, Profit-Loss, Ratio)<br> 
          - Algebra (Linear Equations, Polynomials)<br> 
          - Geometry (Lines, Angles, Triangles)<br> 
          - Trigonometry (Heights and Distances)<br><br>

          Physics:<br> 
          - Laws of Motion<br> 
          - Work, Energy, and Power<br> 
          - Electricity and Magnetism<br><br>

          Chemistry:<br> 
          - Acids, Bases, and Salts<br> 
          - Periodic Table<br> 
          - Chemical Reactions<br><br>

          General Awareness:<br> 
          - Science & Technology<br> 
          - Current Affairs`,
  },
  ctet: {
    title: "CTET Syllabus",
    content: `Child Development and Pedagogy:<br> 
          - Learning Theories<br> 
          - Child-Centered Education<br> 
          - Inclusive Education<br><br>

          Language I & II:<br> 
          - Reading Comprehension<br> 
          - Grammar Usage<br> 
          - Language Pedagogy<br><br>

          Mathematics:<br> 
          - Number System<br> 
          - Measurement & Geometry<br> 
          - Pedagogical Issues<br><br>

          Environmental Studies:<br> 
          - Food, Water, Travel, Shelter<br> 
          - Science and Social Studies Integration`,
  },
  htet: {
    title: "HTET Syllabus",
    content: `Child Development & Pedagogy:<br> 
          - Psychology of Learning<br> 
          - Teaching Methods<br><br>

          Language (Hindi/English):<br> 
          - Comprehension<br> 
          - Grammar<br><br>

          Quantitative Aptitude:<br> 
          - Numbers<br> 
          - Simplification<br> 
          - Averages<br><br>

          General Studies:<br> 
          - Haryana GK<br> 
          - Current Events and Affairs`,
  },
  uptet: {
    title: "UPTET Syllabus",
    content: `Child Development:<br> 
          - Learning Principles<br> 
          - Inclusive Education<br><br>

          Language I & II:<br> 
          - Language Comprehension<br> 
          - Pedagogy of Language Development<br><br>

          Mathematics:<br> 
          - Number Systems<br> 
          - Algebra, Geometry<br><br>

          Environmental Studies:<br> 
          - Family and Friends<br> 
          - Science & Social Studies`,
  },
  upsc: {
    title: "UPSC Syllabus",
    content: `Prelims:<br> 
          - General Studies: History, Geography, Indian Polity, Economy, Environment, Science<br> 
          - CSAT: Comprehension, Decision Making, Basic Numeracy<br><br>

          Mains:<br> 
          - Essay Writing<br> 
          - General Studies I–IV (Indian Heritage, Governance, Tech, Ethics)<br> 
          - Optional Subject (varies per candidate)`,
  },
  ssc: {
    title: "SSC Syllabus",
    content: `General Intelligence:<br> 
          - Series, Analogy, Classification<br> 
          - Coding-Decoding, Puzzles<br><br>

          Quantitative Aptitude:<br> 
          - Simplification, Averages<br> 
          - Ratio, Time & Work, Geometry<br><br>

          English:<br> 
          - Grammar, Cloze Test<br> 
          - Synonyms, Antonyms<br><br>

          General Awareness:<br> 
          - Indian History, Constitution<br> 
          - Scientific Research, Current Affairs`,
  },
  "bank-po-clerk": {
    title: "Bank PO & Clerk Syllabus",
    content: `Reasoning:<br> 
          - Seating Arrangement<br> 
          - Syllogism, Blood Relations, Puzzles<br><br>

          Quantitative Aptitude:<br> 
          - Number Series, Simplification<br> 
          - Data Interpretation<br><br>

          English:<br> 
          - Reading Comprehension<br> 
          - Para Jumbles, Error Spotting<br><br>

          General Awareness:<br> 
          - Banking Awareness<br> 
          - Current Affairs, Static GK`,
  },
  gate: {
    title: "GATE Syllabus",
    content: `Engineering Mathematics:<br> 
          - Linear Algebra, Calculus<br> 
          - Probability, Differential Equations<br><br>

          Technical Subjects (as per branch):<br> 
          - Mechanical: SOM, Thermodynamics, Fluid Mechanics<br> 
          - Electrical: Circuits, Machines, Power Systems<br> 
          - Civil: Structures, Geotech, Transportation<br><br>

          General Aptitude:<br> 
          - Verbal Ability<br> 
          - Numerical Ability`,
  },
  "railway-alp": {
    title: "Railway ALP Syllabus",
    content: `Mathematics:<br> 
          - Number System<br> 
          - Ratio, Profit-Loss, Simple Interest<br><br>

          General Intelligence:<br> 
          - Analogies, Classification, Coding<br><br>

          Basic Science:<br> 
          - Physics: Motion, Light, Magnetism<br> 
          - Chemistry: Matter, Chemical Reactions<br><br>

          Technical Ability:<br> 
          - Engineering Drawing<br> 
          - Electrical and Mechanical Basics`,
  },
  "ssc-je": {
    title: "SSC JE Syllabus",
    content: `General Intelligence:<br> 
          - Verbal & Non-Verbal Reasoning<br><br>

          General Awareness:<br> 
          - Current Events<br> 
          - Indian Geography and Economy<br><br>

          Technical Subjects:<br> 
          - Civil Engineering: RCC, Soil Mechanics<br> 
          - Mechanical: Theory of Machines, Thermal Engineering<br> 
          - Electrical: Circuit Theory, Machines, Measurement`,
  },
};

// Show modal
function showModal(courseId) {
  const modal = document.getElementById("syllabus-modal");
  const title = document.getElementById("modal-title");
  const content = document.getElementById("modal-content");
  const course = syllabi[courseId];
  title.textContent = course.title;
  content.innerHTML = course.content;
  modal.style.display = "flex";
}

// Hide modal
function hideModal() {
  document.getElementById("syllabus-modal").style.display = "none";
}

// Syllabus button listeners
document.querySelectorAll(".syllabus-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const courseId = button.parentElement.dataset.course;
    showModal(courseId);
  });
});
document.getElementById("examFilter").addEventListener("change", function () {
  const selected = this.value;
  const testimonials = document.querySelectorAll(".testimonial-card");

  testimonials.forEach((card) => {
    if (selected === "all" || card.dataset.exam === selected) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
