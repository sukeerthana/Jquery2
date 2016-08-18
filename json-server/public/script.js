 $(function() {
     $('#prev').hide();
     $('#next').hide();
     $("#DOB").click(function() {
         $(this).prop('type', 'date');

     });
     var $id = $('#value');
     var $name = $('#name');
     var $gender = $('#gender');
     var $age = $('#age');
     var $company = $('#company');
     var $email = $('#email');
     var $phone = $('#phone');
     var $DOB = $('#DOB');
     var movieTemplate = $('#movie-template').html();

     function adddata(obj) {
         $('#det').append(Mustache.render(movieTemplate, obj));

     }

     $('#Search').on('click', function() {
         var id = $id.val();

         if (id == "") {
             alert('Enter a number');
         } else {
             $.ajax({
                 dataType: 'json',
                 url: "http://localhost:8080/employee?id=" + id,
                 success: function(data) {
                     if (data.length != 0) {
                         $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>Religion</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');
                         // console.log(data);
                         $.each(data, function(i, data) {
                             adddata(data);
                         });
                     } else if (data.NaN) {
                         alert("please enter numbers");
                     } else {
                         alert("data not found")
                     }
                 },
                 error: function() {
                     console.log("error message");
                 }
             });
         }
     });
     var page = 0;
     $('#load').on('click', function() {
         if (page == 0) {
             $("#prev").prop('disabled', true);
         }
         $.ajax({
             dataType: 'json',
             url: "http://localhost:8080/employee?_start=" + page + " &_limit=10 ",

             success: function(data) {
                 $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');
                 $('#prev').show();
                 $('#next').show();
                 $.each(data, function(i, obj) {
                     adddata(obj);
                 });
             },
             error: function() {
                 console.log("error message");
             }

         });
     });
     $('#next').on('click', function() {
         page = page + 10;
         if (page > 0) {
             $("#prev").prop('disabled', false);
         }
         if (page == 40000) {
             $("#next").prop('disabled', true);
         }
         $.ajax({

             dataType: 'json',
             url: "http://localhost:8080/employee?_start=" + page + "&_limit=10&_sort=name&_order=ASC  ",
             success: function(data) {

                 $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');
                 $.each(data, function(i, obj) {
                     adddata(obj);
                 });
             },
             error: function() {
                 console.log("error message");
             }

         });
     });
     $('#prev').on('click', function() {
         $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');
         if (page > 10) {
             $("#prev").prop('disabled', false);
         }
         page = page - 10;

         $.ajax({

             dataType: 'json',
             url: "http://localhost:8080/employee?_start=" + page + " &_limit=10&_sort=name&_order=ASC  ",
             success: function(data) {

                 $.each(data, function(i, obj) {
                     adddata(obj);
                 });
             },
             error: function() {
                 console.log("error message");
             }

         });
     });

     $('#form1').on('submit', function() {
         var details = {
             name: $name.val(),
             gender:  $('input[name=gender]:checked').val(),
             age: $age.val(),
             company: $company.val(),
             email: $email.val(),
             phone: $phone.val(),
             DOB: $DOB.val()

         };
         $('#det').html(' <tr> <th>Id</th>  <th>Name</th> <th>Gender</th> <th>Age</th> <th>company</th> <th>Email</th>  <th>Phone</th> <th>DOB</th>  </tr> ');
         $.ajax({
             type: 'post',
             url: "http://localhost:8080/employee",
             data: details,
             success: function(detail) {
                 console.log(detail.name);
                 adddata(detail);

             },
             error: function() {
                 console.log("error message");

             }

         });
     });


     $("#det").delegate('#delete', 'click', function() {
         var $tr = $(this).closest('tr');
         var id = $(this).attr('data-id');
         console.log(id);
         $.ajax({
             type: 'DELETE',
             url: 'http://localhost:8080/employee/' + id,
             success: function() {

                 $tr.fadeOut(300, function() {
                     $(this).remove();
                 });
                 alert('deleted successfully');
             },
             error: function() {
                 console.log("error");
             }
         });
     });

     $('#det').delegate('.editOrder', 'click', function() {
         console.log('hi');
         var $tr = $(this).closest('tr');
         var id = $(this).attr('data-id');
         $tr.find('input.name').val($tr.find('span.name').html());
         $tr.find('input.gender').val($tr.find('span.gender').html());
         $tr.find('input.age').val($tr.find('span.age').html());
         $tr.find('input.company').val($tr.find('span.company').html());
         $tr.find('input.email').val($tr.find('span.email').html());
         $tr.find('input.phone').val($tr.find('span.phone').html());
         $tr.find('input.DOB').val($tr.find('span.DOB').html());

         $tr.find('td').addClass('edit');
     });
     $('#det').delegate('#save', 'click', function() {   
         var $tr = $(this).closest('tr');    
         var record = {           
             name: $tr.find('input.name').val(),
              gender: $tr.find('input.gender').val(),
               age: $tr.find('input.age').val(),
              company: $tr.find('input.company').val(),
             email: $tr.find('input.email').val(),
                   phone: $tr.find('input.phone').val(),
                        DOB: $tr.find('input.DOB').val()    
         };    
         $.ajax({      
             type: 'PUT',
                   url: 'http://localhost:8080/employee/' + $(this).attr('data-id'),
                   data: record,
                   success: function(Details) {                // $results.html('<tr> <th>ID</th> <br> <th>NAME</th> <th>GENDER</th> <th>AGE</th> <th>PHONE</th>  <th>COURSES</th> <th>EMAIL</th> <th></th><th></th></tr> ');
                 //          adddata(Details);         
                 // alert("added"); 
                 $tr.find('span.name').html(record.name);    
                 $tr.find('span.gender').html(record.gender);     
                 $tr.find('span.age').html(record.age);     
                 $tr.find('span.company').html(record.company); 
                 $tr.find('span.email').html(record.company);       
                 $tr.find('span.phone').html(record.phone); 

                 $tr.find('span.DOB').html(record.DOB);

                 $tr.find('td').removeClass('edit');     
             },
                   error: function() {        
                 console.log("error");      
             }    
         });
     });
     $('#det').delegate('#cancel', 'click', function() {       
         var $tr = $(this).closest('tr');    
         $tr.find('td').removeClass('edit');


     });



 });
