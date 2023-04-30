# OFX Format Parser

This module convert the OFX file to useable Javascript Object

Use: 
```
import { OFX } from '../ofx-parser.js';

let ofxData = new OFX();

ofxData.readOFX("/path/to/OFX/file")
        .then((ofxValue) => {
            expect(ofxValue.isValid).to.be.true;
            console.log(JSON.stringify(ofxValue))
        })
```

## Supported Format
1. QFX from HSBC Indonesia