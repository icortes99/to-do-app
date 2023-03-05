import '../styles/App.scss'
import Form from '../components/Form.js'

function App() {
  const block = 'app'

  return (
    <div className={`${block}`}>
      <Form/>
    </div>
  );
}

export default App;