const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI图片生成器</title>
    <style>
        :root {
            --primary-color: #8a2be2;
            --secondary-color: #4b0082;
            --light-color: #f0e6ff;
            --dark-color: #2c1250;
            --success-color: #4CAF50;
            --warning-color: #ff9800;
            --error-color: #f44336;
            --card-bg: rgba(255, 255, 255, 0.9);
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a0933, #3a1c71);
            color: #333;
            min-height: 100vh;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .container {
            max-width: 1200px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        
        header {
            text-align: center;
            padding: 30px 0;
            color: white;
            animation: fadeInDown 1s ease;
        }
        
        header h1 {
            font-size: 3.5rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #ff7e5f, #feb47b, #8a2be2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        header p {
            font-size: 1.2rem;
            max-width: 700px;
            margin: 0 auto;
            color: var(--light-color);
            line-height: 1.6;
        }
        
        .content {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .panel {
            flex: 1;
            min-width: 300px;
            background: var(--card-bg);
            border-radius: 16px;
            padding: 25px;
            box-shadow: var(--shadow);
            animation: fadeInUp 1s ease;
        }
        
        .panel h2 {
            color: var(--secondary-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--light-color);
            font-size: 1.8rem;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--dark-color);
        }
        
        input, textarea, select {
            width: 100%;
            padding: 14px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        input:focus, textarea:focus, select:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.2);
        }
        
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        .file-input {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 10px;
            border: 2px dashed #ddd;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .file-input:hover {
            border-color: var(--primary-color);
            background: #f0e6ff;
        }
        
        .file-input input {
            display: none;
        }
        
        .btn {
            display: inline-block;
            background: var(--primary-color);
            color: white;
            padding: 14px 28px;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            margin-top: 10px;
        }
        
        .btn:hover {
            background: var(--secondary-color);
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(138, 43, 226, 0.4);
        }
        
        .btn:active {
            transform: translateY(-1px);
        }
        
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .result-container {
            position: relative;
            min-height: 300px;
            background: #f9f9f9;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            border: 2px dashed #ddd;
        }
        
        .result-placeholder {
            text-align: center;
            color: #999;
            padding: 30px;
        }
        
        .result-placeholder i {
            font-size: 4rem;
            margin-bottom: 20px;
            color: var(--light-color);
        }
        
        .result-image {
            max-width: 100%;
            max-height: 500px;
            display: none;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .download-btn {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            display: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
        }
        
        .download-btn:hover {
            background: #388e3c;
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
        
        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }
        
        .spinner {
            border: 5px solid rgba(138, 43, 226, 0.2);
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        .error-message {
            background: var(--error-color);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            display: none;
        }
        
        .tips {
            background: var(--light-color);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9rem;
        }
        
        .tips h3 {
            margin-bottom: 10px;
            color: var(--secondary-color);
        }
        
        .tips ul {
            padding-left: 20px;
        }
        
        .tips li {
            margin-bottom: 8px;
        }
        
        footer {
            text-align: center;
            color: var(--light-color);
            padding: 30px 0;
            margin-top: auto;
            font-size: 0.9rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .content {
                flex-direction: column;
            }
            
            header h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>AI 图片生成器</h1>
            <p>使用 Stable Diffusion XL 模型创建惊艳的AI图片，自定义参数并一键下载您生成的作品</p>
        </header>
        
        <div class="content">
            <div class="panel">
                <h2>生成参数</h2>
                <form id="imageForm">
                    <div class="form-group">
                        <label for="prompt">提示词 (Prompt):</label>
                        <textarea id="prompt" placeholder="描述您想要生成的图片内容..." required>梦幻的星空下，一座未来主义城堡，明亮的霓虹灯，超现实风格，4K高清</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="negative_prompt">负面提示词 (Negative Prompt):</label>
                        <textarea id="negative_prompt" placeholder="描述您不想在图片中出现的内容...">模糊，低质量，文字，水印，变形，畸形</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="width">图片宽度 (512-1024):</label>
                        <input type="number" id="width" min="512" max="1024" value="768">
                    </div>
                    
                    <div class="form-group">
                        <label for="height">图片高度 (512-1024):</label>
                        <input type="number" id="height" min="512" max="1024" value="512">
                    </div>
                    
                    <div class="form-group">
                        <label for="num_steps">生成步骤 (1-20):</label>
                        <input type="number" id="num_steps" min="1" max="20" value="15">
                    </div>
                    
                    <div class="form-group">
                        <label for="strength">强度 (0.1-1.0):</label>
                        <input type="number" id="strength" min="0.1" max="1.0" step="0.1" value="0.7">
                    </div>
                    
                    <div class="form-group">
                        <label>上传图片 (可选):</label>
                        <div class="file-input" id="imageUpload">
                            <input type="file" id="image" accept="image/*">
                            <p>点击上传图片 (用于img2img)</p>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>上传遮罩 (可选):</label>
                        <div class="file-input" id="maskUpload">
                            <input type="file" id="mask" accept="image/*">
                            <p>点击上传遮罩 (用于修复)</p>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn" id="generateBtn">生成图片</button>
                    
                    <div class="error-message" id="errorMessage"></div>
                </form>
                
                <div class="tips">
                    <h3>提示与技巧:</h3>
                    <ul>
                        <li>使用详细具体的描述词会得到更好的结果</li>
                        <li>在负面提示词中添加不想要的元素</li>
                        <li>标准尺寸为512x512、768x512或512x768</li>
                        <li>增加生成步骤会提高质量但需要更长时间</li>
                        <li>强度控制原始图片的影响程度 (仅当上传图片时有效)</li>
                    </ul>
                </div>
            </div>
            
            <div class="panel">
                <h2>生成结果</h2>
                <div class="result-container">
                    <div class="result-placeholder" id="resultPlaceholder">
                        <i>🖼️</i>
                        <p>您的生成图片将显示在这里</p>
                        <p>点击"生成图片"按钮开始创作</p>
                    </div>
                    <img id="resultImage" class="result-image" alt="生成的图片">
                    <a href="#" class="download-btn" id="downloadBtn">下载图片</a>
                    
                    <div class="loading" id="loadingIndicator">
                        <div class="spinner"></div>
                        <p>正在生成您的图片，请稍候...</p>
                        <p>这可能需要20-60秒时间</p>
                    </div>
                </div>
            </div>
        </div>
        
        <footer>
            <p>使用 Cloudflare Worker 和 Stable Diffusion XL 模型 | 图片生成服务</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('imageForm');
            const generateBtn = document.getElementById('generateBtn');
            const resultImage = document.getElementById('resultImage');
            const resultPlaceholder = document.getElementById('resultPlaceholder');
            const downloadBtn = document.getElementById('downloadBtn');
            const loadingIndicator = document.getElementById('loadingIndicator');
            const errorMessage = document.getElementById('errorMessage');
            const imageUpload = document.getElementById('imageUpload');
            const maskUpload = document.getElementById('maskUpload');
            
            // 文件上传区域样式交互
            [imageUpload, maskUpload].forEach(upload => {
                upload.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    upload.style.borderColor = '#8a2be2';
                    upload.style.backgroundColor = '#f0e6ff';
                });
                
                upload.addEventListener('dragleave', () => {
                    upload.style.borderColor = '#ddd';
                    upload.style.backgroundColor = '#f9f9f9';
                });
                
                upload.addEventListener('drop', (e) => {
                    e.preventDefault();
                    upload.style.borderColor = '#ddd';
                    upload.style.backgroundColor = '#f9f9f9';
                    
                    const input = upload.querySelector('input');
                    if (e.dataTransfer.files.length) {
                        input.files = e.dataTransfer.files;
                        upload.querySelector('p').textContent = "已选择: " + e.dataTransfer.files[0].name;
                    }
                });
                
                upload.addEventListener('click', () => {
                    upload.querySelector('input').click();
                });
                
                upload.querySelector('input').addEventListener('change', function() {
                    if (this.files.length) {
                        upload.querySelector('p').textContent = "已选择: " + this.files[0].name;
                    }
                });
            });
            
            // 表单提交处理
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // 重置UI状态
                generateBtn.disabled = true;
                resultImage.style.display = 'none';
                downloadBtn.style.display = 'none';
                resultPlaceholder.style.display = 'none';
                loadingIndicator.style.display = 'block';
                errorMessage.style.display = 'none';
                
                try {
                    // 创建FormData对象并添加参数
                    const formData = new FormData();
                    
                    // 添加文本参数
                    formData.append('prompt', document.getElementById('prompt').value);
                    formData.append('negative_prompt', document.getElementById('negative_prompt').value);
                    formData.append('width', document.getElementById('width').value);
                    formData.append('height', document.getElementById('height').value);
                    formData.append('num_steps', document.getElementById('num_steps').value);
                    formData.append('strength', document.getElementById('strength').value);
                    
                    // 添加图片文件
                    const imageInput = document.getElementById('image');
                    if (imageInput.files.length > 0) {
                        formData.append('image', imageInput.files[0]);
                    }
                    
                    // 添加遮罩文件
                    const maskInput = document.getElementById('mask');
                    if (maskInput.files.length > 0) {
                        formData.append('mask', maskInput.files[0]);
                    }
                    
                    // 发送请求到Cloudflare Worker
                    const response = await fetch('/api/img-create', {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (!response.ok) {
                        throw new Error("生成失败:" +response.status + response.statusText);
                    }
                    
                    // 获取返回的图片Blob
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    
                    // 显示生成的图片
                    resultImage.src = imageUrl;
                    resultImage.style.display = 'block';
                    
                    // 设置下载按钮
                    downloadBtn.href = imageUrl;
                    downloadBtn.download = "generated-image-" + Date.now() + ".png";
                    downloadBtn.style.display = 'block';
                    
                } catch (error) {
                    console.error('生成图片时出错:', error);
                    errorMessage.textContent = "错误: " + error.message || '图片生成失败，请重试';
                    errorMessage.style.display = 'block';
                    resultPlaceholder.style.display = 'block';
                } finally {
                    generateBtn.disabled = false;
                    loadingIndicator.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>`



export default {
  async fetch(request, env) {
    if(request.url === 'https://ai-img.qf-butterfly.top/api/img-create' && request.method === 'POST') {
      const formdata = await request.formData()
      const inputs: any = {};
      for (const [k, v] of formdata) {
        if(k === 'prompt' || k === 'negative_prompt') {
          if(v) {
            inputs[k] = v
          }
        } else if(k === 'width' || k === 'height') {
          let val = Number(v) as any
          if(val &&  Number.isInteger(val)) {
            inputs[k] = val
          }
        } else if(k === 'image' || k === 'mask') {
          if(v && typeof (v as unknown as File).arrayBuffer === 'function') {
            inputs[k] = [...new Uint8Array(await (v as any).arrayBuffer())]
          }
        } else if(k === 'num_steps') {
          let val = Number(v)
          if(Number.isInteger(val) && val > 0 && val <= 20) {
            inputs[k] = val
          }
        } else if(k === 'strength') {
          let val = Number(v)
          if(val > 0 && val <= 1) {
            inputs[k] = val
          }
        } else if(k === 'strength') {
          let val = Number(v)
          if(Number.isInteger(val)) {
            inputs[k] = val
          }
        }
      }
      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs,
      );
  
      return new Response(response, {
        headers: {
          "content-type": "image/png",
        },
      });
    } else {
      
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8'
        }
      })
    }
    
  },
} satisfies ExportedHandler<Env>;
