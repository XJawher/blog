**缘起**
和朋友在聊天的时候，说起 setTimeout 和 setInterval 这俩的最短执行间隔，在 mdn 上找到的文档显示是 4ms，然后就想到能不能找到一个方法，让 setTimeout 能够立即执行的，还真找到一个方案 [立即执行的 setTimeout](https://dbaron.org/log/20100309-faster-timeouts)，就是使用 postMessage 去传递数据。

```js
(function() {
    var timeouts = [];
    var messageName = "zero-timeout-message";

    function setZeroTimeout(fn) {
        timeouts.push(fn);
        window.postMessage(messageName, "*");
    }

    function handleMessage(event) {
        if (event.source == window && event.data == messageName) {
            event.stopPropagation();
            if (timeouts.length > 0) {
                var fn = timeouts.shift();
                fn();
            }
        }
    }

    window.addEventListener("message", handleMessage, true);

    window.setZeroTimeout = setZeroTimeout;
})();
```