CREATE SCHEMA pmm;

CREATE TABLE pmm.USER_STATUS (
    USER_STATUS_ID SERIAL PRIMARY KEY,
    DESCRIPTION VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE pmm.PARTY (
    PARTY_ID SERIAL PRIMARY KEY,
    FIRSTNAME VARCHAR(100) NULL,
    LASTNAME VARCHAR(100) NULL,
    BIRTHDAY DATE NULL,
    AVERAGE_SCORE NUMERIC(5,2) NULL,
    PRIORITY INTEGER CHECK (PRIORITY>=0 AND PRIORITY <=10)
);

CREATE TABLE pmm.USER (
    PARTY_ID INTEGER NOT NULL PRIMARY KEY REFERENCES pmm.PARTY (PARTY_ID) 
);

CREATE TABLE pmm.DRIVER (
    PARTY_ID INTEGER NOT NULL PRIMARY KEY REFERENCES pmm.PARTY (PARTY_ID),
    LICENSE  VARCHAR(40) NULL,
    POLICY_NUMBER  VARCHAR(40) NULL
);

CREATE TABLE pmm.USER_CREDENTIALS (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) UNIQUE NOT NULL,
    TOKEN VARCHAR(200) NULL,
    INTENTS INTEGER NULL,
    REGISTRATION_DATE DATE NOT NULL,
    LAST_LOGIN_DATE DATE NOT NULL DEFAULT CURRENT_DATE,
    USER_STATUS_ID INTEGER NOT NULL REFERENCES pmm.USER_STATUS (USER_STATUS_ID),
    PARTY_ID INTEGER NOT NULL REFERENCES pmm.PARTY (PARTY_ID)
);

CREATE TABLE pmm.FILE_DOCUMENT (
    FILE_DOCUMENT_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    EXTENSION VARCHAR(10) NULL,
    DATA TEXT NOT NULL
);

CREATE TABLE pmm.PARTY_FILE_DOCUMENT (
    PARTY_ID INTEGER NOT NULL REFERENCES pmm.PARTY (PARTY_ID),
    FILE_DOCUMENT_ID INTEGER NOT NULL REFERENCES pmm.FILE_DOCUMENT (FILE_DOCUMENT_ID)
);

CREATE TABLE pmm.SCORE (
    SCORE_ID SERIAL PRIMARY KEY,
    POINTS INTEGER CHECK (POINTS>=0 AND POINTS <=5),
    DESCRIPTION VARCHAR(250) NULL
);

CREATE TABLE pmm.TRAVEL_STATE (
    TRAVEL_STATE_ID SERIAL PRIMARY KEY,
    DESCRIPTION VARCHAR(25) UNIQUE NOT NULL
);

CREATE TABLE pmm.TRAVEL (
    TRAVEL_ID SERIAL PRIMARY KEY,
    TRAVEL_FROM VARCHAR(25) NULL,
    TRAVEL_TO VARCHAR(25) NULL,
    TRAVEL_DISTANCE FLOAT UNIQUE NULL,
    TRAVEL_PRICE FLOAT NULL,
    TRAVEL_TIME FLOAT NULL,
    TRAVEL_PET_AMOUNT_SMALL NUMERIC NULL,
    TRAVEL_PET_AMOUNT_MEDIUM NUMERIC NULL,
    TRAVEL_PET_AMOUNT_LARGE NUMERIC NULL,
    TRAVEL_HAS_A_COMPANION BOOLEAN NULL,
    TRAVEL_USER_SCORE_ID INTEGER NULL REFERENCES pmm.SCORE (SCORE_ID),
    TRAVEL_DRIVER_SCORE_ID INTEGER NULL REFERENCES pmm.SCORE (SCORE_ID),
    TRAVEL_STATE_ID INTEGER NOT NULL REFERENCES pmm.TRAVEL_STATE (TRAVEL_STATE_ID)
);

-- INSERTS

INSERT INTO pmm.USER_STATUS (DESCRIPTION) VALUES ('created'), ('available'), ('disavailable'), ('removed');
INSERT INTO pmm.PARTY (FIRSTNAME, LASTNAME, BIRTHDAY, AVERAGE_SCORE, PRIORITY) VALUES ('userTest', 'userTestLastName', '28-07-1980', 5.69, 5);
INSERT INTO pmm.PARTY (FIRSTNAME, LASTNAME, BIRTHDAY, AVERAGE_SCORE, PRIORITY) VALUES ('driverTest', 'userTestLastName', '28-07-1980', 5.69, 5);
INSERT INTO pmm.USER (PARTY_ID) VALUES (1);
INSERT INTO pmm.DRIVER (PARTY_ID, LICENSE, POLICY_NUMBER) VALUES (2, '432242432', '04000000001000000');
INSERT INTO pmm.USER_CREDENTIALS (NAME, USER_STATUS_ID, REGISTRATION_DATE, LAST_LOGIN_DATE, PARTY_ID) VALUES ('userTest', 1, '05/05/2019', '05/05/2019', 1);


INSERT INTO pmm.TRAVEL_STATE (DESCRIPTION) VALUES ('cotizated'), ('user confirmated'), ('driver confirmated'), ('user finalized'), ('driver finalized'), ('finalized');