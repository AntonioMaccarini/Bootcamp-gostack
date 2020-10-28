const express = require('express');

//console.log(express);

const server = express();
const projects=[];

server.use(express.json()); 

server.use((req,res,next)=>{
    console.time('Request');
    console.log(`Metodo: ${req.method}; URL: ${req.url}`);

    next();
    console.timeEnd('Request');
});
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
  
    if (!project) {
      return res.status(400).json({ error: 'Project not found' });      
}
return next();
}

// 3 tipos de informação
// Query paramas = ?teste=1
// Route params = /users/1
// Request body = {"name":"Diego","email:"}

// CRUD create read update delete

server.post('/projects', (req,res)=>{
    const {id}=req.body;
    const {title}=req.body;

    const project = {id, title, tasks: []};

    projects.push(project);
    return res.json(projects);
})

server.get('/projects', (req,res)=>{
    return res.json(projects);
})

server.put('/projects/:id', checkProjectExists,(req,res)=>{

    const {id}=req.params;
    const {title}=req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);

})

server.delete('/projects/:id',checkProjectExists,(req, res) => {
    const { id } = req.params;
  
    const projectIndex = projects.findIndex(p => p.id == id);
  
    projects.splice(projectIndex, 1);
  
    return res.send();
});

server.post('/projects/:id/tasks',checkProjectExists, (req,res)=>{
    const {id}=req.params;
    const {title}=req.body;

    const projectTask = projects.find(p => p.id == id);

    projectTask.tasks.push(title);
    return res.json(projectTask);
})


server.listen(2000); 