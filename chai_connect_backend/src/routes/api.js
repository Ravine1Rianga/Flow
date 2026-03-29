const express = require('express')
const {
  FARMERS,
  RECENT_PAYMENTS,
  CHART_DELIVERY_ACTIVITY,
  DELIVERIES,
  LOANS,
  MPESA_FEED,
  COMPLAINTS,
} = require('../data/seedPayload')

const router = express.Router()

router.get('/farmers', (_req, res) => res.json({ farmers: FARMERS }))

router.get('/farmers/:id', (req, res) => {
  const farmer = FARMERS.find((f) => f.id === req.params.id)
  if (!farmer) return res.status(404).json({ error: 'Not found' })
  return res.json({ farmer })
})

router.get('/stats', (_req, res) =>
  res.json({
    farmers: FARMERS.length,
    kgMonth: 48230,
    disbursedMonth: 2400000,
    pendingPayments: RECENT_PAYMENTS.filter((p) => p.status === 'Pending').length,
  }),
)

router.get('/payments/recent', (_req, res) => res.json({ payments: RECENT_PAYMENTS }))

router.get('/deliveries', (_req, res) => res.json({ deliveries: DELIVERIES }))

router.get('/loans', (_req, res) => res.json({ loans: LOANS }))

router.get('/mpesa/transactions', (_req, res) => res.json({ transactions: MPESA_FEED }))

router.get('/complaints', (_req, res) => res.json({ complaints: COMPLAINTS }))

router.get('/analytics/delivery-activity', (_req, res) => res.json({ points: CHART_DELIVERY_ACTIVITY }))

router.post('/mpesa/simulate-b2c', express.json(), (req, res) => {
  const payload = req.body || {}
  return res.json({
    ok: true,
    payload,
    steps: [
      { label: 'Request OAuth token from Daraja', ms: 400 },
      { label: 'POST /mpesa/b2c/v3/paymentrequest', ms: 1200 },
      { label: 'Receive webhook callback', ms: 800 },
      { label: 'Record disbursement + activate repayment schedule', ms: 400 },
    ],
  })
})

module.exports = router
