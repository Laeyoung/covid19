import useStats from '../utils/useStats';
import Stats from './Stats';
import { useState } from 'react';
import styled from 'styled-components';

const StatCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  padding: 2em;
  border-radius: 20px;
  background: linear-gradient(225deg, #046407, #045406);
  box-shadow: -20px 20px 60px #034f06, 20px -20px 60px #056b08;
  &:before {
    content: 'COVID19';
    font-size: 5em;
    position: absolute;
    top: 10px;
    left: 130px;
  }
  h2 {
    grid-column: 1 / 3;
    grid-row: 1;
  }
  select {
    grid-column: 3;
    grid-row: 1;
  }
  div {
    grid-row: 2;
    &:nth-child(1) {
      grid-column: 1;
    }
    &:nth-child(2) {
      grid-column: 2;
    }
    &:nth-child(3) {
      grid-column: 3;
    }
  }
  select {
    border: none;
    background: linear-gradient(225deg, #046407, #045406);
    box-shadow: -20px 20px 60px #034f06, 20px -20px 60px #056b08;
    color: white;
    width: 70px;
  }
  p {
    grid-column: 1 / 4;
    font-size: 11px;
  }
`;

export default function Country() {
  const { stats: countries, loading, error } = useStats(
    'https://covid19.mathdro.id/api/countries'
  );
  const [selectedCountry, setSelectedCountry] = useState('USA');
  if (!countries) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <StatCard>
      <h2>{selectedCountry} Stat</h2>
      <select
        defaultValue='USA'
        onChange={e => {
          setSelectedCountry(e.target.value);
        }}
      >
        {Object.entries(countries.countries).map(([country, code]) => (
          <option key={code} value={countries.iso3[code]}>
            {country}
          </option>
        ))}
      </select>
      <Stats
        url={`https://covid19.mathdro.id/api/countries/${selectedCountry}`}
      />
    </StatCard>
  );
}
