const { Review } = require("../models/reviews.model");
const { User } = require("../models/user.model");

var sockets_map = new Map();

async function socket(io) {
    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            sockets_map.set(data.uuid, socket);
            socket.emit('greet', ({ message: "Hello " + data.name }));

            socket.on("get_reviews", async (data) => {
                try {
                    var result;
                    console.log();
                    if (data.type === "user") {
                        result = await Review.getAllReviews(data.uuid)
                    }
                    else{
                        result = await Review.getAllClaims(data.uuid)
                    }
                    if (result) {
                        socket.emit("data", ({ message: "success", data: result }))
                    }
                } catch (error) {
                    console.error(error)
                }
            });

        })
    })
}
const addReview = async (req, res) => {
    const { CompanyUUID, EmployeeUUID, details } = req.body;
    console.log(req.body);
    try {
        await Review.create({ Company_UUID: CompanyUUID, Employee_UUID: EmployeeUUID, description: details });
        const socket = sockets_map.get(EmployeeUUID);
        console.log(sockets_map.get(EmployeeUUID))
        const reviews = await Review.getAllReviews(EmployeeUUID);
        if (reviews) {
            socket.emit("data", ({ message: "success", data: reviews }))
        }
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "An error occurred!" });
    }
}

const setStatus = async (req, res) => {
    const { id, newStatus } = req.body;
    try {
        const {Employee_UUID} = await Review.findOne({ where: { id: id } })
        await Review.update({ Review_status: newStatus }, {
            where: {
                id: id
            }
        })
        const socket = sockets_map.get(Employee_UUID);
        const reviews = await Review.getAllReviews(Employee_UUID);
        if (reviews) {
            console.log(reviews);
            socket.emit("data", ({ message: "success", data: reviews }))
        }
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.log(error);
    };
}
const getAllCompanies = async (req, res) => {
    try {
        const companies = await User.findAll({ where: { user_type: "company" } });
        res.status(200).json({ message: "success", data: companies });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: "An error occurred!" });
    }
}

module.exports = { addReview, socket, getAllCompanies, setStatus };