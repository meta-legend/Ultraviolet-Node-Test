const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;


        var finalURL = __uv$config.prefix + __uv$config.encodeUrl(url);
        var newTab = window.open();
        var iframe = newTab.document.createElement("iframe");
        iframe.src = finalURL;
        iframe.allow = "fullscreen";
        iframe.style.height = "100%";
        iframe.style.width = "100%";
        iframe.style.border = "none";
        newTab.document.body.appendChild(iframe);
    });
});

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};
