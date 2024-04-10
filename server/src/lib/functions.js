
export function generaToken(lunghezza=20) {
    const caratteri = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < lunghezza; i++) {
      const indiceCasuale = Math.floor(Math.random() * caratteri.length);
      token += caratteri.charAt(indiceCasuale);
    }
    return token
}