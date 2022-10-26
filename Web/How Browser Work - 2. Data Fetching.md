# Data Fetching

## HTTP Request

서버와 연결이 되면, 브라우저는 최초의 **HTTP GET request**를 보낸다. 먼저 마크업 문서(HTML)를 요청한다. 이때 HTTP 프로토콜을 사용한다. [HTTP - Hypertext Transfer Protocol](./HTTP%20-%20Hypertext%20Transfer%20Protocol.md)

[HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

> ❕ HTTP(Hypertext Transfer Protocol)
> HTTP는 HTML 문서와 같은 리소스를 fetching하기 위한 프로토콜이다. 이는 웹 상의 모든 데이터 교환의 토대가 되며, 클라이언트-서버 프로토콜이다. 즉, 리퀘스트는 보통 웹 브라우저 쪽에서 시작된다.

![http request](https://res.cloudinary.com/practicaldev/image/fetch/s--lEYcHGlH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c842u6z95fugi51kkxgo.png)

**The method** - e.g: `POST`, `GET`, `PUT`, `PATCH`, `DELETE` ...
**URI(Uniform Resource Identifier)** - URI는 인터넷의 추상적, 물리적 리소스(웹사이트, 이메일 주소 등)을 식별하기 위해 사용된다. URI는 5 부분으로 이루어진다.

- **scheme**: 프로토콜의 종류를 나타냄
- **authority**: 도메인을 식별하기 위함
- **path**: 리소스의 정확한 경로를 나타냄
- **query**: 리퀘스트 액션을 나타냄
- **fragment**: 리소스의 일부를 말함

```
// URI parts
scheme :// authority path ? query # fragment

// URI example
https://example.com/users/user?name=Alice#address

https: // scheme name
example.com // authority
users/user // path
name=Alice // query
address // fragment
```

**HTTP header fields** - 모든 HTTP 리퀘스트와 리스폰스에서 브라우저와 서버가 주고 받는 문자열 리스트이다(보통 실제 사용자에게는 보이지 않는다).

> 이 헤더 필드를 보고 싶으면, 크롬 개발자 도구에서 **Network** 탭으로 들어가서 **FETCH/XHR**을 선택한다.

## HTTP Response

서버가 리퀘스트를 받으면 그것을 처리하고 **HTTP response**를 보낸다. 리스폰스의 `body` 부분에 우리가 요청한 HTML 문서가 있다.

![http response](https://res.cloudinary.com/practicaldev/image/fetch/s--imajKMhp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e4s4md4r02wmb3t8y9ef.png)

**Status code** - e.g: 200, 400, 401, 504 Gateway Timeout etc (**200**: 리퀘스트가 성공적으로 처리된 정상 상태)
**Response header fields** - 리스폰스에 대한 정보를 포함한다. (로케이션, 서버에 대한 정보)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>This is my page</title>
    <link rel="stylesheet" src="styles.css" />
    <script src="mainScripts.js"></script>
  </head>
  <body>
    <h1 class="heading">This is my page</h1>
    <p>A paragraph with a <a href="https://example.com/about">link</a></p>
    <div>
      <img src="myImage.jpg" alt="image description" />
    </div>
    <script src="sideEffectsScripts.js"></script>
  </body>
</html>
```

위의 HTML을 보면 `CSS`, `Javascript` 파일을 참조하고 있다. 이 파일들은 브라우저가 해당 링크를 읽기 전까지는 리퀘스트되지 않는다. 하지만 이는 **parsing**단계에서 일어나는 일이고, 지금은 **HTML**만 요청되고 서버로부터 받는다.

이 최초의 리퀘스트에 따른 응답에서 처음으로 데이터를 받게 되는데 이때 걸리는 시간을 **TTFB**라고 한다.
= 유저가 요청하고(예> 링크를 클릭) 처음으로 HTML packet을 받게되는데 걸리는 시간
이 첫 번째 데이터 패킷은 보통 _14KB_

> ❕ Time to first byte(TTFB)
>
> 브라우저가 페이지를 요청하고, 서버로부터 처음으로 정보(byte)를 받는데 걸리는 시간. 이 시간에는 DNS lookup, TCP handshake (https의 경우엔 SSL handshake)가 포함됨
> 즉, 리퀘스트와 리스폰스 사이의 시간(millisecond)
>
> ```
> TTFB = responseStart - navigationStart
> ```

## TCP Slow Start / 14KB rule

**TCP slow start**는 패킷 전송에 이용 가능한 대역폭을 찾고, 네트워크 연결 속도를 알맞게 조절하는 알고리즘이다.
첫 번째 데이터 패킷은 14KB(혹은 그 이하)이고, 최대 대역폭에 도달할 때까지 데이터 양을 점진적으로 증가시키며 전송한다.

![TCP Slow Start](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work/congestioncontrol.jpg)

웹 성능 최적화를 위해서는 이 14KB에 중요한 정보(HTML)를 모두 보내는게 좋다.

## Congestion control

**Congestion**(혼잡)은 네트워크 계층 내에서 메세지 트래픽이 너무 잦아서 네트워크 리스폰스 시간을 느리게 하는 상태이다.

서버가 TCP 패킷에서 데이터를 보내면, 클라이언트는 acknowledgements(ACK)를 리턴하여 전송을 확인한다.
연결은 하드웨어와 네트워크의 조건에 따라 제한된 용량을 가진다. 서버가 너무 많은 데이터를 너무 빨리 보내면 이는 그냥 폐기된다. 즉, 클라이언트는 `ACK`를 리턴하지 않고 서버는 이를 누락된 `ACK`로 기록하고 **혼잡상태**라고 해석한다. 이때 혼잡 제어 알고리즘이 개입한다.
**Congestion algorithms**(혼잡 제어 알고리즘)은 서버와 클라이언트 간의 패킷과 `ACK`의 흐름을 통해 전송률을 파악하고, 최적의 트래픽을 찾아 안정된 트래픽 스트림을 만든다.

참고자료
https://dev.to/arikaturika/how-web-browsers-work-part-2-with-illustrations-1gn5
https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#tls_negotiation
