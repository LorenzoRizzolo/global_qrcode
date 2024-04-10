
export function generaToken(lunghezza=20) {
    const caratteri = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < lunghezza; i++) {
      const indiceCasuale = Math.floor(Math.random() * caratteri.length);
      token += caratteri.charAt(indiceCasuale);
    }
    return token
}

export function data(){
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1; // Note: Months are zero-based (0-11)
  var currentDay = currentDate.getDate();
  var data = currentYear + '/' + currentMonth + '/' + currentDay
  return data
}

export function ora(){
  var currentDate = new Date();
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  var currentSeconds = currentDate.getSeconds();
  var ora = currentHours + ':' + currentMinutes + ':' + currentSeconds
  return ora
}