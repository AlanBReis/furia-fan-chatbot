import './index.css';
import Chatbot from './components/chatbot';
import AdCarousel from './components/AdCarousel';
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
  return (
    <div className="container">
      
      <div className="chatbot">
        <h1>Chat FÚRIA</h1>
        <Chatbot />
      </div>



      <div className="ads">
        <h1>Nossa Loja</h1>
        <AdCarousel />
        

      </div>

    </div>
  );
}

export default App;
