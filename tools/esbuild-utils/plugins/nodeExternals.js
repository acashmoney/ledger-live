const path = require("path");

module.exports = {
  name: "Node Externals Plugin",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (path.isAbsolute(args.path)) {
        return;
      }
      try {
        const resolvedPath = require.resolve(args.path, {
          paths: [args.resolveDir],
        });
        if (resolvedPath.includes("node_modules")) {
          return {
            path: args.path,
            external: true,
          };
        }
      } catch (error) {
        // swallow error
        // console.error(error);
      }
    });
  },
};
