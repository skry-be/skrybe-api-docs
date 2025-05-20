/// <reference path="./.sst/platform/config.d.ts" />

const DOMAIN_NAME = "skry.be";

function getDomain(stage: string) {
  return stage === "prod" ? DOMAIN_NAME : `${stage}.${DOMAIN_NAME}`;
}

export default $config({
  app(input) {
    return {
      name: "api-docs-site-standalone",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const docs = new sst.aws.StaticSite("docs", {
      build: {
        command: "yarn run build",
        output: "build",
      },
      domain: {
        name: `docs.${getDomain($app.stage)}`,
      },
    });

    return {
      docs: docs.url,
    };
  },
});
