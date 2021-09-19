有这样的一个很有意思的问题，css 有子孙选择器，有兄弟选择器，但是就是没有父级选择器，这为啥呢：

浏览器解析HTML文档的时候，是从前到后，由外及里的，所以我们会经常看到先出现头部信息，然后主体内容再加载的情况。如果出现了父选择器，那么就需要所有的子元素加载完毕才能渲染 HTML 文档，因为是父选择器嘛，所以是要求子元素全部加载完，才能去影响父元素。那么这样的话就会出现很大的渲染压力，特别是网络不好的时候，浏览器会出现很大的白板。页面的可访问性大大的降低了。