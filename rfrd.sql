CREATE TABLE UTILISATEUR (
	id_utilisateur SERIAL PRIMARY KEY,
	nom VARCHAR (50) NOT NULL,
	prenom VARCHAR (50) NOT NULL,
	password VARCHAR (50) NOT NULL,
	email VARCHAR (355) UNIQUE NOT NULL,
	birthday DATE
);

CREATE TABLE QUESTION(
	id_question SERIAL PRIMARY KEY,
	titre VARCHAR (50) NOT NULL,
	description VARCHAR (355) NOT NULL,
	datedebut timestamp without time zone,
	datefin timestamp without time zone
);
CREATE TABLE DOCUMENT(
    id_document SERIAL PRIMARY KEY,
    id_question SERIAL NOT NULL,
    titre VARCHAR (50) NOT NULL,
    path VARCHAR (355) NOT NULL,
    description VARCHAR (355) UNIQUE NOT NULL,
    imagePath VARCHAR (50) NOT NULL,
    constraint FK_document_question foreign key (id_question) references question(id_question)
);

CREATE TABLE VOTE(
	id_question SERIAL NOT NULL,
	id_utilisateur SERIAL NOT NULL,
	resultat bool NOT NULL,
	PRIMARY KEY (id_question, id_utilisateur),
	CONSTRAINT vote_id_question_fkey FOREIGN KEY (id_question)
      REFERENCES QUESTION (id_question),
    CONSTRAINT vote_id_utilisateur_fkey FOREIGN KEY (id_utilisateur)
      REFERENCES UTILISATEUR (id_utilisateur)
);

CREATE TABLE COMMENTAIRE(
	id_commentaire SERIAL PRIMARY KEY,
	id_document SERIAL NOT NULL,
	id_utilisateur SERIAL NOT NULL,
	commentaire VARCHAR (355) NOT NULL,
	CONSTRAINT commentaire_id_document_fkey FOREIGN KEY (id_document)
      REFERENCES DOCUMENT (id_document),
    CONSTRAINT commentaire_id_utilisateur_fkey FOREIGN KEY (id_utilisateur)
      REFERENCES UTILISATEUR (id_utilisateur)
);

CREATE TABLE NOTECOMMENTAIRE(
	id_commentaire SERIAL NOT NULL,
	id_utilisateur SERIAL NOT NULL,
	note smallint NOT NULL,
	PRIMARY KEY (id_commentaire, id_utilisateur),
	CONSTRAINT notecommentaire_id_commentaire_fkey FOREIGN KEY (id_commentaire)
      REFERENCES COMMENTAIRE (id_commentaire),
    CONSTRAINT notecommentaire_id_utilisateur_fkey FOREIGN KEY (id_utilisateur)
      REFERENCES UTILISATEUR (id_utilisateur)
);

CREATE TABLE NOTEDOCUMENT(
	id_document SERIAL NOT NULL,
	id_utilisateur SERIAL NOT NULL,
	note smallint NOT NULL,
	PRIMARY KEY (id_document, id_utilisateur),
	CONSTRAINT notedocument_id_document_fkey FOREIGN KEY (id_document)
      REFERENCES DOCUMENT (id_document),
    CONSTRAINT notedocument_id_utilisateur_fkey FOREIGN KEY (id_utilisateur)
      REFERENCES UTILISATEUR (id_utilisateur)
);

INSERT INTO UTILISATEUR (nom, prenom, password, email, birthday)
VALUES
	('halbaut','arthur', 'jaimepaslespizzas', 'halbaut.arthur@hotmail.fr', '1997-02-13');

INSERT INTO UTILISATEUR (nom, prenom, password, email, birthday)
VALUES
	('Boukari','Yannis', 'ironmantropfacile', 'boukari.yannis@hotmail.fr', '1924-12-24');

INSERT INTO QUESTION (titre, description, datedebut, datefin)
VALUES
	('Administrateur réseau est-il un métier ?','Brancher des cables est-il suffisant pour être payer ?', now(), '2020-06-10 16:00:00');

INSERT INTO DOCUMENT (id_question, titre, path, description, imagePath)
VALUES
	('1','brancher un cable en 3 étapes', 'documents/question1/document/ressource1', 'document expliquant comment brancher un cable', 'documents/questions/images/ressource1');	
INSERT INTO DOCUMENT (id_question, titre, path, description, imagePath)
VALUES
	('1','comment ranger un cable sans l abimer' , 'documents/question2/document/ressource2', 'document expliquant comment plier et trouver le bon tiroir', 'documents/questions/images/ressource2');

INSERT INTO VOTE (id_question, id_utilisateur, resultat)
VALUES
	('1','1','1');

INSERT INTO COMMENTAIRE (id_document, id_utilisateur, commentaire)
VALUES
	('2','2', 'Ce document m a permit de trouver un emploi merci !');

INSERT INTO NOTECOMMENTAIRE (id_utilisateur, id_commentaire, note)
VALUES
	('1','1', '3');

INSERT INTO NOTEDOCUMENT (id_document, id_utilisateur, note)
VALUES
	('1','2', '2');