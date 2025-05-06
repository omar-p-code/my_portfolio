const nav = $('.header .nav li');
const nav_list = $('.header .nav');
const gallary_imgs = $('.gallary_section .imgs');
const gallary_img = $('.gallary_section .imgs img');
const head_bar = $('.header .bar');
const skill_details = $('.about_section .skills .details');
const sections = $('.home_section, .about_section, .gallary_section, .contact_section');

add_data();


window.addEventListener('scroll', function () {
   const current_scroll = this.scrollY;
   // console.log(current_scroll)
   sections.each(function () {
      const section_top = $(this).offset().top - 100;
      const section_bottom = $(this).outerHeight() + section_top;
      // console.log(section_top)
      if (current_scroll >= section_top && current_scroll <= section_bottom) {
         const id = $(this).attr('class');
         nav.removeClass('active');
         $(`.header .nav li[data-section=${id}]`).addClass('active');
      }
   });
});

// Mobile Bars
head_bar.on('click', function (e) {
   e.stopPropagation();
   nav_list.toggleClass('active');
});

nav_list.on('click', function (e) {
   e.stopPropagation();
});

$('body').on('click', function () {
   nav_list.removeClass('active');
});



// Gallary
// overlay
const overlay = document.createElement('div');
const img = document.createElement('img');
img.loading = 'lazy'
const exit = document.createElement('div');
const exit_icon = document.createElement('i');
const visit = document.createElement('div');
const visit_icon = document.createElement('i');
   exit_icon.classList.add('fa-solid', 'fa-xmark');
   visit_icon.classList.add('fa-solid', 'fa-arrow-up-right-from-square');
   exit.classList.add('exit');
   visit.className = 'visit';
   exit.appendChild(exit_icon);
   visit.appendChild(visit_icon);


overlay.classList.add('overlay', 'd-none');
   
document.body.appendChild(overlay);

exit.addEventListener('click', function () {
      overlay.classList.add('d-none');
});

visit.addEventListener('click', function () {
      window.open(img.dataset.link, '_blank');
      overlay.classList.add('d-none');
});
img.classList.add('overlay_img');
overlay.appendChild(exit);
overlay.appendChild(visit);
overlay.appendChild(img);
overlay.classList.add('d-none');

// Event
gallary_imgs.on('click', function (e) {
   if (e.target.classList.contains('img')) {
      img.src = e.target.src;
      if(e.target.dataset.link) {
         img.dataset.link = e.target.dataset.link
      }
      overlay.classList.remove('d-none');
   }
});


nav.on('click', function (e) {
   e.stopPropagation();
   nav.removeClass('active');
   $(this).addClass('active');
   const section = `.${$(this).data('section')}`;
   scroll_section(section);
});


function scroll_section(section) {
   // const pm = $(section).prev().css([`padding-${direction}`, `margin-${direction}`]);
   const scroll = $(section).offset().top - 80 //+ (parseInt(pm[`padding-${direction}`])) + (parseInt(pm[`margin-${direction}`]));
   scrollTo({
      top: scroll,
      behavior: 'smooth'
   })
}


function add_data() {;
   const config = fetch('config.json');
   config.then(res => res.json())
   .then(handleData);
}


function handleData(data) {
   addImgs(data);
   skill_details.each(function() {
   for (let skill in data.skills) {
      const details = data.skills[skill];
      // console.log(details, this.dataset.skill, skill)
         if (details&& skill == $(this).data('skill')) {
            $(this).append(`
               <ul>
               <li>Level: ${details.level}</li>
               <li>Experience: ${details.experience}</li>
               <li>Projects: ${details.projects}</li>
               </ul>
               `
            );
         }
      }
   });
}

function addImgs(data) {
   for (let i = 1; i <= data.gallary.count; i++) {
      const img = document.createElement('img');
      const img_cont = document.createElement('div');
      img.classList.add('img');
      img.loading = 'lazy';
      img_cont.className = 'img_cont';
      // console.log(data);
      for (let j = 0; j < data.gallary.link.length; j++) {
         // console.log(data.gallary.link)
         // console.log(data.gallary.link[j])
      if (data.gallary.link[j][0] && data.gallary.link[j][1].includes(i)) {
         img.setAttribute('data-link', data.gallary.link[j][0]);
         // console.log(img)
      }
   }
      const img_src = `./imgs/${data.gallary.name}.${data.gallary.type}`.replace('num', i);
      // console.log(img_src);
      img.src = `${img_src}`;
      img_cont.appendChild(img);
      gallary_imgs.append(img_cont);
}
}