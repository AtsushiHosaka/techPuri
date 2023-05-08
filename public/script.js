const video = document.getElementById("video")
var stream;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false,
}).then(stream => {
  stream = stream;
  video.srcObject = stream;
  video.play()
}).catch(e => {
  console.log(e)
})

function takePhoto() {
  setTimeout(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var w = video.offsetWidth;
    var h = video.offsetHeight;
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    ctx.drawImage(video, 0, 0, w, h);
    canvas.toBlob(function (blob) {

      const inputFile = document.getElementById('file');
      inputFile.value = canvas.toDataURL("image/jpeg");

    }, 'image/jpeg', 0.95);
  }, 0); //delay
}

function countdown() {
  var timer = document.getElementById("timer");

  timer.innerText = "3"

  setTimeout(function() {
    timer.innerText = "2"
  }, 1000);

  setTimeout(function() {
    timer.innerText = "1"
  }, 2000);
}

const form = document.getElementById('takePhotoForm');
form.addEventListener('submit', event => {
  // イベントを停止する
  event.preventDefault();

  // なんかの処理
  takePhoto();
  // 改めてsubmitする
  setTimeout(function () {
    form.submit();
  }, 3000);
});