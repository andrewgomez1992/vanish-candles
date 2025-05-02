import styled from "styled-components";

const TooltipWrapper = styled.div`
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  font-size: 0.8rem;
  padding: 5px;
  border-radius: 4px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease;
  z-index: 1000;
`;

const TooltipButton = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;

  &:hover ${TooltipWrapper} {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = ({ children, tooltipText }) => {
  return (
    <TooltipButton>
      {children}
      <TooltipWrapper>{tooltipText}</TooltipWrapper>
    </TooltipButton>
  );
};

export default Tooltip;
