#examiner

Test generator for javaScript.

# usage

For CLI using you can run in project root:

```
NODE_PATH=./ exam
```

Argument options:

* `--module` or `--m` - name of module for test generated.
* `--function` or `--f` - name of function for test generated.
* `--arguments` or `--a` - stringify input arguments object for test generated.
* `--amd-loader` - if you use AMD modules.

#example

```
NODE_PATH=./ exam --amd-loader --m=P2P/candidates-finder --f=getSpeed --a='{"0":{"id":"defc80d7-2645-4e85-88d9-02b6d7ae7858","type":"peer","connectionType":"webrtc","netInfo":[{"ip":"37.79.221.42","isGrey":false,"kind":"srflx"},{"ip":"10.66.14.50","isGrey":true,"kind":"host"},{"ip":"172.18.0.1","isGrey":true,"kind":"host"},{"ip":"172.19.0.1","isGrey":true,"kind":"host"}],"sources":{"main":{"latency":0},"reserve":{"latency":null}},"fallbackState":false,"relayCfg":{"connectionsLimit":{"wrtc":3,"ws":20},"sendMissedChunks":true},"depth":0}}'
```

Generated new test in /tests/generated/P2P/candidates-finder.js/getSpeed.spec.ts like:

```
import {assert, expect} from "chai";
import {getSpeed} from "../../../../P2P/candidates-finder.js";
var mockArr = Object.values(require("../../../../test/generated/mocks/P2P/candidates-finder.js/getSpeed.json"));


describe("test describe", () => {
    it("test it", () => {
        assert.equal(getSpeed.apply(this, Object.values(mockArr[0].input)) ,mockArr[0].output, "test message");
    });
});
```

You can generate command in browser debuger (stop in function), for example:
```
copy("NODE_PATH=./ exam --amd-loader --m=" + new Error().stack.split("\n")[1].split(location.host)[1].split(".js?")[0] + " --f=" + new Error().stack.split("\n")[1].split("(")[1].split(" ")[2] + " --a='" + JSON.stringify(arguments) + "'")
```

#methods

```
var candidates_finder = require("P2P/candidates-finder");
var examiner = require("test-examiner");

//Decorator
var getSpeed = examiner.exam(candidates_finder.getSpeed, module);

//Run for create test
getSpeed({"id": "f79d47e3-08d9-4a84-9f85-09e8b22fe1b5","type": "peer","connectionType": "webrtc","netInfo": [{"ip": "37.79.221.42","isGrey": false,"kind": "srflx"}],"sources": {"main": {},"reserve": {}},"fallbackState": true,"relayCfg": {"connectionsLimit": {"wrtc": 3,"ws": 20},"sendMissedChunks": true},"depth": 0});
```

# install

With [npm](https://npmjs.org) do:

```
npm install -g test-examiner
```

For init examiner, go to your project root and do:
```
examInit
```

# license

MIT
