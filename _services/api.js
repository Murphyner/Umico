let api

export default api = {
    getData : async () => await (await fetch('https://raw.githubusercontent.com/mirafgan/PerfectJson/main/shortUmicoCatalog.json')).json(),
    getDailyData : async () => await (await fetch('//api.mirafgan.me/umico/daily_discount')).json(),
    getProductData : async () => await (await fetch('https://raw.githubusercontent.com/mirafgan/PerfectJson/main/UmicoProducts.json')).json(),
    getActualCategory : async () => await (await fetch('https://api.mirafgan.me/umico/actual_categories')).json(),
    getActualTags : async () => await (await fetch('https://api.mirafgan.me/umico/tags')).json(),
}