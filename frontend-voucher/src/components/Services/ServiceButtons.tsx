import { FC, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Service = {
  id: number;
  service_title: string;
  service_image: string;
  url: string;
};

const ServicesBox = styled.div`
  height: 4rem;
  margin: 0;
  display: flex;
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
    display: flex;
    justify-content: center;
    margin: 2rem 1.5rem;
  }
  @media (min-width: 992px) {
    width: auto;
    margin: 2rem 4rem;
  }
`;

const StyledButton = styled.button<{
  isActive: boolean;
  service_image: string;
}>`
  flex: 1;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #D70F64' : 'none')};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  color: ${({ isActive }) => (isActive ? '#D70F64' : '#6B6B6B')};
  background-color: ${({ isActive }) => (isActive ? '#FFFFFF' : '#EAEAEA')};
  font-weight: ${({ isActive }) => (isActive ? '550' : 'normal')};


  @media (min-width: 992px) {
    background-color: white;
    opacity: ${({ isActive }) => (isActive ? 1 : 0.8)};
    postion: relative;
    background-image: url(${({ service_image }) => service_image});
    background-repeat: no-repeat;
    background-position: right;
    background-size:fit ;
    flex: initial;
    width: 14rem;
    margin-right: 2rem;
    justify-self: flex-start;
    text-align:left;
    padding-left:1rem;
    padding-top:1rem;
  }
`;

type Props = {
  services: Service[];
};

const ServiceButtons: FC<Props> = ({ services }) => {
  const navigate = useNavigate()
  const location = useLocation();

  const pathname = location.pathname.slice(1);
  const defaultService = services.find(
    (service) => service.service_title.toLowerCase() === pathname
  );

  const [activeService, setActiveService] = useState(defaultService);

  const handleClick = (service: Service) => {
    setActiveService(service);
    navigate(`/${service.url}`);
  };

  return (
    <ServicesBox>
      {services.map((service) => (
        <StyledButton
          key={service.id}
          isActive={service === activeService}
          onClick={() => handleClick(service)}
          service_image={service.service_image}
        >
          {service.service_title}
        </StyledButton>
      ))}
    </ServicesBox>
  );
};

export default ServiceButtons;
