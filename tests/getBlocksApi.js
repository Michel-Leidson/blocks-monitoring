const httpApi = require('../service/getHttpApi');

async function test(){
    httpApi.getSignedBlocks("https://mainnet.crypto.org:26657").then(result=>{
        console.log(result.data.result.block_height)
    })
}

test()