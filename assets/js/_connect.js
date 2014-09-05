
var Connect = (function(){
  var eventsCallbacks = {};

  lastestToken = 0;

  return {
    // Bind an event
    bind: function(event, cb) {
      eventsCallbacks[event] = cb;

      io.socket.on(event, function(cache) {

        console.log('Event number: ' + cache.token);

        if( lastestToken + 1 >= cache.token ) {
          lastestToken ++;

          if( typeof cb == 'function' )
            cb(cache.data);
        } else {
          console.log('There a missing token');
        }

      });
    },

    // Chat actions
    chatroom: {
      // List all chatrooms
      list: function(cb) {
        io.socket.get('/api/chatroom/list', {}, cb);
      },

      // Send a message to the chatroom
      send: function(chatroom, message, cb) {
        io.socket.post('/api/chatroom/send', { message: message, chatroom: chatroom } , cb);
      }
    },
    // User actions
    user: {
      // Login action
      login: function(password, cb) {
        io.socket.post('/api/user/login', { password: password }, cb);
      },
      // Logout action
      logout: function(cb) {
        io.socket.get('/api/user/logout', {}, cb);
      }
    },

    // Question Actions
    question: {
      // Questions about quizz
      quizz: {

        // List all quizz
        list: function(cb) {
          io.socket.get('/api/question/quizz/list', {}, cb);
        },

        // List all questions and answers of a quizz
        questions: function(quizz, cb) {
          io.socket.post('/api/question/quizz/questions', { quizz: quizz }, cb);
        },

        // Answer to a question
        answer: function(question, answers, cb) {
          io.socket.post('/api/question/quizz/answer', { question: question, answers: answers }, cb);
        },
      },

      // Questions about presentation
      presentation: {
        // Create a new question
        create: function(question, cb) {
          io.socket.post('/api/question/presentation/create', { question: question }, cb);
        },

        // Like a question
        like: function(question, cb) {
          io.socket.post('/api/question/presentation/like', { question: question, like: true }, cb);
        },

        // Dislike a question
        dislike: function(question, cb) {
          io.socket.post('/api/question/presentation/like', { question: question, like: false }, cb);
        }
      },

      // Questions about quizz
      slide: {

        // Get question of a slide
        question: function(slide, cb) {
          io.socket.get('/api/question/slide/question', { slide: slide }, cb);
        },

        // Answer to a question
        answer: function(question, answers, cb) {
          io.socket.post('/api/question/slide/answer', { question: question, answers: answers }, cb);
        },
      },
    },

    // Notes Actions
    note: {
      // Create a new note
      create: function(title, content, cb) {
        io.socket.post('/api/note/create', { title: title, content: content }, cb);
      },

      // Update a note
      update: function(note, title, content, cb) {
        io.socket.post('/api/note/update', { note: note, title: title, content: content }, cb);
      },

      // delete a note
      delete: function(note, cb) {
        io.socket.post('/api/note/delete', { note: note }, cb);
      },

      // send me a note
      send: function(note, cb) {
        io.socket.post('/api/note/send', { note: note }, cb);
      }
    },

    // Resources Actions
    resources: {
      list: function(cb) {
        io.socket.get('/api/resources/list', {}, cb);
      }
    }
  };
})();