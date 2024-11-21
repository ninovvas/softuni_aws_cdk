export const handler = async (variable: string)=> {
    return {
        time: Date.now(),
        variable,
    }
}