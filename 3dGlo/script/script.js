
window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  const qs = document.querySelector.bind(document);
  const qsAll = document.querySelectorAll.bind(document);
  // Timer
  function countTimer(deadline) {
    let timerHours = qs('#timer-hours'),
    timerMinutes = qs('#timer-minutes'),
    timerSecond = qs('#timer-seconds');

    function getTimeReamaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60).toString(),
          minutes = Math.floor((timeRemaining / 60) % 60).toString(),
          hours = Math.floor(timeRemaining / 60 / 60).toString();
          if(hours.length < 2) {
            hours = '0' +  hours;
          }
          if(minutes.length < 2) {
            minutes = '0' +  minutes;
          }
          if(seconds.length < 2){
            seconds = '0' + seconds;
          }
          
          return {timeRemaining, hours, minutes, seconds};
          
    }
    function updateCLock() {
      let timer = getTimeReamaining();
        if(timer.timeRemaining > 0) {
          timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSecond.textContent = timer.seconds; 
        }else {
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSecond.textContent = '00';
          clearInterval(interval);
        }  
    } 
  let interval = setInterval(updateCLock, 1000);
    updateCLock();
  }
  
  countTimer('4 dec 2019');



});
