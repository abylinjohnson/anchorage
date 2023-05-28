const Docker = require('dockerode');
const docker = new Docker();

const create_container = async (name, port) => {

    const portBindings = {
        '8080/tcp': [{ HostPort: `${port}` }]
    };
    const container = await docker.createContainer({
        Image: 'codercom/code-server',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        ExposedPorts: { '8080/tcp': {} },
        HostConfig: {
            PortBindings: portBindings
        },
        name: `${name}`
    });
    const data = await container.inspect();
    return data
}

const start_container = (id) =>{
    var container = docker.getContainer(id);
    container.start((err, data)=>{
        console.log(`started : ${id}`)
    })
}

const stop_container = (id) =>{
    var container = docker.getContainer(id);
    container.stop((err, data)=>{
        console.log(`stopped : ${id}`)
    })
}



exports.docker = docker



exports.start_container = start_container
exports.stop_container = stop_container
exports.create_container = create_container