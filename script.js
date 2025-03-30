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