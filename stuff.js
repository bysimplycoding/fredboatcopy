const text = document.querySelector('.text');
const copy = document.querySelector('.copy');


let ytBoiler = 'https://www.youtube.com/watch?v=';
let id, url;

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}

function invalid() {
    text.value = '--invalid site';
}
function fbBoiler(vid) {
    text.value = `;;play ${ytBoiler}${vid}`;
}
function grabID(link) {
    id = link.substring(link.indexOf('=') + 1, link.length - 1)
    if (id.includes('&')){
        id = id.substring(0, id.indexOf('&'))
    }
    fbBoiler(id)
}

async function yes(e) {
    e.preventDefault();
    url = await getCurrentTab()
        .then(res => {
            if (res.includes('youtube.com')) {
                grabID(res)
            } else {
                invalid()
            }
        })
}

copy.addEventListener('click', yes);