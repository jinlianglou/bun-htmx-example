import {renderToString} from 'react-dom/server'

const faces = [
    '/static/images/faces/哎女菩萨.gif',
    '/static/images/faces/把别人棺材抬到自己家里哭.gif',
    '/static/images/faces/大姐我这有礼了.gif',
    '/static/images/faces/多管闲事.gif',
    '/static/images/faces/芳龄多少是否婚配2.gif',
    '/static/images/faces/干脆散伙.gif',
    '/static/images/faces/嗐，你来点实惠的.gif',
    '/static/images/faces/净出馊主意.gif',
    '/static/images/faces/没钱白使唤人.gif',
    '/static/images/faces/你给我多少钱呐.gif',
    '/static/images/faces/你着急走，前面是有你爹还是有你娘啊.gif',
    '/static/images/faces/世上谁嫌男人丑_1.gif',
    '/static/images/faces/小气鬼你.gif',
    '/static/images/faces/噎死你.gif',
    '/static/images/faces/有人吗.gif',
    '/static/images/faces/这种老婆不要也罢.gif',
]

export default function getFace(req: Request): Response{
    const facePath = faces[parseInt(`${Math.random() * faces.length - 1}`, 10)]
    return new Response(renderToString(<Face src={facePath} />))
}

function Face({src}: {src: string}): any{
    return <img id="face" className="mx-auto fadeIn" src={src} />
}