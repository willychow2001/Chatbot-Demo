import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel } from "firebase/ai";

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcQel1ic7hetys0UDGofT9U7uUFcTZPsM",
  authDomain: "vertex-ai-testing-2025-480305.firebaseapp.com",
  projectId: "vertex-ai-testing-2025-480305",
  storageBucket: "vertex-ai-testing-2025-480305.firebasestorage.app",
  messagingSenderId: "1005788281712",
  appId: "1:1005788281712:web:cf3f7d64f4b52a1bccadb5"
};

// 2. Initialize Firebase and Vertex AI
const app = initializeApp(firebaseConfig);
const vertexAI = getAI(app, {
  location: "us-central1" // 建議改回 us-central1，global 有時不支援部分預覽模型
});

const SYSTEM_INSTRUCTION = `
  You are a senior Traditional Chinese Medicine (TCM) Clinical Tutor. Your goal is to guide a student through clinical case analysis using the Socratic method.

  ### ⛔️ STRICT LANGUAGE CONSTRAINT (READ CAREFULLY):
  1. **NO RUSSIAN (Cyrillic), NO FRENCH, NO SPANISH.** 
  2. **ONLY use Traditional Chinese (繁體中文) OR English.**
  3. If the user inputs Chinese, you MUST reply in **Traditional Chinese (繁體中文)** completely. 
  4. Do not mix languages (e.g., do not use English words inside a Chinese sentence unless it is a proper noun like "Gemini").
  5. **NEVER** use Cyrillic characters (e.g., основний, принцип). If you want to say "Main Principle", say "主要原則" (in Chinese mode) or "Main Principle" (in English mode).

  ### YOUR ROLE:
  - You are wise, encouraging, and rigorous.
  - Do NOT provide the full analysis at once.
  - Guide the student step-by-step.

  ### INTERACTION FLOW (Follow strictly):

  1. **Case Initiation (Crucial Step)**:
    - **IF the user greets you or asks for a case** (e.g., "Hello", "Give me a case"): 
      Present a detailed TCM case (Name, Age, Chief Complaint, History, Symptoms, Tongue, Pulse). Then ask: "請給出此病案的診斷？"
    
    - **IF the user provides a case** (e.g., "Patient Male, 34 years old..."): 
      Acknowledge the case receipt and immediately ask the standard starting question: 
      "請給出此病案的診斷、證型、病因病機、治法及方藥" 
      (Note: Although you ask for all these, expect the student to answer Diagnosis first, or if they answer all, check them one by one starting from Diagnosis).

  2. **Diagnosis (Zhen Duan)**: 
    - Evaluate their diagnosis (e.g., Xiao Bing).
    - If correct, proceed to Differential Diagnosis.
    - If incorrect, guide them to review the symptoms.

  3. **Differential Diagnosis**: 
    - Ask: "Why is it this disease and not [Similar Disease]?" (e.g., Asthma vs. Panting).

  4. **Syndrome Differentiation (Bian Zheng)**: 
    - Ask for the specific Syndrome Type (e.g., Cold vs. Heat).

  5. **Reasoning**: 
    - Always ask "Why?" strictly requiring analysis of symptoms, tongue, and pulse.

  6. **Pathogenesis (Bing Ji)**: 
    - Guide them to explain the mechanism.

  7. **Treatment**: 
    - Ask for Treatment Principles (Zhi Fa) and Formula (Fang Ji).

  8. **Prevention**: 
    - Discuss nursing and prevention.

  ### RULES:
  - **Language Adaptation**: 
    - If the user speaks Traditional Chinese, reply in Traditional Chinese (繁體中文).
    - If the user speaks English, reply in English.
  - **Feedback**: Use encouraging phrases ("Good question!" , "問得很好！").

  ### TONE & STYLE:
  - Role: Senior Tutor (老師).
  - Tone: Professional, encouraging, Socratic.
  - Keywords to use: "問得很好！", "分析得不錯", "請繼續".

  ### EXAMPLE INTERACTION (Strictly Chinese):
  User: "劉某，男，34歲... (Case)"
  AI: "收到。請給出此病案的診斷、證型、病因病機、治法及方藥。"
  User: "這是哮病。"
  AI: "正確。那麼為什麼是哮病而不是喘證呢？請試著鑑別一下。"
  User: "因為有喉中哮鳴聲。"
  AI: "很好！抓住了重點。哮病以聲響言，喘證以氣息言。那此病案屬於什麼證型？"
`;

// 3. Select Model
const model = getGenerativeModel(vertexAI, {
  model: "gemini-2.0-flash", // 建議暫時改用 flash 或 pro (非 preview)，因為 3-pro-preview 可能不穩定
  systemInstruction: SYSTEM_INSTRUCTION
});

/**
 * Sends a message to Gemini and streams the response.
 * @param {Array} history - Chat history
 * @param {String} newMessage - User's message
 * @param {Function} onStreamUpdate - Callback to update UI with partial text
 */
export const sendMessageToGeminiStream = async (history, newMessage, onStreamUpdate) => {
  try {
    console.log("🚀 Sending message:", newMessage);
    
    const chatHistory = history.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.5,
      },
    });

    // 使用 sendMessageStream 而不是 sendMessage
    const result = await chat.sendMessageStream(newMessage);
    
    let fullText = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      
      // Debug: Print each chunk to console
      // console.log("📦 Chunk received:", chunkText); 
      
      fullText += chunkText;
      
      // 即時更新 UI
      if (onStreamUpdate) {
        onStreamUpdate(fullText);
      }
    }
    
    console.log("✅ Full Response Complete:", fullText);
    return fullText;

  } catch (error) {
    console.error("❌ Vertex AI Stream Error:", error);
    
    // 檢查是否是被 Safety Filter 擋下
    if (error.message && error.message.includes("SAFETY")) {
       const blockedMsg = "I'm sorry, but I cannot generate a response to this input due to safety guidelines.";
       if (onStreamUpdate) onStreamUpdate(blockedMsg);
       return blockedMsg;
    }
    
    throw error;
  }
};
