import * as cdk from 'aws-cdk-lib';
import {CfnOutput, Duration} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {Bucket} from "aws-cdk-lib/aws-s3";
import {AttributeType, BillingMode, Table} from "aws-cdk-lib/aws-dynamodb";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Architecture, Runtime} from "aws-cdk-lib/aws-lambda"
import {BaseFunction} from "./functions";

//import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SoftuniCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

   /* const queue: cdk.aws_sqs.Queue = new Queue(this, 'SoftuniCdkQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
      queueName: 'ExampleQueue',
      removalPolicy: RemovalPolicy.RETAIN
    });

    const lamdaFunction :cdk.aws_lambda.Function = new Function(this, 'LamdaWithGenericConstruct', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'generic.handler',
      code: Code.fromAsset(`${__dirname}/../src`)
    })*/

    // example resource
    //const queue = new sqs.Queue(this, 'SoftuniCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


    const exampleBucket :cdk.aws_s3.Bucket = new Bucket(this, 'ExampleBucket');

    const exampleTable :cdk.aws_dynamodb.Table = new Table(this, 'ExampleTable', {
      partitionKey: {
        name: 'PK',
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    const baseFunction :cdk.aws_lambda_nodejs.NodejsFunction = new NodejsFunction(this, 'BaseFunction', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      entry: `${__dirname}/../src/generic.ts`,
      timeout: Duration.seconds(10),
      architecture: Architecture.ARM_64,
      environment: {
        TABLE_NAME: exampleTable.tableName
      }

    })

  const baseFunctionOne :cdk.aws_lambda_nodejs.NodejsFunction = new BaseFunction(this, 'one', {
      handlerLocation: 'one',
      tableName: exampleTable.tableName

    })

    const baseFunctionTwo :cdk.aws_lambda_nodejs.NodejsFunction = new BaseFunction(this, 'two', {
      handlerLocation: 'two',
      tableName: exampleTable.tableName

    })

    new CfnOutput(this, 'tableName', {
      value: exampleTable.tableName,
    });

    new CfnOutput(this, 'bucketName', {
      value: exampleBucket.bucketName
    })

  }
}
