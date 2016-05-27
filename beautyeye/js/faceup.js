/**
 * Created by maniauuuuu on 7/24/15.
 */
var uploadPhoto;
var uploadPhotoX;
var uploadPhotoY;
var eyeLength;
var eyeHeight;
var imgRotation = 0;
var eyeX;
var eyeY;
var canvas = document.getElementById("canvas");
var canvas3 = document.getElementById("canvas3");
var canvas4 = document.getElementById("canvas4");
var uploadPhotoimg = document.getElementById("fileFaceImage");
var realUploadBtn = document.getElementById("upload1");
var reuploaddivimg = document.getElementById("reuploaddiv-img");
var reuploadbtn = document.getElementById("reupload-btn");
var upload1img = document.getElementById("upload1-img");
var privacy = document.getElementById("privacy");
var face = document.getElementById("face");
var confirm = document.getElementById("confirm-btn");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext('2d');
var ctx3 = canvas3.getContext('2d');
var ctx4 = canvas4.getContext('2d');
var ratio = 1;
var zoom = 1;
var beautypoints;
var points = document.getElementById('points');
var rate = document.getElementById('rate');
var resultb;
var line = document.getElementById('line');
var body = document.getElementById('body');
var sharebtn = document.getElementById('sharebtn');
var mask = document.getElementById(df


    //点击图片上传头像
    var previewFile =function loadImage() {
        var file = uploadPhotoimg.files[0];
        EXIF.getData(file, function() {
            imgRotation = 0;
            var orientation = EXIF.getTag(this, 'Orientation');
            switch(orientation) {
                case 3:
                    imgRotation = 180;
                    break;
                case 6:
                    imgRotation = 90;
                    break;
                case 8:
                    imgRotation = 270;
                    break;
            }
        });
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function(fe){
            var result = this.result;
            uploadPhoto = new Image();
            uploadPhoto.onload = function() {
                calculateDefault();
                drawUpLoadPhoto();
                calculateDefault3();
                drawUpLoadPhoto3();
            };
            uploadPhoto.src = result;
            reuploaddivimg.style.display = 'block';
            upload1img.style.display = 'none';
            face.style.opacity = '0';
            realUploadBtn.style.display = 'none';
            privacy.style.display = 'none';
        };
    }

if asb {
    
}
//上传按钮
var previewFile2 = function loadImage() {
    var file = realUploadBtn.files[0];
    EXIF.getData(file, function() {
        imgRotation = 0;
        var orientation = EXIF.getTag(this, 'Orientation');
        switch(orientation) {
            case 3:
                imgRotation = 180;
                break;
            case 6:
                imgRotation = 90;
                break;
            case 8:
                imgRotation = 270;
                break;
        }
    });
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function(fe){
        var result = this.result;
        uploadPhoto = new Image();
        uploadPhoto.onload = function() {
            calculateDefault();
            drawUpLoadPhoto();
            calculateDefault3();
            drawUpLoadPhoto3();
        };
        uploadPhoto.src = result;
        reuploaddivimg.style.display = 'block';
        upload1img.style.display = 'none';
        face.style.opacity = '0';
        realUploadBtn.style.display = 'none';
        privacy.style.display = 'none';
    };
}


//重新上传按钮
var previewFile3 = function reloadImage() {
    var file = reuploadbtn.files[0];
    var url = window.URL.createObjectURL(file);
    console.log(url);
    EXIF.getData(file, function() {
        imgRotation = 0;
        var orientation = EXIF.getTag(this, 'Orientation');
        switch(orientation) {
            case 3:
                imgRotation = 180;
                break;
            case 6:
                imgRotation = 90;
                break;
            case 8:
                imgRotation = 270;
                break;
        }
    });
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function(fe){
        var result = this.result;
        uploadPhoto = new Image();
        uploadPhoto.onload = function() {
            calculateDefault();
            drawUpLoadPhoto();
            calculateDefault3();
            drawUpLoadPhoto3();
        };
        uploadPhoto.src = result;
    };
}


//在canvas中绘制图片
function calculateDefault() {
    if (uploadPhoto.width < uploadPhoto.height) {
        ratio = canvasWidth / uploadPhoto.width;
    } else {
        ratio = canvasHeight / uploadPhoto.height;
    }
    center();
}
function center() {
    uploadPhotoX = (canvasWidth - uploadPhoto.width * (ratio * zoom)) / 2;
    uploadPhotoY = (canvasHeight - uploadPhoto.height * (ratio * zoom)) / 2;
}
function drawUpLoadPhoto() {
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.scale((ratio * zoom), (ratio * zoom));
    ctx.translate(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2, uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2);
    ctx.rotate((Math.PI / 180) * imgRotation);
    ctx.translate(-(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2), -(uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2));
    ctx.drawImage(uploadPhoto, uploadPhotoX / (ratio * zoom), uploadPhotoY / (ratio * zoom));
    ctx.restore();
}


function calculateDefault3() {
    if (uploadPhoto.width < uploadPhoto.height) {
        ratio = canvas3.width / uploadPhoto.width;
    } else {
        ratio = canvas3.height / uploadPhoto.height;
    }
    center3();
}
function center3() {
    uploadPhotoX = (canvas3.width - uploadPhoto.width * (ratio * zoom)) / 2;
    uploadPhotoY = (canvas3.height - uploadPhoto.height * (ratio * zoom)) / 2;
}
function drawUpLoadPhoto3() {
    ctx3.save();
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.scale((ratio * zoom), (ratio * zoom));
    ctx3.translate(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2, uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2);
    ctx3.rotate((Math.PI / 180) * imgRotation);
    ctx3.translate(-(uploadPhotoX / (ratio * zoom) + uploadPhoto.width / 2), -(uploadPhotoY / (ratio * zoom) + uploadPhoto.height / 2));
    ctx3.drawImage(uploadPhoto, uploadPhotoX / (ratio * zoom), uploadPhotoY / (ratio * zoom));
    ctx3.restore();
}


//确认上传
confirm.onclick = function faceplusana() {

    if (!uploadPhoto) {
        alert("请选择一张图片");
        return;
    }

    //将canvas转化为图片
    var dataurl = canvas3.toDataURL("image/png");
    getFaceLandmark(dataurl, function (result) {
        var faceLandmark = result["result"][0]["landmark"];
        calEyeRectangle(faceLandmark, function (rect) {

            //获取眼部坐标
            eyeX = rect.center[0] * 2.30;
            eyeY = rect.center[1] * 3.10;
            eyeLength = rect.length * 2.30;
            eyeHeight = rect.width * 3.10;
            eyeRatioX = 1 - rect.width / canvas.height;
            eyeRatioY = 1 - rect.length / canvas.width;

            //绘制眼部特效
            drawLine1(40, 60);
            drawLine1(160, 180);
            drawLine2(50, 70);
            drawLine2(170, 190);
            drawLine2(290, 310);
            drawLine3(80, 100);
            drawLine3(200, 220);
            drawLine4(40, 60);
            drawLine4(140, 160);
            drawLine4(240, 260);
            ParamEllipse(eyeX, eyeY, eyeLength * 0.8, eyeHeight * 1.5);
            ctx4.clearRect(0, 0, canvas4.width, canvas4.height);


            //跳至第二页面
            container.style.display = 'none';
            container2.style.display = 'block';

            //生成眼值，调用选择文案函数
            beautypoints = parseInt(beautyScore(faceLandmark) * 100);
            var resultb = Math.floor(beautypoints/5);
            choosetext(resultb);
        });
    });
}



//绘制眼部特效
function drawLine1(borderA, borderB) {
    ctx4.lineWidth = 1;
    ctx4.strokeStyle = "rgba(0,0,0,0.5)";
    ctx4.fillStyle = "rgba(255,255,255,0.5)";
    ctx4.beginPath();
    ctx4.moveTo(borderA, 0);
    ctx4.lineTo(eyeX, eyeY);
    ctx4.lineTo(borderB, 0);
    ctx4.closePath();
    ctx4.fill();
    ctx4.stroke();
}
function drawLine2(borderC, borderD) {
    ctx4.lineWidth = 1;
    ctx4.strokeStyle = "rgba(0,0,0,0.5)";
    ctx4.fillStyle = "rgba(255,255,255,0.5)";
    ctx4.beginPath();
    ctx4.moveTo(0, borderC);
    ctx4.lineTo(eyeX, eyeY);
    ctx4.lineTo(0, borderD);
    ctx4.closePath();
    ctx4.fill();
    ctx4.stroke();
}
function drawLine3(borderE, borderF) {
    ctx4.lineWidth = 1;
    ctx4.strokeStyle = "rgba(0,0,0,0.5)";
    ctx4.fillStyle = "rgba(255,255,255,0.5)";
    ctx4.beginPath();
    ctx4.moveTo(borderE, 510);
    ctx4.lineTo(eyeX, eyeY);
    ctx4.lineTo(borderF, 510);
    ctx4.closePath();
    ctx4.fill();
    ctx4.stroke();
}
function drawLine4(borderG, borderH) {
    ctx4.lineWidth = 1;
    ctx4.strokeStyle = "rgba(0,0,0,0.5)";
    ctx4.fillStyle = "rgba(255,255,255,0.5)";
    ctx4.beginPath();
    ctx4.moveTo(376, borderG);
    ctx4.lineTo(eyeX, eyeY);
    ctx4.lineTo(376, borderH);
    ctx4.closePath();
    ctx4.fill();
    ctx4.stroke();
}


//绘制椭圆
function ParamEllipse(x, y, a, b) {
    ctx4.save();
    //max是等于1除以长轴值a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    var step = (a > b) ? 1 / a : 1 / b;
    ctx4.beginPath();
    ctx4.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step) {
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctx4.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    ctx4.closePath();
    ctx4.clip();
};

//根据评分选择文案
function choosetext(resultb) {
    points.innerHTML = beautypoints+"分";
    switch (resultb) {
        case 0 :
            rate.innerHTML = "<span>死命挣扎还有救</span><br/>目光如此呆滞，专家提示，药不停！还有救！千万别放弃治疗啊！";
            document.title = "电眼迷人指数："+beautypoints+"分。目光如此呆滞，专家提示，药不停！还有救！千万别放弃治疗啊！";
            break;
        case 1 :
            rate.innerHTML = "<span>不懂赏识自己的笨蛋</span><br/>你的眉距和眼距比例堪称perfect！这眼角下垂成雪纳瑞，眉尾上扬的绝壁呀，生活中的你是不是性格分裂的心机狗，为了全人类的安宁，药不能停！";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。你的眉距和眼距比例堪称perfect！这眼角下垂成雪纳瑞，眉尾上扬的绝壁呀，生活中的你是不是性格分裂的心机狗，为了全人类的安宁，药不能停！";
            break;
        case 2 :
            rate.innerHTML = "<span>小沈阳亲兄弟？</span><br/>看你这小眼神，小沈阳都为你捉急了！你造吗？天生不可靠，后天猛改造！";
            document.title = "电眼迷人指数："+beautypoints+"分。看你这小眼神，小沈阳都为你捉急了！你造吗？天生不可靠，后天猛改造！";
            break;
        case 3 :
            rate.innerHTML = "<span>看你这小眼神，小沈阳都为你捉急了！你造吗？天生不可靠，后天猛改造！</span><br/>比起华妃娘娘的白眼，你还得更加用力才能翻出神韵哦~加油！";
            document.title = "电眼迷人指数："+beautypoints+"分。比起华妃娘娘的白眼，你还得更加用力才能翻出神韵哦~加油！";
            break;
        case 4 :
            rate.innerHTML = "<span>骨形凑合拾荒爷爷</span><br/>骚年，你这两个窟窿形状还算标准，眉骨凑合看吧，可是你也太不休边幅了，好歹让它轮廓分明吧。wait睫毛哪里去了？";
            document.title = "电眼迷人指数："+beautypoints+"分。骚年，你这两个窟窿形状还算标准，眉骨凑合看吧，可是你也太不休边幅了，好歹让它轮廓分明吧。wait睫毛哪里去了？";
            break;
        case 5 :
            rate.innerHTML = "<span>深夜禁止出行</span><br/>瞳孔老大老大的，小眼果然聚光，猥琐大叔的眼神被你发挥的淋漓尽致！what are u 弄啥嘞，小女孩都好怕怕~";
            document.title = "电眼迷人指数："+beautypoints+"分。瞳孔老大老大的，小眼果然聚光，猥琐大叔的眼神被你发挥的淋漓尽致！what are u 弄啥嘞，小女孩都好怕怕~";
            break;
        case 6 :
            rate.innerHTML = "<span>眼神装下一切</span><br/>历经沧桑的眉眼，饱受岁月洗礼，犀利如你一看就是个有故事的人，别想隐瞒，双眼告知一切了！";
            document.title = "电眼迷人指数："+beautypoints+"分。历经沧桑的眉眼，饱受岁月洗礼，犀利如你一看就是个有故事的人，别想隐瞒，双眼告知一切了！";
            break;
        case 7 :
            rate.innerHTML = "<span>国民初恋原来是你</span><br/>深情的双眼，留了不少眼泪吧~完胜虐心韩剧女猪脚啊！";
            document.title = "电眼迷人指数："+beautypoints+"分。深情的双眼，留了不少眼泪吧~完胜虐心韩剧女猪脚啊！";
            break;
        case 8 :
            rate.innerHTML = "<span>为你的双眼骄傲</span><br/>明明可以靠才华吃饭，你却偏偏要靠这双萌眼。何必呢？";
            document.title = "电眼迷人指数："+beautypoints+"分。明明可以靠才华吃饭，你却偏偏要靠这双萌眼。何必呢？";
            break;
        case 9 :
            rate.innerHTML = "<span>五官花魁</span><br/>眼睛不大不小，不圆不长，眉毛不粗不细，不淡不浓，都刚刚好。如果有一天遭遇意外，请捂好眼睛！保留点美的东西在这个看脸的时代获救几率更大哦。";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。眼睛不大不小，不圆不长，眉毛不粗不细，不淡不浓，都刚刚好。如果有一天遭遇意外，请捂好眼睛！保留点美的东西在这个看脸的时代获救几率更大哦。";
            break;
        case 10 :
            rate.innerHTML = "<span>俏丽灰姑娘</span><br/>哎呀，眉目清秀可人，眉宇间神气凛凛，很有芙蓉姐姐的即视感呢，黑眼圈去一去啦，初老眼纹涂一涂啦，没钱不是理由，反正我也不会给你。";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。哎呀，眉目清秀可人，眉宇间神气凛凛，很有芙蓉姐姐的即视感呢，黑眼圈去一去啦，初老眼纹涂一涂啦，没钱不是理由，反正我也不会给你。";
            break;
        case 11 :
            rate.innerHTML = "<span>清纯。。。。绿茶</span><br/>乍一看清纯透彻，质朴的心灵窗口很容易卸下陌生人的心房，这可是你的一大社交利器呢。不要盯着别人看超过3s，因为你的眼睛还没睡醒，睡毛睡，快嗨起来！";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。乍一看清纯透彻，质朴的心灵窗口很容易卸下陌生人的心房，这可是你的一大社交利器呢。不要盯着别人看超过3s，因为你的眼睛还没睡醒，睡毛睡，快嗨起来！";
            break;
        case 12 :
            rate.innerHTML = "<span>高能预警请绕行</span><br/>哇！少有的倾城目光！跟馨爷秒杀乃爸的魔性笑眼有一番神似哦~";
            document.title = "电眼迷人指数："+beautypoints+"分。哇！少有的倾城目光！跟馨爷秒杀乃爸的魔性笑眼有一番神似哦~";
            break;
        case 13 :
            rate.innerHTML = "<span>小鲜肉“收割机”</span><br/>也只有你这样的眼神能俘获不少小鲜肉了！预测你的真爱即将到来哟~";
            document.title = "电眼迷人指数："+beautypoints+"分。也只有你这样的眼神能俘获不少小鲜肉了！预测你的真爱即将到来哟~";
            break;
        case 14 :
            rate.innerHTML = "<span>深不可测</span><br/>一汪清泉让人醉";
            line.style.top = "-30px";
            rate.style.top = "-80px";
            document.title = "电眼迷人指数："+beautypoints+"分。一汪清泉让人醉";
            break;
        case 15 :
            rate.innerHTML = "<span>讨喜美目不上镜</span><br/>好一双似喜非喜含情目，浓眉大眼很有福气，职场上很受老虎的青睐呢。为嘛拍照总有一种股民被绿的神情？";
            document.title = "电眼迷人指数："+beautypoints+"分。好一双似喜非喜含情目，浓眉大眼很有福气，职场上很受老虎的青睐呢。为嘛拍照总有一种股民被绿的神情？";
            break;
        case 16 :
            rate.innerHTML = "<span>男神“收割机”</span><br/>哎哟喂！瞧这清澈见底的眼睛，思聪老公都为你倾倒呀，完美！";
            document.title = "电眼迷人指数："+beautypoints+"分。哎哟喂！瞧这清澈见底的眼睛，思聪老公都为你倾倒呀，完美！";
            break;
        case 17 :
            rate.innerHTML = "<span>含情传神眼睛</span><br/>好一双双脉脉含情明眸，目光倾城指数战胜全国85%的眼睛，可是尽管散发出的不是妖娆目光，也没灿若繁星，是水，眼药水。眼保健操从卸妆开始，卸干净，干净。";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。好一双双脉脉含情明眸，目光倾城指数战胜全国85%的眼睛，可是尽管散发出的不是妖娆目光，也没灿若繁星，是水，眼药水。眼保健操从卸妆开始，卸干净，干净。";
            break;
        case 18 :
            rate.innerHTML = "<span>千古傲娇美目</span><br/>标准美目！恭喜你目光倾城指数已击败全国90%的眼睛，眼似金莲，眉若潘安，公主病你值得拥有！众生都该臣服于你傲娇的小眼神，进击吧，千骨。";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。标准美目！恭喜你目光倾城指数已击败全国90%的眼睛，眼似金莲，眉若潘安，公主病你值得拥有！众生都该臣服于你傲娇的小眼神，进击吧，千骨。";
            break;
        case 19 :
            rate.innerHTML = "<span>眼颜爆表</span><br/>OMG，目光倾城指数已爆表，你你你就是我苦觅三千年的 眼神！！！看你一眼就迷陷在桃花源，若异性有幸得你轻瞥必拜倒，敌人和你对视的下场就是尸骨全无啊！";
            line.style.top = "0px";
            document.title = "电眼迷人指数："+beautypoints+"分。OMG，目光倾城指数已爆表，你你你就是我苦觅三千年的 眼神！！！看你一眼就迷陷在桃花源，若异性有幸得你轻瞥必拜倒，敌人和你对视的下场就是尸骨全无啊！";
            break;
    }
}

sharebtn.onclick = function() {
    mask.style.display = 'block';

    mask.onclick = function() {
        mask.style.display = 'none';
    }
}
