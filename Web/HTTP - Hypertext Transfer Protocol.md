---
created:2022-10-24 22:27
title: HTTP - Hypertext Transfer Protocol
tags: []
aliases: []
related: []
cssClass: 
---

# HTTP 프로토콜

인터넷 != WWW(World Wide Web)

물리적인 하나의 컴퓨터에는 여러개의 서버가 동작할 수 있고, 각 서버는 _포트_ 값으로 구분되어 동작한다.

| 이름  | 프로토콜       | 포트       | 기능               |
| ----- | -------------- | ---------- | ------------------ |
| WWW   | HTTP           | 80         | 웹서비스           |
| Email | SMTP/POP3/IMAP | 25/110/114 | 이메일 서비스      |
| FTP   | FTP            | 21         | 파일 전송 서비스   |
| DNS   | TCP/UDP        | 53         | 네임 서비스        |
| NEWS  | NNTP           | 119        | 인터넷 뉴스 서비스 | 

**인터넷(Internet)**
TCP/IP 기반의 네트워크가 전세계적으로 확대되어 하나로 연결된 네트워크들의 네트워크(네트워크의 결합체)


## HTTP (Hypertext Transfer Protocol)란?

- 팀 버너스리(Tim Berners-Lee)와 그의 팀 CERN에서 HTML, 웹 브라우저 및 웹 브라우저 관련 기술, 그리고 HTTP를 발명하였다.
- 문서화된 최초의 HTTP 버전은 HTTP v0.9(1991년)이다.
- HTTP는 서버와 클라이언트가 _인터넷상에서 데이터를 주고받기 위한 프로토콜_ 이다.
	- HTTP는 어떠한 종류의 데이터도 전송할 수 있다. (이미지, 비디오, 오디오, 텍스트 등
- HTTP는 현재 HTTP/2 버전까지 존재한다.


## HTTP 작동방식

HTTP는 서버/클라이언트 모델을 따른다.

#### 장점
- 불특정 다수를 대상으로 하는 서비스에 적합하다.
- 클라이언트와 서버가 계속 연결된 형태가 아니기 때문에 클라이언트/서버 간의 최대 연결 수보다 훨씬 많은 요청과 응답을 처리할 수 있다.

#### 단점
서버가 응답을 끝내면 연결을 끊어버리기 때문에 클라이언트의 이전 상황을 알 수 없다. 이러한 특징을 **무상태(Stateless)** 라고 한다. 이 특징 때문에 정보를 유지하기 위해서 Cookie와 같은 기술이 등장하게 되었다.


## URL(Uniform Resource Locator)

- 인터넷상의 자원의 위치
- 특정 웹 서버의 특정 파일에 접근하기 위한 경로 혹은 주소

```
접근 프로토콜://IP 주소(도메인 이름)/문서 경로/문서 이름
http://www.example.com/docs/index.html
```


## HTTP flow

![HTTP](https://cphinf.pstatic.net/mooc/20180119_25/1516354290022wUY3x_PNG/http_-_.PNG)

### Connect

[[How Browsers Work - 1. Navigation]]


### Request

```http
GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr
```

![HTTP request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview/http_request.png)

- **요청 메서드**: GET, PUT, POST, PUSH, OPTIONS 등의 요청 방식이 온다.
- **요청 URI**: 요청하는 자원의 위치를 명시한다.
- **HTTP 프로토콜 버전**: 웹 브라우저가 사용하는 프로토콜 버전

첫 번째 줄의 요청메소드는 서버에게 요청의 종류를 알려주기 위해 사용된다.
두 번째 줄 부터는 헤더 정보가 나오는데, 각 정보는 헤더 명과 헤더 값이 포함되며 콜론(:)으로 구분된다. 또한 각 줄은 line feed와 carriage return으로 구분된다.

> GET 방식은 요청할 때 필요한 정보를 URI에 포함하기 때문에 요청 바디가 없다. 바디 요소는 요청 메서드가 POST, PUT일때 존재한다.

각각의 메소드 이름은 다음과 같은 의미를 가진다.
- GET: 정보를 요청하기 위해 사용한다. (SELECT)
- POST: 정보를 밀어넣기 위해 사용한다. (INSERT)
- PUT: 정보를 업데이트하기 위해 사용한다. (UPDATE)
- DELETE: 정보를 삭제하기 위해 사용한다. (DELETE)
- HEAD: (HTTP)헤더 정보만 요청한다. 해당 자원이 존재하는지, 혹은 서버에 문제가 없는지를 확인하기 위해 사용한다.
- OPTIONS: 웹서버가 지원하는 메서드의 종류를 요청한다.
- TRACE: 클라이언트의 요청을 그대로 반환한다. 예컨데 echo 서비스로 서버 상태를 확인하기 위한 목적으로 주로 사용한다.


### Response

```http
HTTP/1.1 200 OK
Date: Sat, 09 Oct 2010 14:28:02 GMT
Server: Apache
Last-Modified: Tue, 01 Dec 2009 20:18:22 GMT
ETag: "51142bc1-7449-479b075b2891b"
Accept-Ranges: bytes
Content-Length: 29769
Content-Type: text/html

<!DOCTYPE html>… (here come the 29769 bytes of the requested web page)
```

![HTTP response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview/http_response.png)

첫 번째 줄은 응답 HTTP 프로토콜의 버전, 응답 코드, 응답 메세지 등으로 구성된다.
나머지 헤더 부분에는 날짜, 웹서버 이름과 버전, 컨텐츠 타입, 캐시 제어 방식 등의 값이 나온다.

빈 줄 다음에 나오는 부분이 ==실제 응답 리소스 데이터==이다.


참조
[boostcourse - 웹 프로그래밍 기초](https://www.boostcourse.org/web316/lecture/16661/?isDesc=false)
https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview