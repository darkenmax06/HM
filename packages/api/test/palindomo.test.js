

function palindromo (value){
    const revertName = value.split("").reverse().join()

    return revertName == value
}

describe("palindromo test", ()=>{
    test("palindromo de ramses es falso", ()=>{
        expect(palindromo("ramses")).toBe(false)
    })
})