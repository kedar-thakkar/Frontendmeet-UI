

// Participants Start
  $(".enter-mail-id").keydown(function (e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
      //alert('You Press enter');
      var getValue = $(this).val();
      $('.all-mail').append('<div class="email-ids">'+ getValue +' <div class="cancel-email">x</div></div>');
      $(this).val('');
    }
  });
  /// Cancel 
  $(document).on('click','.cancel-email',function(){
    $(this).parent().remove();
  });
// $('.enter-mail-id').click()
// Participants End


// $(function () {
//   var start_date1 ='';
//   var end_date1 = '';
//   if(start_date1=='' && end_date1=='')
//   {
//    $('#datetimepicker1').datetimepicker({
//        useCurrent: false,
//        format: 'DD/MM/YYYY'
//    }).on('dp.change', function(e){
//      console.log('here1');
//      console.log(e);
  
//      $(".day").click(function(){
//       $("a[data-action='togglePicker']").trigger('click');
//     });


//      $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
  
      
//    });
  
  
//     $('#datetimepicker2').datetimepicker({
//       useCurrent: false,
//       format: 'DD/MM/YYYY'
//       }).on('dp.change', function(e){
//       console.log(e);
//       console.log('here2');
//       $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
//     });
//     }
//   });

//   $("#beacon").change(function(){
//     alert($(this).val());
// });




// $(document).ready(function () {
//   $('#datepicker').datepicker();
// });





  //  Tabs Js 
  $('.nav_tabs:first-child').addClass('active');
  $('.login_tabs_row').addClass('active').fadeOut();
  $('.login_tabs_row:first-child').addClass('active').fadeIn();
    function moveMarker() {
      var activeNav = $('.active a');
      var activewidth = $(activeNav).width() + 30;
      // var activewidthExtra = activewidth + '33px';
      var totalWidth = activewidth;
      
      var precedingAnchorWidth = anchorWidthCounter();
      
      // TODO: 
      // Find the total widths of all of the anchors
      // to the left of the active anchor.

      var activeMarker = $('.active-marker');
      $(activeMarker).css('display','block');
      
      $(activeMarker).css('width', totalWidth);

      $(activeMarker).css('left', precedingAnchorWidth);
      
      // TODO: 
      // Using the calculated total widths of preceding anchors,
      // Set the left: css value to that number.
    }
    moveMarker();
    
    function anchorWidthCounter() {
      var anchorWidths = 0;
      var a;
      var aWidth;
      var aPadLeft;
      var aPadRight;
      var aTotalWidth;
      $('.nav_tabs').each(function(index, elem) {
        var activeTest = $(elem).hasClass('active');
        if(activeTest) {
          // Break out of the each function.
          return false;
        }

        a = $(elem).find('a');
        aWidth = a.width();
        aPadRight = parseFloat(a.css('margin-right'));
        aTotalWidth = aWidth + aPadRight;

        anchorWidths = anchorWidths + aTotalWidth;
      });

      return anchorWidths;
    }
    
    $(".nav_tabs a").on("click", function(e) {
      // console.log('Called');
      var i = $(this).attr("href");
      $(this).parent().addClass("active").siblings().removeClass("active"),
      // $(i).addClass("active").siblings().removeClass("active"), 
      $(i).addClass("active info").fadeIn().siblings().removeClass("active info").fadeOut(), 
      e.preventDefault();
      moveMarker();
      
    }); 
//  Tabs Js End 



$(document).ready(function(){
	$('.js-edit, .js-save').on('click', function(){
  	var $form = $(this).closest('.profile_input_edit');
  	$form.toggleClass('is-readonly is-editing');
    var isReadonly  = $form.hasClass('is-readonly');
    $form.find('input,textarea').prop('disabled', isReadonly);
  });
});



$(".profile_input_edit a").click(function(){
  $(".Password_reset_box:first").addClass("intro");
});
$(".remove_password_box").click(function(){
  $(".Password_reset_box:first").removeClass("intro");
});


