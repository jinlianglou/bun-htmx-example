import api from "./apis";

Bun.serve({
    async fetch(req: Request): Promise<Response> {
        const url = new URL(decodeURIComponent(req.url))
        const pathname = decodeURIComponent(url.pathname)
        console.log(`pathname: ${pathname}`)
        if(/^(?:\/static\/)/.test(pathname)){
            return staticFiles(req, pathname);
        } else if(/^\/api\//.test(pathname)){
            const apiMethod = pathname.replace(/^\/api\//, '');
            console.log(`请求的方法是：api.${req.method}.${apiMethod}`)
            if(!api[req.method][apiMethod]){
                throw new Error('找不到接口，请检查')
            } else {
                const res = await api[req.method][apiMethod](req);
                return res;
            }
        } else {
            return pages(req, pathname);
        }
        // return new Response('no match router');
    },
    error(error){
        return new Response(error.message, {status: 500})
    }
})
/**
 * 页面
 */
function pages(req: Request, pathname: string) : Response{
    if(pathname === '' || pathname === '/'){
        return new Response(Bun.file(`${import.meta.dir}/pages/index.html`))
    }
    return new Response(Bun.file(`${import.meta.dir}/pages${pathname}.html`))
}
/**
 * 静态资源
 */
function staticFiles(req: Request, pathname: string): Response {
    return new Response(Bun.file(`${decodeURIComponent(pathname).replace(/^\//, '')}`))
}