export const withLog = f => (...args) => {
    console.group("Invoked function ", f)
    try{
        console.log("With args ", args)
        const returnValue = f(...args)
        console.log("Returned ", returnValue)
        console.groupEnd();
        return returnValue;
    }
    catch (e) {
        console.groupEnd();
        throw e;
    }
}