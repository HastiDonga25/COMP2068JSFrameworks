document.addEventListener('DOMContentLoaded', function() {
    /* ================ TYPING ANIMATION ================== */
    if (document.querySelector('.typing')) {
        var typed = new Typed('.typing', {
            strings: ['Software Developer', 'Data Scientist', 'Backend Developer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    /* ================ ASIDE ================== */
    const nav = document.querySelector(".nav");
    if (nav) {
        const navList = nav.querySelectorAll("li"),
            totalnavList = navList.length,
            allSection = document.querySelectorAll(".section"),
            totalSection = allSection.length;

        for (let i = 0; i < totalnavList; i++) {
            const a = navList[i].querySelector("a");
            a.addEventListener("click", function() {
                removeBackSection();
                for (let j = 0; j < totalnavList; j++) {
                    if (navList[j].querySelector("a").classList.contains("active")) {
                        addBackSection(j);
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active");
                showSection(this);
                if (window.innerWidth < 1200) {
                    asideSectionTogglerBtn();
                }
            });
        }

        function showSection(element) {
            for (let i = 0; i < totalSection; i++) {
                allSection[i].classList.remove("active");
            }
            const target = element.getAttribute("href").split("#")[1];
            const targetSection = document.querySelector("#" + target);
            if (targetSection) {
                targetSection.classList.add("active");
                updateNav(element); // Update navigation after showing the section
            }
        }
        
        for (let i = 0; i < totalnavList; i++) {
            const a = navList[i].querySelector("a");
            a.addEventListener("click", function () {
                removeBackSection();
                for (let j = 0; j < totalnavList; j++) {
                    if (navList[j].querySelector("a").classList.contains("active")) {
                        addBackSection(j);
                    }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active");
                showSection(this); // Call showSection with the clicked element
                if (window.innerWidth < 1200) {
                    asideSectionTogglerBtn();
                }
            });
        }

        function updateNav(element) {
            for (let i = 0; i < totalnavList; i++) {
                navList[i].querySelector("a").classList.remove("active");
                const target = element.getAttribute("href").split("#")[1];
                if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
                    navList[i].querySelector("a").classList.add("active");
                }
            }
        }

        document.querySelector(".hire-me")?.addEventListener("click", function() {
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        });

        const navTogglerBtn = document.querySelector(".nav-toggle"),
            aside = document.querySelector(".aside");

        if (navTogglerBtn) {
            navTogglerBtn.addEventListener("click", () => {
                asideSectionTogglerBtn();
            });
        }

        function addBackSection(num) {
            allSection[num]?.classList.add("back-section");
        }

        function removeBackSection() {
            for (let i = 0; i < totalSection; i++) {
                allSection[i]?.classList.remove("back-section");
            }
        }

        function asideSectionTogglerBtn() {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for (let i = 0; i < totalSection; i++) {
                allSection[i]?.classList.toggle("open");
            }
        }
    }
});
