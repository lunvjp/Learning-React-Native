import images from './images';

export const messagesReportItems = [
  {
    type : 'police',
    backgroundColor : '',
    logoImage : images.ButtonScreen.police,
    message : {
      success : 'Bạn vừa báo cáo thành công vị trí trạm Công An. Cảm ơn đóng góp của bạn !',
      fail : 'Thông báo thất bại cho Công An'
    }
  },
  {
    type : 'map',
    backgroundColor : '',
    message : {
      success : 'Thông báo thành công cho Bản đồ',
      fail : 'Thông báo thất bại cho Bản đồ'
    }
  },
  {
    type : 'traffic',
    backgroundColor : '',
    logoImage : images.ButtonScreen.trafficLight,
    message : {
      success : 'Thông báo thành công cho Kẹt xe',
      fail : 'Thông báo thất bại cho Kẹt xe'
    }
  }
];