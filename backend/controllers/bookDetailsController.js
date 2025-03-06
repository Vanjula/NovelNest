
const Book =require('../models/Book');
    
const getBookDetails= async (req,res)=>{
    try{
        const book = await Book.findOne({_id:req.params.id});

        if(!book){
            console.log("Book not found");
            return res.status(404).json({message:"Book not found"});
        }
        console.log("Fetched book details:",book);
        res.status(200).json(book);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
}

module.exports={getBookDetails};