---
title: Before you add overhead, consider this...
date: '2019-03-20'
description: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side. Historically, JavaScript was used primarily for client-side scripting, in which scripts written in JavaScript are embedded in a webpage’s HTML, to be run client-side by a JavaScript engine in the user’s web browser.
tags: ['elegance', 'efficiency', 'scale', 'security']
cover: './palace.jpg'
---

###As simple as possible, but no simpler - Einstein

#####Inspired by Bjarne Stroustrup - creator and developer of the C++ programming language

Before you go on over engineering your code with an elaborate type system, the biggest gains to security come from approaching the your application as a system.  You can have the best type safe code, but have left yourself open to SQL injection. 

Reliability, performance and security comes from whole system, not from a single secure aspect.

###Simplify Simplify Simplify

First thing to do is to simplify the code and make sure each component is expressing everything that you thinking inside your head.  You may have some things up there that have not quite expressed themselves in the code.
The way you are thinking about the problem, the functionality and individual components, should be expressed in the code.
If the code can be read and understood clearly, it is:

* less likely to break 
* easier to maintain
* easier to find errors
* easier to make modifications
* easier to test
* runs faster

This is first structural improvement to make.

I also like this complementary heuristic, "cut your coat according to your cloth".  Start off by creating the most simple version of your component.  If you must add structural overhead, then let it emerge naturally through the desire to prevent unwanted behaviors or to increase readability.   When you anticipate that it may become difficult to find things or simply mistakes are being made, refactor the code to give it more structure.  Of course, when it comes to production, "An Ounce of Prevention is Worth a Ton of Cure"
