const modalAvatar = document.querySelector(".modal-avatar")

const ChooseAvartar = (idx) =>{
    modalAvatar.classList.remove("active")
}

window.addEventListener("load", (event) => {
    modalAvatar.classList.add("active")
});