let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/:time',function (req, res) {
    function unixToNatural( unix ){
        let date = new Date( unix * 1000 );
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let month = months[date.getMonth()];
        let day = date.getDay();
        let year = date.getFullYear();
        let result = month +' '+ day +', '+year;
        return result;
    }

   if(!isNaN(req.params.time)){
       let result = unixToNatural(req.params.time);
       let data = {unix:req.params.time, natural:result};
       res.json(data);
   } else {
       let natural = new Date(req.params.time);
       if(!isNaN(natural)){
           let unix = natural / 1000;
           let data = {unix: unix, natural:req.params.time };
           res.json(data);

       } else {
           res.json({ unix:null, natural:null });
       }
   }
});

module.exports = router;
