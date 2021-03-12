# learningPassport
tinkering with OAuth + local strategies

To run:
-add a .env file with github (and facebook) credentials
-node server.js
-voilà!

Note: As you may notice, this server doesn't use a database and passwords are not hashed. Local users you create are saved in plaintext as a js variable and will be cleared each time the server restarts.
