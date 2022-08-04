# @akarui/transpiler
A Transpiler that converts aoi.js code to javascript.

## Usage

```js
const { Transpiler } = require('@akarui/transpiler');

const code =
`$let[hi;1]
$let[res;.]
$onlyif[$authorId===$clientOwnerId;no]
$if[$get[hi]===1;
    $let[res;hi]
]
$elseIf[$get[hi]===2;
    $let[res;ok]
]
$else[
    $let[res;bye]
]
$get[res]`;

const res = Transpiler ( 
    code,
    true,
    {}, 
    true 
);
console.log( res.func.toString() );
```
