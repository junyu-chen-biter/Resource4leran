# 浪花索引站

一个可直接挂载到 GitHub Pages 的静态网址导航页，风格为海边漫画感的淡蓝小清新视觉。

## 项目结构

- `index.html`：页面结构与入口
- `styles.css`：视觉样式与动效
- `links-data.js`：网址索引数据
- `script.js`：分类筛选与搜索渲染逻辑

## 如何修改内容

你日常只需要改一个文件：`links-data.js`。

数据结构如下：

```js
{
  id: "分类唯一ID",
  title: "分类名",
  description: "分类描述",
  links: [
    {
      name: "网站名",
      url: "https://example.com",
      description: "一句话介绍",
      tags: ["标签1", "标签2"]
    }
  ]
}
```

你可以：

- 新增分类对象
- 在某个分类里新增链接
- 调整分类顺序与链接顺序
- 修改标题、描述、标签

## 本地预览

在项目根目录运行：

```bash
python -m http.server 5500
```

浏览器打开：

`http://localhost:5500`

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库根目录
2. 打开仓库 `Settings` → `Pages`
3. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`（或你使用的分支）
   - `Folder`: `/ (root)`
4. 保存后等待几十秒到几分钟
5. 访问生成地址：
   - `https://你的用户名.github.io/你的仓库名/`

如果仓库名是 `你的用户名.github.io`，访问地址就是：

`https://你的用户名.github.io/`
