
var Connect = (function(){
  return {
    // Chat actions
    chatroom: {
      // List all chatrooms
      list: function(cb) {
        io.socket.get('/api/chatroom/list', {}, cb);
      },

      // Send a message to the chatroom
      send: function(chatroom, message, cb) {
        io.socket.post('/api/chatroom/send', { message: message, chatroom: chatroom } , cb);
      },

      // Subscribe to a chatroom
      subscribe: function(chatroom, handler, cb) {
        io.socket.post('/api/chatroom/subscribe', { chatroom: chatroom }, function(res) {
          if( res.done ) {
            io.socket.removeAllListeners('chatroom-' + chatroom + '-new');
            io.socket.on('chatroom-' + chatroom + '-new', handler);
          }
          if(typeof cb == 'function') {
            cb(res);
          }
        });
      },

      // Unsubscribe to a chatroom
      unsubscribe: function(chatroom, cb) {
        io.socket.post('/api/chatroom/unsubscribe', { chatroom: chatroom }, function(res) {
          if( res.done ){
            io.socket.removeAllListeners('chatroom-' + chatroom + '-new');
          }
          if(typeof cb == 'function') {
            cb(res);
          }
        });
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

    // Question Action
    question: {
      
      // Question about presentation
      presentation: {
        // Create a new question
        create: function(question, cb) {
          io.socket.post('/api/question/presentation/create', { question: question }, cb);
        },

        // Like a question
        like: function(question, cb) {
          io.socket.post('/api/question/presentation/like', { question: question }, cb);
        },

        // Dislike a question
        dislike: function(question, cb) {
          io.socket.post('/api/question/presentation/dislike', { question: question }, cb);
        }
      }

    },

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
    }
  };
})();