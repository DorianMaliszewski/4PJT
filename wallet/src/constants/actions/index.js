function createActions(string) {
    return {
        REQUEST: string + "_REQUEST",
        SUCCESS: string + "_SUCCESS",
        FAILED : string + "_FAILED"
    }
}

export const LOGIN = createActions("LOGIN"); 