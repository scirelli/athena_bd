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

    var athenaBirthdayInMS = (new Date(BIRTHDAY)).getTime(),
        time               = document.querySelector('.time');
    
    function displayTime(timeBlock, referenceDateInMS) {
        var years          = timeBlock.querySelector('.years .value'),
            yearsUnit      = timeBlock.querySelector('.years .unit'), 
            days           = timeBlock.querySelector('.days .value'),
            daysUnit       = timeBlock.querySelector('.days .unit'),
            hours          = timeBlock.querySelector('.hours .value'),
            hoursUnit      = timeBlock.querySelector('.hours .unit'),
            minutes        = timeBlock.querySelector('.minutes .value'),
            minutesUnit    = timeBlock.querySelector('.minutes .unit'),
            seconds        = timeBlock.querySelector('.seconds .value'),
            secondUnit     = timeBlock.querySelector('.seconds .unit'),
            todayInMS      = (new Date()).getTime(),
            differenceInMs = todayInMS - referenceDateInMS,
            dDays          = differenceInMs/MS_IN_SEC/SEC_IN_MIN/MIN_IN_HOUR/HOUR_IN_DAY,
            displayDays    = ~~dDays,
            dYears         = dDays/DAY_IN_YEAR,
            displayYears   = ~~dYears,
            hHours         = (dDays-displayDays)*HOUR_IN_DAY,
            displayHours   = ~~hHours,
            mMins          = (hHours-displayHours)*MIN_IN_HOUR,
            displayMinutes = ~~mMins,
            sSecs          = (mMins-displayMinutes)*SEC_IN_MIN,
            displaySeconds = ~~sSecs;
        
        years.innerHTML = displayYears;
        pluralize(yearsUnit, displayYears);

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
