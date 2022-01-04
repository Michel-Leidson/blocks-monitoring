async function generateSecurityKey(numberOfCaracters) {
    let caracters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'z',0,1,2,3,4,5,6,7,8,9];
    let generatedKey = '';

    for (let i = 0; i <= numberOfCaracters; i++) {
        let numberRandom = Math.floor( Math.random() * caracters.length)
        let carac = `${caracters[numberRandom]}`.toUpperCase();
        generatedKey+=carac;
    }
    return generatedKey
}

const key = generateSecurityKey(32).then(result=>{
    console.log(result)
})
