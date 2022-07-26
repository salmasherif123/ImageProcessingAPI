# ImageProcessingAPI

This project about image processing api

## Scripts

`npm start` to run the server

`npm test` to build and test using jasmine together
 
 `npm build` to build the project
 
 ## EndPoints
 
 **imageprocessingSpec file includes all test functions**
 
 using supertest
 
 `returns successful code` for successful testing
 
 * 200 : ok 
 
 **1. name validation test function**
 
 **2. name invalidation test function**
 
 **3. width and height data type correctness**
 
 **4. image existance**
 
 ## Error Handling
 
 `returns Error code`
 
 * 406 : not acceptable for wrong data type user input
 
 * 400 : bad request
 
 ## additional functions
 
 *using sharp library*
 
 **1- `resizeImage(args)` for resizing both image width and height**
 
 **2- `resizeHeight(args)` for resizing image width only**
 
 **3- `resizeWidth(args)` for resizing image height only**
 
 *using filename **fs** and path **path** libraries*
 
* **`getImageDir(args)` for getting the directory of the image**

## Access EndPoints 

* Main URL `http://localhost:3000/` : returns text message 

### /api

`http://localhost:3000/api` : returns text message 

###  /api/imageprocessing

`http://localhost:3000/api/imageprocessing` : returns bad request because it requires query string consists of image name at least

### /api/imageprocessing?name=*imageName*

`http://localhost:3000/api/imageprocessing?name=imageName` : returns 200 ok and the required image

### /api/imageprocessing?name=*imageName*&width=*width*&height=*height*

`http://localhost:3000/api/imageprocessing?name=imageName&width=width&height=height` : return resized image 

### /api/imageprocessing?name=*imageName*&width=*width*

`http://localhost:3000/api/imageprocessing?name=imageName&width=width` : return resized image with width only

### /api/imageprocessing?name=*imageName*&height=*height*

`http://localhost:3000/api/imageprocessing?name=imageName&height=height` : return resized image with height only
