import app from "./app";

const PORT:number = 4000;
// const PORT:number = process.env.PORT | 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});