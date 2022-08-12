const getExpensesData = async () => {
    const res = await fetch('../data.json')
    const json = await res.json()
    return json
}

const getDaysElements = () => {
    return document.querySelectorAll('.days')
}

const populateDays = (data) => {
    const days = getDaysElements()
    for (let i = 0; i < 7; i++){
        days[i].textContent = data[i].day
    }
}

const getBarsElements = () => {
    return document.querySelectorAll('.bars')
}

const createArrayOfAmounts = (data) => {
    const amountsArray = []
    for (let i = 0; i < 7; i++){
        amountsArray.push(data[i].amount)
    }
    return amountsArray
}

const findMaxAmount = (array) => {
    return Math.max(...array)
}

const createArrayOfPercentages = (array, maxAmount) => {
    return array.map(num => Math.round((num / maxAmount) * 100))
}

const updateBarHeightAndStyle = (bars, percentsArray) => {
    for (let i = 0; i < 7; i++){
        bars[i].style.height = `${percentsArray[i]}%`
        if (percentsArray[i] === 100){
            bars[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
            bars[i].addEventListener("mouseenter", () => {
                bars[i].style.backgroundColor = 'hsl(186, 34%, 60%, 70%)'
            })
            bars[i].addEventListener("mouseleave", () => {
                bars[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
            })
        }
    }
}

const numbersArrayTotal = (array) => {
    return array.reduce((a,b) => a += b)
}

const updateMonthTotalElement = (total) => {
    const totalTitle = document.querySelector(".month-total")
    totalTitle.textContent = `$${total}`
}

const updateRemainingBalanceElement = (total) => {
    const balance = 1000 - total
    const balanceTotal = document.querySelector(".my-balance-total")
    balanceTotal.textContent = `$${balance}`
}

const getAmountsElements = () => {
    return document.querySelectorAll('.amounts')
}

const updateAmountElements = (data) => {
    const amountElements = getAmountsElements()
    for (let i = 0; i < 7; i++){
        amountElements[i].textContent = `$${data[i].amount}`
    }
}

const hoverDisplayAmountElements = (barElements) => {
    const amountElements = getAmountsElements()
    for (let i = 0; i < 7; i++){
        barElements[i].addEventListener("mouseenter", () => {
            amountElements[i].classList.toggle("show-amount-div")
            amountElements[i].classList.toggle("show-amount")
        })
        barElements[i].addEventListener("mouseleave", () => {
            amountElements[i].classList.toggle("show-amount-div")
            amountElements[i].classList.toggle("show-amount")
        })
    }
}

const populateBarChartData = async () => {
    const data = await getExpensesData()
    populateDays(data)
    const bars = getBarsElements()
    const amountsArray = createArrayOfAmounts(data)
    const maxAmount = findMaxAmount(amountsArray)
    const percents = createArrayOfPercentages(amountsArray, maxAmount)
    updateBarHeightAndStyle(bars, percents)
    const amountsTotal = numbersArrayTotal(amountsArray)
    updateMonthTotalElement(amountsTotal)
    updateRemainingBalanceElement(amountsTotal)
    updateAmountElements(data)
    hoverDisplayAmountElements(bars)
}
populateBarChartData()

