const base = "api/lilify/v1"

export const endPts = {
  create: {
    urls: `${base}/urls`,
  },
  get: {
    urls: {
      name: `${base}/urls`,
      queryParams: {
        alias: "alias",
      },
      pathParams: {
        placeholder: "placeholder",
      },
    },
  },
  update: {},
  delete: {},
}
