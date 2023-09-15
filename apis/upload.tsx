
import { renderToString } from "react-dom/server";
interface Data extends FormData {
    file?: Blob
}


export default async function upload(req: Request) : Promise<Response>{
    const data: Data = await req.formData();
    const file = data.get('file');
    console.log(data);
    if(file) {
        if(file?.type){
            // 图片类型
            if(/image\/(png|jpg|gif|svg)/.test(file?.type)){
                const [_,ext] = file?.type?.match(/image\/(png|jpg|gif|svg)/);
                const createFileName = `/static/images/${Date.now()}.${ext}`
                await Bun.write(`${process.cwd()}${createFileName}`, file)
                return new Response(renderToString(<Image src={createFileName}></Image>))
            } else {
                throw new Error('只支持png,jpg,gif,svg 四种文件类型')
            }
        } else {
            throw new Error('不能识别的文件类型')
        }
        
    } else {
        throw new Error('未取得file')
    }
}

function Image({src}: {src: string}): any{
    return <img id="preview" className="max-w-full" src={src} />
}