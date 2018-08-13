const IMAGE_PATH = '../assets/images/';
const images = {
  car : require( IMAGE_PATH + 'HomePage/car.png'),
  lookingForLogo : {
    atm : require( IMAGE_PATH + 'HomePage/coin_black.png'),
    atm_green : require( IMAGE_PATH + 'HomePage/coin.png'),
    petrol : require( IMAGE_PATH + 'HomePage/gas-station.png'),
    repair_store : require( IMAGE_PATH + 'HomePage/screwdriver-and-wrench-crossed.png'),
    park : require( IMAGE_PATH + 'HomePage/parking-sign.png'),
    location : require( IMAGE_PATH + 'HomePage/maps-and-flags.png'),
  },
  ButtonScreen : {
    greenSpeed : require(IMAGE_PATH + 'HomePage/green-speed.png'),
    redSpeed : require(IMAGE_PATH + 'HomePage/red-one.png'),
    help : require(IMAGE_PATH + 'HomePage/help-button.png'),
    police : require(IMAGE_PATH + 'HomePage/police-button.png'),
    radio : require(IMAGE_PATH + 'HomePage/radio-button.png'),
    trafficLight : require(IMAGE_PATH + 'HomePage/traffic-light-button.png'),
  },
  ReportScreen : {
    mapIssue : require(IMAGE_PATH + 'ReportScreen/speed-limit.png'),
    trafficCar : require(IMAGE_PATH + 'HomePage/sports-car.png'),
    policeSuccess : require(IMAGE_PATH + 'ReportScreen/police-success.png'),
  },
  MenuScreen : {
    mapIssue : require(IMAGE_PATH + 'MenuPage/map.png')
  },
  // LoginPage : {
  //   LoginLogo : require(IMAGE_PATH + 'man-user.png'),
  // }
};
export default images;