

const SelectedCurrencyRate = document.querySelector("#SelectedCurrencyRate");
let Current_Value = 1;
SelectedCurrencyRate.value = Current_Value;

const USD_Currency = document.querySelector("#USD_Currency")
const EUR_Currency = document.querySelector("#EUR_Currency")
const CAD_Currency = document.querySelector("#CAD_Currency")



const AdditonalContainer_UpdInfo = document.querySelector(".AdditonalContainer_UpdInfo")


async function GetInfo_FromApi() {
    let Api_Data = {}

    let object = await fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_iriEnjxJfXylP1eWrPo9KcDb9gspshZceSQ6suVD&currencies=EUR%2CUSD%2CCAD&base_currency=AZN")
    let text = await object.text()
    Api_Data = JSON.parse(text)

    console.log(Api_Data)

    let Last_Update = Api_Data.meta.last_updated_at.replace("T", " ")
    Last_Update = "Last updated: " + Last_Update
    Last_Update = Last_Update.slice(0, Last_Update.length - 1)
    AdditonalContainer_UpdInfo.innerText = Last_Update

    USD_Currency.innerText = Current_Value * Api_Data.data.USD.value
    EUR_Currency.innerText = Current_Value * Api_Data.data.EUR.value
    CAD_Currency.innerText = Current_Value * Api_Data.data.CAD.value

    SelectedCurrencyRate.addEventListener("input", (e) => {
        Current_Value = e.target.value
        USD_Currency.innerText = Current_Value * Api_Data.data.USD.value
        EUR_Currency.innerText = Current_Value * Api_Data.data.EUR.value
        CAD_Currency.innerText = Current_Value * Api_Data.data.CAD.value
    }
    )


}

GetInfo_FromApi()



