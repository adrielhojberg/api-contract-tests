export const logger_testData =  async (response, error) => {
    const logger = {};
    let violations = response.violations;

    logger["Test_Data"] = {};
    if (violations.input.length >= 1) {
        logger.Test_Data["request"] = {};
        logger.Test_Data.request["message"] = [];
        violations.input.forEach((input) => {
        const code = input.code;
        const message = input.message;
        const path = input.path;
        logger.Test_Data.request.message = [
            ...logger.Test_Data.request.message,
            `${code || ""} - ${message} - ${path || ""}`,
        ];
        });
    }
    if (violations.output.length >= 1) {
        logger.Test_Data["response"] = {};
        logger.Test_Data.response["message"] = [];
        violations.output.forEach((output) => {
        const code = output.code;
        const message = output.message;
        const path = output.path;
        logger.Test_Data.response.message = [
            ...logger.Test_Data.response.message,
            `[${code || ""}]  ${message} in ${path || ""}`,
        ];
        });
    }

    return logger;
}