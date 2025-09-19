// Packages Data
const packages = [
  { name: "Beach Escape", location: "Goa", price: 5000, season: "summer" },
  { name: "Mountain Trek", location: "Himachal", price: 4000, season: "winter" },
  { name: "City Tour", location: "Delhi", price: 3000, season: "spring" },
];

// Compute final price based on season & duration
function computePackageFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "summer": multiplier = 1.2; break;
    case "winter": multiplier = 1.15; break;
    case "spring": multiplier = 1.1; break;
  }
  return pkg.price * multiplier;
}

// Render Packages Table
const table = document.getElementById("packagesTable");
const select = document.getElementById("packageSelect");
packages.forEach((pkg, i) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${pkg.name}</td>
    <td>${pkg.location}</td>
    <td>${pkg.price}</td>
    <td>${pkg.season}</td>
    <td>${computePackageFinalPrice(pkg)}</td>
  `;
  table.appendChild(tr);

  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = pkg.name;
  select.appendChild(opt);
});

// Booking Estimator
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const guests = document.getElementById("guests");
const promo = document.getElementById("promo");
const estimate = document.getElementById("estimate");
const submitBtn = document.querySelector("button[type=submit]");

function updateEstimate() {
  const pkg = packages[select.value];
  if (!pkg) { estimate.textContent = 0; return; }

  const inDate = new Date(checkin.value);
  const outDate = new Date(checkout.value);
  if (isNaN(inDate) || isNaN(outDate) || outDate <= inDate) {
    submitBtn.disabled = true;
    return;
  }

  let nights = (outDate - inDate) / (1000 * 60 * 60 * 24);
  let base = computePackageFinalPrice(pkg) * nights;

  let g = parseInt(guests.value) || 0;
  if (g > 2) base *= 1.2;

  let code = promo.value.trim().toUpperCase();
  switch (code) {
    case "EARLYBIRD": base *= 0.9; break;
    case "GROUP": if (g >= 4) base *= 0.85; break;
  }

  estimate.textContent = base.toFixed(2);
  submitBtn.disabled = false;
}
[select, checkin, checkout, guests, promo].forEach(el => el.addEventListener("input", updateEstimate));

// Gallery
const galleryImages = [
  { thumb: "https://picsum.photos/id/1015/150/100", large: "https://picsum.photos/id/1015/600/400", title: "Beach", alt: "Sunny Beach" },
  { thumb: "https://picsum.photos/id/1016/150/100", large: "https://picsum.photos/id/1016/600/400", title: "Mountain", alt: "Snowy Mountain" },
  { thumb: "https://picsum.photos/id/1025/150/100", large: "https://picsum.photos/id/1025/600/400", title: "City", alt: "Busy City" },
];

const galleryContainer = document.getElementById("galleryContainer");
galleryImages.forEach(img => {
  const i = document.createElement("img");
  i.src = img.thumb;
  i.dataset.large = img.large;
  i.dataset.title = img.title;
  i.alt = img.alt;
  galleryContainer.appendChild(i);

  i.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = i.dataset.large;
    modalImage.alt = i.alt;
    caption.textContent = i.dataset.title;
    i.classList.add("viewed");
  });
});

// Modal
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const caption = document.getElementById("caption");
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("keydown", e => { if (e.key === "Escape") modal.style.display = "none"; });

// Toggle Layout
document.getElementById("toggleLayout").addEventListener("click", () => {
  galleryContainer.classList.toggle("grid");
  galleryContainer.classList.toggle("list");
});

// Highlight active nav
const links = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY;
  links.forEach(link => {
    let section = document.querySelector(link.hash);
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
