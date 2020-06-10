const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/todoList');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

// var tasks = [
//     {
//         name: "Complete Home Work",
//         category: "school",
//         date: "5/06/2020",
//         select: false
//     },
//     {
//         name: "Morning Exercise",
//         category: "personal",
//         date: "10/06/2020",
//         select: true
//     }
// ]

// For Rendering Home.ejs
app.get('/', function(req, res){

    Todo.find({}, function(err, ToDoTasks){
        if(err){
            console.log("Error in Fetching Tasks from database");
            return;
        }

        return res.render('home', {
                 title : 'My ToDo List',
                 task_list: ToDoTasks
                });

    });

    // return res.render('home', {
    //      title : 'My ToDo List',
    //      task_list: tasks
    //     });

});

// For Creating a task
app.post('/create_task', function(req, res){

    Todo.create(req.body, function(err, newTask){
        if(err){
            console.log("Error in Creating Task");
            return;
        }

        return res.redirect('back');
    });

    // tasks.push(req.body);
    // return res.redirect('back');
});

// For Selecting Task for complete (i.e. select:true)
app.get('/select-task', function(req, res){
    
    Todo.findByIdAndUpdate(req.query.id,{
        $set:{
            select: true
        }
    },
    { useFindAndModify: false },
    function(err, result){
            if(err) { console.log("Error in updating database"); return;}
            return res.redirect('back');
        }
    );
    
    
    // let index = req.params.index;
    // let select_status = Todo[index].select;
    // console.log(select_status);
    // if(select_status) {
    //     tasks[index].select = false;
    // } else {
    //     tasks[index].select = true;
    // }

    // return res.redirect('back');
});

// For deSelecting Task for complete (i.e. select:false)
app.get('/deselect-task', function(req, res){
    Todo.findByIdAndUpdate(req.query.id,{
        $set:{
            select: false
        }
    },
    { useFindAndModify: false },
    function(err, result){
            if(err) { console.log("Error in updating database"); return;}
            return res.redirect('back');
        }
    );
});

// For deleting Tasks
app.get('/delete-task', function(req, res){

    Todo.deleteMany({"select": true},function(err){
        if(err){ console.log("Error in deleting Tasks"); return}

        return res.redirect('back');
    });

    // for(let i = 0; i < tasks.length; i++) 
    // {
    //    if(tasks[i].select) {
    //        tasks.splice(i, 1);
    //        i--;
    //    }
       
    // }

    // return res.redirect('back');
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