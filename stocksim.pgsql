--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: users; Type: TABLE; Schema: public; Owner: edward
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO edward;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: edward
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO edward;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edward
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: edward
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: edward
--

COPY public.users (id, email, password) FROM stdin;
2	test@test.com	pbkdf2:sha256:150000$zz6JOjSb$87c64e1ea86a649ea2ef97801779c18fd531a9d147a067691c57ff9e383b1fd3
3	test@test.com	pbkdf2:sha256:150000$N1UbQMa8$95963c63135bee53cbb73012c415e9c0b9645d23c4c883ef5678cdc798815c47
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: edward
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: edward
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

