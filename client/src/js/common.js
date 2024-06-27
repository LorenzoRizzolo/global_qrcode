// export let url = "http://localhost:4305/api"
export const url = window.location.hostname=="localhost"?"http://localhost:4305/api":"http://qrcode.rizzolo.cloud/api"

export function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
