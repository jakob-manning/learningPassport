const { v4: uuidv4 } = require('uuid');

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  createUser: (name, email, password, res,  role = "user") => {
    let user;

    try{
      if(database.find( user => user.email === email)){
        throw new Error()
      }
      const id = uuidv4();
      user = {id, name, email, password, role}
      database.push(user)
    }catch (e) {
      throw new Error(`Unable to create user. User may already exist`);
    }

    return user
  },
};

module.exports = { database, userModel };
