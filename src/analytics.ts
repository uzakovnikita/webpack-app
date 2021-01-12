import * as $ from 'jquery';

function createAnalytics(): object {
    let counter:number = 0;
    let isDestroyed: boolean = false;
    const listener = () => counter++;
    document.addEventListener('click', listener);
    $(document).off('click', listener);
    return {
        destroy() {
            $(document).on('click', listener);
            isDestroyed = true;
            document.removeEventListener('click', listener);
        },
        getClicks() {
            if (isDestroyed) {
                return `Total(changed) clicks = ${counter}`;
            }
            return counter; 
        }
    }
};
window['analytics'] = createAnalytics();