/**
 * Created by Wenyang on 7/28/15.
 */

//调用face++ api
function getFaceLandmark(dataurl, callback){
  var imgData = dataURLtoBlob(dataurl),
      apiURL = "https://apicn.faceplusplus.com/v2/",
      apiKey = "7ef2f0af249e09b2e84937b67cc8d90b",
      apiSecret = "D0iCGD_Z4GlwNIY6KtzmDf3Zo5cALkFR";
  /*
   new FacePP('0ef14fa726ce34d820c5a44e57fef470', '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD');
   * */
  var data4faceAPI = {
    imgData: imgData,
    apiURL: apiURL,
    apiKey: apiKey,
    apiSecret: apiSecret
  }
  getFaceLandmarkFromImage(data4faceAPI,function(result){
    callback(result);
  });
}

//计算眼值
function beautyScore(landmarks){
  var eyeWidth = (disPoint2Point(landmarks['left_eye_left_corner'],landmarks['left_eye_right_corner'])
              + disPoint2Point(landmarks['right_eye_left_corner'],landmarks['right_eye_right_corner']))/2;
  var eyeHeight = (disPoint2Point(landmarks['left_eye_top'],landmarks['left_eye_bottom'])
              + disPoint2Point(landmarks['right_eye_top'],landmarks['right_eye_bottom']))/2;
  var faceWith = disPoint2Point(landmarks['contour_left1'],landmarks['contour_right1']);
  var eyeBrowWidth =(disPoint2Point(landmarks['left_eyebrow_left_corner'],landmarks['left_eyebrow_right_corner'])
              + disPoint2Point(landmarks['right_eyebrow_left_corner'],landmarks['right_eyebrow_right_corner']))/2;
  var eyeBrowHeigth = ((disPoint2Point(landmarks['left_eyebrow_upper_left_quarter'],landmarks['left_eyebrow_lower_left_quarter'])
              +disPoint2Point(landmarks['left_eyebrow_upper_middle'],landmarks['left_eyebrow_lower_middle'])
              +disPoint2Point(landmarks['left_eyebrow_upper_right_quarter'],landmarks['left_eyebrow_lower_right_quarter']))/3
          +(disPoint2Point(landmarks['right_eyebrow_upper_left_quarter'],landmarks['right_eyebrow_lower_left_quarter'])
              +disPoint2Point(landmarks['right_eyebrow_upper_middle'],landmarks['right_eyebrow_lower_middle'])
              +disPoint2Point(landmarks['right_eyebrow_upper_right_quarter'],landmarks['right_eyebrow_lower_right_quarter']))/3)/2;
  var disBetweenEyes = disPoint2Point(landmarks['left_eye_right_corner'],landmarks['right_eye_left_corner']);
  var disEye2Eyebrow = (disPoint2Point(landmarks['left_eyebrow_upper_middle'],landmarks['left_eye_bottom'])
              +disPoint2Point(landmarks['right_eyebrow_upper_middle'],landmarks['right_eye_bottom']))/2;
  a_b = Math.pow(Math.abs((eyeHeight/eyeWidth)-0.4778)/1,2);
  a_c = Math.pow(Math.abs((eyeHeight/disEye2Eyebrow)-0.3876)/0.125,2);
  b_d = Math.pow(Math.abs((eyeWidth/disBetweenEyes)-0.8426)/0.5,2);
  e_a = Math.pow(Math.abs((eyeBrowHeigth/eyeHeight)-0.5271)/0.25,2);
  b_g = Math.pow(Math.abs((eyeWidth/faceWith)-0.2109)/0.0725,2);
  b_f = Math.pow(Math.abs((eyeWidth/eyeBrowWidth)-0.6981)/0.125,2);
  if(a_b > 1){ a_b = 1}
  if(a_c > 1){ a_c = 1}
  if(b_d > 1){ b_d = 1}
  if(e_a > 1){ e_a = 1}
  if(b_g > 1){ b_g = 1}
  if(b_f > 1){ b_f = 1}

  return 1 - (4*a_b+3*a_c+2*b_d+8*e_a+2*b_g+4*b_f)/23;

}

//计算脸部各点的坐标
function getFaceLandmarkFromImage(data4faceAPI, callback){
  var api = new FacePP(data4faceAPI.apiKey,data4faceAPI.apiSecret);
  api.request('detection/detect', {
    img: data4faceAPI.imgData
  }, function (err, result) {
    if (err) {
      alert("亲，请上传图片") ;
      return;
    }
    if (result['face'].length >1) {
      alert("亲，请传单人照")
    }
    else if(result['face'].length  == 0){
      alert("啊哦，请上传正面人脸，让我看到囧囧双眼~");
    }
    else {
      face = result['face'][0]['position'];
      face_id = result['face'][0]['face_id'];
      api.request('detection/landmark', {
        face_id: face_id
      }, function (err, result) {
        callback(result);
      });
    }
  });
}

//计算两眼的高度、宽度、中心点和角度
function calEyeRectangle(landmarks,callback){
  var rect = {};
  var center = [(landmarks["left_eye_left_corner"]["x"]+landmarks["left_eye_right_corner"]["x"]+landmarks["right_eye_left_corner"]["x"]+landmarks["right_eye_right_corner"]["x"])/4,
    (landmarks["left_eye_left_corner"]["y"]+landmarks["left_eye_right_corner"]["y"]+landmarks["right_eye_left_corner"]["y"]+landmarks["right_eye_right_corner"]["y"])/4];
  var length = Math.sqrt(Math.pow(landmarks["left_eye_left_corner"]["x"] - landmarks["right_eye_right_corner"]["x"],2)+
  Math.pow(landmarks["left_eye_left_corner"]["y"] - landmarks["right_eye_right_corner"]["y"],2));
  var width = Math.max(Math.sqrt(Math.pow(landmarks["left_eye_top"]["x"] - landmarks["left_eye_bottom"]["x"],2)+
  Math.pow(landmarks["left_eye_top"]["y"] - landmarks["left_eye_bottom"]["y"],2)),
      Math.sqrt(Math.pow(landmarks["right_eye_top"]["x"] - landmarks["right_eye_bottom"]["x"],2)+
  Math.pow(landmarks["right_eye_top"]["y"] - landmarks["right_eye_bottom"]["y"],2)));
  var rotation = Math.atan2(Math.abs(landmarks["right_eye_right_corner"]["x"]-landmarks["left_eye_left_corner"]["x"]),
      Math.abs(landmarks["right_eye_right_corner"]["y"]-landmarks["left_eye_left_corner"]["y"]));
  rect = {
    center: center,
    length: length,
    width: width,
    rotation: rotation
  }
  callback(rect);

}

//将canvas转化的图片转化为blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

//计算两点之间的距离
function disPoint2Point(point1,point2){
  return Math.sqrt(Math.pow(point1['x']-point2['x'],2)+Math.pow(point1['y']-point2['y'],2));
}