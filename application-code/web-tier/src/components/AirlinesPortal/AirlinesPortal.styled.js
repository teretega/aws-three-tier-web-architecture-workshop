import styled from 'styled-components';
import {
  PortalHeader,
  StatsRow,
  StatBox,
  FormCard,
  FormRow,
  Field,
  BtnAdd,
  BtnClear,
  ListCard,
  RecordList,
  RecordItem,
  EmptyState,
} from '../shared/Portal.styled';

export const AirlinesShell = styled.div`
  ${PortalHeader} .brand h1 {
    color: #1e40af;
  }
`;

export const PremiumBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  text-align: center;
`;

export { PortalHeader, StatsRow, StatBox, FormCard, FormRow, Field, BtnAdd, BtnClear, ListCard, RecordList, RecordItem, EmptyState };
