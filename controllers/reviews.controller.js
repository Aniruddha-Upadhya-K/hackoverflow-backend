const { Review } = require("../models/reviews.model");

const sockets_map = new Map();

async function socket(io) {
    io.on('connection', (socket) => {
        socket.on('initialize', (data) => {
            sockets_map.set(data.uuid, socket);
            socket.emit('message', ({ message: "Hello" + data.name }));

            socket.on("get-reviews", (data) => {
                const reviews = Review.getReviews(data.uuid);
                if (reviews) {
                    socket.emit("your-reviews", ({ message: "success", data: reviews }))
                }
            });

        })
        console.log(sockets_map);
    })
}
const addReview = async (req, res) => {
    const { companyUUID, employeeUUID, data } = req.body;
    try {
        await Review.create({ companyUUID, employeeUUID, description: data });
        console.log(sockets_map.get(companyUUID));
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "An error occurred!" });
    }
}

module.exports = { addReview, socket };