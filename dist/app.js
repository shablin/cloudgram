const tg  = window.Telegram?.WebApp

if (tg) {
    tg.ready()
    tg.expand()

    applyTheme(tg.themeParams)
    tg.onEvent("themeChanged", () => applyTheme(tg.themeParams))
}

function applyTheme(params) {
    if (!params) return
    const root = document.documentElement
    
    for (const [key, value] of Object.entries(params)) {
        const cssVar = '--tg-theme=' + key.replace(/_/g, '-')
        root.style.setProperty(cssVar, value)
    }
}

async function loadData() {
    console.log('loading user data...')
    try {
        const result = await new Promise((resolve, reject) => {
            Telegram.WebApp.Serverless.call('getUserData', {}, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })

        render(result)
    } catch (e) {
        console.log('cannot load user data', e.message)
    }
}

async function confirm() {
    try {
        const result = await new Promise((resolve, reject) => {
            Telegram.WebApp.Serverless.call('replyUser', {}, (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })

        render(result)
    } catch (e) {
        console.log('cannot repy to user', e.message)
    }

    Telegram.WebApp.close()
}

function render(data) {
    document.getElementById('name').textContent =
        data.user.firstName + (
            data.user.lastName ? ' ' + 
            data.user.lastName : ''
        )

    document.getElementById('username').textContent =
        data.user.username ? '@' + data.user.username : '-'
    
    document.getElementById('userId').textContent = data.user.id
}

document.getElementById('confirm')
        .addEventListener('click', confirm)

loadData()