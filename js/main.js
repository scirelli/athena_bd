(function(){
'use strict';
    const BIRTHDAY = 'Fri Dec 23 2016 05:30:00 GMT-0500 (EST)',
          ONE_SECOND  = 1000,
          INTERVAL    = ONE_SECOND,
          MS_IN_SEC   = 1000,
          SEC_IN_MIN  = 60,
          MIN_IN_HOUR = 60,
          HOUR_IN_DAY = 24,
          DAY_IN_YEAR = 365;

    const time           = document.querySelector('.time'),
          years          = time.querySelector('.years .value'),
          yearsUnit      = time.querySelector('.years .unit'), 
          months         = time.querySelector('.months .value'),
          monthsUnit     = time.querySelector('.months .unit'), 
          days           = time.querySelector('.days .value'),
          daysUnit       = time.querySelector('.days .unit'),
          hours          = time.querySelector('.hours .value'),
          hoursUnit      = time.querySelector('.hours .unit'),
          minutes        = time.querySelector('.minutes .value'),
          minutesUnit    = time.querySelector('.minutes .unit'),
          seconds        = time.querySelector('.seconds .value'),
          secondUnit     = time.querySelector('.seconds .unit');

    const athenaBirthdayInMS = (new Date(BIRTHDAY)).getTime();
    
    function displayTime(timeBlock, referenceDateInMS) {
       var todayInMS      = (new Date()).getTime(),
           differenceInMs = todayInMS - referenceDateInMS,
           dDays          = differenceInMs/MS_IN_SEC/SEC_IN_MIN/MIN_IN_HOUR/HOUR_IN_DAY,
           dYears         = dDays/DAY_IN_YEAR,
           displayYears   = ~~dYears,
           displayDays, hHours, displayHours, mMins, displayMinutes, sSecs, displaySeconds;
        
        dDays          = (dYears-displayYears) * DAY_IN_YEAR;
        displayDays    = ~~displayDays;
        hHours         = (dDays-displayDays)*HOUR_IN_DAY;
        displayHours   = ~~hHours;
        mMins          = (hHours-displayHours)*MIN_IN_HOUR;
        displayMinutes = ~~mMins;
        sSecs          = (mMins-displayMinutes)*SEC_IN_MIN;
        displaySeconds = ~~sSecs;

        years.innerHTML = displayYears;

        pluralize(yearsUnit, displayYears);

        months.innerHTML = displayMonths;
        pluralize(monthsUnit, displayMonths);

        days.innerHTML = displayDays;
        pluralize(daysUnit, displayDays);

        hours.innerHTML = displayHours;
        pluralize(hoursUnit, displayHours);

        minutes.innerHTML = displayMinutes;
        pluralize(minutesUnit, displayMinutes);

        seconds.innerHTML = displaySeconds;
        pluralize(secondUnit, displaySeconds);

        function pluralize(element, value){
            if(value > 1 || value == 0){
                element.classList.add('plural');
            }else{
                element.classList.remove('plural');
            }
        }
    }
    
    function run(time, athenaBirthdayInMS){
        displayTime(time, athenaBirthdayInMS);

        setTimeout(function(){
            run(time, athenaBirthdayInMS);
        }, INTERVAL);
    }

    run(time, athenaBirthdayInMS);
})();
