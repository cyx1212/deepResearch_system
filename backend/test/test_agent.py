from agent.base_agent import *
import os

# 请在本地环境变量中配置真实密钥，切勿提交到仓库
os.environ['APP_TOKEN'] = os.environ.get('APP_TOKEN', 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
os.environ['LLM_BASE_URL'] = os.environ.get('LLM_BASE_URL', 'https://dashscope.aliyuncs.com/compatible-mode/v1')
os.environ['APP_ID'] = os.environ.get('APP_ID', 'your-mcp-app-id')
os.environ['GEMINI_API_KEY'] = os.environ.get('GEMINI_API_KEY', 'your-gemini-api-key')

if __name__ == '__main__':
    agent = Agent()
    response = agent("中国的首都是那里？")