
const button = document.getElementById('btn-login')

button.addEventListener('mouseover', () => {
    document.querySelectorAll('.effect').forEach(element => {
        element.classList.add('active');
    });
})

button.addEventListener('mouseout', () => {
    document.querySelectorAll('.effect').forEach(element => {
        element.classList.remove('active');
    });
})