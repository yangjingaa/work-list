export const noNeedVerificationTokenUrl = ["/login", "register"];
/**
 * 拼接不验证token url
 * @returns {string}
 */
export const verificationTokenRegs = () => {
    let urlReg = '';
    if (Array.isArray(noNeedVerificationTokenUrl) && noNeedVerificationTokenUrl.length > 0) {
        noNeedVerificationTokenUrl.forEach(value => {
            urlReg += value + "|";
        })
    }
    return urlReg.slice(0, urlReg.length - 1)
};

/**
 * input 字段验证
 */
// export class VerRegex {
//     constructor(verName, verRegex) {
//         this.verName = verName;
//         this.verRegex = verRegex;
//     }
//
//     verString = {
//         userName: /d+/,
//         password: /sd+/,
//         deleteSpace: /^\s+|\s$/g
//     };
//
//     judgeVer = () => {
//     }
// }