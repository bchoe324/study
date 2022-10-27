DOM, CSSOM, AST 외에도 브라우저는 **accessibility tree**라는 것도 만든다.

> ❕ Accessibility
> 웹 개발 분야에서 Accessibility(줄여서 A11y)는 가능한 많은 사람들이 웹사이트를 사용할 수 있게 하는 것, 심지어 어떤 방식으로든 그 사람의 능력이 제한되어있을 경우도 포함한다. 많은 사람들에게 기술은 더욱 편리하게 해준다. 장애를 가진 사람들에게 기술은 가능성을 열어준다. 접근성은 개인의 신체적, 인지적 능력과 어떻게 웹에 접근하는지(ACT)와는 상관 없이 내용에 최대한 접근 가능하도록 개발하는 것을 의미한다.

# Building the Accessibility Tree

일반적으로 장애가 있는 사용자들은 다양한 보조 기술을 통해 웹페이지를 이용할 수 있고 이용한다. screenreaders, magnifiers, eye tracking, voice commands 등을 사용한다. 이러한 기술들이 동작하기 위해서는 그 기술이 페이지의 내용에 접근할 수 있어야 한다. 보조 기술들은 DOM을 바로 읽을 수 없기때문에, ACT가 사용된다.

**Accessibility Tree**는 DOM을 이용해 만들어지고, 이후에 보조 장치가 웹 콘텐츠를 파싱하고 해석하는데 사용될 것이다. ACT는 DOM의 시멘틱 버전과 같으며 DOM이 업데이트 될 때마다 함께 업데이트 된다. 보조 기술이 필요한 DOM 요소들은 각각 그에 상응하는 ACT 노드를 가질 것이다. ACT가 완성되기 전에는 스크린 리더기에서 내용에 접근할 수 없다.

![ACT](https://res.cloudinary.com/practicaldev/image/fetch/s--akQoUOkQ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gugy39zsayyjq844i5t2.jpg)

> ACT를 보려면 크롬 개발자 도구에서 `Elements`탭의 `Accesibility` 에서 볼 수 있다.

참고자료
https://dev.to/arikaturika/how-web-browsers-work-creating-the-accessibility-tree-part-6-with-illustrations-2hl2
