$(function() {

	$('#text-editor').height($(window).height()-200);

	$(".add-note a").on("click", function() {
		$("ul.notes-list").prepend('<li><a href="#"><i class="fa fa-paperclip"></i><span>Note '+ $("ul.notes-list li").length +'</span></a></li>');
	});

	$('table th .checkall').on('click', function () {
	    if ($(this).is(':checked')) {
	        $(this).closest('table').find(':checkbox').attr('checked', true);
	        $(this).closest('table').find('tr').addClass('row_selected');
	        //$(this).parent().parent().parent().toggleClass('row_selected');	
	    } else {
	        $(this).closest('table').find(':checkbox').attr('checked', false);
	        $(this).closest('table').find('tr').removeClass('row_selected');
	    }
	});

	$('table .checkbox input').on("click", function() {			
		if($(this).is(':checked')){			
			$(this).parent().parent().parent().toggleClass('row_selected');					
		}
		else{	
			$(this).parent().parent().parent().toggleClass('row_selected');		
		}
	});


})

$(window).load(function() {

});