
const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = require("./routes/proRoutes");

app.use("/provedores",proRoutes)

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
})

