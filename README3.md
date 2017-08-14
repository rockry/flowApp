# ionic2 개발하기 - (3)

## 배경이나 효과음을 위한 사이트

https://www.youtube.com/audiolibrary/music

http://soundbible.com/ 나 http://www.findsounds.com/, http://www.sounddogs.com/ 등의 사이트도 있었지만 마음에 드는 음원을 찾기 힘들었다.
괜히 구글이 아니었다...

필요한 효과음을 수정할 필요가 있다면, 웹환경에서 쉽고 편하게 작업할 수 있는 사이트가 있다.
설치도 따로 필요 없고 깔끔하게 잘 만들어진 사이트라 사용하기도 엄청 편했다.
http://mp3cut.net/ko/

플레이는 NativeAudio 모듈을 사용.
ionicframework에서 NativeAudio로 검색하면 사용법이 나온다.

---

## CSS 애니메이션 추가하기

https://daneden.github.io/animate.css/ 에서 원하는 애니메이션을 골라 css 소스를 다운 받을 수 있다.
이 사이트도 깔끔하고 사용하기 편해서 굿!

---

## 그래프 그리기

angular에 다양한 chart plugin(library?module?)들이 있다.
아래 사이트에서 20가지 탑 angular 그래프들을 소개하고 있다.
예제와 데모, 코드까지 친절하게 링크를 걸어놓아 비교해서 골라쓰기 아주 좋다.
https://www.angularjs4u.com/angularjs2/top-20-angular-2-charts-graphs/

나는 가장 무난해보이는 Chart.js를 사용했다.
사용법은 github에 들어가면 아주 친절하게 잘 나와 있다.
https://github.com/valor-software/ng2-charts
http://valor-software.com/ng2-charts/

---

## DB 사용하기

처음에는 @ionic/storage에서 제공하는 기본 Storage를 사용하려고 하였다.
그러나 Storage는 key,value 쌍으로 값을 get, set 할 수 있을 뿐 query를 통해서 데이터를 filtering하기가 힘들었다.
그래서 no-SQL도 익힐겸 적당한 DB를 사용해보기로 했다.
내가 원하는 DB 조건은 아래와 같았다.
1. no-SQL
2. 사용하기 쉬움.(문서화)
3. javascript 친화적
4. 기본적인 query 메소드들을 제공.
5. 작은 DB에 사용하기좋게 가볍고 빠름.

검색하던 중 괜찮은 db를 찾아서 한번 사용해보기로 했다.
http://lokijs.org/

꽤 빠르고 가볍고 사용하기도 편했다.
회사 프로젝트나 대형 프로젝트에서 사용하기에는 힘들것 같지만, 개인 프로젝트로 사용하고 no-SQL DB 사용법을 익히는데는 많은 도움이 될 것 같다.

간단한 사용법은 아래 ionic forum글을 참고했다.
https://forum.ionicframework.com/t/persistent-no-sql-storage-in-ionic2-tutorial/55570

실제 사용법은 아래 jsdoc이나 sandbox에서 직접 돌려보면서 사용법을 익히면 좋다.
https://rawgit.com/techfort/LokiJS/master/jsdoc/index.html
http://www.obeliskos.com/LokiSandbox/