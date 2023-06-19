//scroll animations
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show')
        } else{
            entry.target.classList.remove('show')
        }
    })
})


const hiddenElelements = document.querySelectorAll('.hidden')
hiddenElelements.forEach((el) => observer.observe(el))