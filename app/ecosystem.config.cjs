module.exports = {
  apps: [
    {
      name: "bengkel-app",
      script: "serve",
      args: ["-s", "dist", "-l", "3004"],
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
