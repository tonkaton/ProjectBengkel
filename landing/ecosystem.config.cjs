module.exports = {
  apps: [
    {
      name: "bengkel-landing",
      script: "serve",
      args: ["-s", "dist", "-l", "3005"],
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
