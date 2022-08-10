
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
        }
    }
}
populateBarChart()
