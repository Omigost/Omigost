CREATE TABLE "User" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"isAdmin" BOOLEAN NOT NULL,
	CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Alert" (
	"user" integer NOT NULL,
	"communication" integer NOT NULL,
	"sendingTime" TIMESTAMP NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"event" integer NOT NULL,
	"response" integer,
	"token" VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Communication" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL UNIQUE,
	"value" VARCHAR(255) NOT NULL,
	CONSTRAINT Communication_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "AlertResponse" (
	"id" serial NOT NULL,
	"text" VARCHAR(255) NOT NULL,
	"value" VARCHAR(255) NOT NULL,
	CONSTRAINT AlertResponse_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UserCommunications" (
	"user" integer NOT NULL,
	"communication" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Account" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT Account_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UsersAccounts" (
	"user" integer NOT NULL,
	"account" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "AlertToken" (
	"token" VARCHAR(255) NOT NULL,
	"isActive" BOOLEAN NOT NULL,
	CONSTRAINT AlertToken_pk PRIMARY KEY ("token")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "AlertEvent" (
	"id" serial NOT NULL,
	CONSTRAINT AlertEvent_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Alert" ADD CONSTRAINT "Alert_fk0" FOREIGN KEY ("user") REFERENCES "User"("id");
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_fk1" FOREIGN KEY ("communication") REFERENCES "Communication"("id");
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_fk2" FOREIGN KEY ("event") REFERENCES "AlertEvent"("id");
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_fk3" FOREIGN KEY ("response") REFERENCES "AlertResponse"("id");
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_fk4" FOREIGN KEY ("token") REFERENCES "AlertToken"("token");



ALTER TABLE "UserCommunications" ADD CONSTRAINT "UserCommunications_fk0" FOREIGN KEY ("user") REFERENCES "User"("id");
ALTER TABLE "UserCommunications" ADD CONSTRAINT "UserCommunications_fk1" FOREIGN KEY ("communication") REFERENCES "Communication"("id");


ALTER TABLE "UsersAccounts" ADD CONSTRAINT "UsersAccounts_fk0" FOREIGN KEY ("user") REFERENCES "User"("id");
ALTER TABLE "UsersAccounts" ADD CONSTRAINT "UsersAccounts_fk1" FOREIGN KEY ("account") REFERENCES "Account"("id");
