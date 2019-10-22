const logic = new Logic
const renderer = new Renderer
const apiManager = new APIManager

const displayLocation = async (position) =>{
    const geolocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }
    const city = await logic.getCityData(geolocation, true)
    if (city.failed) {
        renderer.renderError(city.errorMessage)
    } else {
        renderer.renderCitiesList(logic.cityData)
        renderer.renderCitySelection(city)
        checkWhenWasLastUpdate()
    }
}

const checkWhenWasLastUpdate = () => {
    const cityID = $('[data-display-city-id]').data('display-city-id')
    const relCity = logic.cityData.find(c => c.id === cityID)
    const duration = Math.round(moment.duration(moment().diff(moment(relCity.updatedAt))).asMinutes())
    const minutesAgoString = `Updated ${duration === 0 ? ' a few moments ' : duration === 1 ? ' a minute ' : ` ${duration} minutes `} ago`
    renderer.renderUpdatedAgo(minutesAgoString)
    if(duration > 14) {
        if(relCity.isCurrentLocation) {
            navigator.geolocation.getCurrentPosition(displayLocation)
        } else {
            refreshCity()
        }
    }
}

const onLoadPage = async ()=>{
    await logic.getCities()
    renderer.renderCitiesList(logic.cityData)
    navigator.geolocation.getCurrentPosition(displayLocation)
    setInterval(checkWhenWasLastUpdate, 60000)
}

const refreshCity = async () => {
    const cityID = $('[data-display-city-id]').data('display-city-id')
    const relCity = logic.cityData.find(c => c.id === cityID)
    if(relCity.isCurrentLocation) {
        navigator.geolocation.getCurrentPosition(displayLocation)
    } else {
        const updatedCity = await logic.refreshDisplayedCity(relCity.name)
        renderer.renderDisplayedCity(updatedCity)
        checkWhenWasLastUpdate()
    }
}

$('#search-btn').on('click', async function () { 
    const searchVal = $('#search-inp').val()
    $('#search-inp').val('')
    if(searchVal){
        const city = await logic.getCityData(searchVal)
        if(city.failed) {
            renderer.renderError(city.errorMessage)
        } else {
            renderer.renderCitySelection(city)
            if (!city.exist) { renderer.renderCitiesList(logic.cityData) }
            checkWhenWasLastUpdate()
        }
    }
});

$('#cities').on('click', '.save-city-btn', async function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    await logic.saveCity(cityName)
    await logic.getCities()
    renderer.renderCitiesList(logic.cityData)
});

$('#cities').on('click', '.remove-city-btn', async function () {
    const cityName = $(this).closest('.single-city').find('.city-name').text()
    await logic.removeCity(cityName)
    await logic.getCities()
    renderer.renderCitiesList(logic.cityData)
});

$('#cities').on('click', '.city-preview', function () {
    const cityID = $(this).closest('[data-city-id]').data('city-id')
    const relCity = logic.cityData.find(c => c.id == cityID)
    renderer.renderCitySelection(relCity)
    checkWhenWasLastUpdate()
});

$('#search-inp').on('focus', function () {
    $(this).attr('placeholder', 'Look up a city')
        .removeClass('error')
})

$('#displayed-city').on('click', '#refresh', refreshCity); 

onLoadPage()