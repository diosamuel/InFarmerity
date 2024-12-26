import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function Modal() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra hook to manage modal state

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button onClick={onOpen} colorScheme="blue">
        Open Modal
      </Button>

      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              By proceeding, you agree to the terms and conditions of
              InFarmerity Insurance. Ensure you have read and understood the
              agreement carefully before confirming.
            </p>
            <p>
              For detailed information, refer to our policy documentation or
              contact support for assistance.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Accept
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Modal;
