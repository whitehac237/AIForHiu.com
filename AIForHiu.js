async function callAPI() {
  const messageInput = document.getElementById('message');
  const responseDiv = document.getElementById('response');
  
  try {
    const message = messageInput.value.trim();
    if (!message) return;

    // Clear input
    messageInput.value = '';
    autoResize(messageInput);

    // Add loading indicator
    responseDiv.innerHTML = '<div class="loading">Đang xử lý...</div>';

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-acbc8d7f980d4eceb72d79c44638bb29'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message }
        ],
        stream: false
      })
    });

    if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || 'Không có phản hồi';
    
    responseDiv.innerHTML = `
      <div class="message">
        <div class="user-message">${message}</div>
        <div class="bot-message">${responseText}</div>
      </div>
    `;

  } catch (error) {
    responseDiv.innerHTML = `<div class="error">Lỗi: ${error.message}</div>`;
  }
}

function autoResize() {
  const textarea = document.getElementById('message');
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function handleEnter(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    callAPI();
  }
}
