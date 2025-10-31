# Rap Lyrics Generator - 改造方案

## 项目概述
将现有的 AI 婚礼誓词生成器改造为 **AI 说唱歌词生成器**，保持使用相同的模型 `deepseek-ai/DeepSeek-R1-0528-Qwen3-8B`，通过 SiliconFlow API 调用。

---

## 一、核心功能改造

### 1.1 后端 API 改造（server.js）

#### 修改内容：
1. **API 路由保持不变**：`/api/generate-prompt`
2. **请求参数变更**：
   - 移除：`yourName`, `partnerName`, `role`, `style`
   - 新增：
     - `topic` (必需) - 主题
     - `contentRequirements` (必需) - 内容要求
     - `wordCount` (必需) - 字数：100/300/500/800/1000/1200（默认300）
     - `rhythmRequirements` (可选) - 韵律要求
     - `otherRequirements` (可选) - 其他要求（包含俚语输入）
     - `referenceLyrics` (可选) - 参考歌词

3. **提示词模板重构**：
```
# Character Profile
You are a highly talented and globally renowned rapper, skilled in various styles. Your lyrics are known for their sharp rhymes, clever puns, and profound storytelling. 

# Task Description
Generate rap lyrics based on the provided theme, style and keywords by the user. 

# Specific Requirements and Constraints
1. **Topic:** {topic}

2. **Content Requirements:** {contentRequirements}

3. **Word count requirement:** {wordCount} words

4. **Rhythm Requirements:** {rhythmRequirements}
   - Use a rhyming structure of AABB or ABAB.
   - Try to use internal rhymes and polysyllabic rhymes as much as possible.
   - Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.

5. **Other Requirements:** 
   - The lyrics must contain a brief storyline.
   - There must be a powerful "punchline" in the last four lines to serve as the conclusion.
   - Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
   - Avoid using clichés and strive for originality and impact.
   
   注：如果用户提供了自定义的其他要求，则使用用户输入的内容；否则使用上述默认要求。

6. **Reference Lyrics:** {referenceLyrics}
```

---

### 1.2 前端表单改造（index.html）

#### 表单字段设计：

**1. Topic（主题）- 必需字段**
- 类型：文本输入框
- 占位符：例如 "Success Story", "Love and Heartbreak", "Street Life" 等
- 验证：必填

**2. Content Requirements（内容要求）- 必需字段**
- 类型：多行文本框（3-4行）
- 占位符：描述你希望歌词表达的情感、故事或信息
- 验证：必填

**3. Word Count（字数要求）- 必需字段**
- 类型：单选按钮组
- 选项：
  - 100 words
  - 300 words（默认选中）
  - 500 words
  - 800 words
  - 1000 words
  - 1200 words
- 布局：2列网格（桌面）/ 1列（移动端）

**4. Rhythm Requirements（韵律要求）- 可选字段**
- 类型：单选按钮或复选框
- 选项：
  - 押韵结构：AABB / ABAB（单选，默认 ABAB）
  - 内部押韵和多音节押韵（复选框，默认选中）
  - 每行8-12音节（复选框，默认选中）
- 布局：可折叠的选项区域（默认折叠，显示"高级选项"）

**5. Other Requirements（其他要求）- 可选字段**
- 类型：多行文本框（textarea，5-6行）
- 占位符/默认值提示：
  ```
  - The lyrics must contain a brief storyline.
  - There must be a powerful "punchline" in the last four lines to serve as the conclusion.
  - Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
  - Avoid using clichés and strive for originality and impact.
  ```
- 说明：用户可在此输入自定义的其他要求。如果留空，将使用上述默认要求。

**6. Reference Lyrics（参考歌词）- 可选字段**
- 类型：多行文本框（5-6行）
- 占位符：粘贴你喜欢的歌词风格作为参考
- 提示：可选，帮助AI理解你想要的风格

---

### 1.3 JavaScript 逻辑改造（js/main.js）

#### 主要修改点：

1. **类名和变量重命名**：
   - `WeddingVowsApp` → `RapLyricsApp`
   - `generateWeddingVows()` → `generateRapLyrics()`
   - `displayVows()` → `displayLyrics()`
   - API URL 保持不变

2. **表单验证逻辑**：
   ```javascript
   validateForm() {
       const topic = form.querySelector('#topic').value.trim();
       const contentRequirements = form.querySelector('#contentRequirements').value.trim();
       const wordCount = form.querySelector('input[name="wordCount"]:checked');
       
       return topic && contentRequirements && wordCount;
   }
   ```

3. **表单数据收集**：
   ```javascript
   collectFormData() {
       return {
           topic: formData.get('topic'),
           contentRequirements: formData.get('contentRequirements'),
           wordCount: formData.get('wordCount'),
           rhythmRequirements: this.collectRhythmRequirements(),
           otherRequirements: this.collectOtherRequirements(),
           referenceLyrics: formData.get('referenceLyrics') || ''
       };
   }
   ```

4. **韵律要求收集**（处理可选字段的默认值）：
   ```javascript
   collectRhythmRequirements() {
       // 收集用户选择的韵律选项，如果没有选择则使用默认值
   }
   ```

5. **其他要求收集**（文本输入框，为空则使用默认值）：
   ```javascript
   collectOtherRequirements() {
       const otherRequirements = formData.get('otherRequirements')?.trim();
       
       // 如果用户没有输入，使用默认值
       if (!otherRequirements) {
           return `- The lyrics must contain a brief storyline.
- There must be a powerful "punchline" in the last four lines to serve as the conclusion.
- Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
- Avoid using clichés and strive for originality and impact.`;
       }
       
       return otherRequirements;
   }
   ```

---

## 二、页面内容改造

### 2.1 页面标题和描述（index.html）

#### Hero Section 修改：
- 标题：从 "Wedding Vows Generator" → "Rap Lyrics Generator"
- 副标题：从婚礼誓词相关 → 说唱歌词生成器相关
- 背景图片：更换为说唱/音乐主题的图片

### 2.2 功能说明区域

#### "What is Our Wedding Vows Generator?" → "What is Our Rap Lyrics Generator?"
- 描述改为说明说唱歌词生成器的功能
- 特性卡片：
  1. AI-Powered Personalization → AI驱动的个性化创作
  2. Multiple Styles → 多种说唱风格
  3. Customizable Length → 可自定义长度

### 2.3 示例区域（Examples Section）

- 移除婚礼誓词示例
- 添加说唱歌词示例：
  - 不同主题（Success, Love, Street Life 等）
  - 不同字数（100/300/500/800/1000/1200 words）
  - 不同风格展示

### 2.4 使用教程区域

- 更新步骤说明：
  1. 输入主题和内容要求
  2. 选择字数和韵律要求
  3. 可选：添加其他要求和参考歌词
  4. 点击生成按钮

### 2.5 Testimonials（用户评价）

- 更新为说唱歌手/音乐人的评价
- 更新头像和名称

### 2.6 FAQ 部分

- 更新常见问题为说唱歌词生成相关的问题

---

## 三、需要修改的文件清单

### 必须修改的文件：
1. **server.js** - 后端API逻辑和提示词
2. **index.html** - 前端表单、页面内容、标题等
3. **js/main.js** - 前端JavaScript逻辑
4. **package.json** - 更新项目描述和关键词（可选）

### 可选修改的文件：
5. **examples.html** - 更新示例页面
6. **blog.html** - 更新博客内容（如果有相关文章）
7. **favicon.ico** 和 **logo.png** - 更新图标和Logo（可选）

---

## 四、提示词构建逻辑（server.js）

### 提示词构建步骤：

```javascript
const basePrompt = `# Character Profile
You are a highly talented and globally renowned rapper, skilled in various styles. Your lyrics are known for their sharp rhymes, clever puns, and profound storytelling. 

# Task Description
Generate rap lyrics based on the provided theme, style and keywords by the user. 

# Specific Requirements and Constraints`;

const requirements = [
    `1. **Topic:** ${topic}`,
    `2. **Content Requirements:** ${contentRequirements}`,
    `3. **Word count requirement:** ${wordCount} words`,
    rhythmRequirements ? `4. **Rhythm Requirements:** ${rhythmRequirements}` : `4. **Rhythm Requirements:** 
   - Use a rhyming structure of AABB or ABAB.
   - Try to use internal rhymes and polysyllabic rhymes as much as possible.
   - Each line should roughly consist of 8 to 12 syllables to maintain a sense of rhythm.`,
    otherRequirements ? `5. **Other Requirements:** ${otherRequirements}` : `5. **Other Requirements:** 
   - The lyrics must contain a brief storyline.
   - There must be a powerful "punchline" in the last four lines to serve as the conclusion.
   - Incorporate the following slang naturally: [List some slangs, such as: on the grind, making moves, no cap, etc.]
   - Avoid using clichés and strive for originality and impact.`,
    referenceLyrics ? `6. **Reference Lyrics:** ${referenceLyrics}` : ''
].filter(req => req).join('\n\n');

const fullPrompt = `${basePrompt}\n\n${requirements}`;
```

---

## 五、UI/UX 注意事项

1. **保持现有设计风格**：深色主题、橙色强调色、Slabo 27px 字体
2. **表单布局**：
   - 必需字段使用清晰的标签和提示
   - 可选字段使用可折叠区域或分组显示
   - 字数选项使用卡片式单选按钮
3. **响应式设计**：确保移动端和桌面端都友好
4. **表单验证反馈**：实时显示字段验证状态
5. **加载状态**：保持现有的进度条和加载动画

---

## 六、测试要点

1. **表单验证**：
   - 必填字段验证
   - 表单提交前的验证
   - 错误提示显示

2. **API 调用**：
   - 请求参数正确性
   - 可选字段的默认值处理
   - 错误处理

3. **用户体验**：
   - 生成过程中的反馈
   - 结果展示格式
   - 复制功能

4. **边界情况**：
   - 空值处理
   - 超长文本处理
   - API 错误处理

---

## 七、实施步骤建议

1. **第一步**：修改后端 API（server.js）- 先确保API能正确生成歌词
2. **第二步**：修改前端表单（index.html）- 更新表单字段
3. **第三步**：修改 JavaScript 逻辑（main.js）- 更新数据收集和验证
4. **第四步**：更新页面内容（index.html）- 标题、描述、示例等
5. **第五步**：测试和优化 - 全面测试所有功能

---

## 八、注意事项

1. **保持 API 密钥安全**：继续使用环境变量 `API_KEY`
2. **模型参数**：保持 `max_tokens: 1000, temperature: 0.7`，根据实际效果可调整
3. **向后兼容**：如果需要保留婚礼誓词功能，可以考虑：
   - 创建两个独立的路由和表单
   - 或使用模式切换功能

---

## 确认事项

请确认以下内容是否符合您的需求：
- [ ] 表单字段设计是否完整
- [ ] 提示词模板是否符合要求
- [ ] 可选字段的默认值处理逻辑是否正确
- [ ] UI布局是否符合预期

**确认后，我将开始实施改造。**
