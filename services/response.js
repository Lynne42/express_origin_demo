function responseJson(code, data, message) {
    return {
        code,
        data,
        msg: message,
    }
}

module.exports = {
    responseJson
};