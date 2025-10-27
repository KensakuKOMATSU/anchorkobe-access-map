import { useEffect, useState, useCallback } from 'react';
import { Button, Row, Card, Col, Divider, Tabs, Typography } from 'antd';
import { maintitle, mapTitle, routeTitle, routeDescription, route1, route2 } from './config';
import './App.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const { Title } = Typography;
const { Meta } = Card;

function Route( props ) {
  const { lang, name } = props;
  const route = name === 'route1' ? route1 : route2;


  return (
    <div className='route'>
      <Title level={2}>{routeTitle[name][lang]}</Title>
      <p>{routeDescription[name][lang]}</p>
      <Row gutter={[16, 16]}>
        {route.map(({ filename, description }, idx) => (
          <Col xs={24} sm={24} md={12} lg={12} xl={8} key={idx}>
            <Card hoverable>
              <div style={{ textAlign: 'center', width: '100%' }}>
                <img src={`/assets/photos/${filename}`} alt={filename} style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
              <Meta title={idx + 1} description={description[lang]} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

function Map( props ) {
  const { lang } = props;
  return (
    <div className='map'>
      <Card title={mapTitle[lang]} style={{ marginBottom: '20px' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.450004571602!2d135.19348349999999!3d34.6938281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008fc6d2fec343%3A0x79309402198363c0!2zQU5DSE9SIEtPQkXvvIjjgqLjg7Pjgqvjg7znpZ7miLjvvIk!5e0!3m2!1sen!2sjp!4v1761543879003!5m2!1sen!2sjp" 
          width="100%" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          title="Anchor KOBE Map"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Card>
    </div>
  );
}

function App() {
  const [ _lang, setLang ] = useState('');
  const [ _routeIdx, setRouteIdx ] = useState(1);

  useEffect(() => {
    let lang, routeIdx;
    if( window.location.hash.includes('_lang=en')) {
      lang = 'en'
    } else if( window.location.hash.includes('_lang=jp') ) {
      lang = 'jp'
    } else  {
      lang = navigator.language.startsWith('en') ? 'en' : 'jp';
    }

    if( window.location.hash.includes('_routeIdx=1')) {
      routeIdx = 1
    } else if( window.location.hash.includes('_routeIdx=2') ) {
      routeIdx = 2
    } else  {
      routeIdx = 1;
    }
    setLang(lang);
    setRouteIdx(routeIdx);
    document.title = maintitle[lang];
  }, [])

  /*
   * change Hash according to lang and routeIdx
   */
  useEffect(() => {
    if( !_lang || !_routeIdx ) return;

    const hash = `#_lang=${_lang}&_routeIdx=${_routeIdx}`;
    window.location.hash = hash;
  }, [ _lang, _routeIdx])
  

  const changeLang = useCallback(( lang ) => {
    setLang( lang );
    document.title = maintitle[lang];
  }, [])

  const changeRoute = useCallback(( idx ) => {
    setRouteIdx( idx );
  }, [])

  return (
    <div className="App background-with-alpha">
      <div className="container">
        { ( _lang === 'en' || _lang === 'jp' ) ? (
        <div className='main'>
          <div className='lang-select'>
            <div>
              <Button onClick={ () => changeLang('jp') } type={ _lang === 'jp' ? 'primary' : 'default' } ><span className="fi fi-jp" />日本語</Button>
              <span> | </span>
              <Button onClick={ () => changeLang('en') } type={ _lang === 'en' ? 'primary' : 'default' } ><span className='fi fi-gb' />English</Button>
            </div>
          </div>
          <header className="App-header">
            <Title level={1}>{maintitle[_lang]}</Title>
          </header>
          <Tabs 
            activeKey={_routeIdx.toString()}
            items={[
              { label: routeTitle['route1'][_lang], key: '1', children: <Route lang={_lang} name='route1' /> },
              { label: routeTitle['route2'][_lang], key: '2', children: <Route lang={_lang} name='route2' /> },
            ]} 
            onChange={changeRoute}
          />
          <Divider />
          <Map lang={_lang} />
          <Divider />
          <footer>
            <p>&copy; Kensaku KOMATSU, 2025</p>
          </footer>
        </div>
      ): <div />}
      </div>
    </div>
  );
}

export default App;
