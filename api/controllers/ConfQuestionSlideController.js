/**
 * ConfQuestionSlideController
 *
 * @description :: Server-side logic for managing Confquestionslides
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  /**
   * `ConfQuestionSlideController.question()`
   */
  question: function (req, res) {
    ConfQuestionSlide.findOne({ slide: req.param('slide') }).populate('answers').exec(function(err, question) {
      if( err || !question ) return res.json({
        done: false
      });

      return res.json({
          done: true,
          question: question
      });
    });
  },


  /**
   * `ConfQuestionSlideController.answer()`
   */
  answer: function (req, res) {
    ConfQuestionSlide.findOne(req.param('question')).populate('answers').exec(function(err, question){
      if( err || !question || question.isClosed || !_.size(
                                      _.intersection(
                                        _.map(question.answers, 'id'), req.param('answers'))
                                      )
                                    ) return res.json({
        done: false
      });

      // Single choice question
      if( _.size(req.param('answers')) == 1 && question.type === 1 ||
          _.size(req.param('answers')) >= 1 && question.type !== 1 ) {

        ConfUser.findOne(req.session.user).populate('slideAnswers', { question: question.id }).exec(function(err, user){
          if( err || !user || 0 < _.size(user.slideAnswers) ) return res.json({
            done: false
          });

          // Register answers
          _(req.param('answers')).forEach(function(answer) {
            user.slideAnswers.add(answer);
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
