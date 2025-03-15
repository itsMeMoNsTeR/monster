document.addEventListener("DOMContentLoaded", () => {
    const enterButton = document.querySelector(".enter-button");

    // Smooth button click transition
    enterButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Click effect
        this.classList.add("clicked");
        setTimeout(() => {
            this.classList.remove("clicked");
        }, 200);

        // Fade out effect before redirecting
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = this.getAttribute("href");
        }, 600);
    });

    // Floating particles effect
    createParticles();
});

function createParticles() {
    const particleContainer = document.querySelector(".floating-particles");

    for (let i = 0; i < 20; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.animationDuration = Math.random() * 3 + 2 + "s";
        particleContainer.appendChild(particle);
    }
}
