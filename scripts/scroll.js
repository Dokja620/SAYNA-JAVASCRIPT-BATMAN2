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

//images animations
const watcher = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('zoom-in')
        } else{
            entry.target.classList.remove('zoom-in')
        }
    })
})


const zoom = document.querySelectorAll('.zoom')
zoom.forEach((el) => watcher.observe(el))