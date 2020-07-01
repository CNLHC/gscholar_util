import axios from "axios"
import fs from 'fs'
import path from 'path'

const page= (from:number)=>`https://scholar.google.com/scholar?start=${from}&hl=zh-CN&as_sdt=2005&sciodt=0,5&cites=487658230308010277&scipsc=`




async function main(){

    for (let i=0;i<530;i+=10){
        console.log("process ",i)
        const res = await axios.get(page(i))
        fs.writeFileSync(path.resolve(".","data",`page-${i/10+1}.html`),res.data)
    }
}



