---
title: Production Problems
date: '2020-08-25T22:12:03.284Z'
tags: [ 'dns', 'ssl', 'headless', 'wordpress', 'graphql', 'gatsby', 'aws', 'certificate']
cover: './wires.jpg'
---

# SSL - DNS - Bitnami - AWS - Netlify

I am building an online store with a headless wordpress backend for a friend. With very little setup you can turn a formerly drab wordpress site into an optimized static site. You get the added benefit of having the frontend decoupled from the backend.

For more details visit the following gatsby repository: [gatsby-source-wordpress-experimental](gatsby-source-wordpress-experimental/blob/master/docs/getting-started.md)

Tip: If you do end up trying this out and are using wordfence, don’t forget to whitelist your ip.

# When trouble began...

My friend asked me to put up a coming soon landing page while we wait for the site to be built.  Easy, I thought... So I quickly create a gatsby site and deployed to netlify the same day.  However, her site was already hosted on AWS.  So I had to switch over the DNS as well.

## And then...

I was able to switch the DNS records from Godaddy.com to netlify, which offers free HTTPS on all sites, including automatic certificate creation and renewal. However, I now needed to make the new wordpress “backend” secure since there was no longer a domain name associated with it. I was now using the public domain name for the new landing page hosted on Netlify so that people would land there instead. 

I needed to allow access for my friend to log into wordpress and make changes, so my plan was to make a subdomain aws.example.com and point that to WordPress instance which was hosted on AWS. 

## Simple enough but…

I needed the backend to be secure because it has a login and accepts form submissions as well as REST API requests. These flows needed to be private so that no one else could intercept sensitive data.

## How to configure SSL on an EC2 instance

If you are configuring certificate authentication through AWS hosted on an EC2 instance you cannot simply export an Amazon Issued Certificate because Amazon manages the private key through their AWS Certificate Manager (ACM).

If you using Load Balancers or CloudFront distribution, then you can request a public certificate and associate the certificate with one of these services: [https://aws.amazon.com/premiumsupport/knowledge-center/configure-acm-certificates-ec2/](https://aws.amazon.com/premiumsupport/knowledge-center/configure-acm-certificates-ec2/)

  

However, since this is just a backend and I did not want to pay for those services, I opted for the free version.

## Certbot certificate generator

[https://certbot.eff.org/](https://certbot.eff.org/)
Usually, it is simple enough to follow the step of the generator to create a free certificate...  In my case... I ran into some trouble.

If you use certbot instructions you may get the following error: 

Certbot doesn't know how to automatically configure the web server on this system. However, it can still get a certificate for you. Please run "certbot-auto certonly" to do so. You'll need to manually configure your web server to use the resulting certificate.

```bash
Certbot doesn't know how to automatically configure the web server on this system. However, it can still get a certificate for you. Please run "certbot-auto certonly" to do so. You'll need to manually configure your web server to use the resulting certificate.
```
  

After searching the letsencypt.log file you find:

```bash
## 2020-25-08 00:37:44,148:WARNING:certbot.plugins.util:Failed to find apache2ctl in PATH:

Reason why it failed:

Apache is included in the self-contained Stack that Bitnami installs and is located at /opt/bitnami/apache2/ and the apache2ctl is at /opt/bitnami/apache2/bin/apachectl.
```
Luckily, bitnami has a configuration tool to configure HTTPS certificates for the domains on the server.

## **[Bitnami HTTPS Configuration Tool](https://docs.bitnami.com/aws/how-to/understand-bncert/)**
**[Bitnami docs](https://docs.bitnami.com/aws/how-to/understand-bncert/)**


###1. Open a terminal session
```bash
ssh -i ~/.ssh/keypair.pem bitnami@ec2-x-xxx-xx-xxx.compute-1.amazonaws.com
```

###2. Run [Bitnami HTTPS Configuration Tool](https://docs.bitnami.com/aws/how-to/understand-bncert/)

```bash
sudo /opt/bitnami/bncert-tool
```

###3. Enter domains you want to configure (in my case it was a subdomain)

```bash
bitnami@:~$ sudo /opt/bitnami/bncert-tool

------------------------------------------------------------------

Welcome to the Bitnami HTTPS Configuration tool.

------------------------------------------------------------------

Domains

  

Please provide a valid space-separated list of domains for which you wish to configure your web server.

  

Domain list []: aws.example.com
```

###4. Answer prompt for redirection of http requests
I want only SSL/HTTPS access for my domains, so I choose the redirection.
```bash
Enable HTTP to HTTPS redirection [Y/n]: Y
```
Thats it!   Good luck in your own SSL adventures :)
