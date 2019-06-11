# Omigost
[![Build Status](https://travis-ci.org/Omigost/Omigost.svg?branch=master)](https://travis-ci.org/Omigost/Omigost)

![Omigost Cloud](/images/cover_photo.jpg)

Manage and optimize development cost for Amazon Web Services.


## Why it's worth trying

1. **Save money.** Use your money efficiently. Equivalent of turning off lights when you leave the building.
2. **Increase development speed.** Provide great experience and flexibility. No bureaucracy, allow by default, nudge when it matters.
3. **Visibility and accountability.** Monitor why you spend the money, usually its better to spend money than developers time.

## How it works

### Example use cases
1. Turn off by default running resources (e.g. EC2, RDS) outside of business hours. You will be informed at the end of a day and may opt-out. Your computers may be booted back before you start a new day.
2. Notify about AWS spend above treshold. Include basic analytics. Have an easy way to override temporarily or permanently treshold levels.
3. Setup budgets on team or individual levels with escalations.
4. Terminate hard to find resources. E.g. result of bug in the code.

### Non-functional

- Highly configurable and flexible.
- Supports single sign on through SAML or OAuth.
- Integrates with Slack.
- Secure.
- Manage notification well: only signal when it matters, no noisy or overload of alerts.

## Technology stack

Client (Single Page App) - Server - Database

1. Frontend: [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
2. Backend: Java 11, [Spring](https://spring.io/), builds with [Gradle](https://gradle.org/) and develop with [Intellij](https://www.jetbrains.com/idea/).
3. Deployed with [Docker](https://www.docker.com/) on AWS with [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/).

## About

Project created by students of the [University of Warsaw, Faculty of Mathematics, Informatics and Mechanics](https://www.mimuw.edu.pl/en) with mentorship from [Sumo Logic](https://www.sumologic.com/).

It is a team project which will result in [Bachelor's Thesis](https://github.com/Omigost/Docs).
