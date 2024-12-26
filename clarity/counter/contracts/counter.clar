(define-map sensor-data
  principal  ;; Key: the address of the caller (farmer/system)
  { temperature: uint, humidity: uint, soil-moisture: uint, water-level: uint, timestamp: uint }  ;; Value: a structured object with sensor data
)

(define-map payouts
  principal  ;; Farmer's address
  { farmer: uint }  ;; Payout amount
)

;; Function to record sensor data when crop insurance is paid
;; (define-public (record-sensor-data (temperature uint) (humidity uint) (soil-moisture uint) (water-level uint) (timestamp uint))
;;   (begin
;;     (let ((caller (tx-sender)))  ;; Use `tx-sender` to get the address of the caller (farmer/system)
;;       ;; Store the sensor data along with the timestamp for the caller (farmer/system)
;;       (map-set sensor-data caller
;;         ((temperature temperature) (humidity humidity) (soil-moisture soil-moisture) (water-level water-level) (timestamp timestamp)))
;;     )
;;     (ok "Sensor data recorded successfully")
;;   )
;; )

;; Function to trigger insurance payout and record sensor data
(define-public (process-claim-and-payout (farmer principal) (temperature uint) (humidity uint) (soil-moisture uint) (water-level uint) (payout-amount uint) (timestamp uint))
  (begin
    (let ((valid-claim (check-failure temperature humidity soil-moisture water-level)))  ;; Get the result of check-failure
      (match valid-claim
        value (ok "mantap")
        err err-value (err err-value)  ;; Handle the error case (e.g., if the result is an error)
      )
    )
  )
)
;; Check for crop failure (simplified logic)
(define-public (check-failure (temperature uint) (humidity uint) (soil-moisture uint) (water-level uint))
  (if (and (> temperature u35)  ;; If temperature is above 35C
           (< soil-moisture u30)  ;; Soil moisture is below 30%
           (< water-level u30))  ;; Water level is below 30%
      (ok true)  ;; Crop failure detected
      (err "Conditions not met for crop failure")
  )
)

;; Retrieve sensor data for a specific farmer (for future reference)
(define-public (get-sensor-data (farmer principal))
  (let ((data (map-get? sensor-data farmer)))
    (match data
      some (ok data)  ;; Return stored sensor data
      none (err "No data found for the given address")
    )
  )
)
