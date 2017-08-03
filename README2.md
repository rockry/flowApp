# ionic2 개발하기 - (2)

## icon / splash 이미지 변경

1. ionic start로 자동생성한 프로젝트 폴더의 resources/ 폴더에 원하는 아이콘과 스플래쉬 이미지를 icon.png와 splash.png 이름으로 복사하여 덮어쓴다.  

2. ionic resources를 입력하면 자동으로 각 platform에 맞는 resource들을 생성해준다.

```
> ionic resources
Ionic icon and splash screen resources generator
 uploading icon.png...
 uploading splash.png...
icon.png (110x117) upload complete
splash.png (859x1281) upload complete
 generating splash ios Default~iphone.png (320x480)...
splash ios Default~iphone.png (320x480) generated
...생략
splash android drawable-port-xxxhdpi-screen.png (1280x1920) skipped, source image splash.png (859x1281) too small
...생략
```

> *※주의점*  
icon과 splash파일이 png형식이 아니거나 ionic에서 원하는 png format이 아닐경우(이름만 png로 바꿔도 안됨) 아래와 같은 에러가 발생한다.

```
ionic resources: Unable to generate images due to an error Invalid upload: unable to read uploaded image
```

이미지가 작을 경우 일부 이미지는 생성이 안될 수 있다.

```
splash android drawable-port-xxxhdpi-screen.png (1280x1920) skipped, source image splash.png (859x1281) too small
```

---

## 메뉴 만들기

우선 원하는 페이지에 아래와 같이 menuToggle용 버튼을 만든다.
```
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle right>
      <ion-icon name="menu"></ion-icon>
    </button>
  </ion-navbar>
</ion-header>
```

그리고 app.html에는 아래와 같이 ion-menu component를 만들어 준다.
아래 ion-nav에 #content를 ion-menu의 [content]와 동일하게 작성해준다.

```
<ion-menu [content]="content" side="right" type="overlay">
  <ion-header>
    <ion-toolbar>
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-list>
      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
  </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
```

---

## 색깔 테마 바꾸기

ionic에서 color를 사용하는 방법은 theme폴더의 variables.scss 파일을 이용한다.
1. $colors 안에 원하는 이름을 만들고 html 안에서 color 속성(attribute)을 통해 사용한다.
```
$colors: (

  primary:    #007aff,
  secondary:  #32db64,
  danger:     #d91e18,
  light:      #f4f4f4,
  dark:       #222,
  mycolor:    #191919,

) !default;
```

```
<!--<html>-->
<ion-navbar color="mycolor">
```

2. $로 시작하는 Sass Variable을 만들고 그안에 우리가 만든 color를 사용한다.
3. $로 시작하는 Sass Variable을 직접 색상을 지정하여 만든다. 

```
$new-color:                 color($colors, mycolor) !default;
$new-color2:                 #f4f4f4 !default;
```
4. css내에서 $를 통해 사용한다.

```
<!--<css>-->
.header {
  height: $new-color;
}
```

---

## 전체 테마 설정

아래 사이트에서 `'src/theme/variables.scss'`에 Overriding할 수 있는 다양한 Ionic Sass Variables이 있으며, 가져다가 선언하여 사용하면 되겠다.
[https://ionicframework.com/docs/theming/overriding-ionic-variables/](https://ionicframework.com/docs/theming/overriding-ionic-variables/)

[https://github.com/driftyco/ionic/blob/master/src/themes/ionic.theme.dark.scss](https://github.com/driftyco/ionic/blob/master/src/themes/ionic.theme.dark.scss)  
에서와 같이 필요한 color variable들을 모아 놓은 테마 파일도 찾아서 사용할 수 있다.  

아래와 같이 직접 Sass Variable들을 복사해서 사용하거나, import해서 사용할 수 있다.
```
...(생략)
$list-text-color:            $text-color !default;
$list-background-color:      #242424 !default;
$list-border-color:          #000 !default;

@import "ionic.theme.dark";
```


> ionicon cheatsheet : http://ionicons.com/cheatsheet.html

https://github.com/crisbeto/angular-svg-round-progressbar

https://developer.mozilla.org/ko/docs/Web/CSS/transform
https://developer.mozilla.org/ko/docs/Web/CSS/length