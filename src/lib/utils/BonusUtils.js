const BONUS = {
  bronze: 0,
  silver: 1,
  gold: 2,
  platinium: 3,
}

export const getCompoBonuses = (compo, origins, classes) => {
  const compoClasses = getCompoClasses(compo)
  const compoOrigins = getCompoOrigins(compo)

  const compoClassesBonus = getCompoClassesBonus(compoClasses, classes)
  const compoOriginsBonus = getCompoOriginsBonus(compoOrigins, origins)

  const compoClasseBonuses = Object.keys(compoClassesBonus)
    .map(classeId => {
      const classe = classes.find(c => c.id === classeId)
      return {
        ...classe,
        ...compoClassesBonus[classeId],
        type: 'classe'
      }
    })

  const compoOriginBonuses = Object.keys(compoOriginsBonus)
    .map(originId => {
      const origin = origins.find(c => c.id === originId)
      return {
        ...origin,
        ...compoOriginsBonus[originId],
        type: 'origin'
      }
    })

  const compoBonuses = [
    ...compoClasseBonuses,
    ...compoOriginBonuses
  ].sort(sortBonuses)

  return compoBonuses
}

export const getCompoClasses = (compo) => {
  return compo.reduce((acc, champion) => {
    champion.classes.forEach(classe => {
      acc[classe] = acc[classe] || 0
      acc[classe] += 1
    })
    return acc
  }, {})
}

export const getCompoClassesBonus = (compoClasses, classes) => {
  return Object.keys(compoClasses).reduce((acc, classeId) => {
    const classe = classes.find(c => c.id === classeId)
    const classeBonus = Object.keys(classe.bonus).reduce((acc, bonusId) => {
      const compoClasseValue = compoClasses[classeId]
      const bonusValue = classe.bonus[bonusId]
      const currentMaxValue = acc ? classe.bonus[acc] : 0
      if (compoClasseValue >= bonusValue && bonusValue > currentMaxValue) {
        return bonusId
      }
      return acc
    }, null)
    if (classeBonus) {
      acc[classeId] = {
        bonus: classeBonus,
        value: compoClasses[classeId]
      }
    }
    return acc
  }, {})
}

export const getCompoOrigins = (compo) => {
  return compo.reduce((acc, champion) => {
    champion.origins.forEach(origin => {
      acc[origin] = acc[origin] || 0
      if (champion.classes.includes('DRAGON')) {
        acc[origin] += 3
      } else {
        acc[origin] += 1
      }
    })
    return acc
  }, {})
}

export const getCompoOriginsBonus = (compoOrigins, origins) => {
  return Object.keys(compoOrigins).reduce((acc, originId) => {
    const origin = origins.find(o => o.id === originId)
    const originBonus = Object.keys(origin.bonus).reduce((acc, bonusId) => {
      const compoOriginValue = compoOrigins[originId]
      const bonusValue = origin.bonus[bonusId]
      const currentMaxValue = acc ? origin.bonus[acc] : 0
      if (compoOriginValue >= bonusValue && bonusValue > currentMaxValue) {
        return bonusId
      }
      return acc
    }, null)
    if (originBonus) {
      acc[originId] = {
        bonus: originBonus,
        value: compoOrigins[originId]
      }
    }
    return acc
  }, {})
}

export const sortBonuses = (bonus1, bonus2) => {
  if (bonus1.bonus !== bonus2.bonus) {
    return BONUS[bonus2.bonus] - BONUS[bonus1.bonus]
  }
  return bonus1.id.localeCompare(bonus2.id)
}