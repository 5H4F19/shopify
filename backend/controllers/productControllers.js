import expressAsyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

export const getProducts =expressAsyncHandler( async (req,res) => {
    const pageSize = 10
    const page =Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
    }:{}
        
    const count = await Product.countDocuments({...keyword})
    
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    
    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
})

export const getProductById = expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    res.json(product)
})

export const deleteProduct = expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message:'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export const createProduct = expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description:'Sample dewscription'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

export const updateProduct = expressAsyncHandler(async (req, res) => {
    const{
        name,
        price,
        image,
        brand,
        category,
        countInStock, 
        description,
    } = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct) 
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
    
    
})


// @desc     Create new review
//@route    POST api/rpoducts/:id/review
//access    private
export const createProductReview = expressAsyncHandler(async (req, res) => {
    const{rating,comment} = req.body

    const product = await Product.findById(req.params.id)
    if (product) {
        const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        } else {
            
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user:req.user._id
            }
            product.reviews.push(review)
            product.rating = product.reviews.reduce((acc,item)=>item.rating  + acc,0) / product.reviews.length
            product.numReviews = product.reviews.length
            await product.save()
            res.status(201).json({message:'Review added'}) 
        }
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
    
    
})

// @desc    Get top rated products
//@route    POST api/rpoducts/top
//access    public
export const topRatedProducts = expressAsyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(product)
})