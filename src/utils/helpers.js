"use strict";
const Joi = require("joi");

const {isEmpty} = require("lodash");
const dataToBeRemovedArray = ["", null, undefined];

/**
 * @param {object} value
 * @returns {object}
 */
function removeFieldsWithEmptyValue(value) {
    const objectTobeWorkingOn = {...value};

    if(typeof value != "object") return value;

    for (const key in objectTobeWorkingOn) {
        if(dataToBeRemovedArray.includes(objectTobeWorkingOn[key])){
            delete objectTobeWorkingOn[key];
            continue;
        }

        if(Array.isArray(objectTobeWorkingOn[key])){
            objectTobeWorkingOn[key] = objectTobeWorkingOn[key].map(removeFieldsWithEmptyValue);
            continue;
        }

        if(typeof objectTobeWorkingOn[key] === "object"){
            objectTobeWorkingOn[key] = removeFieldsWithEmptyValue(objectTobeWorkingOn[key]);
        }
    }

    return objectTobeWorkingOn;
}
exports.removeFieldsWithEmptyValue = removeFieldsWithEmptyValue;
exports.isEmpty = isEmpty;


exports.validate = (schema, payload) => {
    schema = Joi.object(schema);
    const {error} = schema.validate(payload, {
        allowUnknown: true,
    });

    if (error)
        return error.details[0].message.replace(/['"]/g, "");

    return null;
};
