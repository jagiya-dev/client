module.exports = {
  api: {
    output: {
      mode: "split",
      workspace: "src/network/api",
      target: "api.ts",
      schemas: "model",
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: "api.mutator.ts",
          name: "getInstance",
        },
      },
    },
    input: {
      target: "./api.json",
      validation: false,
    },
  },
};
