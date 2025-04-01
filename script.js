const dialog = document.querySelector("dialog");

window.addEventListener('load', () => {
    dialog.showModal();
});

document.querySelector("#open-popup").addEventListener("click", function(){
    dialog.showModal();
});
document.querySelector(".close-btn").addEventListener("click", function(){
    dialog.close();
});

window.addEventListener('load', () => {
    dialog.showModal();
});


const cube = document.querySelector('.cube');
    const time = 2; // Duración total de la animación

    cube.addEventListener('click', () => {
        cube.style.transition = ''; 
        cube.style.animation = ''; 

        // Simular rebote inicial
        cube.style.transition = `transform 0.3s cubic-bezier(0.3, 0.5, 0.5, 1)`;
        cube.style.transform = `translateX(200px) rotateX(720deg) rotateY(720deg) rotateZ(720deg)`;

        setTimeout(() => {
            // Bajada del dado con rebote
            cube.style.transform = `translateY(100px) rotateX(360deg) rotateY(360deg) rotateZ(360deg)`;

            setTimeout(() => {
                // Rotación final aleatoria
                cube.style.transition = `transform ${time}s ease-out`;
                const randomValue = Math.floor((Math.random() * 6) + 1);
                console.log(`randomValue: ${randomValue}` );

                switch(randomValue) {
                    case 1:             
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 2:
                        cube.style.transform = `translateY(200px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 3:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                        break;
                    case 4:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                        break;
                    case 5:
                        cube.style.transform = `translateY(200px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                        break;
                    case 6:
                        cube.style.transform = `translateY(200px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                        break;
                }
        }, 300);
    }, 300);
});