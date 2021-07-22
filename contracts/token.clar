(define-fungible-token MyToken)


(define-public (mint (amount uint) (recipient principal))
  (ft-mint? MyToken amount recipient)
)

(define-public (transfer (amount uint) (from principal) (to principal))
  (ft-transfer? MyToken amount from to)
)

(define-public (secured-transfer (amount uint) (from principal) (to principal))
  (begin
    (asserts! (is-eq tx-sender from) (err u123123))
    (ft-transfer? MyToken amount from to)
  )
)