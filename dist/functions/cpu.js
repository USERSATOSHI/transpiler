"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cpu = void 0;
const stringparser_1 = require("../stringparser");
const util_1 = require("../util");
exports.$cpu = {
    name: "$cpu",
    brackets: true,
    optional: true,
    version: "1.0.0",
    type: "function_getter",
    fields: [
        {
            name: "type",
            type: "process|os",
            required: false,
        },
    ],
    default: ["process"],
    returns: "number",
    description: "Returns the CPU usage",
    code: (data, scope) => {
        const currentScope = scope[scope.length - 1];
        const type = (0, stringparser_1.parseString)(data.inside ?? "process");
        let res = (0, util_1.escapeResult)(`function secNSec2ms (secNSec) {
  if (Array.isArray(secNSec)) { 
    return secNSec[0] * 1000 + secNSec[1] / 1000000; 
  }
  return secNSec / 1000; 
}

function __$get_cpu_usage$__(type) {
        if (type === "process") {
const startTime  = process.hrtime()
const startUsage = process.cpuUsage()

const now = Date.now()
while (Date.now() - now < 100) {}

const elapTime = process.hrtime(startTime)
var elapUsage = process.cpuUsage(startUsage)

const elapTimeMS = secNSec2ms(elapTime)
const elapUserMS = secNSec2ms(elapUsage.user)
const elapSystMS = secNSec2ms(elapUsage.system)
const cpuPercent = (100 * (elapUserMS + elapSystMS) / elapTimeMS).toFixed(2)
return cpuPercent
        } else if (type === "os") {
            return ((OS.loadavg()[0] * 100)/OS.cpus().length).toFixed(2)
        } else {
            throw new Error(\`${data.name}: Invalid Type \${type}\`);
        }
}`);
        if (!currentScope.packages.includes(`const OS = await import("os")`)) {
            currentScope.packages += `const OS = await import("os")\n`;
        }
        if (!currentScope.functions.includes("function __$get_cpu_usage$__(type) {")) {
            currentScope.functions += res + "\n";
        }
        res = (0, util_1.escapeResult)(`__$get_cpu_usage$__(${type})`);
        currentScope.rest = currentScope.rest.replace(data.total, res);
        return {
            code: res,
            scope: scope,
        };
    },
};
//# sourceMappingURL=cpu.js.map