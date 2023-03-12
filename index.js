const express = require('express');
const mangoose =require('mongoose');

const authRouter=require('./routes/auth');
const adminRouter =require('./routes/admin');
const productRouter =require('./routes/product');
const userRouter = require('./routes/user');

const DBC="mongodb+srv://hss_sa:rM1VhisEpknpcaCb@cluster0.qzwvf6j.mongodb.net/?retryWrites=true&w=majority";


const PORT=3020

const app=express();
app.use(express.json());

app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
mangoose.connect(DBC).then(() => {

    console.log('connected:)')
}).catch((e)=> {console.log(e);});

app.listen(PORT, "0.0.0.0" , () => {
    console.log('its working in port' ,PORT );
});

