const Docker = require('dockerode');
const docker = new Docker();

const create_container = async (name, port) => {

    const portBindings = {
        '8080/tcp': [{ HostPort: `${port}` }]
    };
    const container = await docker.createContainer({
        Image: 'ronmcrea/browser-vscode',
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

create_container("ronald",9002)
// create_container("node2",9002)
// create_container("node3",9003)
