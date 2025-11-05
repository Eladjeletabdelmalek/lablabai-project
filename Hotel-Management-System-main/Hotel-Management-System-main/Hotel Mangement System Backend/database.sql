CREATE DATABASE labalabai
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en-US'
    LC_CTYPE = 'en-US'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE labalabai
    IS 'this is the main database for lablab ai  compitition';


    -- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE
IF NOT EXISTS public."User"
(
    "UserID" numeric NOT NULL,
    "Name" "char"[],
    "Email" "char"[],
    "Password" "char"[] NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY
("UserID")
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public."User"
    OWNER to postgres;