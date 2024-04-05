CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"item_id" varchar(64) NOT NULL,
	"folder_path" varchar(64) NOT NULL,
	"cover_path" integer NOT NULL,
	"title" varchar(64) NOT NULL,
	"author" varchar(256) NOT NULL,
	"editions" integer NOT NULL,
	"languages" varchar(128) NOT NULL,
	"date" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks_movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"item_id" integer NOT NULL,
	"folder_path" varchar(64) NOT NULL,
	"cover_path" varchar(128) NOT NULL,
	"title" varchar(64) NOT NULL,
	"score" integer NOT NULL,
	"votes" integer NOT NULL,
	"genre_ids" varchar(128) NOT NULL,
	"date" varchar(12) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks_series" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"item_id" integer NOT NULL,
	"folder_path" varchar(64) NOT NULL,
	"cover_path" varchar(128) NOT NULL,
	"title" varchar(64) NOT NULL,
	"score" integer NOT NULL,
	"votes" integer NOT NULL,
	"genre_ids" varchar(128) NOT NULL,
	"date" varchar(12) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"language" varchar(10),
	"theme" varchar(10),
	CONSTRAINT "user_profile_user_email_unique" UNIQUE("user_email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
