let darkMode = localStorage.getItem("mode") == "dark" ? false : true
console.log(localStorage.getItem("mode") == "dark"); 
let backArrow = ""
if(document.getElementById("backArrow")){
    backArrow = document.getElementById("backArrow")
}
const darkModeBtn = document.getElementById("darkMode")
const moonImg = document.getElementById("moon")

window.onload += ChangeMode()



darkModeBtn.addEventListener("click", () => {
    ChangeMode()
})

function ChangeMode(){
    if(!darkMode){
        document.body.classList.add("darkColor")
        document.documentElement.classList.add("darkBack")
        document.documentElement.classList.add("darkBackElement")
        document.documentElement.classList.add("darkBack")
        backArrow.src = "design/backWhite.png"
        moonImg.src = "design/moonWhite.svg"
        darkMode = true
        localStorage.setItem("mode", "dark")
    }else{
        document.body.classList.remove("darkColor")
        document.documentElement.classList.remove("darkBackElement")
        document.documentElement.classList.remove("darkBack")
        backArrow.src = "design/back.png"
        moonImg.src = "design/moon.svg"
        darkMode = false
        localStorage.setItem("mode", "bright")
    }
}