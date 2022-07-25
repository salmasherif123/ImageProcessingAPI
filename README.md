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
