// Csillagok elhelyezése és mozgása
const starLayer = document.createElement('div');
starLayer.classList.add('star-layer');
document.body.appendChild(starLayer);

// Funkció a csillagok létrehozásához
function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3 + 2; // Csillagok véletlenszerű méretűek
        const xPos = Math.random() * 100 + '%';
        const yPos = Math.random() * 100 + '%';
        const duration = Math.random() * 5 + 5; // Véletlenszerű villogás időtartama
        const animationDelay = Math.random() * 2 + 's';

        star.classList.add('star', `star-${Math.floor(Math.random() * 3) + 1}`);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = xPos;
        star.style.top = yPos;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = animationDelay;

        starLayer.appendChild(star);
    }
}

// Hozzuk létre a csillagokat
createStars(100);

// Interaktív háttér: Egér mozgás
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Egér pozíciója alapján változik a háttér világítása
    starLayer.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8))`;

    // Létrehozzuk az új csillagokat az egér körül, hogy még látványosabb legyen
    const newStar = document.createElement('div');
    const size = Math.random() * 2 + 1;
    newStar.classList.add('star');
    newStar.style.width = `${size}px`;
    newStar.style.height = `${size}px`;
    newStar.style.left = `${mouseX + Math.random() * 20 - 10}px`; // Kis eltolás az egér pozíciótól
    newStar.style.top = `${mouseY + Math.random() * 20 - 10}px`; // Kis eltolás az egér pozíciótól
    newStar.style.animationDuration = `${Math.random() * 3 + 2}s`;
    newStar.style.animationDelay = '0s';

    starLayer.appendChild(newStar);

    // Csillagok automatikus eltüntetése, ha túl sok lett belőlük
    setTimeout(() => {
        newStar.remove();
    }, 3000); // 3 másodperc után eltűnik a csillag
});

// Pörgetés animáció
const sectors = ["1", "2", "3", "4", "5", "6", "7", "8"];
let spinning = false;

document.getElementById('spinButton').addEventListener('click', () => {
    if (spinning) return; // Ne kezdjen új pörgetést, amíg az előző nem fejeződött be

    spinning = true;
    const wheel = document.getElementById('wheel');
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // legalább 10 teljes fordulat
    const totalSectors = sectors.length;
    const sectorAngle = 360 / totalSectors; // Mivel 8 szektor van, 360/8 = 45 fok

    // Kerék pörgetése
    wheel.style.transition = 'transform 5s ease-out';
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        const normalizedDegree = randomDegree % 360; // A pörgetés végeredményének a helyes pozíciója
        const index = Math.floor(normalizedDegree / sectorAngle); // Az index kiszámítása
        const result = sectors[index];
        alert(`A pörgetés eredménye: ${result}`);

        // Állítsa vissza a kereket az aktuális pozícióra további pörgetésekhez
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${normalizedDegree}deg)`;

        spinning = false;
    }, 5000); // A pörgetés 5 másodpercig tart
});

