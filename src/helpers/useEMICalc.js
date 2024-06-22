import { ref, watchEffect, toValue, inject } from 'vue'
const monthDetails = () => inject('months')
const useCopyToClipboard = async (text) => {
  const status = await navigator.clipboard
    .writeText(text)
    .then(() => 'Copied')
    .catch(() => 'Sorry ! Not Copied')
  return status
}

const useEMICalcuation = (args) => {
  /**
   * args[0] - principal amount
   * args[1] - rate of interest
   * args[2] -  Loan Tenure in Months
   * args[3] -  0-Year or Month
   */

  const emiData = ref(args)
  const emivalueData = () => {
    return {
      principal: 0,
      emiAmount: 0,
      totalInterest: 0,
      totalPayment: 0,
      eachYearMonth: []
    }
  }
  const emiValue = ref(emivalueData())

  const { short: monthShortDesc, shortFiscal: monthShortFiscalDesc } = monthDetails()
  const calculator = (emiDetails = toValue(emiData)) => {
    if (emiDetails[0] <= 0 || emiDetails[1] <= 0 || emiDetails[2] <= 0) {
      emiValue.value = ref(emivalueData())
      return
    }
    const keyMonth = emiDetails[5] ? monthShortDesc : monthShortFiscalDesc

    var n = emiDetails[2]
    if (emiDetails[3] == 0) {
      n = Math.round(emiDetails[2] * 12)
    }
    const r = emiDetails[1] / 12 / 100
    const p = emiDetails[0]
    const emiAmount = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emiAmount * n
    const totalInterest = totalPayment - p

    const currentDate = new Date()

    let year = emiDetails[4]?.year ?? currentDate.getFullYear()
    let month = emiDetails[4]?.month ?? currentDate.getMonth()

    if (!emiDetails[5]) {
      year = `${year + 1}`.slice(2)
      month = month - 3
    }

    const firstYear = {
      year: !emiDetails[5] ? `FY ${year}` : year,
      yearlyData: {},
      monthlyData: []
    }
    const eachYearMonth = calculateYearMonth(
      [p, r, n, emiAmount, [firstYear], emiDetails[5]],
      {
        month,
        year,
        monthShortDesc: keyMonth
      },
      p
    )
    emiValue.value = {
      principal: Number(p),
      emiAmount: roundOff(emiAmount),
      totalInterest: roundOff(totalInterest),
      totalPayment: roundOff(totalPayment),
      eachYearMonth
    }
  }
  watchEffect(() => calculator())
  return emiValue
}

const roundOff = (value) => Math.round(Number(value).toFixed(2)) || 0

const pushYearlyData = (yearlyData) => ({
  emiInterest: roundOff(yearlyData.emiInterest),
  emiPrincipal: roundOff(yearlyData.emiPrincipal),
  totalPayment: roundOff(yearlyData.emiPrincipal + yearlyData.emiInterest),
  principalOutstanding: roundOff(yearlyData.principalOutstanding),
  percentage: yearlyData.percentage
})

const calculateYearMonth = (
  [...args],
  { index = 0, year = new Date().getFullYear(), month = 3, yearlyData = {}, monthShortDesc = [] },
  pAmount
) => {
  const emiInterest = args[1] * args[0]
  const emiPrincipal = args[3] - emiInterest
  const principalOutstanding = args[0] - emiPrincipal
  const percentage = 100 - (principalOutstanding * 100) / pAmount
  yearlyData = {
    emiInterest: emiInterest + (yearlyData.emiInterest || 0),
    emiPrincipal: emiPrincipal + (yearlyData.emiPrincipal || 0),
    principalOutstanding,
    percentage: percentage.toFixed(2)
  }

  args[4][index].monthlyData.push({
    month: monthShortDesc[month - 12 * index],
    emiInterest: roundOff(emiInterest),
    emiPrincipal: roundOff(emiPrincipal),
    totalPayment: roundOff(emiPrincipal + emiInterest),
    principalOutstanding: roundOff(principalOutstanding),
    percentage: percentage.toFixed(2)
  })
  args[2] = args[2] - 1
  if (args[2] > 0) {
    month++
    if (Math.abs(month / 12) == index + 1) {
      args[4][index].yearlyData = pushYearlyData(yearlyData)
      year++
      yearlyData = {}
      index++
      args[4][index] = {
        year: !args[5] ? `FY ${year}` : year,
        yearlyData,
        monthlyData: []
      }
    }

    return calculateYearMonth(
      [principalOutstanding, args[1], args[2], args[3], args[4], args[5]],
      {
        index,
        month,
        year,
        yearlyData,
        monthShortDesc
      },
      pAmount
    )
  }
  args[4][index].yearlyData = pushYearlyData(yearlyData)
  return args[4]
}

export { useCopyToClipboard, useEMICalcuation }
