 $(function() {
     var $id = $('#value');
     var $name = $('#name');
     var $gender = $('#gender');
     var $age = $('#age');
     var $company = $('#company');
     var $email = $('#email');
     var $phone = $('#phone');
     var $DOB = $('#DOB');
     var $address = $('#address');



     $('#Search').on('click', function() {

             $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');

             var details = {
                 id: $id.val(),
             };
             $.ajax({
                     dataType: 'json',
                     url: "http://localhost:8080/employee?id=" + details,
                     data: details,

                     success: function(data) {
                         $.each(data, function(i, obj)) {
                             $("#det").append('<tr> <td>' + obj.id + ' </td> <td> ' + obj.name + ' </td> <td> ' + obj.gender + ' </td> <td> ' + obj.company + ' </td><td> ' + obj.email + ' </td> <td> ' + obj.phone + ' > </td> <td> ' + obj.address + '</td>  </tr>';)

                         });


                 },
                 error: function() {

                     console.log("error message");

                 }

             });
     }); 
 $('#load').on('click', function() {

         $.ajax({
                 dataType: 'json',
                 url: "http://localhost:8080/employee/",
                 // data: details,

                 success: function(data) {
                     $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>Address</th> </tr> ');
                     // console.log(success);

                     $.each(data, function(i, obj)) {
                         $("#det").append('<tr> <td>' + obj.id + ' </td> <td> ' + obj.name + ' </td> <td> ' + obj.gender + ' </td> <td> ' + obj.company + ' </td><td> ' + obj.email + ' </td> <td> ' + obj.phone + ' > </td> <td> ' + obj.address + '</td>  </tr>';)

                     });


             },
             error: function() {

                 console.log("error message");

             }

         });
 });


 $('#submit').on('click', function() {
 // var r= $('<input type="button" value="update"/>');
 var details = {
     name: $name.val(),
     gender: $gender.val(),
     age: $age.val(),
     company: $company.val(),
     email: $email.val(),
     age: $age.val(),
     phone: $phone.val(),
     DOB: $DOB.val(),
     address: $address.val()
 };


 $.ajax({
         dataType: 'POST',
         url: "http://localhost:8080/",
         data: details,

         success: function(data) {
             $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>Address</th> </tr> ');
             // console.log(success);

             $.each(data, function(i, obj)) {
                 $("#det").append('<tr> <td>' + obj.id + ' </td> <td> ' + obj.name + ' </td> <td> ' + obj.gender + ' </td> <td> ' + obj.company + ' </td><td> ' + obj.email + ' </td> <td> ' + obj.phone + ' > </td> <td> ' + obj.address + '</td>  </tr>';)

             });

     },
     error: function() {

         console.log("error message");

     }

 });
 });
 });
