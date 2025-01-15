;; Farm Insurance Contract

;; Constants
(define-constant ERR-NOT-INSURED (err u1))
(define-constant ERR-ALREADY-CLAIMED (err u2))
(define-constant ERR-INSUFFICIENT-PAYMENT (err u3))
(define-constant PREMIUM-RATE u1000)  ;; 0.001 STX in microSTX

;; Define insurance data structure
(define-map insurances
    principal
    {
        hectares: uint,
        premium-paid: uint,
        has-claimed: bool,
        insurance-active: bool
    }
)

;; Function to calculate premium based on hectares
(define-private (calculate-premium (hectares uint))
    (* hectares PREMIUM-RATE)
)

;; Function to pay premium
(define-public (pay-premium (hectares uint))
    (let
        (
            (premium-amount (calculate-premium hectares))
            (sender tx-sender)
        )
        (if (>= (stx-get-balance tx-sender) premium-amount)
            (begin
                ;; Transfer STX to contract
                (try! (stx-transfer? premium-amount tx-sender (as-contract tx-sender)))
                ;; Update insurance record
                (map-set insurances
                    sender
                    {
                        hectares: hectares,
                        premium-paid: premium-amount,
                        has-claimed: false,
                        insurance-active: true
                    }
                )
                (ok premium-amount)
            )
            ERR-INSUFFICIENT-PAYMENT
        )
    )
)

;; Function to claim insurance
(define-public (claim-insurance)
    (let
        (
            (sender tx-sender)
            (insurance-data (unwrap! (map-get? insurances sender) ERR-NOT-INSURED))
        )
        (if (and 
                (get insurance-active insurance-data)
                (not (get has-claimed insurance-data))
            )
            (begin
                ;; Update claim status
                (map-set insurances
                    sender
                    (merge insurance-data { has-claimed: true })
                )
                ;; Transfer claim amount (example: 2x premium)
                (try! (as-contract (stx-transfer? 
                    (* (get premium-paid insurance-data) u1)
                    tx-sender
                    sender)))
                (ok true)
            )
            ERR-ALREADY-CLAIMED
        )
    )
)

;; Function to check insurance status
(define-read-only (get-insurance-status (user principal))
    (map-get? insurances user)
)