import runContractTests from "./runner";

export default async function individualTest(operation, client) {
    let response;
    try {
        response = await runContractTests(operation, client);

        await response.violations.input.should.have.lengthOf(0);
        await response.violations.output.should.have.lengthOf(0);
    } catch (error) {
        const errorLogger = await Utils.logger_testData(response, error);
        throw errorLogger;
    }
}