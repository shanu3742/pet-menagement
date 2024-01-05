 const PET = require('../model/pet.model')
exports.getPet = async (req, res) => {
    try{
        const pet = await PET.find({}).sort({ createdAt: -1 });
        res.status(200).send(pet);

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          })
    }
}

exports.postPet = async (req,res) => {
    try{
        let petData = req.body;
        petToSave ={
            animaltype: petData?.animaltype,
            name:petData?.name,
            id: petData?.id,
            description: petData?.description??'N/A',
            like: 0,
            dislike:0,
            shortdescription: petData?.shortdescription??'N/A',
            price: petData?.price,
            location: petData?.location,
            longitude: petData?.longitude??'N/A',
            lattitude: petData?.lattitude??'N/A',
            createdBy: petData?.createdBy??'N/A',
            owner: {
              id: petData?.owner?.id??'N/A',
              name: petData?.owner?.name??'N/A',
              age: petData?.owner?.age??'N/A',
              email: petData?.owner?.email??'N/A',
              phone: petData?.owner?.phone??'N/A'
            },
            image: [
             ...petData.image
            ]
        }
        const pet= await PET.create(petToSave);
        res.status(201).send(pet)

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          })
    }

}
exports.getPetById = async (req,res) => {
    try{
        let id= req.params.petNumber;
        let pet  = await PET.findOne({ _id: id});

        if(!pet){
         return    res.status(404).send({
                message: `Pet Not Found  For The Given Id`,
              })
        }
        res.status(200).send(pet)

    }catch(e){
        res.status(500).send({
            message: `internal server error ${e}`,
          })
    }
}