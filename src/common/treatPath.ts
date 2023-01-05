import { pathReplaceVar } from "../misc/Utils";

export const treatPath =  async (operation) => {
    let treatedPath = pathReplaceVar(
        operation.path,
        operation.request.path[0].examples[0].value
    );
    return treatedPath;
}