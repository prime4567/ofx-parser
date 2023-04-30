import { OFX } from '../ofx-parser.js';
import { assert, expect } from 'chai';

describe("OFX Parser Unit Test", function() {
    it('Should be able to initialize OFX Parser with empty data', function() {
        let ofxData = new OFX();
        //console.log (ofxData.serialize())
        expect(Object.values(ofxData.serialize()).length).to.equal(3)
    });

    it('Should be able to parse test HSBC credit card data', function() {
        let ofxData = new OFX();
        return (ofxData.readOFX("./test/data/test-hsbc-credit-card.qfx")
        .then((ofxValue) => {
            expect(ofxValue.isValid).to.be.true;
            console.log(JSON.stringify(ofxValue))
        }))
    });
});