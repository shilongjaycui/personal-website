import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
    const s3Bucket = new s3.Bucket(this, 'exampleBucket', {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,  // disable access control lists (ACLs) and take ownership of every object in your bucket
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,  // don't allow public access
      encryptionKey: new kms.Key(this, 's3BucketKMSKey', {
        removalPolicy: RemovalPolicy.DESTROY,  // delete the key when the stack is deleted
      }),  // use a customer managed KMS key to encrypt the S3 bucket objects
      removalPolicy: RemovalPolicy.DESTROY,  // delete the bucket when the stack is deleted
    });

    s3Bucket.grantRead(new iam.AccountRootPrincipal());  // give the AWS account owner read access to the bucket
  }
}

const app = new App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack');
app.synth();