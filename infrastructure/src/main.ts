import { App, Stack, StackProps, RemovalPolicy, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as path from 'path';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';

const PERSONAL_WEBSITE_DOMAIN = "shilongjaycui.com"

export interface PersonalWebsiteProps extends StackProps {
  path: string;
  cloudfrontCertificationArn: string;
}

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteProps) {
    super(scope, id, props);

    const subdomainBucket = new s3.Bucket(this, 'subdomain-bucket', {
      bucketName: PERSONAL_WEBSITE_DOMAIN,
      publicReadAccess: false,  // no public access, user must access via cloudfront
      removalPolicy: RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
    });
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "origin-access-identity")
    const iamPolicyStatement = new iam.PolicyStatement(
      {
        actions: ['s3:GetObject'],
        resources: [subdomainBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId),
        ],
      },
    );
    subdomainBucket.addToResourcePolicy(iamPolicyStatement);
    
    // The Route53 hosted zone and the ACM certificate were created manually beforehand because it's hard to manage them with a CloudFormation stack.
    const hostedZone = route53.HostedZone.fromLookup(this, "existing-hosted-zone", {
      domainName: `${PERSONAL_WEBSITE_DOMAIN}.`,
    });
    const certificate = acm.Certificate.fromCertificateArn(this, "existing-certificate", props.cloudfrontCertificationArn);

    const cloudfrontResponseHeaderPolicy = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersResponseHeaderPolicy', {
      comment: 'Security headers response header policy',
      securityHeadersBehavior: {
        contentSecurityPolicy: {
          override: true,
          contentSecurityPolicy: "default-src 'self'"
        },
        strictTransportSecurity: {
          override: true,
          accessControlMaxAge: Duration.days(2 * 365),
          includeSubdomains: true,
          preload: true
        },
        contentTypeOptions: {
          override: true
        },
        referrerPolicy: {
          override: true,
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN
        },
        xssProtection: {
          override: true,
          protection: true,
          modeBlock: true
        },
        frameOptions: {
          override: true,
          frameOption: cloudfront.HeadersFrameOption.DENY
        },
      }
    });

    const cloudfrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      certificate: certificate,
      domainNames: [PERSONAL_WEBSITE_DOMAIN],
      defaultRootObject: 'index.html',
      defaultBehavior: {
      origin: new origins.S3Origin(subdomainBucket, {
          originAccessIdentity: originAccessIdentity
      }),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      responseHeadersPolicy: cloudfrontResponseHeaderPolicy
      },
    });

    new route53.ARecord(this, 'ARecord', {
        recordName: PERSONAL_WEBSITE_DOMAIN,
        target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(cloudfrontDistribution)),
        zone: hostedZone,
    });

    new s3_deployment.BucketDeployment(this, 's3-bucket-deployment', {
      destinationBucket: subdomainBucket,
      sources: [s3_deployment.Source.asset(props.path)],
      cacheControl: [
        s3_deployment.CacheControl.maxAge(Duration.days(1)),
      ],
      distribution: cloudfrontDistribution,
    });
  }
}

const app = new App();
new PersonalWebsiteStack(app, 'PersonalWebsiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  path: path.join(__dirname, '../../website'),
  // CloudFront only supports ACM certificates in the US East (N. Virginia) Region ( us-east-1 ).
  cloudfrontCertificationArn: "arn:aws:acm:us-east-1:961329577079:certificate/27b8aeba-19ba-4a1f-ae0d-a6df7ef66108",
});
app.synth();