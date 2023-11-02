import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

export interface PersonalWebsiteProps extends StackProps {
  path: string;
  cloudfrontCertificationArn?: string;
}

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteProps) {
    super(scope, id, props);

    const { path } = props

    const personalWebsiteBucket = new s3.Bucket(this, 'shilongjaycui-personal-website-bucket', {
      bucketName: 'shilongjaycui-personal-website-bucket',
      publicReadAccess: false,  // no public access, user must access via cloudfront
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ["*"],
          exposedHeaders: [],
        },
      ],
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    })
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "personalWebsiteBucketOAI")
    const personalWebsitePolicyStatement = new iam.PolicyStatement(
      {
        actions: ['s3:GetObject'],
        resources: [personalWebsiteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      },
    )
    personalWebsiteBucket.addToResourcePolicy(personalWebsitePolicyStatement)

    const personalWebsiteDistribution = new cloudfront.CloudFrontWebDistribution(this, "personalWebsiteDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: personalWebsiteBucket,
            originAccessIdentity: originAccessIdentity,
          },
          behaviors: [
            {
              viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
              compress: true,
              isDefaultBehavior: true,
            },
          ],
        },
      ],
      viewerCertificate: {
        aliases: [
          "shilongjaycui.com",
          "www.shilongjaycui.com",
        ],
        props: {
          acmCertificateArn: props.cloudfrontCertificationArn,
          minimumProtocolVersion: "TLSv1.2_2021",
          sslSupportMethod: "sni-only",
        }
      },
      defaultRootObject: "index.html",
      errorConfigurations: [
        {
          errorCode: 403,
          responseCode: 200,
          responsePagePath: "/index.html",
        },
      ],
    })

    new s3_deployment.BucketDeployment(this, "personalWebsiteBucketDeployment", {
      sources: [s3_deployment.Source.asset(path)],
      destinationBucket: personalWebsiteBucket,
      distribution: personalWebsiteDistribution,
    });
  }
}

const app = new App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
  path: path.join(__dirname, '../../website'),
  // CloudFront only supports ACM certificates in the US East (N. Virginia) Region ( us-east-1 ).
  cloudfrontCertificationArn: "arn:aws:acm:us-east-1:961329577079:certificate/27b8aeba-19ba-4a1f-ae0d-a6df7ef66108",
});
app.synth();