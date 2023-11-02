import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from 'path';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';
import * as route53 from 'aws-cdk-lib/aws-route53';

const PERSONAL_WEBSITE_DOMAIN = "shilongjaycui.com"

export interface PersonalWebsiteProps extends StackProps {
  path: string;
  cloudfrontCertificationArn?: string;
}

export class PersonalWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: PersonalWebsiteProps) {
    super(scope, id, props);

    const { path } = props;

    const subdomainBucket = new s3.Bucket(this, 'subdomain-bucket', {
      bucketName: `www.${PERSONAL_WEBSITE_DOMAIN}`,
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
      websiteErrorDocument: '404.html',
    });
    new s3.Bucket(this, 'root-domain-bucket', {
      bucketName: PERSONAL_WEBSITE_DOMAIN,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteRedirect: {
        hostName: `www.${PERSONAL_WEBSITE_DOMAIN}`,
        protocol: s3.RedirectProtocol.HTTPS,
      },
    });
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "bucket-origin-access-identity")
    const personalWebsitePolicyStatement = new iam.PolicyStatement(
      {
        actions: ['s3:GetObject'],
        resources: [subdomainBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      },
    );
    subdomainBucket.addToResourcePolicy(personalWebsitePolicyStatement);

    const personalWebsiteDistribution = new cloudfront.CloudFrontWebDistribution(this, "cloudfront-web-distribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: subdomainBucket,
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
          PERSONAL_WEBSITE_DOMAIN,
          `www.${PERSONAL_WEBSITE_DOMAIN}`,
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
    });

    new s3_deployment.BucketDeployment(this, "personalWebsiteBucketDeployment", {
      sources: [s3_deployment.Source.asset(path)],
      destinationBucket: subdomainBucket,
      distribution: personalWebsiteDistribution,
    });

    // Look up the zone based on domain name.
    const hostedZone = route53.HostedZone.fromLookup(this, "baseZone", {
      domainName: PERSONAL_WEBSITE_DOMAIN,
    });

    // Add the subdomain to Route 53
    new route53.CnameRecord(this, 'test.baseZone', {
      zone: hostedZone,
      recordName: `www.${PERSONAL_WEBSITE_DOMAIN}.`,
      domainName: subdomainBucket.bucketDomainName,
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