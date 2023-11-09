import * as path from 'path';
import { App, Stack, StackProps, RemovalPolicy, CfnOutput, Fn } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53_targets from 'aws-cdk-lib/aws-route53-targets';

export interface PersonalWebsiteProps extends StackProps {
  path: string;
  domain: string;
  cloudfrontCertificationArn: string;
}

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'domain-s3-bucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false }),
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "cloudfront-origin-access-identity")
    bucket.grantRead(originAccessIdentity.grantPrincipal)
    
    // The Route53 hosted zone and the ACM certificate were created manually beforehand because it's hard to manage them with a CloudFormation stack.
    const hostedZone = route53.HostedZone.fromLookup(this, "existing-hosted-zone", {
      domainName: `${props.domain}.`,
    });
    if (hostedZone.hostedZoneNameServers) {
      new CfnOutput(this, 'name-servers-output', { value: Fn.join(', ', hostedZone.hostedZoneNameServers) });
    }
    const certificate = acm.Certificate.fromCertificateArn(this, "existing-certificate", props.cloudfrontCertificationArn);

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'cloudfront-web-distribution', {
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [
          props.domain,
          `www.${props.domain}`,
        ],
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        sslMethod: cloudfront.SSLMethod.SNI,
      }),
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new route53.ARecord(this, 'route53-a-record', {
      target: route53.RecordTarget.fromAlias(new route53_targets.CloudFrontTarget(distribution)),
      zone: hostedZone,
      recordName: `${props.domain}`,
    });
  }
}

const app = new App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  domain: "shilongjaycui.com",
  path: path.join(__dirname, '../../website'),
  // CloudFront only supports ACM certificates in the US East (N. Virginia) Region ( us-east-1 ).
  cloudfrontCertificationArn: "arn:aws:acm:us-east-1:961329577079:certificate/27b8aeba-19ba-4a1f-ae0d-a6df7ef66108",
});
app.synth();