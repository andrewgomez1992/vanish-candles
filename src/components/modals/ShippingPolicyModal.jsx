import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: #fff;
  max-width: 600px;
  width: 90%;
  padding: 20px;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

// eslint-disable-next-line react/prop-types
const ShippingPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Shipping Policy</ModalTitle>
        <p>
          Orders are generally prepared for shipment within 2–3 business days.
          We do not ship or deliver on weekends or public holidays.
        </p>
        <p>
          During periods of high demand, there may be a slight delay in
          shipping. Please allow extra time for your package to arrive. If your
          order is significantly delayed, we will contact you by email or phone.
        </p>
      </ModalContainer>
    </Overlay>
  );
};

export default ShippingPolicyModal;
