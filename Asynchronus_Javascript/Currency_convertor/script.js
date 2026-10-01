const amountInput = document.querySelector("#amount")
const fromInput = document.querySelector("#fromCurrency")
const toInput = document.querySelector("#toCurrency")
const convertBtn = document.querySelector("#convertBtn")
const result = document.querySelector("#result")
convertBtn.addEventListener("click", function () {
    const amount = Number(amountInput.value)
    const from = fromInput.value
    const to = toInput.value
    if(!amount){
        result.textContent = "Please Enter Some Amount"
    }
    if(from===to){
        result.textContent = `${amount} ${from} = ${amount} ${to}`
    }
    amount.textContent = "Loading ...."
    fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`).then(function (rawData) {
        return rawData.json()
    }).then(function (data) {
        console.log(data)
        const convertedAmount = amount * data.rate
        result.textContent = `${convertedAmount} ${from} = ${convertedAmount.toFixed(2)} ${to}`
    }).catch(function (err) {
        console.log(err)
    })
})