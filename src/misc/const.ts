export const prismClientConfig = {
    mock: false,
    validateRequest: true,
    validateResponse: true,
    checkSecurity: false,
    errors: false,
    upstream: new URL("https://petstore3.swagger.io/api/v3"),
    upstreamProxy: undefined,
}
