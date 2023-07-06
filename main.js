//新建下拉菜单
function openMenu() {
    SlidesApp.getUi()
      .createMenu("Chat GPT")
      .addItem("💡灵感", "generateIdeas")
      .addToUi()
  }
  
  // 指定 OPEN AI 密钥
  const API_KEY = 'XXX'
  const MODEL_TYPE = 'gpt-3.5-turbo'
  
  // 基于 GPT 生成灵感内容
  function generateIdeas() {
    const presentation = SlidesApp.getActivePresentation()
    const slide = presentation.getSlides()[0]
    const shape = slide.getShapes()[0] // 假设文本框是幻灯片中的第一个形状
    const text = shape.getText().asString()
    const response = callOpenAIAPIToGenerateIdeas(text) // 发起 OpenAI API 请求
  
    shape.getText().setText(response.generatedText) //回填内容
  }
  
  // 调用 OpenAI API 生成灵感内容
  function callOpenAIAPIToGenerateIdeas(text) {
    const apiUrl = 'https://api.openai.com/v1/engines/' + MODEL_TYPE + '/completions';
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY,
    }
  
    const payload = {
      'prompt': 'Please do brain storm and generate 5 slides for me' + text,
      'max_tokens': 50,
    };
  
    const reqOptions = {
      'method': 'post',
      'headers': headers,
      'payload': JSON.stringify(payload),
    }
  
    const response = UrlFetchApp.fetch(apiUrl, reqOptions);
    const data = JSON.parse(response.getContentText());
  
    return {
      'generatedText': data.choices[0].text.trim(),
    }
  }
  