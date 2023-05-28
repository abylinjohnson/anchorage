const Docker = require('dockerode');
const docker = new Docker();
const dutils = require('./utils')

exports.getAllContainers = async(req, res) =>{
    try{
        docker.listContainers({ all: true }, function (err, containers) {
            if (err) {
              console.error(err);
              return;
            }
            let all_containers = []
            containers.forEach((info)=>{
                all_containers.push({
                    id: info.Id,
                    name: info.Names[0],
                    state: info.State,
                    status: info.Status,
                    ports: info.Ports[0] || info.Ports
                })
                console.log(all_containers)
            })
            res.status(200).json(all_containers)
          });
    } catch(err){
        res.status(500).json({err: err})
    }
}   

exports.startContainer = async(req, res)=>{
    try{
        console.log(req.body)
        let contnr;
        let all_containers = []
        docker.listContainers({ all: true }, function (err, containers) {
            if (err) {
              console.error(err);

            }
            contnr = containers.filter((info)=>{
                return info.Names== "/"+req.user.username
            })
            console.log(contnr[0].Id)
            var container = docker.getContainer(contnr[0].Id);
            container.start((err, data)=>{
                if(err){
                    console.log(err)
                    res.status(500).json({err: err})
                }
                container.inspect((err, data)=>{
                    if (err) {
                        console.log('Error:', err);
                      } else {
                        res.status(200).json({message:"Started Container"})
                      }
                })
            })
          });
    }catch(err){
        res.status(500).json({err: err})
    }
}

exports.stopContainer = async(req, res)=>{
    try{
        console.log(req.body)
        let contnr;
        let all_containers = []
        docker.listContainers({ all: true }, function (err, containers) {
            if (err) {
              console.error(err);
            }
            contnr = containers.filter((info)=>{
                return info.Names== "/"+req.user.username
            })
            console.log(contnr[0].Id)
            var container = docker.getContainer(contnr[0].Id);
            try{
                container.stop((err, data)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json({err: err})
                    }
                    
                })
            }catch(err){
                res.status(200).json({message:"Stopped Container"})
            }

          });

    }catch(err){
        res.status(500).json({err: err})
    }
}

exports.getOneContainer = async(req, res)=>{
    try{
        console.log(req.body)
        let contnr;
        let all_containers = []
        docker.listContainers({ all: true }, function (err, containers) {
            if (err) {
              console.error(err);
              return;
            }
            contnr = containers.filter((info)=>{
                return info.Names== "/"+req.user.username
            })
            console.log(contnr[0].Id)
            var container = docker.getContainer(contnr[0].Id);
            container.inspect((err, data)=>{
                if (err) {
                    console.log('Error:', err);
                  } else {
                    res.status(200).json(data)
                  }
            })
          });
    }catch(err){
        res.status(500).json({err: err})
    }
}