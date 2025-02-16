async function callAPI() {
    const message = document.getElementById('message').value;
    const responseDiv = document.getElementById('response');
  
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-acbc8d7f980d4eceb72d79c44638bb29'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {role: 'system', content: 'You are a helpful assistant.'},
          {role: 'user', content: message}
        ],
        stream: false
      })
    });
  
    const data = await response.json();
    responseDiv.innerHTML = `<p>${data.choices[0].message.content}</p>`;
  }
  

function autoResize() {
    const message = document.getElementById('message');
    message.style.height = 'auto';
    message.style.height = (message.scrollHeight) + 'px';
  }