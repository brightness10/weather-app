class Logic {
    constructor(){
        this.cityData = []
    }
    // TODO: add fail cases for all
    async getCities(){
        const cities = await apiManager.fetchCities()
        if(cities.length){
            this.cityData = this.cityData.filter(c=> !c.isSaved)
            this.cityData.push(...cities)
        }
    }

    async getCityData(location){
        const query = location instanceof Object ? `lat=${location.lat}&long=${location.long}` : `q=${location}`
        const fetchedCityData = await apiManager.fetchCityData(query)

        return fetchedCityData
    }

    insertCity(city) {
        this.cityData.unshift(city)
    }

    async saveCity(cityName){
        const cityInfo = this.cityData.find(c=> c.name == cityName)
        if(cityInfo){
            cityInfo.isSaved = true
            await apiManager.createCity(cityInfo)
        }
    }

    removeCity(cityName){
        if(cityName === 'Current Location') { return }
        const relCity = this.cityData.find(c => c.name == cityName)
        this.cityData = this.cityData.filter(c => c.name != cityName)
        relCity.isSaved ? apiManager.deleteCity(cityName) : null
    }

    async refreshDisplayedCity(cityName, cityIndex){
        const relCityIndex = cityIndex || this.cityData.findIndex(c => c.name == cityName)
        const query = `q=${cityName}`
        const updatedCity = await apiManager.fetchCityData(query)
        updatedCity.isSaved = this.cityData[relCityIndex].isSaved
        if(updatedCity.isSaved) { apiManager.updateCity(updatedCity) }
        return this.cityData[relCityIndex] = updatedCity
    }
}