# bun-htmx-example

## 此项目是使用Bun 搭建的server,可以处理接口，html, 及其它静态资源。其中写了两个页面，两个接口。html中使用的htmx(https://htmx.org/docs)框架，接口返回html片段。

### 电脑上先有docker

1、进入项目目录运行如下：

```bash
docker build -t mybun:latest .
```

2、 To install dependencies:

```bash
bun install
```

3、run bun container: (记得把"C:\Users\ljl\test\bun-htmx-example"替换成你磁盘上的项目路径)

```bash
docker -p 3000:3000 -v C:\Users\ljl\test\bunproject:/home/bun/app mybun:latest
```

4、访问 http://localhost:3000

