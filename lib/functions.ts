import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Construct} from "constructs";
import {Architecture, Runtime} from "aws-cdk-lib/aws-lambda";
import {Duration} from "aws-cdk-lib";


interface BaseFunctionProps {
    tableName: string;
    handlerLocation: string;
}

export class BaseFunction extends NodejsFunction {
    constructor(scope: Construct, id: string, props: BaseFunctionProps) {
        super(scope, id, {
            ...props,
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: `${__dirname}/../src/${props.handlerLocation}.ts`,
            timeout: Duration.seconds(10),
            architecture: Architecture.ARM_64,
            environment: {
                TABLE_NAME: props.tableName
            }

        });
    }
}