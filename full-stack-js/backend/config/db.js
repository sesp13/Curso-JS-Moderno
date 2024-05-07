import mongoose from 'mongoose';

const uri = process.env.MONGODBCNN;

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(uri);

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`Mongo DB conectado en ${url}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
