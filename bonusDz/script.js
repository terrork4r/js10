window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  const qs = document.querySelector.bind(document),
        qsAll = document.querySelectorAll.bind(document);

  let welcome = qs('#welcome'),
      weekDay = qs('#weekDay');
      
  let timerHours = qs('#timer-hours'),
      timerMinutes = qs('#timer-minutes'),
      timerSeconds = qs('#timer-seconds');

  let daysNewYear = qs('#daysNewYear'),
      dateNewYear = new Date(2020, 0, 1);
  
  function upgrade() {
    let dateNow = new Date(),
      weekDay = dateNow.getDay().toString(),
      hours = dateNow.getHours().toString(),
      minutes = dateNow.getMinutes().toString(),
      seconds = dateNow.getSeconds().toString(),
      getTimeNow = dateNow.getTime();
    
      if(hours.length < 2) {
        hours = '0' +  hours;
      }
      if(minutes.length < 2) {
        minutes = '0' +  minutes;
      }
      if(seconds.length < 2){
        seconds = '0' + seconds;
      }
      return {weekDay, hours, minutes, seconds, getTimeNow};
  }   

  function welcomes() {
    let welcomesUpgrade = upgrade();
    if(welcomesUpgrade.hours < 12 && welcomesUpgrade.hours > 6) {
      welcome.textContent = 'Доброе утро';
    }else if(welcomesUpgrade.hours > 12 && welcomesUpgrade.hours < 18) {
      welcome.textContent = 'Добрый день';
    }else{
      welcome.textContent = 'Доброй ночи';
    }
    setTimeout(welcomes, 360000);
  }
  function weekDays() {
    let timeUpgrade = upgrade();
    if(timeUpgrade.weekDay == 0){
      weekDay.textContent = 'воскресенье';
    }else if(timeUpgrade.weekDay == 1){
      weekDay.textContent = 'понедельник';
    } else if(timeUpgrade.weekDay == 2){
      weekDay.textContent = 'вторник';
    } else if(timeUpgrade.weekDay == 3){
      weekDay.textContent = 'среда';
    } else if(timeUpgrade.weekDay == 4){
      weekDay.textContent = 'четверг';
    } else if(timeUpgrade.weekDay == 5){
      weekDay.textContent = 'пятница';
    } else if(timeUpgrade.weekDay == 6){
      weekDay.textContent = 'суббота';
    }
    setTimeout(weekDays, 360000);
  }

  function time() {
    let timeUpgrade = upgrade();
    timerHours.textContent = timeUpgrade.hours;
    timerMinutes.textContent = timeUpgrade.minutes;
    timerSeconds.textContent = timeUpgrade.seconds;
  }

  function newYear() {
    let daysUpgrade = upgrade();
    dateNewYear = dateNewYear.getTime();
    daysNewYear.textContent = Math.floor((dateNewYear - daysUpgrade.getTimeNow) / 1000 / 60 / 60 / 24);
    setTimeout(newYear, 360000);
  }
  welcomes();
  weekDays();
  setInterval(time, 1000);
  newYear();
});