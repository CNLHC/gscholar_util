import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { stringify } from 'csv'
import xlsx from 'xlsx'
const cw = new stringify.Stringifier({})

let data = ''
let pdfdata = ''
let aoa: any[] = []


cw.on("readable", () => {
    let row: Buffer;
    while (row = cw.read()) {
        console.log(row.toString('utf-8'))
        data += `${row.toString('utf-8')}\n`
    }
})

cw.on('finish', () => {
    fs.writeFileSync('out.csv', data)
    fs.writeFileSync('download_link.txt', pdfdata)
    const wb = xlsx.utils.book_new()
    const ws = xlsx.utils.aoa_to_sheet(aoa)
    xlsx.utils.book_append_sheet(wb,ws)
    xlsx.writeFile(wb, "out.xlsx")

})


async function parsefiles(e: string) {
    const jsobj = new JSDOM(fs.readFileSync(`./data/${e}`))
    const entry_list = jsobj.window.document.querySelectorAll(".gs_r.gs_or")

    entry_list.forEach(e => {
        const title_link = e.querySelector(".gs_rt")?.querySelector("a")
        const title = title_link?.textContent
        const url = title_link?.href

        const ggsd_link = e.querySelector(".gs_ggsd")?.querySelector("a")
        const ggsd_title = ggsd_link?.textContent
        const ggsd_url = ggsd_link?.href

        if (ggsd_link && ggsd_title)
            if (ggsd_title.indexOf("PDF") != -1)
                pdfdata += `${ggsd_url}\n`


        cw.write([title, url, ggsd_title, ggsd_url])
        aoa.push([title, url, ggsd_title, ggsd_url])


    })




}

fs.readdir("./data", (err, files) => {
    files.forEach(e => {
        parsefiles(e)
    })
    cw.end()

})





