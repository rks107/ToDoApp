const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var tasks = [
    {
        name: "Complete Home Work",
        category: "school",
        date: "5/06/2020",
        select: false
    },
    {
        name: "Morning Exercise",
        category: "personal",
        date: "10/06/2020",
        select: true
    }
]

app.get('/', function(req, res){

    return res.render('home', {
         title : 'My ToDo List',
         task_list: tasks
        });

});

app.post('/create_task', function(req, res){

    tasks.push(req.body);
    return res.redirect('back');
});

app.get('/select-task/:index', function(req, res){

    let index = req.params.index;
    let select_status = tasks[index].select;
    if(select_status) {
        tasks[index].select = false;
    } else {
        tasks[index].select = true;
    }

    return res.redirect('back');
});

app.get('/delete-task', function(req, res){
    for(let i = 0; i < tasks.length; i++) 
    {
       if(tasks[i].select) {
           tasks.splice(i, 1);
           i--;
       }
       
    }

    return res.redirect('back');
});


app.listen(port, function(err){
    if(err) {
        console.log("Error in running the server",err);
    }

    console.log("Server is up and running on port: ", port);
});


// const http = require('http');
// const port = 8000;
// const fs = require('fs');

// function requestHandler(req, res) {
//     console.log(req.url);

//     res.writeHead(200,{'content-type':'text/html'});

//     fs.readFile('./index.html', function(err, data){
//         if(err) {
//             console.log("error",err);
//             return res.end('Error');
//         }

//         res.end(data);
//     });
//     // res.end('<h1>Gotha!</h1>');
// }

// const server = http.createServer(requestHandler);

// server.listen(port, function(err){
//     if(err) {
//         console.log("Error in runing server", err);
//         return;
//     }

//     console.log('Server is up and running on port', port);
// });