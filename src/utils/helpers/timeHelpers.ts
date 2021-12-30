export const renderTime = (
  sessions: number,
  pomodorosMin: number,
  finishTime: { sec: number; min: number },
) => {
  //COUNT
  const sessionsSecs = sessions * pomodorosMin * 60;
  let secInMin = 0;
  let secs = 0;
  if (finishTime.min > 0) {
    secInMin = (pomodorosMin - finishTime.min) * 60 - finishTime.sec;
  } else {
    if (finishTime.sec > 0) {
      secs = 60 - finishTime.sec;
    }
  }

  const workedTimeInSec = sessionsSecs + secInMin + secs;
  const hours = Math.floor(workedTimeInSec / 60 / 60);
  const mins = Math.floor((workedTimeInSec / 60) % 60);
  const seconds = Math.floor(workedTimeInSec % 60);
  //FORMAT
  let time = '';
  if (hours > 0) {
    time = hours + 'h ';
  }
  if (mins > 0) {
    time = time + mins + 'min ';
  }
  if (seconds > 0) {
    time = time + seconds + 'sec';
  }
  return {
    time,
  };
};

export const renderPostTime = (timestamp: Date) => {
  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  //TODAY TIME VARIABLES
  const currentDate = new Date();
  // const currentHrs = currentDate.getHours();
  // const currentMins = currentDate.getMinutes();
  const currentYear = currentDate.getFullYear();
  const currentMonth = monthsNames[currentDate.getMonth()];
  const currentDay = currentDate.getDate();

  //POST TIME VARIABLES
  const postDate = new Date(timestamp);
  const postYear = postDate.getFullYear();
  const postMonth = monthsNames[postDate.getMonth()];
  const postDay = postDate.getDate();

  const postHrs = postDate.getHours();
  const postMins = postDate.getMinutes();

  const formatedHrs = postHrs < 10 ? '0' + postHrs : postHrs;
  const formatedMins = postMins < 10 ? '0' + postMins : postMins;

  let timeString = '';

  if (
    postYear === currentYear &&
    postMonth === currentMonth &&
    postDay === currentDay
  ) {
    timeString = 'Today at ' + formatedHrs + ':' + formatedMins;
  } else if (
    postYear === currentYear &&
    postMonth === currentMonth &&
    currentDay - postDay === 1
  ) {
    timeString = 'Yesterday at ' + formatedHrs + ':' + formatedMins;
  } else {
    timeString =
      postMonth + ' ' + postDay + ' at ' + formatedHrs + ':' + formatedMins;
  }
  return timeString;
};
