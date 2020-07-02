import axios from "axios"
import fs from 'fs'
import path from 'path'
import { SocksProxyAgent}from 'socks-proxy-agent'

const page= (from:number)=>`https://scholar.google.com/scholar?start=${page}&hl=en&newwindow=1&as_sdt=0,5&sciodt=0,5&cites=487658230308010277&scipsc=`


const agent  =  new SocksProxyAgent({
    host:"localhost",
    port:10808
})


async function main(){
    for (let i=300;i<530;i+=10){
        console.log("process ",i)
        try{
        const res = await axios.get(page(i),{
            httpAgent:agent,
            httpsAgent: agent
        })
        fs.writeFileSync(path.resolve(".","data",`page-${i/10+1}.html`),res.data)

        } catch(e){
        
        console.log(e)

        }
    }
}

main()


