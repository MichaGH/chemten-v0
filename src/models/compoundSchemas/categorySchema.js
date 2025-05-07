const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rawCategories = require("../../data/compoundCategories.json");

function getCategoryItemSchema(level) {
    return new Schema({
        id: {
            type: String,
            required: true,
            // check if in that particular level there is an ID with that value
            validate: {
                validator : function (idVal) {
                    const levelArray = rawCategories[`level${level}`];
                    return levelArray.some(item => item.id === idVal);
                },
                message: (props) => `Invalid category ID: ${props.value}`
            }
        },
        label: {
            type: String,
            required: true,

            // check if its the correct label for that id 
            validate: {
                validator: function (labelVal) {
                    const levelArray = rawCategories[`level${level}`];
                    const match = levelArray.find(item => item.id === this.id);
                    // if match is underfined → false, if its truthy → check the condition

                    //console.log(`ID: ${this.id} \n- Expected label: ${match.label} \n- Provided label: ${labelVal}`);
                    return match ? match.label === labelVal : false; 
                }
            }
        }
    })
}


//! Category Schema
// For each level, function is called that returns categoryItemSchema, validated by map passed as argument
const categorySchema = new Schema(
	{
		level1: [getCategoryItemSchema(1)],
		level2: [getCategoryItemSchema(2)],
		level3: [getCategoryItemSchema(3)],
	},
	{ timestamps: true }
);

module.exports = categorySchema;
