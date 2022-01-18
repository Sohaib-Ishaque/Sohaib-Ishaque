
(() =>{

    const hamBurger = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNav = document.querySelector(".close-nav-menu");
    hamBurger.addEventListener("click", navOpen);
    closeNav.addEventListener("click", navClose);

    function navOpen()
    {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function navClose()
    {
        navMenu.classList.remove("open");
        bodyScrollingToggle();
    }
    function navMeuClose()
    {
        navMenu.classList.remove("open");
        bodyScrollingToggle();
    }

    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains('link-items'))
        {
            if(event.target.hash !=="")
            {
                event.preventDefault();
                const hash = event.target.hash;
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");

                if(navMenu.classList.contains("open"))
                {
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    navMeuClose();
                }
                else
                {
                    let navItems = navMenu.querySelectorAll(".link-items");
                    navItems.forEach((item) =>{
                        if(hash === item.hash)
                        {
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                }
                window.location.hash = hash;
            }
        }
    })

})();

(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) =>{
        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active"))
        {
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
            event.target.classList.add("active","outer-shadow");

            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle()
{
    document.body.classList.toggle("stop-scrolling");
}

(() =>{
    const filterContainer = document.querySelector(".portfolio-filter"),
          portfolioItemsContainer = document.querySelector(".portfolio-items"),
          portfolioItems = document.querySelectorAll(".portfolio-item"),
          popUp = document.querySelector(".portfolio-popup"),
          preBtn = document.querySelector(".pp-prev"),
          nextBtn = document.querySelector(".pp-next"),
          closeBtn = document.querySelector(".pp-close"),
          projectDetailsContaier = document.querySelector(".pp-details"),
          projectDetailBtn = popUp.querySelector(".pp-project-details-btn");
          let itemIndex,slideIndex,screeshot;
          filterContainer.addEventListener("click", (event)=>{
              if(event.target.classList.contains("filter-items") && !event.target.classList.contains("active")){
                filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
                event.target.classList.add("active","outer-shadow");
                const trgt = event.target.getAttribute("data-target");

                portfolioItems.forEach((item) =>{
                    if(trgt === item.getAttribute("data-category") || trgt === "All")
                    {
                        item.classList.remove("hide");
                        item.classList.add("show");
                    }
                    else
                    {
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                });
              }
          });
          
          portfolioItemsContainer.addEventListener("click", (event)=>{
              if(event.target.closest(".portfolio-item-inner"))
              {
                const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
                screeshot = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
                screeshot = screeshot.split(",");
                if(screeshot.length === 1)
                {
                    preBtn.style.display ="none";
                    nextBtn.style.display ="none";
                }
                else
                {
                    preBtn.style.display ="block";
                    nextBtn.style.display ="block";
                }
                slideIndex = 0;
                popUpToggle();
                poUpSlideShow();
                popUpDetails();
              }
          })
          closeBtn.addEventListener("click",() =>{
            popUpToggle();
            if(projectDetailsContaier.classList.contains("active"))
            {
                popUpDetailsToggle();
            }
          })
          function popUpToggle()
          {
              popUp.classList.toggle("open");
              bodyScrollingToggle();
          }
          function poUpSlideShow()
          {
              const imgScreenshots = screeshot[slideIndex];
              const popUpimg = popUp.querySelector(".pp-img");
              popUp.querySelector(".pp-img-loader").classList.add("active");
              popUpimg.src = imgScreenshots;
              popUpimg.onload = () =>{
                popUp.querySelector(".pp-img-loader").classList.remove("active");
              }
              popUp.querySelector(".img-counter").innerHTML = (slideIndex+1) + " of " + screeshot.length;
          }
          function popUpDetails()
          {
              if(!portfolioItems[itemIndex].querySelector(".portfolio-item-title"))
              {
                  projectDetailBtn.style.display = "none";
                  return;
              }
              projectDetailBtn.style.display = "block";
              const projectTitle = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
              const projectCat = portfolioItems[itemIndex].getAttribute("data-category");
              const projectDetails = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
              popUp.querySelector(".pp-title h2").innerHTML = projectTitle;
              popUp.querySelector(".pp-projct-category").innerHTML = projectCat;
              popUp.querySelector(".pp-project-details").innerHTML = projectDetails;
          }
          nextBtn.addEventListener("click",() =>{
              if(slideIndex === screeshot.length-1)
              {
                  slideIndex = 0;
              }
              else
              {
                  slideIndex++;
              }
              poUpSlideShow();
          })

          preBtn.addEventListener("click",() =>{    
            if(slideIndex === 0)
            {
                slideIndex = screeshot.length-1;
            }
            else
            {
                slideIndex--;
            }
            poUpSlideShow(); 
          })

         projectDetailBtn.addEventListener("click", () =>{
            popUpDetailsToggle();
         })
         function popUpDetailsToggle()
         {
            if(projectDetailsContaier.classList.contains("active"))
            {
                projectDetailBtn.querySelector("i").classList.remove("fa-minus");
                projectDetailBtn.querySelector("i").classList.add("fa-plus");
                projectDetailsContaier.classList.remove("active");
                projectDetailsContaier.style.maxHeight = 0 + "px";
            }
            else
            {
                projectDetailBtn.querySelector("i").classList.add("fa-minus");
                projectDetailBtn.querySelector("i").classList.remove("fa-plus");
                projectDetailsContaier.classList.add("active");
                projectDetailsContaier.style.maxHeight = projectDetailsContaier.scrollHeight + "px";
                popUp.scrollTo(0,projectDetailsContaier.offsetTop);
            }
         }
          
})();

// (() =>{

//     const sections = document.querySelectorAll(".section");

//     sections.forEach((section) =>{
//         if(!section.classList.contains("active"))
//         {
//             section.classList.add("hide");
//         }
//     })

// })();