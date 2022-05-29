    START TRANSACTION;
    
    CREATE TABLE IF NOT EXISTS userTypes(
        id int AUTO_INCREMENT,
        name varchar(225), 
        label varchar(225), 
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS users(
        id int AUTO_INCREMENT,
        userTypeId int, 
        name varchar(225),
        email varchar(225), 
        password varchar(225), 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userTypeId) REFERENCES userTypes (id)
    );
        
    CREATE TABLE IF NOT EXISTS userLanguagePreferences(
        id int AUTO_INCREMENT,
        userId int,
        iso_639_1 varchar(225),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );
    
            
    CREATE TABLE IF NOT EXISTS userGenrePreferences(
        id int AUTO_INCREMENT,
        userId int,
        tmdbId int,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS userHistory(
        id int AUTO_INCREMENT,
        userId int,
        meta TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );

      CREATE TABLE IF NOT EXISTS userSubscriptions(
        id int AUTO_INCREMENT,
        userId int,
        subscriptionName TEXT,
        expiryDate TIMESTAMP,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );
    
    COMMIT;
    