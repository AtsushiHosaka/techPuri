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


      // // inputFile.value = blob;

      // var img = document.getElementById('image');
      // img.src = window.URL.createObjectURL(blob);



      // $.ajax({
      //   type: "POST",
      //   url: "/takePicture",
      //   data: {
      //     "file": inputFile.value
      //   }
      // });
    }, 'image/jpeg', 0.95);
    // stream.getTracks()[0].stop();
  }, 0); //delay
}

// jQuery( funciton( $ ) {
//   // form が submit されたとき
//   var form = $( 'form' );
//   form.submit( function( e ) {
//       // 何か処理をする
//       hoge();
//       fuga();
//       // 一旦 submit を止める
//       p.preventDefault();
//       // submit を遅らせて実行
//       setTimeout( function() {
//           form.off( 'submit' );
//           form.submit();
//       }, 300 );
//   } );
// } );

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


// $(function () {
//   var form = $('form');
//   form.submit(function (e) {
//     // 何か処理をする
//     takePhoto();
//     // 一旦 submit を止める
//     form.preventDefault();
//     // submit を遅らせて実行
//     setTimeout(function () {
//       form.off('submit');
//       form.submit();
//     }, 3000);
//   });
// });

// function takePhotoButtonPressed() {
//     takePhoto();

//     $.ajax({
//         type: "POST",
//         url: "/takePicture",
//         data: {
//           "value": value
//         }
//       }).then(
//         // success
//         function (data) {
//             alert(data);
//         },
//         // error
//         function (edata) {
//             console.log(edata);
//             alert(edata.responseText);
//         }
//       );
// }