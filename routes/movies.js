const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../VerifyToken");

//CREATE

router.post("/", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       const newMovie = new Movie(req.body);

       try{
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
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
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new: true}); //it will take the id from params and try to find this id
        res.status(200).json(updatedMovie);
       }catch(err){
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You can update only your Movie!");
    }
});

//DELETE

router.delete("/:id", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       try{
        await Movie.findByIdAndDelete(req.params.id); //it will take the id from params and try to find this id
        res.status(200).json("Movie has been deleted..");
       }catch(err){
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You can update only your Movie!");
    }
});

//GET

router.get("/find/:id", verify, async (req, res)=>{

       try{
        const movie = await Movie.findById(req.params.id); //it will take the id from params and try to find this id
        res.status(200).json(movie);
       }catch(err){
        res.status(500).json(err);
       } 
});

//GET RANDOM

router.get("/random", verify, async (req, res)=>{
    const type = req.query.type; //?type=series will retuen random series if not query then will return movie
    try{
        let movie; //so to change in condition
        if(type === "series"){
            movie = await Movie.aggregate([
                { $match: { isSeries: true } }, //in Movie Model there is isSeries which is false by default
                { $sample: { size: 1 } }, //find all series and give us a sample
            ]);
        }else{
            movie = await Movie.aggregate([
                { $match: { isSeries: false } }, //it gives us a movie not series as !query 
                { $sample: { size: 1 } }, //find all series and give us a sample
            ]);
        }
        res.status(200).json(movie);
    }catch(err){
     res.status(500).json(err);
    } 
});

//GET ALL

router.get("/", verify, async (req, res)=>{
    //we are verifying access token not body email pass
    if(req.user.isAdmin){
       try{
        const allMovies = await Movie.find(); 
        res.status(200).json(allMovies.reverse());//reverse the array to get latest movies
       }catch(err){
        res.status(500).json(err);
       }
    }else{
        res.status(403).json("You can update only your Movie!");
    }
});

module.exports = router;