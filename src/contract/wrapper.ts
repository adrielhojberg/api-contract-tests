import individualTest from "./individualTest";

export function wrapper(fileName, operations, client) {
    describe(`${fileName}`, () => {
        // describe function
        operations.forEach((operation) => {
        it(`${operation.iid} @contract`, individualTest(operation, client));
        });
    });
}

