ITEventApp.controller(
    'wallController', [ '$scope',
        function( $scope ) {

            // Conference model
            $scope.text = "";
            $scope.posts = [
                {
                    user: {
                        mail: "johnsmith@mail.fr"
                    },
                    text: "Here's his Girl with Roses. Painter Lucian Freud was also born on December 8th a few years later - in 1922.",
                    time: Date.now(),
                    tags: [ "Categorie 1" ],
                    likes: 1,
                    liked: false
                },
                {
                    user: {
                        mail: "jaredsmooth@mail.fr"
                    },
                    text: "Here's his Girl with Roses. Painter Lucian Freud was also born on December 8th a few years later - in 1922.",
                    time: Date.now(),
                    tags: [ "Categorie 2" ],
                    likes: 1,
                    liked: false
                },
                {
                    user: {
                        mail: "janeparker@mail.fr"
                    },
                    text: "Here's his Girl with Roses. Painter Lucian Freud was also born on December 8th a few years later - in 1922.",
                    time: Date.now(),
                    tags: [ "Categorie 2", "Categorie 1" ],
                    likes: 1,
                    liked: false
                }
            ];

            $scope.like = function( post ) {
                if ( !post.liked ) {
                    post.liked = true;
                    post.likes++;
                }
            }

            $scope.post = function() {
                if ( $scope.text ) {
                    var post = {
                        user: {
                            mail: "jaredsmooth@mail.fr"
                        },
                        text: $scope.text,
                        time: Date.now(),
                        categories: $( '#multi' )
                            .val(),
                        likes: 1,
                        liked: true
                    }

                    $scope.posts.push( post );
                    $scope.text = "";
                }
            }

            $scope.log = function( l ) {
                console.log( l );
            }
    } ] );
