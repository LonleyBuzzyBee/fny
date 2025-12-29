# _FNY - Fresh New You!_

#### _A react app created as a mock site for a skincare company. latest update 07//2020_

#### By _**Mai C.**_


## Screen Shots of the app

<!-- [![diagram ](./public/img/Diagram_Tap_Room.png)] -->

![ screenshot ](./public/1.gif)
![ screenshot ](./public/2.gif)
![ screenshot ](./public/3.gif)
![ screenshot ](./public/4.gif)
![ screenshot ](./public/5.gif)


## Description

_This app was created as a mock e commerce site for a fake skincare company called FNY_

## Project Specifications

| Behavior | Input | Output |
|---|---|---|
|a user can see an item|a user clicks an item|details list shows up for item |
|a user can see a list of items for sale|a user clicks shop now| a user sees all items|
| a vendor has access to full crud funtionality | a vendor signs in |all views and buttons for CRUD functionality show|
|a user can only see details and list of items |  |   |

## Setup/Installation Requirements

_In Terminal:_

* Navigate to where you want this application to be saved, i.e.:
```cd desktop```
* Clone the file from GitHub with HTTPS
```git clone https://github.com/LonleyBuzzyBee/FNY.git```
*  ```FNY```
* Open file in your preferred text editor
* run  ```npm install```
* then ```npm build```
* finally ```npm start```


## Known Bugs

_No known bugs at this time._

## Support and contact details

_Have a bug or an issue with this application? [Open a new issue](https://github.com/LonleyBuzzyBee/FNY/issues) here on GitHub._

## Technologies Used

_React with Redux_
_Javascript_
_CSS_
_Webpack_
_Firebase_

### License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 **_Mai C._**
```
FNY
├─ .ionide
│  └─ symbolCache.db
├─ README.md
├─ build
│  ├─ 1.gif
│  ├─ 2.gif
│  ├─ 3.gif
│  ├─ 4.gif
│  ├─ 5.gif
│  ├─ favicon.ico
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ config-overrides.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ 1.gif
│  ├─ 2.gif
│  ├─ 3.gif
│  ├─ 4.gif
│  ├─ 5.gif
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
└─ src
   ├─ Scss
   │  ├─ abstracts
   │  │  ├─ _mixins.scss
   │  │  └─ _variables.scss
   │  ├─ base
   │  │  └─ _base.scss
   │  ├─ components
   │  │  ├─ _item-list.scss
   │  │  ├─ _item.scss
   │  │  ├─ _landing-page.scss
   │  │  ├─ _reusable-components-styles.scss
   │  │  └─ _sign-ins.scss
   │  └─ main.scss
   ├─ actions
   │  ├─ ActionTypes.js
   │  └─ index.js
   ├─ assets
   │  └─ img
   │     ├─ girlLeaf.jpg
   │     ├─ girlLeaf2.jpg
   │     └─ girlLeaf3.jpg
   ├─ components
   │  ├─ AdminOptions
   │  │  ├─ CreateItem.js
   │  │  └─ EditItem.js
   │  ├─ App.js
   │  ├─ LandingPage
   │  │  └─ Index.js
   │  ├─ Product
   │  │  ├─ Item.js
   │  │  ├─ ItemDetails.js
   │  │  ├─ Items.js
   │  │  ├─ ListAllPage
   │  │  │  └─ Index.js
   │  │  ├─ ListBodyPage
   │  │  │  └─ Index.js
   │  │  ├─ ListFacePage
   │  │  │  └─ Index.js
   │  │  └─ ListLipsPage
   │  │     └─ Index.js
   │  ├─ ReusableComponents
   │  │  ├─ Accordion.js
   │  │  ├─ Carousel
   │  │  │  ├─ ImageSlider.js
   │  │  │  └─ Slides.js
   │  │  ├─ Header.js
   │  │  ├─ Layout.js
   │  │  ├─ RecommendedSection
   │  │  │  ├─ Pagination.js
   │  │  │  ├─ Posts.js
   │  │  │  └─ index.js
   │  │  ├─ ReusableForm.js
   │  │  └─ TopSection.js
   │  ├─ Routes
   │  │  ├─ Auth.js
   │  │  ├─ Route.js
   │  │  └─ index.js
   │  ├─ UserAuth
   │  │  ├─ SignOut.js
   │  │  ├─ SignUp.js
   │  │  └─ Signin.js
   │  ├─ UserOptions
   │  │  └─ Checkout.js
   │  └─ assets
   │     └─ imgs
   │        ├─ 1.gif
   │        ├─ 2.gif
   │        ├─ 3.gif
   │        ├─ 3bottles.jpg
   │        ├─ 4.gif
   │        ├─ 4bottles.jpg
   │        ├─ 5.gif
   │        ├─ LipBalm.jpg
   │        ├─ LipBalm2.jpg
   │        ├─ bathBom.jpg
   │        ├─ bathBomBlue.jpg
   │        ├─ blankDrooperMultiple.jpg
   │        ├─ blankDropper.jpg
   │        ├─ blankDropperHand.jpg
   │        ├─ bottleGroup.jpg
   │        ├─ circleProducts.jpg
   │        ├─ creamUse.jpg
   │        ├─ creamsGif.gif
   │        ├─ creamsGifStill.png
   │        ├─ cruelty.png
   │        ├─ crultyFreeNo.png
   │        ├─ derm.png
   │        ├─ dropper.jpg
   │        ├─ dropper2.jpg
   │        ├─ dropperBrown.jpg
   │        ├─ dropperGif.gif
   │        ├─ dropperGifStill.png
   │        ├─ dropperPour.jpg
   │        ├─ dropperUse.jpg
   │        ├─ faceRoller.jpg
   │        ├─ foamy.jpg
   │        ├─ groupbottles.png
   │        ├─ groupbottles2.jpg
   │        ├─ groupbottles3.jpg
   │        ├─ halfPink.jpg
   │        ├─ hands.jpg
   │        ├─ handsPetal.jpg
   │        ├─ handsProducts.jpg
   │        ├─ leafs products.jpg
   │        ├─ logoFNY.png
   │        ├─ logoNoC.png
   │        ├─ longProducts.jpg
   │        ├─ lotion.jpg
   │        ├─ makeupNoB.jpg
   │        ├─ makup.jpg
   │        ├─ pinkMoisture.jpg
   │        ├─ pinkMoistureCotton.jpg
   │        ├─ pinkMoistureStand.jpg
   │        ├─ productswleaf.jpg
   │        ├─ pumpBottle.jpg
   │        ├─ singlSpray.jpg
   │        ├─ singleBottle.jpg
   │        ├─ singleBox.jpg
   │        ├─ soaps.jpg
   │        ├─ sulfate.png
   │        ├─ toner.jpg
   │        └─ vegan.png
   ├─ firebase.js
   ├─ index.css
   ├─ index.js
   ├─ polyfills.js
   ├─ reducers
   │  ├─ admin-reducer.js
   │  ├─ current-user-reducer.js
   │  ├─ edit-reducer.js
   │  ├─ form-visible-reducer.js
   │  ├─ index.js
   │  ├─ landing-page-reducer.js
   │  └─ selected-item-reducer.js
   └─ store.js

```