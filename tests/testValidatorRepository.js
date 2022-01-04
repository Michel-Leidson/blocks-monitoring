const { getFormatedCountBlocksPerValidator,createValidator  } = require('../service/ValidatorService');

async function test(){
    const validatorInfo ={
        
        name: "Stakin",
        signer_key: "5714915F131F2FDA0E5162F7AACAF761064F8370",
        networks: "crypto",
        url_get_blocks: "https://mainnet.crypto.org:26657",
    }

    await createValidator(validatorInfo);
    //const testeDeOutput = await getFormatedCountBlocksPerValidator()
    //console.log(testeDeOutput)
}

test()