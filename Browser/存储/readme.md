# 前端存储

- cookie
    - cookies缺点有在请求头上带着数据，大小是4k之内。主Domain污染。
    - 对于IE浏览器有UserData，大小是64k,只有IE浏览器支持。
- localstorage（本地存储）
    - localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。
- sessionstorage（本地存储）
    - sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除。存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。
- applicaiton cache（离线缓存）
    - 配置manifest文件
        - manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）
        - manifest 文件可分为三个部分：
            - ①CACHE MANIFEST – 在此标题下列出的文件将在首次下载后进行缓存
            - ②NETWORK – 在此标题下列出的文件需要与服务器的连接，且不会被缓存
            - ③FALLBACK – 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）
    - 服务器上：manifest文件需要配置正确的MIME-type，即 “text/cache-manifest”。
- IndexDB（索引数据库）

**注意：本地存储是对字符串的存储**