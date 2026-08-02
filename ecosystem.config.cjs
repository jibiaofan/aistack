module.exports = {
  apps: [
    {
      name: 'aistack-demo',
      script: 'python3',
      args: 'demo_server.py',
      cwd: '/home/user/webapp',
      env: {
        PORT: 3000,
        PYTHONUNBUFFERED: '1'
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
