import { Row, Card, Col, Typography } from 'antd';
import { route1, route2 } from './config';
import './App.css';

const { Title } = Typography;
const { Meta } = Card;



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Title level={2}>Anchor KOBE Access Map</Title>
      </header>
      <div className='main'>
        <div className='route1'>
          <Title level={3}>新幹線 新神戸駅より</Title>
          新神戸駅から地下鉄で三宮駅へ。東口の改札を出てください。
          <Row gutter={[16, 16]}>
            {route1.map(({ filename, description }, idx) => (
              <Col xs={24} sm={12} md={8} key={idx}>
                <Card hoverable>
                  <img src={`/assets/photos/${filename}`} alt={filename} width={320} />
                  <Meta title={idx + 1} description={description} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div className='route2'>
          <Title level={3}>神戸空港 / TPAC 会場より</Title>
          神戸空港もしくはTPAC会場より、 ポートライナーで三宮駅へ。改札を出てください。
          <Row gutter={[16, 16]}>
            {route2.map(({ filename, description }, idx) => (
              <Col span={8} key={idx}>
                <Card hoverable>
                  <img src={`/assets/photos/${filename}`} alt={filename} width={320} />
                  <Meta title={idx + 1} description={description} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App;
