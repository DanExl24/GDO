--
-- PostgreSQL database dump
--

\restrict nUpwp7OKCeJwyZx48V6co0tJRRwtxVeuZAen48UrvwXOtDSdeC7HpAge9QHkO08

-- Dumped from database version 18.4 (Debian 18.4-1.pgdg12+1)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: ofonline_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ofonline_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: historial_usuario; Type: TABLE; Schema: public; Owner: ofonline_user
--

CREATE TABLE public.historial_usuario (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    campo character varying(50) NOT NULL,
    valor text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    es_actual boolean DEFAULT true NOT NULL,
    origen character varying(20) DEFAULT 'ONLINE'::character varying NOT NULL,
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    fecha_sincronizacion timestamp with time zone,
    fecha_ultima_activacion timestamp with time zone,
    veces_reutilizado integer DEFAULT 0
);


ALTER TABLE public.historial_usuario OWNER TO ofonline_user;

--
-- Name: historial_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: ofonline_user
--

CREATE SEQUENCE public.historial_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_usuario_id_seq OWNER TO ofonline_user;

--
-- Name: historial_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ofonline_user
--

ALTER SEQUENCE public.historial_usuario_id_seq OWNED BY public.historial_usuario.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: ofonline_user
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    documento character varying(50) NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    telefono character varying(20),
    direccion character varying(100),
    password character varying(100)
);


ALTER TABLE public.usuario OWNER TO ofonline_user;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: ofonline_user
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO ofonline_user;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ofonline_user
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: historial_usuario id; Type: DEFAULT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.historial_usuario ALTER COLUMN id SET DEFAULT nextval('public.historial_usuario_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Name: historial_usuario historial_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.historial_usuario
    ADD CONSTRAINT historial_usuario_pkey PRIMARY KEY (id);


--
-- Name: usuario usuario_documento_key; Type: CONSTRAINT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_documento_key UNIQUE (documento);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- Name: idx_historial_actual; Type: INDEX; Schema: public; Owner: ofonline_user
--

CREATE INDEX idx_historial_actual ON public.historial_usuario USING btree (usuario_id, campo, es_actual) WHERE (es_actual = true);


--
-- Name: historial_usuario historial_usuario_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ofonline_user
--

ALTER TABLE ONLY public.historial_usuario
    ADD CONSTRAINT historial_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO ofonline_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO ofonline_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO ofonline_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO ofonline_user;


--
-- PostgreSQL database dump complete
--

\unrestrict nUpwp7OKCeJwyZx48V6co0tJRRwtxVeuZAen48UrvwXOtDSdeC7HpAge9QHkO08

