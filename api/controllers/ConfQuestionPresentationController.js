/**
 * ConfQuestionPresentationController
 *
 * @description :: Server-side logic for managing Confquestionpresentations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `ConfQuestionPresentationController.create()`
   */
  create: function (req, res) {
    ConfQuestionPresentation.create({
      question: req.param('question'),
      user: req.session.user
    }).exec(function(err, created){
      if( err ) return res.json({
        done: false
      });

      return res.json({
        done: true,
        question: created
      });
    });
  },

  /**
   * `ConfQuestionPresentationController.like()`
   */
  like: function (req, res) {
    ConfQuestionPresentation.findOne(req.param('question')).exec(function(err, question){
      if( err || !question || question.isAnswered || question.user == req.session.user ) return res.json({
        done: false
      });

      // When there is a question and is not the actual who posted her, try to find him a like
      ConfQuestionPresentationLike.findOne({ question: question.id, user: req.session.user }).exec(function(err, like) {
        if( err || like ) return res.json({
          done: false
        });

        // If no like before, let's like it
        ConfQuestionPresentationLike.create({
          question: req.param('question'),
          user: req.session.user,
          isLiked: true
        }).exec(function(err, created){
          if( err ) return res.json({
            done: false
          });

          return res.json({
            done: true,
            like: created
          });

        });

      });

    });
  },


  /**
   * `ConfQuestionPresentationController.dislike()`
   */
  dislike: function (req, res) {
    ConfQuestionPresentation.findOne(req.param('question')).exec(function(err, question){
      if( err || !question || question.isAnswered || question.user == req.session.user ) return res.json({
        done: false
      });

      // When there is a question and is not the actual who posted her, try to find him a like
      ConfQuestionPresentationLike.findOne({ question: question.id, user: req.session.user }).exec(function(err, like) {
        if( err || like ) return res.json({
          done: false
        });

        // If no like before, let's like it
        ConfQuestionPresentationLike.create({
          question: req.param('question'),
          user: req.session.user,
          isLiked: false
        }).exec(function(err, created){
          if( err ) return res.json({
            done: false
          });

          return res.json({
            done: true,
            like: created
          });

        });

      });

    });
  }
};

