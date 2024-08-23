const CountriesContainer = document.querySelector(".CountriesContainer")
const CountryCard = document.querySelector(".CountryCard")


let country_codes = ["aze", "rus", "geo", "can", "uzb", "usa", "ger", "esp", "fra", "uae", "pol", "bel", "ind"]

country_codes = ["all"]

async function InsertElementFromApi(country_codes) {
    let all_country_codes = ""
    country_codes.forEach(element => {
        all_country_codes += element + ","
    });
    let MyObject = await fetch(`https://restcountries.com/v3.1/alpha?codes=${all_country_codes}`)

    if (country_codes.includes("all")) {
        MyObject = await fetch(`https://restcountries.com/v3.1/all`)
    }


    let text = await MyObject.text()
    let Api_Data = JSON.parse(text)
    console.log(Api_Data)

    for (let data of Api_Data) {
        let CountryCard_Copy = CountryCard.cloneNode(true)
        CountryCard_Copy.style.display = "flex"

        // Add comma in population count
        let population = String(data.population)
        count_for_population = parseInt(population.length / 3)

        population = population.split('').reverse().join('');
        let out_population = ""
        for (let i = 0; i < count_for_population; i++) {
            frst_point = i * 3
            scnd_point = (i + 1) * 3
            out_population += population.slice(frst_point, scnd_point) + ","
        }
        start = count_for_population * 3
        out_population += population.slice(start, population.length)
        out_population = out_population.split('').reverse().join('');

        if (out_population[0] == ",") {
            out_population = out_population.slice(1, out_population.length)
        }



        CountryCard_Copy.querySelector("img").src = data.flags.svg
        CountryCard_Copy.querySelector(".CountryName").innerText = data.name.common
        CountryCard_Copy.querySelector(".Population_Count").innerText = out_population
        CountryCard_Copy.querySelector(".Region_Name").innerText = data.region
        CountryCard_Copy.querySelector(".Capital_Name").innerText = data.capital


        CountriesContainer.appendChild(CountryCard_Copy)

    }


}

InsertElementFromApi(country_codes)
