// LINKS
fetch("links.json")
.then(res => res.json())
.then(data => {
  let el = document.getElementById("links");

  data.forEach(l => {
    el.innerHTML += `
      <a href="${l.url}" class="btn">
        <div class="btn-left">
          <i class="${l.icon}"></i>
          ${l.title}
        </div>
        <i class="fas fa-arrow-right"></i>
      </a>
    `;
  });
});

let g = document.getElementById("gallery");

gallery.forEach((item, index) => {
  g.innerHTML += `
    <div class="item">
      <img 
        src="${item.img}" 
        alt="Commission art and render ${index + 1}"
        loading="lazy"
      >

      <a 
  href="${item.link}" 
  target="_blank"
  aria-label="what do you see dude ${index + 1}"
  rel="noopener">
  
        <i class="fas fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;
});

// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});
