var config = {
  apiKey: "AIzaSyDUkSNLTyYu8s3S5NvmkCm4Wfm5zovdgFQ",
  authDomain: "traintime-f70e4.firebaseapp.com",
  databaseURL: "https://traintime-f70e4.firebaseio.com",
  projectId: "traintime-f70e4",
  storageBucket: "traintime-f70e4.appspot.com",
  messagingSenderId: "150055677072"
};

firebase.initializeApp(config);

const trainData = firebase.database();

$('#addTrain-btn').on('click', function(event) {
  event.preventDefault();

  let trainName = $('#trainName-input').val().trim();
  let destination = $('#destination-input').val().trim();
  let startTime = moment($('#startTime-input').val().trim(), "HH:mm").format();
  let frequency = $('#frequency-input').val();

  let newTrain = {
    name: trainName,
    destination: destination,
    startTime: startTime,
    frequency: frequency
  };

trainData.ref().push(newTrain);

$('#trainName-input').val("");
$('#destination-input').val("");
$('#startTime-input').val("");
$('#frequency-input').val("");

});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

    let trainName = childSnapshot.val().name;
    let destination = childSnapshot.val().destination;
    let frequency = childSnapshot.val().frequency;
    let startTime = childSnapshot.val().startTime;

    let timeConverted = moment(startTime, "HH:mm").subtract(1, "years");
    let timeDifference = moment().diff(moment(timeConverted), "minutes");
    let tRemainder = timeDifference % frequency;
    let minAway = frequency - tRemainder;
    let nextArrival = moment().add(minAway, "minutes").format('hh:mm A');

    $('#schedule').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${nextArrival}</td><td>${minAway}</td>`)
  })

function currentTime() {
  var sec = 1;
  time = moment().format('HH:mm:ss');
  searchTime = moment().format('HH:mm');
    $('#currentTime').html(time);

    t = setTimeout(function() {
      currentTime();
    }, sec * 1000);
}
currentTime();
