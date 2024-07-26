const hostname = "https://bot.slaycer.top"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchFIDE = async (page) => {
    return await fetch(`${hostname}/api/players?std%5Bgte%5D=2100&sort_by=standard&order_by=desc&page=${page}&page_size=1`)
        .then(res => {
            return res.json()
        })
        .then(json => json)
}

(async () => {
    let page = 1
    let players = []
    let havepage = true
    while (havepage) {
        //await delay(1000)
        console.log(page)
        let data = await fetchFIDE(page)

        if (data.message) page += 1
        else {
            players = players.concat(data.items)

            if (data.nextPage) page += 1
            else havepage = false
        }
    }

    let masters = await players.filter(p => Object.hasOwn(p, "otherTitles"))

    console.log(`[ IA, FA, NA, IO, FT, FI, FST, DI, NI, SI, LSI ]: ${masters.length}`)
})()