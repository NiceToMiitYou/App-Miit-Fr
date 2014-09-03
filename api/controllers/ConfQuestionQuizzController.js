/**
 * ConfQuestionQuizzController
 *
 * @description :: Server-side logic for managing Confquestionquizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  /**
   * `ConfQuestionQuizzController.list()`
   */
  list: function (req, res) {
    ConfQuizz.find().exec(function(err, quizz) {
      if( err || !quizz) return res.json({
        done: false
      });

      return res.json({
          done: true,
          quizz: quizz
      });
    });
  },

  /**
   * `ConfQuestionQuizzController.questions()`
   */
  questions: function (req, res) {
    ConfQuestionQuizz.find({ quizz: req.param('quizz')}).populate('answers').exec(function(err, questions) {
      if( err || !questions ) return res.json({
        done: false
      });

      return res.json({
          done: true,
          questions: questions
      });
    });
  },


  /**
   * `ConfQuestionQuizzController.answer()`
   */
  answer: function (req, res) {
    ConfQuestionQuizz.findOne(req.param('question')).populate('answers').exec(function(err, question){
      if( err || !question || !_.size(
                                      _.intersection(
                                        _.map(question.answers, 'id'), req.param('answers'))
                                      )
                                    ) return res.json({
        done: false
      });

        _.intersection(_.map(question.answers, 'id'), req.param('answers'))

      // Single choice question
      if( _.size(req.param('answers')) == 1 && question.type === 1 ||
          _.size(req.param('answers')) >= 1 && question.type !== 1 ) {

        ConfUser.findOne(req.session.user).populate('quizzAnswers', { question: question.id }).exec(function(err, user){
          if( err || !user || 0 < _.size(user.quizzAnswers) ) return res.json({
            done: false
          });

          // Register answers
          _(req.param('answers')).forEach(function(answer) {
            user.quizzAnswers.add(answer);
          });
        
          // Save result
          user.save(function(err, result){

            if( err ) return res.json({
              done: false
            });

            return res.json({
              done: true
            });
          });

        });

      // Single choice but with many answers
      } else {
        return res.json({
          done: false
        });

      }
    });
  }
};
