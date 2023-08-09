const flagContainer = document.getElementById("flags")
const countrySearch = document.getElementById("countrySearch")
const regionSelect = document.getElementById("regionSelect")

window.onload += GetAll()
function AppendAll(y){
    for (let i = 0; i < y.length; i++) {
        let button = document.createElement("a")
        button.classList.add("nostyle")
        button.setAttribute("href", `detail.html?country=${y[i]["name"]["common"]}`)
        let item = document.createElement("div")
        item.classList.add("item")
        const img = document.createElement('img')
        const itemContent = document.createElement("div")
        itemContent.classList.add("itemContent")
        const countryName = document.createElement("h3")
        countryName.innerText = y[i]["name"]["common"]
        const population = document.createElement("p")
        population.innerHTML = `<b>Population:</b> ${y[i]["population"].toLocaleString()}`
        const continent = document.createElement("p")
        continent.innerHTML = `<b>Region:</b> ${y[i]["continents"]}`
        const capital = document.createElement("p")
        capital.innerHTML = `<b>Capital:</b> ${y[i]["capital"]}`
        const container = document.createElement("div")
        container.appendChild(population)
        container.appendChild(continent)
        container.appendChild(capital)
        itemContent.appendChild(countryName)
        itemContent.appendChild(container)
        
        img.src = y[i]["flags"]["png"]
        item.appendChild(img)
        item.appendChild(itemContent)
        button.appendChild(item)
        flagContainer.appendChild(button)
    }
}

function RemoveAll(){
    while(flagContainer.firstElementChild){
        flagContainer.firstElementChild.remove()
    }
}


async function GetAll(){
    let res = await fetch("https://restcountries.com/v3.1/all")
    .then(x => x.json()).then(y => 
    {
            AppendAll(y)
    })
}


async function GetSpecific(){
    const res = await fetch(`https://restcountries.com/v3.1/name/${countrySearch.value}`)
    .then(x => x.json()).then(y => {
        RemoveAll()
        AppendAll(y)
    })
}

async function FilterRegion(){
    const res = await fetch(`https://restcountries.com/v2/region/${regionSelect.value}`)
    .then(x => x.json()).then(y => {
        RemoveAll()

        for (let i = 0; i < y.length; i++) {
            let item = document.createElement("div")
            item.classList.add("item")
            const img = document.createElement('img')
            const itemContent = document.createElement("div")
            itemContent.classList.add("itemContent")
            const countryName = document.createElement("h3")
            countryName.innerText = y[i]["name"]
            const population = document.createElement("p")
            population.innerHTML = `<b>Population:</b> ${y[i]["population"].toLocaleString()}`
            const continent = document.createElement("p")
            continent.innerHTML = `<b>Region:</b> ${y[i]["region"]}`
            const capital = document.createElement("p")
            capital.innerHTML = `<b>Capital:</b> ${y[i]["capital"]}`
            const container = document.createElement("div")
            container.appendChild(population)
            container.appendChild(continent)
            container.appendChild(capital)
            itemContent.appendChild(countryName)
            itemContent.appendChild(container)
            
            img.src = y[i]["flags"]["png"]
            item.appendChild(img)
            item.appendChild(itemContent)
            flagContainer.appendChild(item)
        }
    })
}

regionSelect.addEventListener("change", () => {
    FilterRegion();
})

document.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        e.preventDefault()
        if(countrySearch.value != ""){
            GetSpecific()
        }else{
            RemoveAll()
            GetAll()
        }
    }
})


