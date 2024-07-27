const hostname = "https://bot.slaycer.top"

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchFIDE = async (page) => {
    return await fetch(`${hostname}/api/players?sort_by=standard&order_by=desc&page=${page}&page_size=100`)
        .then(res => res.json())
        .then(json => json)
}

(async () => {
    let page = 1
    let players = []
    let havepage = true
    while (havepage) {
        let data = await fetchFIDE(page)

        if (data.message) page += 1
        else {
            players = players.concat(data.items)

            if (data.nextPage) page += 1
            else havepage = false
        }
    }

    let otherTitles =   players.filter(p => Object.hasOwn(p, "otherTitles"))
    let IA          =   otherTitles.filter(p => p.otherTitles.includes("IA")).length
    let FA          =   otherTitles.filter(p => p.otherTitles.includes("FA")).length
    let NA          =   otherTitles.filter(p => p.otherTitles.includes("NA")).length
    let IO          =   otherTitles.filter(p => p.otherTitles.includes("IO")).length
    let FT          =   otherTitles.filter(p => p.otherTitles.includes("FT")).length
    let FI          =   otherTitles.filter(p => p.otherTitles.includes("FI")).length
    let FST         =   otherTitles.filter(p => p.otherTitles.includes("FST")).length
    let DI          =   otherTitles.filter(p => p.otherTitles.includes("DI")).length
    let NI          =   otherTitles.filter(p => p.otherTitles.includes("NI")).length
    let SI          =   otherTitles.filter(p => p.otherTitles.includes("SI")).length
    let LSI         =   otherTitles.filter(p => p.otherTitles.includes("LST")).length
    let otherMaster =   otherTitles.filter(p => Object.hasOwn(p, "title") || Object.hasOwn(p, "womenTitle")).length

    console.info(`[ IA, FA, NA, IO, FT, FI, FST, DI, NI, SI, LSI ]: ${otherTitles.length}`)
    console.info(`IA: ${IA}`)
    console.info(`FA: ${FA}`)
    console.info(`NA: ${NA}`)
    console.info(`IO: ${IO}`)
    console.info(`FT: ${FT}`)
    console.info(`FI: ${FI}`)
    console.info(`FST: ${FST}`)
    console.info(`DI: ${DI}`)
    console.info(`NI: ${NI}`)
    console.info(`SI: ${SI}`)
    console.info(`LSI: ${LSI}`)
    console.info(`With Master Title: ${otherMaster} (Without: ${otherTitles.length - otherMaster})`)
})()