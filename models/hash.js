import bcrypt from "bcryptjs";

const plainPassword = 'test';
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed password:', hashedPassword);
});
