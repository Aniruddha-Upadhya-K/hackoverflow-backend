const { User } = require('../models/user.model');
const { Review } = require('../models/reviews.model');

    (async function () {
        try {
            await Review.sync();
            await User.sync();
        } catch (error) {
            console.log(error);
        }
    })()

