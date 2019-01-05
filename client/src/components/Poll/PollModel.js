export const sportsImages = {
  TENNIS: require('./assets/tennis.jpg'),
  FOOTBALL: require('./assets/football.jpg'),
  SNOOKER: require('./assets/snooker.jpg'),
  HANDBALL: require('./assets/handball.jpg'),
  ICE_HOCKEY: require('./assets/ice_hockey.jpg'),
};

export const CHART_BACKGROUNDS = [
  '#118AB2',
  '#FFD166',
  '#06D6A0',
  '#EF476F',
  '#073B4C',
];

// Fisher-Yates algorithm
export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

export const ArrayOfCounts = (length) => Array.from({length}).map((_, i) => i);

