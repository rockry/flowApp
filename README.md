# ionic2 개발하기

## 서론
국내에서 많이 사용되는 Hybrid Web Framework들은 angular reactjs vuejs meteor 등 다양하다. 그중에서 하이브리드 앱 UI 개발에 중점을 두고 생산성을 높여 빠르게 개발하도록 도와주는 ionic2 framework를 이용하여 앱을 만드는 과정을 블로그에 개재하려고 한다.
angular나 javascript에 대한 선행지식이 있어야 이해하기 수월하다.

ionic이란 cordova라는 framework위에서 동작하며, angular 코드를 사용하여 하이브리드 앱을 제작하며, 한번의 코드 작성으로 ios, android, windows 등의 앱을 제작할 수 있다.

ionic2는 angular2, typescript 기반으로 작성된다.

[아이오닉 홈페이지](https://ionicframework.com)


---

## 개발환경 설치

### 1. Java

아래 오라클 홈페이지에 가서 Java SE(Standard Edition)의 JDK(Java Development Kit)을 다운받아 설치한다.

(설치 후 JAVA_HOME 환경변수 확인)  
> (JAVA_HOME이 없을 경우) : Start 메뉴 > Computer > System Properties > Advanced System Properties를 선택합니다. 그런 다음 Advanced 탭 > Environment Variables를 열고 JDK 폴더(예: C:\Program Files\Java\jdk1.8.0_77)를 가리키는 새 시스템 변수 JAVA_HOME을 추가합니다.

[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

### 2. Android SDK

아래 android 홈페이지에 가서 Android Studio(SDK포함) 혹은 Android SDK만을 설치한다.

(Java와 마찬가지로 ANDROID_HOME 환경변수 확인)

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

### 3. Node.js

Node.js는 공식 사이트에서 다운로드하여 시스템에 맞는 설치파일을 가지고 설치하면 된다. 

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### 4. Cordova

nodejs가 설치되면 cmd창에서 npm 명령어를 사용 가능하다.

npm 명령어를 이용해서 cordova를 설치하자.

    npm install -g cordova

(-g 옵션이 붙은 것은 시스템 전체에서 사용할 수 있도록 Global 로 설치를 한다는 의미이다.)

### 5. ionic

드디어 우리가 사용할 ionic을 설치한다.

    npm install -g ionic 

### 6. ios

MAC에서 ios 빌드를 통한 검증이 필요하다면 아래 2가지 module설치도 필요하다.

    npm install -g ios-sim
    npm install -g --unsafe-perm=true ios-deploy 

> ionic info로 설치된 ionic 모듈들을 확인한다.<br>

```
>ionic info
Cordova CLI: 6.5.0  
Ionic Framework Version: 3.1.1  
Ionic CLI Version: 2.2.3  
Ionic App Lib Version: 2.2.1  
Ionic App Scripts Version: 1.3.6  
ios-deploy version: Not installed  
ios-sim version: Not installed  
OS: Windows 10  
Node Version: v6.5.0  
Xcode version: Not installed  
```

---

## ionic 프로젝트 생성

npm으로 Ionic을 설치했다면 이제 모든 준비가 완료되었다. 정상적으로 설치 되었는지 Ionic 프로젝트를 생성해보자. tab 형태의 앱을 만들어보자.

    ionic start myProject tabs --v2
    cd myProject

아래와 같이 여러가지 format을 기본적으로 제공한다.
- tabs : a simple 3 tab layout  
- sidemenu: a layout with a swipable menu on the side  
- blank: a bare starter with a single page  
- super: starter project with over 14 ready to use page designs  
- tutorial: a guided starter project  

‘ionic serve’ 명령어를 통해 로컬환경에서 웹서버를 띄워 화면을 직접 확인할 수 있다.

    ionic serve

특정 플랫폼을 add하고 build해볼 수 있다.(ios 빌드는 MAC에서만 됩니다.)

    ionic platform add android  
    ionic build android  
    ionic emulate android

>지원 가능한 platform 확인

```
>ionic platform
Installed platforms:
  android 6.1.2
  ios 4.3.1
Available platforms:
  amazon-fireos ~3.6.3 (deprecated)
  blackberry10 ~3.8.0
  browser ~4.1.0
  firefoxos ~3.6.3
  webos ~3.7.0
  windows ~4.4.0
  wp8 ~3.8.2 (deprecated)
```
*< cli help >*

    ionic -h
[https://ionicframework.com/docs/cli/](https://ionicframework.com/docs/cli/)

---
## Text Editor or IDE

- Visual Studio Code 나 Atom 추천.
- 그 외 다양한 IDE들이 존재한다.

---

## ionic2 프로젝트 구조 
###### *(출처 : [https://sungjun221.github.io/ionic2-install/](https://sungjun221.github.io/ionic2-install/))*

| 폴더명 | 내용 |
| :--- | :--- |
|./src | 개발자가 app을 위해 작성하는 code가 있는 폴더. |
|./resources | icon, splash 이미지와 각 플랫폼별 해상도에 따라 (자동)변환된 icon, splash image가 있는 폴더.|
|./www | build를 위해 생성하는 code가 있는 폴더. 실제 code는 src/안에 위치함.|
|./hooks | Cordova 빌드 프로세스 중 실행되는 스크립트가 포함된 폴더.|
|app package | 빌드 프로세스를 커스터마이징을 하고 싶을 때 유용.(?)|
|./node_modules | npm으로 설치한 Node 모듈이 있는 폴더.|
|./plugins | plugin들이 있는 폴더.(기본적으로 cordova, ionic plugin이 포함되어 있을 것이다.)<br>Native와의 연동을 위해 Plugin을 만들거나 수정하게 되면 보게 될 폴더.|
|./platforms | 각 플랫폼 별(IOS, Android 등) 배포용 코드가 있는 폴더.<br>XCode나 Android Studio로 import 하여 배포할 대상이 되는 코드.|
|./package.json | npm 의존성 관리 파일.|
|./tsconfig.json | TypeScript 컴파일러를 위한 설정 파일.|
|./config.xml | Cordova에서 app package를 생성할 때 사용하는 설정 정보 파일.|
