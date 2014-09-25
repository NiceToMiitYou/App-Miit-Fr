( function( jQuery ) {
    window.Login = ( function() {
        var emailField,
            passwordField,
            termsOfUseField,
            submitField;

        function initializeFields() {
            emailField = jQuery( '#login_email' );
            passwordField = jQuery( '#login_pass' );
            termsOfUseField = jQuery( '#login_terms' );
            submitField = jQuery( '#login_submit' );
        }

        return {
            initialize: function() {
                initializeFields();

            }
        };
    } )();
} )( jQuery );
