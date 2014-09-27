( function( jQuery ) {
    window.Login = ( function() {
        var loginForm,
            emailStep,
            passwordStep,
            termsStep,
            emailField,
            passwordField,
            termsOfUseField,
            previousField,
            nextField;

        function initializeFields() {
            loginForm = jQuery( '#frm_login' );
            emailStep = jQuery( '#step_email' );
            passwordStep = jQuery( '#step_password' );
            termsStep = jQuery( '#step_terms' );
            emailField = jQuery( '#login_email' );
            passwordField = jQuery( '#login_pass' );
            termsOfUseField = jQuery( '#login_terms' );
            previousField = jQuery( '#login_prev' );
            nextField = jQuery( '#login_next' );
        }

        return {
            initialize: function() {
                initializeFields();

            }
        };
    } )();
} )( jQuery );
