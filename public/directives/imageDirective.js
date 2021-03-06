app.directive('fileread', function(studentProfileSvc) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind("change", function(changeEvent) {

        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          var encodedImage = loadEvent.target.result;
          console.log('this is encoded Image', encodedImage);


          var tempArray = elem[0].value.split('\\');
          console.log('this is tempArray', tempArray);
          var fileName = tempArray[tempArray.length - 1];
          studentProfileSvc.storeImage(encodedImage, fileName).then(
            function(result) {
              console.log('this is S3 result', result);
              scope.studentData.picture = result.data.Location;
            })
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
});
