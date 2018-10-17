const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

app.set('View Engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});



app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} : ${req.method} : ${req.path}`;
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('Unable to append in to server.log');
        }
    })
    console.log(log);
    next();

});


// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('about.hbs',{
        htmlTitle: 'Home',
        pageTitle: 'Home',
        welcomeMeassage: 'Hallo Prafull, Have a nice day.',
        
    });
});

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        htmlTitle: 'About',
        pageTitle: 'About Page From Main Page',
        welcomeMeassage: 'Hallo Prafull, Have a nice day. this is about page',
        
    });
})


app.listen(port, ()=>{
    console.log(`Server is live now on ${port} port..`);
});