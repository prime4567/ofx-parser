import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { createReadStream } from "fs";
import { createInterface } from 'readline';

// Tags that is not properly closed in OFX file. Update as needed
const unpairedTags = [
    "CODE",
    "SEVERITY", 
    "FID",
    "INTU.USERID", 
    "INTU.BID", 
    "LANGUAGE", 
    "DTSERVER",
    "CURDEF",
    "ACCTID",
    "MEMO",
    "NAME",
    "FITID",
    "TRNAMT",
    "BALAMT",
    "DTASOF",
    "DTUSER",
    "DTSTART",
    "DTEND",
    "DTPOSTED",
    "ORG", 
    "TRNTYPE",
    "TRNUID"
]

export class OFX { 
    ofxData = { 
        isValid: false,
        header: {},
        content: {}
    }

    // Constructure accept 1 string parameter as filename
    constructor() {

    }

    async readOFX(ofxFileName) {
        this.ofxData = { 
            isValid: false,
            header: {},
            content: {}
        }
        var ofxOpenTag = false
        var ofxCloseTag = false
        var ofxLines = []

        return new Promise ((resolve, reject) => {
            try {
                const rl = createInterface({
                    input: createReadStream(ofxFileName),
                    crlfDelay: Infinity
                });

            
                
                rl.on('line', (line) => {
                //console.log(`Line from file: ${line}`);
                const trimmedLine = line.trim()
                if (trimmedLine.match("<OFX>")) ofxOpenTag = true

                if (ofxOpenTag) ofxLines.push(trimmedLine)

                if (trimmedLine.match("</OFX>")) ofxCloseTag = true
                });

                rl.on('close', () => {
                    const validXXml = XMLValidator.validate(ofxLines.toString(), {
                        unpairedTags: unpairedTags
                    })
                    if (ofxOpenTag && ofxCloseTag && (validXXml === true)) {
                        //console.log(validXXml)
                        this.ofxData.isValid = true
                        const parser = new XMLParser({ unpairedTags: unpairedTags })
                        this.ofxData.content = parser.parse( ofxLines.toString())
                        resolve(this.ofxData)
                    } else {
                        console.log(validXXml)
                        resolve(this.ofxData)
                    }
                })

            } catch(err) {
                console.log(err)
            }
        })
    }

    serialize() {
        return this.ofxData;
    }
}