const getUnit = (unit) => {
  console.log(unit)
  if (unit.includes('mg')) {
    return 'miligrams'
  }
  else if(unit.includes('g'))
  {
    return 'grams'
  }
  else {
    return 'kcals'
  }
}

const getName = (names) => {
  console.log(names)
  names = names.filter((name) => {
    return name !== 'mg' && name !== 'g'
  })
  return names.join(' ')
}

function combineNames(arr) {
  const counts = {}
  arr.forEach((str) => {
    counts[str] = (counts[str] || 0) + 1
  })
  const result = []
  Object.entries(counts).forEach(([name, count]) => {
    const countString = `${count} ${name}`
    result.push(countString)
  })
  return result
}
const getNutritionInformation = (nutritionName, amount) => {
  const splitNutritionName = nutritionName.split('_')
  const unit = getUnit(splitNutritionName)
  const name = getName(splitNutritionName)
  return {
    name: name,
    amount: amount,
    unit: unit,
  }
}

export const formatResult = (results) => {
  const mergedObject = { foodNames: [], nutrients: [] }
  results.forEach((nutrition) => {
    Object.entries(nutrition).forEach(([keyName, amount]) => {
      if (keyName === 'name') {
        mergedObject.foodNames.push(amount)
      } else {
        const nutrientInfo = getNutritionInformation(keyName, amount)
        const existingNutrientIndex = mergedObject.nutrients.findIndex(
          (nutrient) => nutrient.name === nutrientInfo.name
        )
        if (existingNutrientIndex === -1) {
          mergedObject.nutrients.push(nutrientInfo)
        } else {
          mergedObject.nutrients[existingNutrientIndex].amount +=
            nutrientInfo.amount
        }
      }
    })
  })
  mergedObject.foodNames = combineNames(mergedObject.foodNames)
  return mergedObject
}
