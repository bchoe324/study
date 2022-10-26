**브라우저**(웹 브라우저/인터넷 브라우저)는 기기에서 World Wide Web에 접근할 수 있게 해주는 소프트웨어 어플리케이션이다.

브라우저의 동작 과정을 요약하면 다음과 같다.

> 우리가 특정 웹사이트로부터 웹 페이지를 요청하면, 브라우저는 서버로부터 필요한 내용을 받아서 기기의 화면에 출력해준다.

이 과정 안에는 **navigation**, **fetching the data**, **parsing**, **rendering** 이라는 단계가 포함되어 있다.

# Navigation

웹 페이지가 로딩되는 첫 번째 단계이다. 사용자가 페이지를 _요청할 때마다_ 발생한다. 예를 들어 URL을 입력하거나 링크 클릭할 때, 폼 제출할 때 등

## DNS Look Up(웹 주소 변환)

웹 페이지로 navigating 하는 첫 번째 단계로, 웹페이지의 assets의 위치를 알아낸다(HTML, CSS, Javascript 등의 파일).

어떤 사이트에 처음 방문하면, Domain Name System(DNS) lookup이 일어나게 된다.

> 우리에게 웹사이트는 **domain name** 이지만, 컴퓨터에게는 ** IP address**

> ❕ DNS(Domain Name System)
>
> 사람이 기억하기 쉽게 만들어진 domain names(example.com), hostnames(World Wide Web)을 IP addresses로 바꿈
>
> **DNS server**는 publick IP address와 그에 상응하는 hostname들의 데이터베이스를 가지고 있는 컴퓨터 서버이다(이름과 전화번호가 짝 지어진다는 점에서 전화번호부와 비슷함). 대부분 요청한 hostname 을 IP 주소로 변환하는 역할을 한다.

만약 https://example.com 이라는 주소를 입력했다고 가정해 보면, 주소를 입력한 순간 navigation이 시작된다. 이 사이트에 한번도 방문한 적이 없다면 DNS Lookup을 요청한다.

![DNS lookup1](https://res.cloudinary.com/practicaldev/image/fetch/s--B2zndA_z--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zovdk6w2091bxt6l4wch.png)

**DNS Lookup**을 요청하면, DNS 서버에게 신호를 보내 https://example.com 이라는 주소에 해당하는 IP 주소를 찾도록 요청한다. 해당 IP 주소를 찾으면 return 된다(만약 이 과정에서 문제가 일어났다면 브라우저에서 에러 메세지가 뜸).

![DNS lookup2](https://res.cloudinary.com/practicaldev/image/fetch/s--V52VYTum--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ajql5i6zehjzm3cqs24d.png)

최초의 DNS Lookup 이후에는 이 IP 주소는 한동안 cache에 저장되며, 이후 요청할때 DNS Lookup 과정 없이 IP 주소를 바로 가져올 수 있어 빠른 응답이 가능해진다.

## TCP(Transmission Control Protocol) Handshake

브라우저가 웹사이트의 IP 주소를 알게 되면, 서버와 연결을 시도하고 생성하려고 할 것이다. 이는 **TCP three-way handshake**(**SYN-SYN-ACK**, 또는 **SYN, SYN-ACK, ACK**)이라는 과정을 통해 이루어진다.

- SYN: Synchronize
- ACK: Acknowledge

> ❕TCP(Transmission Control Protocol)
> **TCP(전송 제어 프로토콜)**은 인터넷 프로토콜 스위트(IP)의 핵심 프로토콜 중 하나로, IP와 함께 TCP/IP라는 명칭으로도 불린다. TCP는 프로그램간에 일련의 옥텟을 안정적으로, 순서대로, 에러없이 교환할 수 있게 한다. TCP는 웹 브라우저들이 World Wide Web 에서 서버에 연결할 때 사용되며, 이메일 전송이나 파일 전송에도 사용된다.
>
> **TCP Handshake**는 TCP/IP프로토콜을 통해 통신하는 응용프로그램이 데이터를 전송하기 전에 세션을 수립하는 과정이다.

![tcp 1](https://res.cloudinary.com/practicaldev/image/fetch/s--gdERLKJR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/togohzknossznbvg4twn.png)

브라우저는 서버에 **SYNC** 메세지를 보내고 'Synchronization'(=연결)을 요청한다.

![tcp 2](https://res.cloudinary.com/practicaldev/image/fetch/s--27QMG8L7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zbwttlvahlage77o8kha.png)

서버는 **SYNC-ACK** 메세지를 보낸다.('Synchronization' 과 'Acknowledgement')

![tcp 3](https://res.cloudinary.com/practicaldev/image/fetch/s--tEMldcWz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/faxftilliw1ypvcvi32c.png)

마지막으로 브라우저는 **ACK** 메세지를 보낸다.

이제 TCP 연결이 성립되었으면 TLS Negotiation이 시작될 수 있다.

## TLS Negotiation

HTTPS에서 보안 연결이 성립되기 위해서는 또다른 **handshake**가 필요하다. 이 handshake(TLS Negotiation)은 실제 데이터 전송 전에 암호화 방식을 결정하고, 서버를 식별하여 보안 연결을 확립한다.

> ❕ TLS(Transport Layer Security)
> **TLS(전송 계층 보안)**은 SSL(Secure Sockets Layer)의 더 최근 버전이다. 정보를 암호화하여 간섭, 도청을 방지하고, 프로그램끼리 네트워크를 통해 안전하게 통신할 수 있게 하기 위해 만들어졌다.
> 이 프로토콜은 이메일이나 메신저와 같은 어플리케이션에서 널리 사용되며, *HTTPS*의 보안에도 사용된다.

> HTTPS(HyperText Transfer Protocol Secure)은 HTTP의 암호화된 버전으로 SSL 또는 TLS를 사용함

![tls handshake](https://res.cloudinary.com/practicaldev/image/fetch/s--QULUTuA8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eic2y53a6el1rqlsvnlp.png)

1. **Client Hello**
   브라우저는 다음의 메세지를 전송한다.
   1. TLS 버전
   2. cipher suite(클라이언트가 지원하는 암호화 방식)
   3. `client random`(일련의 랜덤 문자열 바이트)
2. **Server Hello & Certificate**
   서버는 다음의 메세지를 전송한다.
   1. 서버 SSL 인증서
   2. 클라이언트가 제공한 암호화 방식 중 선택한 암호화 방식
   3. `server random`(서버가 생성한 랜덤 값)
3. **Authentication**
   브라우저는 서버의 SSL 인증서가 CA(Certificate Authority)에서 발행한 것인지 확인한다. (서버 본인인증을 하는 것)
4. **The premaster secret**
   브라우저는 `premaster secret`이라고 하는 랜덤 값을 한 번 더 전송한다. 이는 `public key`(브라우저가 서버의 `SSL certificate`로부터 가져온 것)를 통해 암호화된 것이다. `premaster secret`은 서버의 `private key`를 통해서만 해독될 수 있다.
5. **Private key used**
   서버가 `premaster secret`을 해독함
6. **Session keys created**
   브라우저랑 서버는 `client random`, `server random`, `premaster secret` 으로부터 세션 키를 생성한다.
7. **Client Finished**
   브라우저가 끝났다는 메세지를 보낸다.
8. **Server Finished**
   서버가 끝났다는 메세지를 보낸다.
9. **Secure symmetric encryption achieved**
   handshake가 완료되고, 세션 키를 통해 통신할 수 있게 된다.

참고자료
https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work

https://dev.to/arikaturika/how-web-browsers-work-part-1-with-illustrations-1nid
