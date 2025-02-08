import styled from "styled-components";

const AnimatedNode = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: ${(props) =>
    props.visible ? "nodeAppear 0.5s ease forwards" : "none"};
  animation-delay: ${(props) => props.delay}ms;

  @keyframes nodeAppear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default AnimatedNode;
