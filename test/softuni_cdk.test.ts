 import * as cdk from 'aws-cdk-lib';
 import { Template } from 'aws-cdk-lib/assertions';
 import * as SoftuniCdk from '../lib/softuni_cdk-stack';
 import 'jest-cdk-snapshot';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/softuni_cdk-stack.ts
test('SQS Queue Created', () => {
   const app = new cdk.App();
//     // WHEN
   const stack = new SoftuniCdk.SoftuniCdkStack(app, 'MyTestStack');
//     // THEN
   //const template = Template.fromStack(stack);
   expect(stack).toMatchCdkSnapshot();
});