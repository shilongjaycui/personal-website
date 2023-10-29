import { App, Stack, StackProps, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';

export interface PersonalWebsiteProps extends StackProps {
  path: string,
}

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteProps) {
    super(scope, id, props);

    const { path } = props

    const personalWebsiteBucket = new s3.Bucket(this, 'shilongjaycui-personal-website-bucket', {
      bucketName: 'shilongjaycui-personal-website-bucket',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      removalPolicy: RemovalPolicy.DESTROY,
    })
    personalWebsiteBucket.addToResourcePolicy(
      new iam.PolicyStatement(
        {
          effect: iam.Effect.ALLOW,
          actions: ['s3:*'],
          principals: [new iam.AnyPrincipal()],
          resources: [`${personalWebsiteBucket.bucketArn}/*`]
        },
      )
    )

    const personalWebsiteDistribution = new cloudfront.Distribution(this, "personalWebsiteDistribution", {
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(personalWebsiteBucket)
      },
      comment: 'This is the CloudFront distribution for our personal website.'
    })

    new s3_deployment.BucketDeployment(this, "personalWebsiteBucketDeployment", {
      destinationBucket: personalWebsiteBucket,
      sources: [s3_deployment.Source.asset(path)],
      cacheControl: [
        s3_deployment.CacheControl.maxAge(Duration.days(1))
      ],
      distribution: personalWebsiteDistribution,
    })
  }
}

const app = new App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
  path: path.join(__dirname, '../../website'),
});
app.synth();