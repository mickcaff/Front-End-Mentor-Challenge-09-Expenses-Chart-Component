// fetches data from the data.json file
const getExpensesData = async (filePath) => {
    const res = await fetch(filePath)
    const json = await res.json()
    return json
}

// Selects DOM elements with the class '.days'
const getDaysElements = () => {
    return document.querySelectorAll('.days')
}

// Iterates over each of the '.days' elements
// and populates with the last 7 days of data from the json file
const populateDays = (data) => {
    const days = getDaysElements()
    for (let i = 0; i < 7; i++){
        days[i].textContent = data[i].day
    }
}

// Selects DOM elements with the class '.bars'
const getBarsElements = () => {
    return document.querySelectorAll('.bars')
}

// Creates an array with the last 7 days of
// expense amounts
const createArrayOfAmounts = (data) => {
    const amountsArray = []
    for (let i = 0; i < 7; i++){
        amountsArray.push(data[i].amount)
    }
    return amountsArray
}

// Finds the maximum value in an array of numbers
const findMaxAmount = (array) => {
    return Math.max(...array)
}

// Uses the maximum value in the array to create an array of percentages
// The percentage calculation uses the maimum value as a basis
const createArrayOfPercentages = (array, maxAmount) => {
    return array.map(num => Math.round((num / maxAmount) * 100))
}

// For each of the 7 bar elements if the corresponding
// percentage equals 100% (this equates to the maximum expense value)
// Then this corresponding bar element is give special backgroundColor styling
// with a hover effect using 'mouseenter' & 'mouseleave'
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

// Selects DOM elements with the class '.amounts'
const getAmountsElements = () => {
    return document.querySelectorAll('.amounts')
}

// Loops through the last 7 days expense amounts
// and updates the '.amounts' elements with their corresponding value
// this element remains hidden until the function hoverDisplayAmountElements() is run
const updateAmountElements = (data) => {
    const amountElements = getAmountsElements()
    for (let i = 0; i < 7; i++){
        amountElements[i].textContent = `$${data[i].amount}`
    }
}

// Loops through each of the '.amounts' elements and
// adds 'mouseenter' & 'mouseleave' events
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

// Finds the total of a sum of all the numbers in an array
const numbersArrayTotal = (array) => {
    return array.reduce((a,b) => a += b)
}

// Updates the HTML element that displays the total expenses for the month
const updateMonthTotalElement = (total) => {
    const totalTitle = document.querySelector(".month-total")
    totalTitle.textContent = `$${total}`
}

// Updates the HTML element that displays the remaining balance
// The remaining balance is based off an original balance of $1000
// As this data was not stored within the json
const updateRemainingBalanceElement = (total) => {
    const balance = 1000 - total
    const balanceTotal = document.querySelector(".my-balance-total")
    balanceTotal.textContent = `$${balance}`
}

// The below function is used to call all of the above functions
const populateBarChartData = async () => {
    const data = await getExpensesData('../data.json')
    populateDays(data)
    const bars = getBarsElements()
    const amountsArray = createArrayOfAmounts(data)
    const maxAmount = findMaxAmount(amountsArray)
    const percents = createArrayOfPercentages(amountsArray, maxAmount)
    updateBarHeightAndStyle(bars, percents)
    updateAmountElements(data)
    hoverDisplayAmountElements(bars)
    const amountsTotal = numbersArrayTotal(amountsArray)
    updateMonthTotalElement(amountsTotal)
    updateRemainingBalanceElement(amountsTotal)
}
populateBarChartData()

