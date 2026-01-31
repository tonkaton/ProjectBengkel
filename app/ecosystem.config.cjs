module.exports = {
  apps: [
    {
      name: "bengkel-app",
      script: "serve",
      args: "dist -s -l 3004",
      cwd: "./",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
    },
  ],
};
