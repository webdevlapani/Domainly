import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducerState } from '../store/IRootReducer';
import { useDebounce } from '../hooks/useDebounce';
import { getDomains } from '../store/Domains/domainServices';
import styled from 'styled-components';
import { AutoComplete, Card, Col, Input, Row, Spin } from 'antd';
import { IDomain } from '../store/Domains/IDomain';

const StyledRow = styled(Row)`
  margin: 30px;
  padding: 50px;
`;

const StyledCol = styled(Col)``;

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 0 7px 1px #00000024;

  .ant-card-body {
    padding: 0;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #dbdbdb;
  padding: 15px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSearchArea = styled.div`
  display: flex;
  align-items: center;
`;
const StyledSearch = styled(AutoComplete)`
  .ant-input-group {
    display: flex;
    align-items: center;
  }

  .ant-input {
    border-radius: 40px !important;
    width: 50rem;
    padding: 3px 60px 3px 15px;

    &:hover + span > button,
    &:focus + span > button {
      z-index: 1075;
    }
  }

  .ant-input-group-addon {
    left: -40px !important;
    background: none;

    button {
      background: none;
      box-shadow: none;
      border: 0;
    }
  }
`;

const DomainsSection = styled.div`
  padding: 15px 40px;

  > div {
    border-bottom: 1px solid #e7e7e7;
    padding: 15px 0;
  }
`;

const Domains = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: #989898;
    margin: 0;

    .ant-tag {
      background-color: #63b5d1;
      border-radius: 40px;
      margin-left: 10px;
      padding: 0 15px;
      color: white;
      border: 0;
    }
  }
`;

const Domain = () => {
  const dispatch = useDispatch();

  const domains = useSelector((state: IRootReducerState) => state.domains);
  const [value, setValue] = useState<string>('');

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const suffixes = ['com', 'io', 'net', 'org', 'in'];

  useDebounce(
    () => {
      if (value) {
        const data = suffixes.map((suffix: string) => ({
          value: `${value}.${suffix}`,
          label: `${value}.${suffix}`,
        }));
        setOptions(data);
      }
    },
    1000,
    [suffixes, value]
  );

  const onChange = (data: any) => {
    setValue(data);
  };

  const onSelect = (data: string, option: any) => {
    setValue(option.label);
  };

  const onClick = () => {
    if (value) dispatch(getDomains(value));
  };

  return (
    <>
      <StyledRow>
        <StyledCol span={18} offset={3}>
          <StyledCard>
            <Header>
              <HeaderSearchArea>
                <StyledSearch
                  value={value}
                  options={options}
                  onSelect={onSelect}
                  onChange={onChange}
                  onClick={onClick}
                >
                  <Input.Search
                    size="large"
                    placeholder="Enter Domain ...."
                    loading={domains.loading}
                  />
                </StyledSearch>
              </HeaderSearchArea>
            </Header>
            <DomainsSection>
              {domains.loading ? (
                <Spin />
              ) : (
                domains.domains.map((domain: IDomain) => (
                  <Domains key={domain.domain}>
                    <p>{domain.domain}</p>
                  </Domains>
                ))
              )}
              {!domains.loading && domains.error !== '' && (
                <Domains>
                  <p>Can't find any domains for {value}!</p>
                </Domains>
              )}
            </DomainsSection>
          </StyledCard>
        </StyledCol>
      </StyledRow>
    </>
  );
};

export default Domain;
