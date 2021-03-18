这个是属于前端的问题
## blob 异常
问题是这样的，前端需要请求下载一个文件，在请求的时候需要将 responseType 设置为 blob，当成功的时候后端会返回一个 blob 也就是二进制的大对象，所谓的 binary large object.在前端这块有两个可以用来下载文件处理对象，分别是 ArrayBuffer,Blob 这俩都是二进制的容器。
回到前面的问题，当出现异常的时候，后端会返回一个 json 的对象给我们，但是当浏览器接收完以后会把 json 给转成一个 blob 对象，这样我们拿到的错误消息就是一个 blob，这就是问题。
这个问题有两个解决方案，一个是把 blob 转成 json。另一个是使用 fetch 去请求，请求完成以后当发现是 blob 对象的时候判断一下，然后自己转成 json。

## fetch 请求方案
```js
    fetchOptions(method: string, params?, responseType = '') {
        const access_token = this.cookieService.get('access_token');
        const token_type = this.cookieService.get('token_type');
        const Authorization = `Authorization ${token_type} ${access_token}`;
        //  * A BodyInit object or null to set request's body.
        // body?: BodyInit | null;
        //  * A string indicating how the request will interact with the browser's cache to set request's cache.
        // cache?: RequestCache;
        //  * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
        // credentials?: RequestCredentials;
        //  * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
        // headers?: HeadersInit;
        //  * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
        // integrity?: string;
        //  * A boolean to set request's keepalive.
        // keepalive?: boolean;
        //  * A string to set request's method.
        // method?: string;
        //  * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
        // mode?: RequestMode;
        //  * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
        // redirect?: RequestRedirect;
        //  * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
        // referrer?: string;
        //  * A referrer policy to set request's referrerPolicy.
        // referrerPolicy?: ReferrerPolicy;
        //  * An AbortSignal to set request's signal.
        // signal?: AbortSignal | null;
        //  * Can only be null. Used to disassociate request from any Window.
        // window?: any;
        const options = {
            method: method, // 请求参数
            headers: { 'Content-Type': 'application', Authorization, responseType }, // 设置请求头
        };

        // body: JSON.stringify(params), // 请求参数
        if (method === 'POST') options['body'] = JSON.stringify(params);
        return options;
    }

   async fetchUrl(url, method, params?, responseType = '') {
        let data: fetchUrlData;
        data = {
            ret_code: 400,
            message: '请求资源不可用, 请联系管理员',
        };
        // method: 请求使用的方法，如 GET、POST。
        // headers: 请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量。
        // body: 请求的 body 信息：可能是一个 Blob、BufferSource(en - US) 、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
        // mode: 请求的模式，如 cors、 no - cors 或者 same - origin。
        // credentials: 请求的 credentials，如 omit、same - origin 或者 include。为了在当前域名内自动发送 cookie ， 必须提供这个选项， 从 Chrome 50 开始， 这个属性也可以接受 FederatedCredential(en - US) 实例或是一个 PasswordCredential(en - US) 实例。
        // cache: 请求的 cache 模式: default 、 no - store、 reload 、 no - cache 、 force - cache 或者 only -if-cached 。
        // redirect: 可用的 redirect 模式: follow(自动重定向), error(如果产生重定向将自动终止并且抛出一个错误）, 或者 manual(手动处理重定向).在Chrome中默认使用follow（Chrome 47之前的默认值是manual）。
        // referrer: 一个 USVString 可以是 no - referrer、client或一个 URL。默认是 client。
        // referrerPolicy: 指定了HTTP头部referer字段的值。可能为以下值之一： no - referrer、 no - referrer - when - downgrade、 origin、 origin - when - cross - origin、 unsafe - url 。
        // integrity: 包括请求的  subresource integrity 值 （ 例如： sha256 - BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。
        await fetch(url, this.fetchOptions(method, params, responseType))
            .then(function (response) {
                if (response.status === 401) {
                    const loginUrl = `${window.location.origin}/#/login`;
                    window.location.replace(
                        window.location.href.toString().replace(window.location.hash, '') + '#' + loginUrl
                    );
                    window.location.assign(loginUrl);
                }
                if (response.status === 200 && responseType === 'Blob') {
                    //  responseType === blob 说明这里是流文件，不能直接转 json
                    return response.blob();
                } else {
                    return response.json();
                }
            })
            .then(function (formatterData) {
                data = formatterData;
            })
            .catch(function () {
                data = {
                    ret_code: 400,
                    message: '请求资源不可用, 请联系管理员',
                };
            });

        return data;
    }

    const url = `/api/v${this.apiVersion}/insepction/manual`;
    this.post(url, { ...params });
```

Blob 转 json 方案
```js
const blob = new Blob([123])
const reader = new FileReader();
reader.addEventListener("loadend", function() {
    console.log(JSON.parse(reader.result));
});
reader.readAsText(blob,['utf-8']);
```
Blob 转 json 方案有个问题就是如果是在同步的条件下需要用 promise 来做同步调整。

## blob 转 json 方案
blob 转 json 需要我们

## blob 和 arrayBuffer
这俩是比较相似的，
```js
const demoBlob = new Blob([123])
const demoArrayBuffer = new ArrayBuffer(1233)
```
他们之间也可以互相转换。`const buf = new Buffer(12); const blob = new Blob([buf])`，而 blob 在转的时候就会麻烦一些，需要先用 new FileReader 进行转换，和上面的 blob 转 json 比较相似。