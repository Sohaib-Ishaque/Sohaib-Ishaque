(() =>{

    const styleToggler = document.querySelector(".style-toggler");

    styleToggler.addEventListener("click", () =>{

        document.querySelector(".style-switcher").classList.toggle("open");
    })

    window.addEventListener("scroll", () =>{
        if(document.querySelector(".style-switcher").classList.contains("open"))
        {
            document.querySelector(".style-switcher").classList.remove("open");
        }
    })


    const darkMode = document.querySelector(".darkmode");

    darkMode.addEventListener("click", () =>{
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark"))
        {
            localStorage.setItem("theme","dark");
        }
        else
        {
            localStorage.setItem("theme","light");
        }
        updateIcon();
    })

    function themeMode(){
        if(localStorage.getItem("theme") !== null)
        {
            if(localStorage.getItem("theme") === "light")
            {
                document.body.classList.remove("dark");
            }
            else
            {
                document.body.classList.add("dark");                
            }
        }
        updateIcon();
    }
    themeMode();

    function updateIcon(){
        if(document.body.classList.contains("dark"))
        {
            darkMode.querySelector("i").classList.add("fa-sun");
            darkMode.querySelector("i").classList.remove("fa-moon");
        }
        else
        {
            darkMode.querySelector("i").classList.add("fa-moon");
            darkMode.querySelector("i").classList.remove("fa-sun");
        }
    }

})();