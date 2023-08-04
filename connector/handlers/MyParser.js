import { Parser } from '@tableau/taco-toolkit/handlers'

export default class MyParser extends Parser {
  parse(fetcherResult, { dataContainer }) {
    const tableName = 'Weather Data'

    const containerBuilder = Parser.createContainerBuilder(dataContainer)
    const { isNew, tableBuilder } = containerBuilder.getTable(tableName)

    if (isNew) {
      tableBuilder.addColumnHeaders([
        {
          id: 'dt_txt',
          alias: 'Timestamp',
          dataType: 'datetime',
        },
        {
          id: 'temp',
          alias: 'Temperature',
          dataType: 'float',
        },
        {
          id: 'feels_like',
          alias: 'Feels Like',
          dataType: 'float',
        },
        {
          id: 'temp_min',
          alias: 'Min Temperature',
          dataType: 'float',
        },
        {
          id: 'temp_max',
          alias: 'Max Temperature',
          dataType: 'float',
        },
        {
          id: 'all',
          alias: 'Cloudiness %',
          dataType: 'int',
        },
        {
          id: 'humidity',
          alias: 'Humidity %',
          dataType: 'int',
        },
        {
          id: 'speed',
          alias: 'Wind Speed m/s',
          dataType: 'float',
        },
        {
          id: 'description',
          alias: 'Description',
          dataType: 'string',
        },
        {
          id: 'visibility',
          alias: 'Visibility m',
          dataType: 'int',
        },
        {
          id: 'name',
          alias: 'Region',
          dataType: 'string',
        },
        {
          id: 'lat',
          alias: 'latitude',
          columnRole: 'dimension',
          dataType: DataType.Float,
        },
        {
          id: 'lon',
          alias: 'longitude',
          columnRole: 'dimension',
          dataType: DataType.Float,
        },
        {
          id: 'country',
          alias: 'Country',
          dataType: 'string',
        },
      ])
    }
      
    tableBuilder.addRows(
      fetcherResult.list.map((row) => {
        return {
          dt_txt: row.dt_txt,
          id: row.main.id,
          temp: row.main.temp - 273.15,
          feels_like: row.main.feels_like - 273.15,
          temp_min: row.main.temp_min - 273.15,
          temp_max: row.main.temp_max - 273.15,
          humidity: row.main.humidity,
          description: row.weather[0].description,
          all: row.clouds.all,
          speed: row.wind.speed,
          visibility: row.visibility,
          name: fetcherResult.city.name,
          lat: fetcherResult.city.coord.lat,
          lon: fetcherResult.city.coord.lon,
          country: fetcherResult.city.country,
        }
      })
    )

    return containerBuilder.getDataContainer()
  }
}
