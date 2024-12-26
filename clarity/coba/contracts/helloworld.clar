
;; title: helloworld
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions

(define-map names-map 
  { name: (string-ascii 10) }  ;; Key: A tuple with a string-ascii type (max 10 characters)
  { id: int })                 ;; Value: A tuple with an integer

(define-public (execute)
  (begin
    ;; Insert the key-value pair into the map
    (map-set names-map { name: "blockstack" } { id: 1337 })
    ;; Retrieve the value and wrap it in an `ok` response
    (let ((result (map-get? names-map { name: "blockstack" })))
      (match result
        some (ok result)      ;; If value exists, wrap it in `ok`
        none (err "Key not found")  ;; If not found, return an `err` response
      )
    )
  )
)


;; send-many
;; (define-private (send-stx (recipient { to: principal }))
;;     (stx-transfer? u1 tx-sender (get to recipient))
;; )

;; (define-private (check-err 
;;     (result (response bool uint))
;;     (prior (response bool uint)))
;;     (match prior
;;         ok-value result
;;         err-value (err err-value))
;; )
;; (define-public (send-many (recipients (list 200 { to: principal })))
;;   (fold check-err
;;     (map send-stx recipients)
;;     (ok true)))


;; read only functions
;;

;; private functions
;;


;; (contract-call? .helloworld send-many (list {to:'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6,ustx:u100} {to:'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0,ustx:u1}))