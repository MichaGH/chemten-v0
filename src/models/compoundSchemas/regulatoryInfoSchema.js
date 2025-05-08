const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hPhrasesData = require('../../data/regulatoryInformation/hPhrases.json');
const pPhrasesData = require('../../data/regulatoryInformation/pPhrases.json');
const pictogramsData = require('../../data/regulatoryInformation/pictograms.json');

function getPhraseSchema(phraseData) {
    return new Schema({
      id: {
        type: String,
        required: true,
        validate: {
          validator: function (idVal) {
            return phraseData.some(item => item.id === idVal);
          },
          message: props => `Invalid phrase ID: ${props.value}`
        }
      },
      description: {
        type: String,
        required: true,
        validate: {
          validator: function (descVal) {
            const match = phraseData.find(item => item.id === this.id);
            return match ? match.description === descVal : false;
          },
          message: props => `Description does not match ID: ${this.id}`
        }
      }
    }, {_id: false });
  }
  const pictogramSchema = new Schema({
    id: {
      type: String,
      required: true,
      validate: {
        validator: function (idVal) {
          return pictogramsData.some(item => item.id === idVal);
        },
        message: props => `Invalid pictogram ID: ${props.value}`
      }
    },
    label: {
      type: String,
      required: true,
      validate: {
        validator: function (labelVal) {
          const match = pictogramsData.find(item => item.id === this.id);
          return match ? match.label === labelVal : false;
        }
      }
    },

    link: {
        type: String,
        required: true,
        validate: {
            validator: function(linkVal) {
                const match = pictogramsData.find(item => item.link === this.link);
                return match ? match.link === linkVal : false;
            },
            message: props => `Invalid pictogram link: ${props.link}`
        }
    }
  }, { _id: false });

  const regulatoryInfoSchema = new Schema({
    hPhrases: [getPhraseSchema(hPhrasesData)],
    pPhrases: [getPhraseSchema(pPhrasesData)],
    pictograms: [pictogramSchema]
  }, { timestamps: true, _id: false });
      

module.exports = regulatoryInfoSchema;