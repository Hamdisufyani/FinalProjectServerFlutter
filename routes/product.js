const express =require('express');
const productRouter =express.Router();

const auth = require('../components/my_auth');
const { Product } = require('../models/product');

productRouter.get('/api/get-products', auth, async (req, res) => {
    try {
      const products = await Product.find({ category: req.query.category });
      res.json(products);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
});
// create a get request to search products and get them
// /api/products/search/i

productRouter.get('/api/get-products/search/:txt', auth, async (req, res) => {
  try {
    const products = await Product.find({
          name:{$regex: req.params.txt, $options: "i"}
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

// create a post request route to rate the product.
productRouter.post('/api/rate-product', auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get('/api/deal-of-day', auth, async (req, res) => {
  try {
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let sSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        sSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return bSum - sSum ;
    });

    res.json(products.slice(0, 3));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;