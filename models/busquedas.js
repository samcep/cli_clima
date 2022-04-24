const axios = require("axios");
require("dotenv").config();

class Busquedas {
  historial = ["Tegucigalpa", "Madrid"];
  


  constructor() {
    //TODO: leer DB si existe
  }

  get paramsMapBox() {
    return {
      proximity: "ip",
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  //*Peticion mapBox
  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });
     
      
      const { data } = await instance.get();
      this.cargando = false

      return data.features.map((ciudad) => ({
        id: ciudad.id,
        name: ciudad.place_name,
        lng: ciudad.center[0],
        lat: ciudad.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  // * peticion open wheather map

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.OPEN_KEY,
        },
      });
      console.log('cargando...'.bgBlue);
      const { data } = await instance.get();
      const resp = data.main;

      return {
        temp: resp.temp,
        temp_min: resp.temp_min,
        temp_max: resp.temp_max,
      };
    } catch (error) {
      console.log(error);
    }
  }


  agregarHistorial(lugar){
    this.historial.unshift(lugar);
  }
}

module.exports = Busquedas;
