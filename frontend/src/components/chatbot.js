import { useState } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setInput('');
    setLoading(true);

    // Simular histórico para contexto
    const history = updatedConversation
      .map((msg) => `${msg.sender === 'user' ? 'Usuário' : 'Bot'}: ${msg.text}`)
      .join('\n');

      try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });
    
        const data = await response.json();
    
        let botReply = 'Desculpe, não entendi.'; // Valor padrão
        if (data && data.response) {
            botReply = data.response;
        } else if (data && data.error) {
            botReply = data.error; // Se o backend retornar um campo 'error'
        } else if (typeof data === 'string') {
            botReply = data; // Se o backend retornar apenas uma string
        }
    
        setConversation((prev) => [...prev, { sender: 'bot', text: botReply }]);
    
    } catch (error) {
        console.error('Erro ao chamar API:', error);
        setConversation((prev) => [...prev, { sender: 'bot', text: 'Erro ao responder.' }]);
    }
      

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '0.5rem 0',
            }}
          >
            <span
              style={{
                background: msg.sender === 'user' ? '#444' : '#222',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                display: 'inline-block',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite sua mensagem..."
        style={{
          width: '80%',
          padding: '0.5rem',
          borderRadius: '6px',
          border: '1px solid #444',
        }}
      />
      {/* <button
        onClick={sendMessage}
        disabled={loading}
        style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
      >
        {loading ? '...' : 'Enviar'}
      </button> */}
    </div>
  );
};

export default ChatBot;
