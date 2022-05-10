import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // setCryptos(cryptosList?.data?.coins);

    const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
    setCryptos(filterData);
  }, [cryptosList, searchTerm]);

  let information;
  if (isFetching) {
    return <Loader></Loader>;
  }
  else {
    if (!cryptos) {
      information = <Loader></Loader>;
    } else {
      information = (
        <div>
          {!simplified && 
            (
              <div className="search-crypto">
              <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
            )
          }
          <Row gutter={[32, 32]} className="crypto-card-container">
            {
              cryptos.map((currency) => (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                  <Link to={`/crypto/${currency.uuid}`}>
                  <Card
                    title={`${currency.rank}. ${currency.name}`}
                    extra={
                      <img alt='coin_image' className='crypto-image' src={ currency.iconUrl } /> 
                    }
                    hoverable
                  >
                    <p>Price: ${ millify(currency.price) }</p>
                    <p>Market Cap: ${ millify(currency.marketCap) }</p>
                    <p>Daily Change: { millify(currency.change)+ '%' }</p>
                  </Card>
                  </Link>
                </Col>
              ))
            }
          </Row>
      </div>
      )
    }
  }
  
  return (
    <>
      { information }
    </>
  )
}

export default Cryptocurrencies