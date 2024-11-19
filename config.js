const {Sequelize}= require('sequelize');

const database= 'uploadDB';
const username= 'root';
const password=''

const sequelize=new Sequelize(database, username, password,
    {
        host:'localhost', 
        dialect:'mysql',
        dialectOptions: {
            charset: 'utf8mb4',
        },
        logging:console.log,
        
        define:{
            timestamps:true
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false }) // 'force: false' ensures tables are not dropped if they already exist
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((err) => {
        console.error("Error creating database tables: ", err);
    });

module.exports=sequelize;