class APIManager {


    fetchCities(){
        return this.useAjax('get', '/cities')
    }

    fetchCityData(cityName){
        return this.useAjax('get', '/city/:' + cityName)
    }

    createCity(cityInfo){
        return this.useAjax('post', '/city', null, cityInfo)
    }

    deleteCity(cityName){
        this.useAjax('delete', '/city/' + cityName)
    }

    useAjax(method, url, success = response=>response, data){
        return $.ajax({
            method,
            url,
            data,
            success,
            error: (xhr, text, err) => console.log(`
            ERROR on $.ajax call:
            XHR: ${xhr}
            Text: ${text}
            Error: ${err}`)
        })
    }

}
