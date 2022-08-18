import mongoose from 'mongoose';

// Creating schema for todo item list
const Schema = new mongoose.Schema({
    title : {
        type: String,
        required: 'Title is required.'
    },
    description : {
        type: String
    },
    due_date : {
        type: Date,
        min : Date.now(),
        required: 'Due Date is required.'
    },
    status : {
        type: String,
        default: "Open"
    }
}, {
    timestamps: true       // This will add createdAt and updatedAt properties
},{
    versionKey : false
});

// adding id key to the schema
Schema.virtual('id', () => this._id.toHexString());
Schema.set('toJSON', { virtuals: true});

const model = mongoose.model('todo', Schema);

export default model;
