export const safeJSON = {
    parse: (json : any) => {
        let parsed
        try {
            parsed = JSON.parse(json)
        } catch (e) {
            console.log('Error: ' + e)
            console.log(json);
        }
    
        return parsed
    },
    stringify: (data : object, replacer? : any, space? : string) => {
        let string
    
        try {
            string = JSON.stringify(data, replacer, space)
        } catch (e) {
            console.log('Error: ' + e)
        }
    
        return string
    }
}    