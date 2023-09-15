# bun-htmx-example

## 此项目是使用Bun 搭建的serve,可以处理接口，html, 及其它静态资源。其中写了两个页面，两个接口。html中使用的[htmx框架](https://htmx.org/docs)，接口返回html片段。

### 电脑上先有docker

1、进入项目目录运行如下：

```bash
docker build -t mybun:latest .
```

2、run bun container: (记得把"C:\Users\ljl\test\bun-htmx-example"替换成你磁盘上的项目路径)

```bash
docker run --restart=always -p 3000:3000 -v C:\Users\ljl\test\bunproject:/home/bun/app mybun:latest
```

4、访问 http://localhost:3000


### index.tsx

```typescript
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
```

