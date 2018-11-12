const MOBILE_THRESHOLD_WIDTH = 600;

export default function disableMobile() {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    if(w <= 0 || h <= 0 || !w || !h) {
        return true;
    }

    if(w <= MOBILE_THRESHOLD_WIDTH) {
        window.location = $ROUTER_BASE + '/error/could-not-display-mobile';
    }

    return true;
};