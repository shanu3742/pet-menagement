const express  = require('express');
const {APP_CONFIG} = require('./config/app.config')
const {DB_CONFIG} = require('./config/db.config')
const mongoose = require('mongoose')
const PET = require('./model/pet.model')
const bodyParser = require('body-parser');
const  cors = require('cors');

//init app 
const app = express();

app.use(cors());
app.use(express.static("Assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * connenction to db 
 */
mongoose.connect(DB_CONFIG.URL);
const db = mongoose.connection;
const initPet = async() => {
   try{
    let petData = await PET.find({});
    if(petData.length>0){
        return
    }

    let petObj={
        animaltype:'Dog',
        id:'1',
        name:'jimmy',
        description:`Jimmy is a remarkable canine companion, a loyal and loving member of the household who brings boundless joy and warmth to the lives of those fortunate enough to know him. With a sleek coat of fur that glistens in the sunlight, Jimmy is a picture of canine elegance. His expressive eyes, a deep and soulful brown, reflect the intelligence and curiosity that define his character.At first glance, one cannot help but be captivated by Jimmy's infectious energy and zest for life. Whether it's a game of fetch in the backyard or a leisurely stroll through the neighborhood, his enthusiasm is contagious. His tail wags with such enthusiasm that it seems to have a language of its own, communicating joy and excitement with every wag.
        Beyond his physical attributes, Jimmy possesses a gentle and affectionate nature that endears him to everyone he meets. His friendly demeanor extends not only to his human companions but also to fellow furry friends. Jimmy is a social butterfly at heart, always eager to make new acquaintances and forge bonds with other dogs during neighborhood walks or trips to the local park.
        In addition to his friendly disposition, Jimmy showcases a remarkable intelligence that sets him apart. Quick to learn new tricks and commands, he thrives on mental stimulation and engages in activities that challenge his clever mind. Whether it's solving puzzle toys or mastering obedience training, Jimmy's sharp intellect is a testament to the close bond he shares with his dedicated owners.
        As a source of comfort and companionship, Jimmy excels in providing emotional support. His empathetic nature allows him to sense when his human companions need a comforting presence, and he willingly offers unconditional love and support. Whether it's a rough day at work or a quiet evening at home, Jimmy's presence is a soothing balm that eases stress and fosters a sense of tranquility.
        As a member of the family, Jimmy's impact goes beyond the superficial. He is not merely a pet; he is a cherished confidant, a source of laughter, and a silent companion in both good times and bad. Through his unwavering loyalty and affectionate nature, Jimmy has become an integral part of the family fabric, leaving an indelible mark on the hearts of all who have the privilege of knowing him.`,
        like:0,
        dislike:0,
        shortdescription:'Jimmy is an exuberant and affectionate canine companion with a sleek coat and soulful brown eyes. His boundless energy and love for play make him a delightful addition to any household. Quick to learn and eager to please, Jimmy is not just a pet but a cherished family member, providing comfort, joy, and unwavering loyalty to all who are lucky enough to call him their own.',
        price:2000,
        location:'sector V kolkata',
        longitude:'88.4306861',
        lattitude:'22.5764753',
        createdBy:'shanu',
        owner:{
            id:'1',
            name:'shanu',
            age:24,
            email:'krksingh.99@gmail.com',
            phone:'8660308645',
            image:"https://avatars.githubusercontent.com/u/65018865?v=4"

        },
        image:[
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fdog&psig=AOvVaw0A61LL1W6QyY60Nmus46-t&ust=1704517648711000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIi_oZm9xYMDFQAAAAAdAAAAABAE',
             'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-2_1562-691.jpg'
        ]

    
    }

    const petUser = await PET.create(petObj);
    console.log(petUser)

   }catch(e){
    console.log(`something went wrong`)
   }
}




db.once('open', () => {
    console.log('connected to database');
    initPet();
  });
db.on('error', () => console.log('something went wrong'));


//init a page 


/**
 * all routes get connected here
 */

require('./router/pet.router')(app)
//connect the server

app.listen(APP_CONFIG.PORT,() => {
    console.log(APP_CONFIG)
    console.log('serever connection completed')
})