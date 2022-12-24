
export const specifiedFields = (info) => {
    const selection = info.fieldNodes[0].selectionSet.selections;
    let fields = [];
    selection.forEach((field) => {
        fields.push(field.name.value)
    });
    return fields
}

export const nestedSpecifiedFields = (info) => {
    const selection = info.fieldNodes[0].selectionSet.selections;
    let nestedFields = [];
    selection.forEach((field) => {
        if (field.selectionSet) {
            const nestedSelection = field.selectionSet.selections;
            nestedSelection.forEach(nestedField => {
                nestedFields.push(nestedField.name.value)
            });
        }
    });
    return nestedFields
}

export default {specifiedFields, nestedSpecifiedFields}

