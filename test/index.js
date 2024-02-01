import { should, use, expect } from 'chai';
import sinon from 'sinon';

should();
global.expect = expect;
global.sinon = sinon;

const testsContext = require.context('./e2e', true);
testsContext.keys().forEach(testsContext);
