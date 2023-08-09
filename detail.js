const country = window.location.search.split("=")[1]
const flagImg = document.getElementById("flag")
const countryName = document.getElementById("countryName")

const backBtn = document.getElementById("backBtn")

const native = document.getElementById("native")

const population = document.getElementById("pop")
const region = document.getElementById("region")
const sub_region = document.getElementById("sub-region")
const capital = document.getElementById("capital")
const domain = document.getElementById("domain")
const cur = document.getElementById("cur")
const languages = document.getElementById("languages")

const borderCountries = document.getElementById("borderCountries")

async function GetBorders(borderCodes){
    const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`)
    const data = await res.json()
    return data
}

async function GetAll(){
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(x => x.json()).then(y => 
    {
        const c = y[0]
        flagImg.src = c["flags"]["svg"]
        flagImg.alt = c["flags"]["alt"]
        countryName.textContent = c["name"]["common"]
        let name = ""
        for(const [key,value] of Object.entries(c["name"]["nativeName"])){
            name = value["common"]
        }
        native.innerHTML = "<b>Native Name:</b> " + name
        population.innerHTML = "<b>Population:</b> " + c["population"].toLocaleString()

        //Bug in JSON 
        if(c["region"] == "Americas"){
            region.innerHTML = "<b>Region:</b> America"
        }else{
            region.innerHTML = "<b>Region:</b> " + c["region"]
        }
        sub_region.innerHTML = "<b>Sub Region: </b>" + c["subregion"]
        capital.innerHTML = "<b>Capital: </b>" + c["capital"]
        domain.innerHTML = "<b>Domain(s): </b>" + c["tld"]
        
        let currsData = []
        for(const [key,value] of Object.entries(c["currencies"])){
            currsData.push(value)
        }
        let currs = []
        for (let i = 0; i < currsData.length; i++) {
            const element = currsData[i];
            currs.push(element["name"])
        }
        let langs = []
        for(const [key,value] of Object.entries(c["languages"])){
            langs.push(value)
        }
        cur.innerHTML = "<b>Currency: </b>" + currs.join(", ")
        languages.innerHTML = "<b>Language(s): </b>" + langs.join(", ")
        
        GetBorders(c["borders"]).then(x => {
            for (let i = 0; i < x.length; i++) {
                const element = x[i];
                const borderCountryA = document.createElement("a")
                const borderCountryB = document.createElement("button")
                borderCountryA.href = window.location.pathname + `?=${element["name"]["common"]}` 
                borderCountryB.innerText = element["name"]["common"]
                borderCountryB.classList.add("defaultButton")
                borderCountryA.appendChild(borderCountryB)
                borderCountries.appendChild(borderCountryA)
            }
            
        })

    })
}



GetAll()