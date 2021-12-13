const express = require('express')
const Diary = require('../models/diary')
const multer = require('multer')
const session = require('express-session')
const path = require('path')
// const auth = require('../middleware/auth')

const router = new express.Router()

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.slice(0,-4) + path.extname(file.originalname))
    },
});

var upload = multer({storage: storage});

router.post('/diarys', upload.single('image'), async (req, res) => {
    const diary = new Diary({
       file_name: req.body.file_name,
       description: req.body.description,
       image: req.file.filename,
    });

    try {
        await diary.save()
        req.flash('message', 'Saved successfully!');
        res.redirect('diaryList')
    } catch (e) {
        res.render('diaryList', { message: 'Invalid request!' });
    }
});

router.get('/diarys', (req, res) => {
    res.render('add_diarys')
})

router.get('/diaryList', (req, res) => {
    Diary.find({}, function (err,diaries){
            res.render('diaryList', {
                diaryList: diaries,
                message: req.flash('message')});
        }
    )
    
})

  /* GET SINGLE Diary BY ID */
  router.get('/edit/:id', function(req, res) {
    Diary.findById(req.params.id, function (err, diaries) {
      if (err) {
        res.redirect('diaryList')
      } else {
        res.render('edit_diarys', {diaryDetail: diaries });
      }
    });
  });

  /* UPDATE Diary */
// router.post('/edit/:id', upload.single('picture'), function(req, res) {
//     const img = req.file.filename;
//     console.log(req.body.picture);
//     const diary = new Diary({
//         image: req.file.filename,
//      });

//     Diary.findByIdAndUpdate(req.params.id, req.body, diary, function (err) {
//       if(err){
//         res.redirect('/edit/'+req.params.id);
//     } else {
//       res.redirect('/edit/'+req.params.id);
//     }

//     });
//   });

  router.post('/edit/:id', upload.single('picture'), async (req, res) => {
    
    const update = Diary.findByIdAndUpdate(req.params.id, {
        file_name: req.body.file_name,
       description: req.body.description,
       image: req.file.filename,
    });
    update.exec(function(err,data){
            if (err) {
              req.flash('message', 'Please try again!..');
              res.redirect('/diaryList');
            } else {
              req.flash('message', 'Updated successfully!');
              res.redirect('/diaryList')
            }
    })

   
});

   /* DELETE Diary BY ID */
router.get('/delete/:id', function(req, res) {
    Diary.findByIdAndRemove(req.params.id, function (err, project) {
      if (err) {
        req.flash('message', 'Record not deleted successfully.');
        res.redirect('/diaryList');
      } else {
        req.flash('message', 'Record deleted successfully.');
        res.redirect('/diaryList');
      }
    });
  });

module.exports = router