ALTER TABLE "nchb_team" ADD COLUMN "captain_parent_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "captain_parent_email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "captain_parent_phone" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "captain_autoproctor_consent" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member1_parent_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member1_parent_email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member1_parent_phone" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member1_autoproctor_consent" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member2_parent_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member2_parent_email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member2_parent_phone" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member2_autoproctor_consent" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member3_parent_name" varchar(256);--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member3_parent_email" varchar(256);--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member3_parent_phone" varchar(50);--> statement-breakpoint
ALTER TABLE "nchb_team" ADD COLUMN "member3_autoproctor_consent" boolean;