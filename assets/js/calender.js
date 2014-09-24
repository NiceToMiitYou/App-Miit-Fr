/* Webarch Admin Dashboard 
-----------------------------------------------------------------*/
$( document )
    .ready( function() {


        /* initialize the calendar
		-----------------------------------------------------------------*/

        $( '#calendar' )
            .fullCalendar( {
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function( date, allDay ) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $( this )
                        .data( 'eventObject' );

                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend( {}, originalEventObject );

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $( '#calendar' )
                        .fullCalendar( 'renderEvent', copiedEventObject, true );

                    // is the "remove after drop" checkbox checked?
                    if ( $( '#drop-remove' )
                        .is( ':checked' ) ) {
                        // if so, remove the element from the "Draggable Events" list
                        $( this )
                            .remove();
                    }

                }
            } );
        /* Hide Default header : coz our bottons look awesome */
        $( '.fc-header' )
            .hide();

        //Get the current date and display on the tile
        var currentDate = $( '#calendar' )
            .fullCalendar( 'getDate' );

        $( '#calender-current-day' )
            .html( $.fullCalendar.formatDate( currentDate, "dddd" ) );
        $( '#calender-current-date' )
            .html( $.fullCalendar.formatDate( currentDate, "MMM yyyy" ) );


        $( '#calender-prev' )
            .click( function() {
                $( '#calendar' )
                    .fullCalendar( 'prev' );
                currentDate = $( '#calendar' )
                    .fullCalendar( 'getDate' );
                $( '#calender-current-day' )
                    .html( $.fullCalendar.formatDate( currentDate, "dddd" ) );
                $( '#calender-current-date' )
                    .html( $.fullCalendar.formatDate( currentDate, "MMM yyyy" ) );
            } );
        $( '#calender-next' )
            .click( function() {
                $( '#calendar' )
                    .fullCalendar( 'next' );
                currentDate = $( '#calendar' )
                    .fullCalendar( 'getDate' );
                $( '#calender-current-day' )
                    .html( $.fullCalendar.formatDate( currentDate, "dddd" ) );
                $( '#calender-current-date' )
                    .html( $.fullCalendar.formatDate( currentDate, "MMM yyyy" ) );
            } );

        $( '#change-view-month' )
            .click( function() {
                $( '#calendar' )
                    .fullCalendar( 'changeView', 'month' );
            } );

        $( '#change-view-week' )
            .click( function() {
                $( '#calendar' )
                    .fullCalendar( 'changeView', 'agendaWeek' );
            } );
        $( '#change-view-day' )
            .click( function() {
                $( '#calendar' )
                    .fullCalendar( 'changeView', 'agendaDay' );
            } );
    } );
