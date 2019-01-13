module.exports = {
    species: {
        name: {
            type: String,
            required: true,
        },
        minheight: Number,
        maxheight: Number,
        minweight: Number,
        maxweight: Number,
        fur_color_enum: [String],
    },
    animal: {
        species: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 4
        },
        height: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        fur_color: {
            type: String,
            required: true
        },
        image_url: String
    }
}