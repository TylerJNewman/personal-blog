---
title: One-legged, two-legged, three-legged O my Auth?!?
date: '2020-08-20T19:07:26'
cover: './lock.jpg'
tags: ['Auth', 'OAuth', 'APIs', "Authorization", "Services", ]
---
## What

OAuth stands for Open Authorization. It’s a process to allow an application or website to access private user data from a trusted service, ex. Google, Facebook, or Twitter. 

These services return an OAuth Token which is a credential which can be used by an application to access the respect services' API for limited scope.

Every time you clicked on “Log in with Google/Facebook/Twitter" you are using a form of OAuth.

After clicking a button labelled "Continue with Google," or "Sign in with Google," you would have been shown a consent screen from Google that displayed which specific resources you are allowing Salesforce to read (or write). After allowing, for example, Salesforce to connect to Google API, Salesforce knows your identity and receives a token from Google.  With trusted information retrieved from Google, Salesforce can create a user profile with the fields provided: (e.g) name (first and last), profile photo URL, gender, locale, profile URL, email, etc...

## Why

 This authorized flow lets an application access a resource without giving away your unique password or credentials stored with that service.
 It allows users to utilize services across multiple platforms in an easy convenient way.  
 It provides the application with read/write access to APIs
 It provides trusted user profile information.  
 It is secure because you can authenticate the client to redeem the authorization grant, and tokens are never passed through a user-agent.
 Lastly, it speeds up user authenticity validation by allowing the third party service to authenticate (even more convenient if you are already logged in)

 Before OAuth, in order to provide third-party applications access to restricted resources, the resource owner shares its credentials with the third-party. This created several problems and limitations.

1. Third-party applications were required to store the resource owner's credentials for future use, typically a password in clear-text.

2. Servers were required to support password authentication, despite the security weaknesses created by passwords.

3. Third-party applications gained overly broad access to the resource owner's protected resources, leaving resource owners without any ability to restrict duration or access to a limited subset of resources.

4. Resource owners could not revoke access to an individual third-party without revoking access to all third-parties, and must do so by changing their password.

5. Compromise of any third-party application would result in compromise of the end-user's password and all of the data protected by that password.

OAuth addresses these issues by introducing an authorization layer and separating the role of the client from that of the resource owner.

 High-level Flow: 

 1. Get a token from the authorization server
 2. Use the token to access the resource server

 ## Three-legged, Two-legged, One-legged, Zero?

The legs refer to the roles involved. OAuth 2.0 defines four roles:

1. resource owner : An entity capable of granting access to a protected resource (e.g. end-user).
2. resource server : The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.
3. client : An application making protected resource requests on behalf of the resource owner and with its authorization.
4. authorization server : The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.

 The terms “two-legged” and “three-legged” have since been replaced by the idea of grant types, such as the Client Credentials(“two-legged”) grant type and the Authorization Code(“three-legged”) grant type but it is useful to know the terms for when they show up.

 OAuth 2.0 defines a concept called - "authorization grant"(“three-legged”) - which is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token. This specification defines four grant types.

1. authorization code
2. implicit
3. resource owner password credentials
4. client credentials

"Client Credentials" is the grant type which goes closely with 2-legged OAuth.

With "Client Credentials" grant type, the client can request an access token using only its client credentials (or other supported means of authentication) when the client is requesting access to the protected resources under its control.

### Three-legged (OAuth 2.0)
Updated to grant type: Authorization Code Request
The authorization code grant is used when an application exchanges an authorization code for an access token. After the user returns to the application via the redirect URL, the application will get the authorization code from the URL and use it to request an access token. This request will be made to the token endpoint.
In this flow delegates User access to a Consumer App for resources held by a Service Provider by involving the user, aka resource owner
That is to say, this flow involves three parties ...
I, the end-user, must be involved because I need to authenticate to the service (Google) and grant access to the protected resources (profile photo, name, gender, email, etc...).  The client (Salesforce) is afterwards able to impersonate me towards the service (Google) without me being involved for every request thereafter.

1. Resource owner, End-user, "Tyler Newman"
2. Client (the third-party application), Salesforce
3. Server (or authorization server), "Google.com"

Flow:

* Client, aka consumer, aka Consumer App,  (Salesforce) has signed up to the server (Google) and received client credentials (consumer api key and secret)
* End-user (Tyler Newman) wants to give the client (Salesforce) access to their protected resources on the server, aka Service Provider (Google)
* Client (Salesforce) retrieves the temporary credentials (also known as “request token”) from the server (Google)
* Client (Salesforce) redirects the resource owner to the server (Google)
* Resource owner (Tyler Newman) grants the client access to their protected resources on the server (Google)
* Server (Google) redirects the user back to the client (Salesforce)
* Client (Salesforce) uses the temporary credentials to retrieve the token credentials (also known as “access token”) from the server (Google)
* Client (Salesforce) uses the token credentials to access the protected resources on the server (Google)

### Two-legged or "Signed Fetch"  (OAuth 2.0)
Updated to grant type: The Client Credentials
The Client Credentials grant is used when applications request an access token to access their own resources, not on behalf of a user.
Consumer is acting on behalf of itself, without a direct or any User involvement.
Takes advantage of OAuth's signatures to authenticate server-to-server requests. It does not involve the end-user or any access tokens.

1. Client, Salesforce
2. Server, "Google.com"

Flow:

* Client (Salesforce) has signed up to the server (Google) and received client credentials (consumer api key and secret)
* Client (Salesforce) uses his client credentials (and empty token credentials) to access the protected resources on the server (Google)

Two-legged request are exactly the same as three-legged but does not include an access token or access token secret, both values are empty strings. The service provider verifies the signature (api key/secret) and services the request if the consumer is authorized.  It also excludes the role of the “resource owner” is known simply as the “user,”

### One-legged  (OAuth 1.0a)
OAuth 1 does not explicitly separate the roles of resource server and authorization server and was mainly focused on consuming apis by constructing auth headers (consumer key/signature) and making HTTP requests (one-legged requests)
One-legged can be a bit confusing to differentiate from two-legged because this is also referring to a request made to a Server by a Client using previously obtained credentials (consumer key/signature).
An administrator on the client creates a provisional key and provides it to the Client.
A consumer api key/secret pair is essentially a login account for an application
If a user is associated with the consumer key, the consuming apps can use an OAuth Authorization header with the consumer key and secret to access protected resources using "One-legged OAuth"
To rephrase one more time for good measure, a consumer app is interacting as the functional user and is using One-legged OAuth to ensure REST API credentials cannot be intercepted by an attacker (only the consumer app should have that key)

1. Client, (Gatsby)
2. Server, (Wordpress as Backend API)

Flow:

* Server (administrator on Wordpress) creates a key and provides to Client (Gatsby) before request
* Client (Gatsby) REST API credentials (consumer key/signature pair) to make signed request to Server (one-legged request)

OAuth 2.0 is a complete rewrite of OAuth 1.0 from the ground up, sharing only overall goals and general user experience. OAuth 2.0 is not backwards compatible with OAuth 1.0 or 1.1, and is effectively a new protocol.

OAuth 1.0 was largely based on two existing proprietary protocols: Salesforce’s authorization API and Google’s AuthSub. The work that became OAuth 1.0 was the best solution based on actual implementation experience at the time. Over a few years of many companies building OAuth 1 APIs, and many developers writing code to consume the APIs, the community learned where the protocol was proving challenging to people. Several specific areas were identified as needing improvement because they were either limiting the abilities of the APIs, or were too challenging to implement.

OAuth 2.0 represents years of discussions between a wide range of companies and individuals including Yahoo!, Facebook, Salesforce, Microsoft, Twitter, Deutsche Telekom, Intuit, Mozilla and Google.


### Zero-legged OAuth authorization

Zero-legged OAuth is where the normally temporary token/secret codes are decided on beforehand and are made to not expire, so there's no authentication step needed before you make "actual" requests of the backend REST API.

The authentication is in practice no different- the same secret is used as in other flows by the client to create a signature or otherwise provide proof of possession of the secret.

The difference is on the service providers side. Every service provider endpoint participating in zero-legged-auth needs to know how to access the provider's form of the client secret, to be able to directly validate requests signed with the secret.

This is a less capable, more monolithic and potentially less secure architecture- less secure because of the need to distribute the actual shared secret, rather than a limited-use token.