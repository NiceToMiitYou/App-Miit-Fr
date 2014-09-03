/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/


  /******************
   * Chat Controller
   ******************/

  'POST /api/chatroom/create': {
    controller: 'ConfChatController',
    action: 'create'
  },

  'GET /api/chatroom/list': {
    controller: 'ConfChatController',
    action: 'list'
  },

  'POST /api/chatroom/send': {
    controller: 'ConfChatController',
    action: 'send'
  },

  /******************
   * User Controller
   ******************/
   
  'POST /api/user/login': {
    controller: 'ConfUserController',
    action: 'login'
  },

  'GET /api/user/logout': {
    controller: 'ConfUserController',
    action: 'logout' 
  },

  /******************
   * Presentation Question Controller
   ******************/
   
  'POST /api/question/presentation/create': {
    controller: 'ConfQuestionPresentationController',
    action: 'create'
  },

  'POST /api/question/presentation/like': {
    controller: 'ConfQuestionPresentationController',
    action: 'like'
  },

  /******************
   * Quizz Question Controller
   ******************/

  'GET /api/question/quizz/list': {
    controller: 'ConfQuestionQuizzController',
    action: 'list'
  },

  'POST /api/question/quizz/questions': {
    controller: 'ConfQuestionQuizzController',
    action: 'questions'
  },

  'POST /api/question/quizz/answer': {
    controller: 'ConfQuestionQuizzController',
    action: 'answer'
  },

  /******************
   * Note Controller
   ******************/
   
  'POST /api/note/create': {
    controller: 'ConfNoteController',
    action: 'create'
  },

  'POST /api/note/update': {
    controller: 'ConfNoteController',
    action: 'update'
  },

  'POST /api/note/delete': {
    controller: 'ConfNoteController',
    action: 'delete'
  },

  'POST /api/note/send': {
    controller: 'ConfNoteController',
    action: 'send'
  },
};
