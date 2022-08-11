
const getJsonData = async () => {
    const res = await fetch('../data.json')
    const json = await res.json()
    return json
}

const populateDays = async () => {
    const data = await getJsonData()
    const days = document.querySelectorAll('.days')
    for (let i = 0; i < 7; i++){
        days[i].textContent = data[i].day
    }
}
populateDays()

const populateBarChart = async () => {
    const data = await getJsonData()
    const bars = document.querySelectorAll('.bars')
    
    const amounts = []
    for (let i = 0; i < 7; i++){
        amounts.push(data[i].amount)
    }
    
    let max = Math.max(...amounts)
    const percents = amounts.map(num => Math.round((num / max) * 100))

    for (let i = 0; i < 7; i++){
        bars[i].style.height = `${percents[i]}%`
        if (percents[i] === 100){
            bars[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
            bars[i].addEventListener("mouseenter", () => {
                bars[i].style.backgroundColor = 'hsl(186, 34%, 60%, 70%)'
            })
            bars[i].addEventListener("mouseleave", () => {
                bars[i].style.backgroundColor = 'hsl(186, 34%, 60%)'
            })
        }
    }

    const total = amounts.reduce((a,b) => a += b)
    const totalTitle = document.querySelector(".month-total")
    console.log(total)
    totalTitle.textContent = `$${total}`

    const balance = 1000 - total
    const balanceTotal = document.querySelector(".my-balance-total")
    balanceTotal.textContent = `$${balance}`
}
populateBarChart()

const populateAmounts = async () => {
    const data = await getJsonData()
    const amounts = document.querySelectorAll('.amounts')

    for (let i = 0; i < 7; i++){
        amounts[i].textContent = `$${data[i].amount}`
    }
}
populateAmounts()

const displayAmounts = () => {
    const amounts = document.querySelectorAll('.amounts')
    const bars = document.querySelectorAll('.bars')

    for (let i = 0; i < 7; i++){
        bars[i].addEventListener("mouseenter", () => {
            amounts[i].classList.toggle("show-amount-div")
            amounts[i].classList.toggle("show-amount")
        })
        bars[i].addEventListener("mouseleave", () => {
            amounts[i].classList.toggle("show-amount-div")
            amounts[i].classList.toggle("show-amount")
        })
    }
}
displayAmounts()

