const router = require("express").Router();
const List = require("../models/List");
const verify = require("../VerifyToken");

//CREATE

router.post("/", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       const newList = new List(req.body);

       try{
        const savedList = await newList.save();
        res.status(201).json(savedList);
       }catch(err){ 
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You are not Allowed!");
    }
});

//UPDATE

router.put("/:id", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       try{
        const updatedList = await List.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new: true}); //it will take the id from params and try to find this id
        res.status(200).json(updatedList);
       }catch(err){
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You can update only your List!");
    }
});
//DELETE

router.delete("/:id", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       try{
        await List.findByIdAndDelete(req.params.id);
        res.status(201).json("The list has been deleted..");
       }catch(err){ 
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You are not Allowed!");
    }
});
//GET

router.get("/", verify, async (req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = []; //push all data in this list at end

    try{
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample: { size: 10 }},
                    {$match: { type: typeQuery, genre: genreQuery } }, // find all and return 10 

                ]);
            }
            else{
                list = await List.aggregate([
                    {$sample: { size: 10 }},
                    {$match: { type: typeQuery } }, // find all and return 10 
                ]);
            }
        }else{
            list = await List.aggregate([{$sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;