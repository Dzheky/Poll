const countryDataUrl = 'https://restcountries.eu/rest/v2/name/';
const flagByCodeUrl = 'https://www.countryflags.io/:code/flat/64.png';

export const fetchCountryData = async (countryName) => {
  try {
    const countryData = await fetch(countryDataUrl + countryName);

    return await countryData.json();
  } catch (e) {
    console.log('fetchSportEvents error', e);

    return false;
  }
};

export const getFlagUrlByCountryName = async (countryName) => {
  try {
    const countryData = await fetchCountryData(countryName);
    if (!countryData) {
      return null;
    }
    return flagByCodeUrl.replace(':code', countryData[0].alpha2Code);
  } catch (e) {
    console.log('fetchSportEvents error', e);

    return false;
  }
};
